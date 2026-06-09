/**
 * Daily snapshot script — saves current sprint task states to taskSnapshots collection.
 * Run daily before the notify script so we can diff today vs yesterday.
 *
 * Firestore doc: taskSnapshots/{date} → { date, tasks: { [taskId]: { state, points, person, title, sprint } } }
 */
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};
const db = getFirestore(initializeApp(firebaseConfig));

async function run() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`Taking snapshot for ${today}...`);

  // Only snapshot current sprint tasks
  const SPRINT_START_MS = new Date("2026-01-05").getTime();
  const todayMs = new Date(today).getTime();
  const currentSprint = Math.max(1, Math.floor((todayMs - SPRINT_START_MS) / (14 * 24 * 60 * 60 * 1000)) + 1);

  const snap = await getDocs(collection(db, "tasks"));
  const tasks = {};
  snap.forEach(d => {
    const t = d.data();
    if (t.sprint !== currentSprint) return;
    tasks[t.id] = {
      state: t.state || "Unknown",
      points: parseFloat(t.points) || 0,
      person: t.person || "Unassigned",
      title: t.title || "Untitled",
      sprint: t.sprint || 0,
      project: t.project || "General"
    };
  });

  await setDoc(doc(db, "taskSnapshots", today), { date: today, tasks, createdAt: new Date().toISOString() });
  console.log(`✅ Snapshot saved: ${Object.keys(tasks).length} tasks for ${today}`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
