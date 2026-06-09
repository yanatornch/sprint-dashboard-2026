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

function prevDate(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

async function computeDailyDelta(date) {
  const yesterday = prevDate(date);

  // Load today's and yesterday's snapshots
  const [todaySnap, yesterdaySnap, statsSnap] = await Promise.all([
    getDoc(doc(db, "taskSnapshots", date)),
    getDoc(doc(db, "taskSnapshots", yesterday)),
    getDocs(collection(db, "sprintUserStats"))
  ]);

  if (!todaySnap.exists()) return null;

  const todayTasks = todaySnap.data().tasks || {};
  const yesterdayTasks = yesterdaySnap.exists() ? yesterdaySnap.data().tasks || {} : {};

  // Overall sprint points per person
  const overallPoints = {};
  const sprintPoints = {};
  statsSnap.forEach(d => {
    const s = d.data();
    if (!overallPoints[s.userId]) overallPoints[s.userId] = 0;
    overallPoints[s.userId] += s.points || 0;
    // Current sprint = highest sprintIndex available
    if (!sprintPoints[s.userId] || s.sprintIndex > (sprintPoints[s.userId].idx || 0)) {
      sprintPoints[s.userId] = { pts: s.points || 0, idx: s.sprintIndex };
    }
  });

  // Compute per-person daily delta
  const byPerson = {};

  for (const [taskId, task] of Object.entries(todayTasks)) {
    const prev = yesterdayTasks[taskId];
    const person = task.person;
    if (!byPerson[person]) byPerson[person] = { pointsToday: 0, tasksToday: 0, tasks: [] };

    const stateChanged = prev && prev.state !== task.state;
    const isNewTask = !prev;
    const completedToday = isDone(task.state) && prev && !isDone(prev.state);

    if (completedToday || isNewTask || stateChanged) {
      byPerson[person].tasksToday += 1;
      if (completedToday) byPerson[person].pointsToday += task.points;
      byPerson[person].tasks.push({
        title: task.title,
        points: task.points || 0,
        state: task.state || "Unknown",
        prevState: prev ? (prev.state || "Unknown") : null,
        completedToday: completedToday || false,
        isNew: isNewTask || false
      });
    }
  }

  // Attach sprint + overall totals
  for (const person of Object.keys(byPerson)) {
    byPerson[person].totalSprintPoints = sprintPoints[person]?.pts || 0;
    byPerson[person].totalOverallPoints = Math.round((overallPoints[person] || 0) * 10) / 10;
  }

  return byPerson;
}

function buildMessage(byPerson, date) {
  const totalPts = Object.values(byPerson).reduce((a, p) => a + (p.pointsToday || 0), 0);
  const totalTasks = Object.values(byPerson).reduce((a, p) => a + (p.tasksToday || 0), 0);

  if (totalTasks === 0) return `📅 Daily Sprint Update — ${date}\n✅ No task changes today.`;

  let msg = `📅 Daily Sprint Update — ${date}\n`;
  msg += `📊 Team today: ${totalTasks} task changes · ${totalPts.toFixed(1)} pts completed\n\n`;

  for (const [person, data] of Object.entries(byPerson).sort()) {
    if (!data.tasksToday) continue;
    msg += `👤 ${person} — ${data.pointsToday.toFixed(1)}pts done today (sprint total: ${data.totalSprintPoints}pts)\n`;
    data.tasks.forEach(t => {
      const tag = t.completedToday ? "✅" : t.isNew ? "🆕" : "🔄";
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
  const { only } = request.body || {}; // optional: { only: ["No"] } to filter
  const errors = [];

  // Compute daily delta from snapshots
  let byPerson;
  try {
    byPerson = await computeDailyDelta(today);
    if (byPerson && only && Array.isArray(only)) {
      Object.keys(byPerson).forEach(p => { if (!only.includes(p)) delete byPerson[p]; });
    }
    if (!byPerson) {
      return response.status(400).json({ error: `No snapshot found for ${today}. Run daily_snapshot.js first.` });
    }
  } catch (err) {
    return response.status(500).json({ error: `Delta computation failed: ${err.message}` });
  }

  const timestamp = new Date().toISOString();

  // 1. Save to Firestore dailyStats
  try {
    await addDoc(collection(db, "dailyStats"), {
      byPerson,
      date: today,
      timestamp,
      createdAt: timestamp
    });
  } catch (err) {
    errors.push(`Firestore: ${err.message}`);
  }

  // 2. Forward to external webhook
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const message = buildMessage(byPerson, today);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.WEBHOOK_SECRET}`
        },
        body: JSON.stringify({ status: "daily_sprint", message, byPerson, date: today, timestamp })
      });
      if (!res.ok) errors.push(`Webhook: ${res.status} ${res.statusText}`);
    } catch (err) {
      errors.push(`Webhook: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    return response.status(207).json({ success: false, errors, byPerson, date: today });
  }

  return response.status(200).json({ success: true, date: today, byPerson });
}
