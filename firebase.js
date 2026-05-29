// REST API wrapper — bypasses Firebase SDK to avoid WebChannel Listen errors
const PROJECT_ID = "morestudio-sprint-2026";
const API_KEY = "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function decodeValue(v) {
  if (!v) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in v) return decodeFields(v.mapValue.fields || {});
  return null;
}
function decodeFields(fields) {
  const out = {};
  for (const k in fields) out[k] = decodeValue(fields[k]);
  return out;
}

async function fetchAllDocs(collectionPath) {
  const all = [];
  let pageToken = null;
  do {
    const url = new URL(`${BASE}/${collectionPath}`);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Firestore fetch failed: ${res.status}`);
    const data = await res.json();
    (data.documents || []).forEach(d => all.push({ id: d.name.split("/").pop(), data: decodeFields(d.fields || {}) }));
    pageToken = data.nextPageToken || null;
  } while (pageToken);
  return all;
}

async function fetchOneDoc(collectionPath, docId) {
  const url = `${BASE}/${collectionPath}/${docId}?key=${API_KEY}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore fetch failed: ${res.status}`);
  const d = await res.json();
  return decodeFields(d.fields || {});
}

// SDK-compatible shims so the rest of main.js doesn't have to change much
export const db = { _rest: true };

export function collection(_db, path) {
  return { _path: path };
}
export function doc(_db, path, id) {
  return { _path: path, _id: id };
}
export async function getDocs(colRef) {
  const docs = await fetchAllDocs(colRef._path);
  return {
    forEach(cb) { docs.forEach(d => cb({ id: d.id, data: () => d.data })); },
    get docs() { return docs.map(d => ({ id: d.id, data: () => d.data })); },
    get size() { return docs.length; },
  };
}
export async function getDoc(docRef) {
  const data = await fetchOneDoc(docRef._path, docRef._id);
  return {
    exists() { return data !== null; },
    data() { return data || undefined; },
  };
}
