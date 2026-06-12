import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};

const db = getFirestore(initializeApp(firebaseConfig));

const DONE_STATES = ["done", "closed", "removed", "canceled", "cancelled"];
function isDone(state) { return DONE_STATES.some(s => (state || "").toLowerCase().includes(s)); }

const SPRINT_START_MS = new Date("2026-01-05").getTime();
function sprintForDate(dateStr) {
  const ms = new Date(dateStr).getTime();
  return Math.max(1, Math.floor((ms - SPRINT_START_MS) / (14 * 24 * 60 * 60 * 1000)) + 1);
}
function sprintStartDate(sprint) {
  const d = new Date(SPRINT_START_MS + (sprint - 1) * 14 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

// Find the earliest available snapshot on/after a given date (the sprint baseline).
async function findBaselineSnapshot(fromDate, toDate) {
  let cursor = new Date(fromDate);
  const end = new Date(toDate);
  while (cursor <= end) {
    const key = cursor.toISOString().slice(0, 10);
    const snap = await getDoc(doc(db, "taskSnapshots", key));
    if (snap.exists()) return { key, tasks: snap.data().tasks || {} };
    cursor.setDate(cursor.getDate() + 1);
  }
  return null;
}

async function computeWeeklyDelta(date) {
  const currentSprint = sprintForDate(date);
  const sStart = sprintStartDate(currentSprint);

  const [todaySnap, statsSnap] = await Promise.all([
    getDoc(doc(db, "taskSnapshots", date)),
    getDocs(collection(db, "sprintUserStats"))
  ]);
  if (!todaySnap.exists()) return null;

  const todayTasks = todaySnap.data().tasks || {};
  const baseline = await findBaselineSnapshot(sStart, date);
  const baselineTasks = baseline ? baseline.tasks : {};

  // Overall + current-sprint points per person
  const overallPoints = {};
  const sprintPoints = {};
  statsSnap.forEach(d => {
    const s = d.data();
    if (!overallPoints[s.userId]) overallPoints[s.userId] = 0;
    overallPoints[s.userId] += s.points || 0;
    if (!sprintPoints[s.userId] || s.sprintIndex > (sprintPoints[s.userId].idx || 0)) {
      sprintPoints[s.userId] = { pts: s.points || 0, idx: s.sprintIndex };
    }
  });

  // stateBreakdown across the whole current sprint
  const stateBreakdowns = {};
  for (const task of Object.values(todayTasks)) {
    if (task.sprint !== currentSprint) continue;
    const person = task.person;
    if (!stateBreakdowns[person]) stateBreakdowns[person] = {};
    const state = task.state || "Unknown";
    stateBreakdowns[person][state] = (stateBreakdowns[person][state] || 0) + 1;
  }

  // Weekly delta: changes since the sprint baseline snapshot
  const byPerson = {};
  for (const [taskId, task] of Object.entries(todayTasks)) {
    if (task.sprint !== currentSprint) continue;

    const prev = baselineTasks[taskId];
    const person = task.person;
    if (!byPerson[person]) byPerson[person] = { pointsThisWeek: 0, tasksThisWeek: 0, tasks: [] };

    const stateChanged = prev && prev.state !== task.state;
    const isNewTask = !prev;
    const completedThisWeek = isDone(task.state) && (!prev || !isDone(prev.state));

    if (completedThisWeek || isNewTask || stateChanged) {
      byPerson[person].tasksThisWeek += 1;
      if (completedThisWeek) byPerson[person].pointsThisWeek += task.points;
      byPerson[person].tasks.push({
        title: task.title,
        points: task.points || 0,
        state: task.state || "Unknown",
        prevState: prev ? (prev.state || "Unknown") : null,
        completedThisWeek: completedThisWeek || false,
        isNew: isNewTask || false
      });
    }
  }

  for (const person of Object.keys(byPerson)) {
    byPerson[person].totalSprintPoints = sprintPoints[person]?.pts || 0;
    byPerson[person].totalOverallPoints = Math.round((overallPoints[person] || 0) * 10) / 10;
    byPerson[person].stateBreakdown = stateBreakdowns[person] || {};
  }

  return { byPerson, sprint: currentSprint, baselineDate: baseline?.key || null };
}

function buildMessage(byPerson, date, sprint) {
  const totalPts = Object.values(byPerson).reduce((a, p) => a + (p.pointsThisWeek || 0), 0);
  const totalTasks = Object.values(byPerson).reduce((a, p) => a + (p.tasksThisWeek || 0), 0);

  if (totalTasks === 0) return `📆 Weekly Sprint Summary — Sprint ${sprint} (${date})\n✅ No task changes this week.`;

  let msg = `📆 Weekly Sprint Summary — Sprint ${sprint} (${date})\n`;
  msg += `📊 Team this week: ${totalTasks} task changes · ${totalPts.toFixed(1)} pts completed\n\n`;

  for (const [person, data] of Object.entries(byPerson).sort()) {
    if (!data.tasksThisWeek) continue;
    msg += `👤 ${person} — ${data.pointsThisWeek.toFixed(1)}pts done this week (sprint total: ${data.totalSprintPoints}pts)\n`;
    data.tasks.forEach(t => {
      const tag = t.completedThisWeek ? "✅" : t.isNew ? "🆕" : "🔄";
      const prev = t.prevState ? ` (${t.prevState} → ${t.state})` : "";
      msg += `  ${tag} ${t.title} (${t.points}pt)${prev}\n`;
    });
    msg += "\n";
  }

  return msg.trim();
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const auth = request.headers["authorization"] || "";
  if (auth !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const today = new Date().toISOString().slice(0, 10);
  const { only, mockup } = request.body || {};
  const errors = [];

  let byPerson, sprint, baselineDate;
  if (mockup) {
    byPerson = mockup;
    sprint = sprintForDate(today);
  } else {
    try {
      const result = await computeWeeklyDelta(today);
      if (!result) {
        return response.status(400).json({ error: `No snapshot found for ${today}. Run daily_snapshot.js first.` });
      }
      byPerson = result.byPerson;
      sprint = result.sprint;
      baselineDate = result.baselineDate;
      if (only && Array.isArray(only)) {
        Object.keys(byPerson).forEach(p => { if (!only.includes(p)) delete byPerson[p]; });
      }
    } catch (err) {
      return response.status(500).json({ error: `Weekly delta computation failed: ${err.message}` });
    }
  }

  const timestamp = new Date().toISOString();

  // 1. Save to Firestore weeklyStats
  try {
    await addDoc(collection(db, "weeklyStats"), {
      byPerson, date: today, sprint, baselineDate: baselineDate || null, timestamp, createdAt: timestamp
    });
  } catch (err) {
    errors.push(`Firestore: ${err.message}`);
  }

  // 2. Forward to external webhook
  const webhookUrl = "https://marketplace-morestudio-40751858881.asia-southeast1.run.app/api/notify/weekly-sprint";
  if (webhookUrl && byPerson && Object.keys(byPerson).length > 0) {
    try {
      const message = buildMessage(byPerson, today, sprint);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.WEBHOOK_SECRET}`
        },
        body: JSON.stringify({ status: "weekly_sprint", message, byPerson, date: today, sprint, timestamp })
      });
      if (!res.ok) errors.push(`Webhook: ${res.status} ${res.statusText}`);
    } catch (err) {
      errors.push(`Webhook: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    return response.status(207).json({ success: false, errors, byPerson, date: today, sprint });
  }

  return response.status(200).json({ success: true, date: today, sprint, byPerson });
}
