/**
 * One-time script: detect tasks moved from sprint 11 → 12 via Azure revision history.
 * Writes movedFromSprint, movedToSprint, movedAt to each affected task doc in Firestore.
 *
 * Run: node check_carried.js
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

const AZURE_ORG = process.env.AZURE_ORG || 'morestudio';
const AZURE_PROJECT = process.env.AZURE_PROJECT || 'M';
const AZURE_PAT = process.env.AZURE_PAT;
if (!AZURE_PAT) { console.error("Missing AZURE_PAT"); process.exit(1); }

const azureHeaders = {
  'Authorization': `Basic ${Buffer.from(`:${AZURE_PAT.replace(/^"|"$|'/g, '')}`).toString('base64')}`,
  'Content-Type': 'application/json'
};

const FROM_SPRINT = 11;
const TO_SPRINT = 12;

async function getRevisions(taskId) {
  const url = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/workitems/${taskId}/revisions?api-version=7.1`;
  const res = await fetch(url, { headers: azureHeaders });
  if (!res.ok) return [];
  const data = await res.json();
  return data.value || [];
}

function sprintFromIteration(iterationPath) {
  const m = (iterationPath || "").match(/\\(\d+)$/);
  return m ? parseInt(m[1], 10) : null;
}

async function run() {
  // Get all tasks currently in sprint 12 from Firestore
  console.log("Loading tasks from Firestore...");
  const snap = await getDocs(collection(db, "tasks"));
  const sprint12Tasks = [];
  snap.forEach(d => {
    const t = d.data();
    if (t.sprint === TO_SPRINT) sprint12Tasks.push(t);
  });
  console.log(`Found ${sprint12Tasks.length} tasks in sprint ${TO_SPRINT}. Checking revision history...\n`);

  const carried = [];
  let checked = 0;

  for (const task of sprint12Tasks) {
    checked++;
    if (checked % 20 === 0) console.log(`  Checked ${checked}/${sprint12Tasks.length}...`);

    const revisions = await getRevisions(task.id);
    if (revisions.length === 0) continue;

    // Walk revisions in order — look for a transition from sprint 11 to sprint 12
    let wasInSprint11 = false;
    let movedAt = null;
    for (const rev of revisions) {
      const sprint = sprintFromIteration(rev.fields?.["System.IterationPath"]);
      if (sprint === FROM_SPRINT) wasInSprint11 = true;
      if (wasInSprint11 && sprint === TO_SPRINT) {
        movedAt = rev.fields?.["System.ChangedDate"] || null;
        break;
      }
    }

    if (wasInSprint11) {
      carried.push({ ...task, movedAt });
      // Write to Firestore
      await setDoc(doc(db, "tasks", `task_${task.id}`), {
        movedFromSprint: FROM_SPRINT,
        movedToSprint: TO_SPRINT,
        movedAt: movedAt || new Date().toISOString()
      }, { merge: true });
    }
  }

  console.log(`\n✅ Done. Found ${carried.length} tasks carried from Sprint ${FROM_SPRINT} → ${TO_SPRINT}:\n`);

  const byPerson = {};
  for (const t of carried) {
    if (!byPerson[t.person]) byPerson[t.person] = [];
    byPerson[t.person].push(t);
  }

  for (const [person, tasks] of Object.entries(byPerson).sort()) {
    console.log(`👤 ${person} (${tasks.length} tasks)`);
    tasks.forEach(t => console.log(`   • [${t.state}] ${t.title} (${t.points}pt · ${t.project})`));
  }

  if (carried.length === 0) console.log("  None found.");
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
