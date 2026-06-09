import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};

const db = getFirestore(initializeApp(firebaseConfig));

function buildMessage(byPerson, date) {
  const totalPts = Object.values(byPerson).reduce((a, p) => a + (p.pointsToday || 0), 0);
  const totalTasks = Object.values(byPerson).reduce((a, p) => a + (p.tasksToday || 0), 0);

  let msg = `📅 Daily Sprint Update — ${date}\n`;
  msg += `📊 Team today: ${totalTasks} tasks · ${totalPts} pts\n\n`;

  for (const [person, data] of Object.entries(byPerson).sort()) {
    if (!data.tasksToday && !data.pointsToday) continue;
    msg += `👤 ${person} — ${data.tasksToday} tasks · ${data.pointsToday}pts today`;
    msg += ` (sprint total: ${data.totalSprintPoints}pts)\n`;
    if (Array.isArray(data.tasks)) {
      data.tasks.forEach(t => {
        msg += `  • ${t.title} (${t.points}pt)\n`;
      });
    }
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

  const { byPerson, date, timestamp } = request.body;

  if (!byPerson || !date) {
    return response.status(400).json({ error: "Missing required fields: byPerson, date" });
  }

  const errors = [];

  // 1. Save to Firestore
  try {
    await addDoc(collection(db, "dailyStats"), {
      byPerson,
      date,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    errors.push(`Firestore: ${err.message}`);
  }

  // 2. Forward to webhook
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookSecret = process.env.WEBHOOK_SECRET;
  if (webhookUrl && webhookSecret) {
    try {
      const message = buildMessage(byPerson, date);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${webhookSecret}`
        },
        body: JSON.stringify({ status: "daily_sprint", message, byPerson, date, timestamp })
      });
      if (!res.ok) errors.push(`Webhook: ${res.status} ${res.statusText}`);
    } catch (err) {
      errors.push(`Webhook: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    return response.status(207).json({ success: false, errors });
  }

  return response.status(200).json({ success: true, date });
}
