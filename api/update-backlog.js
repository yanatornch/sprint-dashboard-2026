import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};

const db = getFirestore(initializeApp(firebaseConfig));

const VALID_PRIORITIES = ["p1", "p2", "p3", "p4", "carryover", "waiting"];
const VALID_STATUSES   = ["New", "In Progress", "Blocked", "Waiting", "Pending", "Done"];
const VALID_NOTE_TYPES = ["default", "info", "warn", "good"];

function validateItem(item, i) {
  if (!item.title || typeof item.title !== "string") return `Item ${i}: missing title`;
  if (!VALID_PRIORITIES.includes(item.priority)) return `Item ${i} "${item.title}": invalid priority "${item.priority}"`;
  if (!VALID_STATUSES.includes(item.status))     return `Item ${i} "${item.title}": invalid status "${item.status}"`;
  if (item.notes && !Array.isArray(item.notes))  return `Item ${i} "${item.title}": notes must be an array`;
  if (item.tags  && !Array.isArray(item.tags))   return `Item ${i} "${item.title}": tags must be an array`;
  return null;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const auth = request.headers["authorization"] || "";
  if (auth !== `Bearer ${process.env.BACKLOG_API_SECRET}`) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  let items;
  try {
    items = request.body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return response.status(400).json({ error: "Body must contain a non-empty 'items' array" });
    }
  } catch (e) {
    return response.status(400).json({ error: "Invalid JSON body" });
  }

  // Validate all items before touching Firestore
  for (let i = 0; i < items.length; i++) {
    const err = validateItem(items[i], i + 1);
    if (err) return response.status(400).json({ error: err });
  }

  // Sanitize and assign order
  const sanitized = items.map((item, i) => ({
    order:     item.order     ?? i + 1,
    title:     String(item.title).trim(),
    priority:  item.priority,
    status:    item.status,
    tags:      (item.tags      || []).map(String),
    notes:     (item.notes     || []).map(String),
    noteTypes: (item.noteTypes || []).map(t => VALID_NOTE_TYPES.includes(t) ? t : "default"),
    isNew:     Boolean(item.isNew ?? false),
  }));

  try {
    const col = collection(db, "backlog");

    // Delete all existing items
    const existing = await getDocs(col);
    if (existing.size > 0) {
      const deleteBatch = writeBatch(db);
      existing.forEach(d => deleteBatch.delete(d.ref));
      await deleteBatch.commit();
    }

    // Write new items
    const writeBatchRef = writeBatch(db);
    sanitized.forEach(item => {
      writeBatchRef.set(doc(col), item);
    });
    await writeBatchRef.commit();

    return response.status(200).json({
      success: true,
      written: sanitized.length,
      deleted: existing.size,
      items: sanitized.map(i => ({ order: i.order, title: i.title, priority: i.priority, status: i.status })),
    });
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}
