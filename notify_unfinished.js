import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const ROLES = {
  "Ohm": "Dev", "Nust": "Dev", "Unn": "Dev", "P": "Dev", "No": "Dev", "Tum": "Dev", "Ping": "Dev",
  "Waew": "BA", "Torfah": "BA", "Tae": "BA",
  "Ploy": "Designer", "Gib": "Designer", "Nine": "Designer",
  "Praew": "Tester",
  "Karn": "CEO"
};

async function run() {
  console.log("Fetching tasks from Firestore...");
  const snap = await getDocs(collection(db, "tasks"));

  // Find current sprint by date — auto-generated, no need to update manually
  const SPRINT_START = "2026-01-05";
  const today = new Date().toISOString().slice(0, 10);
  const startMs = new Date(SPRINT_START).getTime();
  const todayMs = new Date(today).getTime();
  const sprintNum = Math.floor((todayMs - startMs) / (14 * 24 * 60 * 60 * 1000));
  const currentSprint = Math.max(1, sprintNum + 1);
  console.log(`Current sprint: ${currentSprint} (today: ${today})`);

  // Collect unfinished tasks for dev team in current sprint
  const byPerson = {};
  snap.forEach(d => {
    const t = d.data();
    if (t.sprint !== currentSprint) return;
    if (ROLES[t.person] !== "Dev") return;

    const stateLower = (t.state || "").toLowerCase();
    const isDone = DONE_STATES.some(s => stateLower.includes(s));
    if (isDone) return;

    if (!byPerson[t.person]) byPerson[t.person] = [];
    byPerson[t.person].push({
      title: t.title || "Untitled",
      state: t.state || "Unknown",
      points: t.points || 0,
      project: t.project || "-"
    });
  });

  // Build message
  const totalTasks = Object.values(byPerson).reduce((a, b) => a + b.length, 0);
  const totalPts = Object.values(byPerson).reduce((a, tasks) =>
    a + tasks.reduce((b, t) => b + (parseFloat(t.points) || 0), 0), 0);

  let message = `🔔 Sprint ${currentSprint} — Dev Team Unfinished Tasks\n`;
  message += `📊 Total: ${totalTasks} tasks · ${totalPts.toFixed(1)} pts remaining\n\n`;

  if (Object.keys(byPerson).length === 0) {
    message += "✅ All dev tasks are done!";
  } else {
    for (const [person, tasks] of Object.entries(byPerson).sort()) {
      const personPts = tasks.reduce((a, t) => a + (parseFloat(t.points) || 0), 0);
      message += `👤 ${person} — ${tasks.length} tasks · ${personPts.toFixed(1)} pts\n`;
      tasks.forEach(t => {
        message += `  • [${t.state}] ${t.title} (${t.points}pt · ${t.project})\n`;
      });
      message += "\n";
    }
  }

  console.log(message);

  // Send to notify endpoint
  const webhookUrl = process.env.SPRINT_NOTIFY_URL || process.env.WEBHOOK_URL;
  const webhookSecret = process.env.WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("Missing WEBHOOK_URL or WEBHOOK_SECRET");
    process.exit(1);
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${webhookSecret}`
    },
    body: JSON.stringify({
      status: "weekly_report",
      message,
      sprint: currentSprint,
      totalTasks,
      totalPoints: totalPts,
      byPerson,
      timestamp: new Date().toISOString()
    })
  });

  if (!res.ok) {
    console.error(`Webhook failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  console.log("Notification sent:", await res.json());
  process.exit(0);
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
