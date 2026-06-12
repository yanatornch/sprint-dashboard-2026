/**
 * Vercel Cron endpoint — runs daily at exact UTC time (see crons in vercel.json).
 * Flow: take today's snapshot of current-sprint tasks → call the notify endpoint.
 *
 * Azure sync is NOT run here (it needs the long-running PAT flow and is handled by
 * the GitHub Action). The snapshot reads whatever is currently in Firestore.
 *
 * Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically when CRON_SECRET
 * is set in env vars. We also accept the WEBHOOK_SECRET for manual triggering.
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};
const db = getFirestore(initializeApp(firebaseConfig));

async function takeSnapshot() {
  const today = new Date().toISOString().slice(0, 10);

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

  await setDoc(doc(db, "taskSnapshots", today), {
    date: today,
    tasks,
    createdAt: new Date().toISOString()
  });
  return { today, count: Object.keys(tasks).length };
}

export default async function handler(request, response) {
  // Vercel Cron sends a Bearer CRON_SECRET header; allow WEBHOOK_SECRET for manual runs.
  const auth = request.headers["authorization"] || "";
  const ok =
    auth === `Bearer ${process.env.CRON_SECRET}` ||
    auth === `Bearer ${process.env.WEBHOOK_SECRET}`;
  if (!ok) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 1. Take today's snapshot
    const snap = await takeSnapshot();

    // 2. Trigger the notify endpoint (reuses the working delta + webhook logic)
    const base = `https://${request.headers["host"]}`;
    const notifyRes = await fetch(`${base}/api/notify/daily-sprint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.WEBHOOK_SECRET}`
      },
      body: JSON.stringify({})
    });
    const notifyBody = await notifyRes.json().catch(() => ({}));

    return response.status(200).json({
      success: true,
      snapshot: snap,
      notify: { status: notifyRes.status, body: notifyBody }
    });
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}
