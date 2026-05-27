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
const DEV_ROLES = ["Dev"];
const ROLES = {
  "Ohm": "Dev", "Nust": "Dev", "Ping": "Dev", "Tae": "Dev",
  "Tum": "Dev", "Karn": "Dev", "Dream": "Dev", "Torfah": "Dev",
  "Waew": "BA", "Unn": "BA",
  "Ploy": "Designer", "Gib": "Designer",
  "Nine": "Tester", "Praew": "Tester",
  "No": "CEO", "P": "PC"
};

async function run() {
  console.log("Fetching tasks from Firestore...");
  const snap = await getDocs(collection(db, "tasks"));

  // Find current sprint by date
  const SPRINT_DATES = [
    { sprint: 1,  s: "2026-01-05", e: "2026-01-18" },
    { sprint: 2,  s: "2026-01-19", e: "2026-02-01" },
    { sprint: 3,  s: "2026-02-02", e: "2026-02-15" },
    { sprint: 4,  s: "2026-02-16", e: "2026-03-01" },
    { sprint: 5,  s: "2026-03-02", e: "2026-03-15" },
    { sprint: 6,  s: "2026-03-16", e: "2026-03-29" },
    { sprint: 7,  s: "2026-03-30", e: "2026-04-12" },
    { sprint: 8,  s: "2026-04-13", e: "2026-04-26" },
    { sprint: 9,  s: "2026-04-27", e: "2026-05-10" },
    { sprint: 10, s: "2026-05-11", e: "2026-05-24" },
    { sprint: 11, s: "2026-05-25", e: "2026-06-07" },
    { sprint: 12, s: "2026-06-08", e: "2026-06-21" },
  ];
  const today = new Date().toISOString().slice(0, 10);
  const found = SPRINT_DATES.find(d => today >= d.s && today <= d.e);
  const currentSprint = found ? found.sprint : SPRINT_DATES[SPRINT_DATES.length - 1].sprint;
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
