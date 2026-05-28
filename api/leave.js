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

function getSprintForDate(dateStr) {
  const found = SPRINT_DATES.find(d => dateStr >= d.s && dateStr <= d.e);
  return found ? found.sprint : null;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const auth = request.headers["authorization"] || "";
  if (auth !== `Bearer ${process.env.LEAVE_API_SECRET}`) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { person, startDate, endDate, type, days } = request.body;

    if (!person || !startDate || !endDate || !type) {
      return response.status(400).json({ error: "Missing required fields: person, startDate, endDate, type" });
    }

    const sprint = getSprintForDate(startDate);

    const record = {
      person,
      startDate,
      endDate,
      type,
      days: days || 1,
      sprint,
      createdAt: new Date().toISOString()
    };

    const ref = await addDoc(collection(db, "leaves"), record);
    return response.status(200).json({ success: true, id: ref.id, sprint, record });
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}
