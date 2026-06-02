import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};
const db = getFirestore(initializeApp(firebaseConfig));

// Environment variables
const AZURE_ORG = process.env.AZURE_ORG || process.env.ADO_ORG || 'morestudio';
const AZURE_PROJECT = process.env.AZURE_PROJECT || process.env.ADO_PROJECT || 'M';
const AZURE_PAT = process.env.AZURE_PAT || process.env.ADO_PAT;

const SPRINT_START = "2026-01-05";
const SPRINT_WEEKS = 2;
const MAX_SPRINTS = 26;

function generateSprintDates() {
  const dates = [];
  const start = new Date(SPRINT_START);
  for (let i = 0; i < MAX_SPRINTS; i++) {
    const s = new Date(start);
    s.setDate(s.getDate() + i * SPRINT_WEEKS * 7);
    const e = new Date(s);
    e.setDate(e.getDate() + SPRINT_WEEKS * 7 - 1);
    dates.push({ sprint: i + 1, s: s.toISOString().slice(0, 10), e: e.toISOString().slice(0, 10) });
  }
  return dates;
}
const SPRINT_DATES = generateSprintDates();

function getCurrentSprint() {
  const today = new Date().toISOString().slice(0, 10);
  const found = SPRINT_DATES.find(d => today >= d.s && today <= d.e);
  if (found) return found.sprint;
  if (today > SPRINT_DATES[SPRINT_DATES.length - 1].e) return SPRINT_DATES[SPRINT_DATES.length - 1].sprint;
  return 1;
}

if (!AZURE_PAT) {
  console.error("Missing required environment variables (AZURE_PAT or ADO_PAT).");
  process.exit(1);
}

// Azure Authentication
// Note: Some PATs have quotes around them in .env, so we strip them
const cleanPat = AZURE_PAT.replace(/^"|"$|'/g, '');
const azureHeaders = {
  'Authorization': `Basic ${Buffer.from(`:${cleanPat}`).toString('base64')}`,
  'Content-Type': 'application/json'
};

// Map Azure names to Dashboard short names
const USER_MAPPING = {
  // Example mappings - UPDATE THESE with real Azure names/emails
  "Ohm": "Ohm",
  "Waew": "Waew",
  "Nust": "Nust"
};

function mapAzureUserToShortName(azureUserObj) {
  if (!azureUserObj || !azureUserObj.displayName) return "Unassigned";
  const name = azureUserObj.displayName;
  // Try to find a match
  for (const [key, shortName] of Object.entries(USER_MAPPING)) {
    if (name.includes(key)) return shortName;
  }
  // Fallback to first name
  return name.split(" ")[0];
}

async function runSync() {
  const currentSprint = getCurrentSprint();
  console.log(`Starting Azure Sync for Org: ${AZURE_ORG}, Project: ${AZURE_PROJECT}, Sprint: ${currentSprint}`);

  // 1. Execute WIQL Query to get current sprint tasks (dynamic sprint number)
  const fallbackWiql = {
    query: `
      SELECT [System.Id]
      FROM workitems
      WHERE [System.TeamProject] = '${AZURE_PROJECT}'
        AND [System.WorkItemType] IN ('Task', 'Bug')
        AND [System.IterationPath] UNDER '${AZURE_PROJECT}\\2026\\${currentSprint}'
    `
  };

  const queryUrl = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/wiql?api-version=7.1`;
  const queryRes = await fetch(queryUrl, { 
    method: 'POST',
    headers: azureHeaders,
    body: JSON.stringify(fallbackWiql)
  });
  
  if (!queryRes.ok) {
    const errorText = await queryRes.text();
    throw new Error(`Azure WIQL Query failed: ${queryRes.status} ${queryRes.statusText}\n${errorText}`);
  }
  const queryData = await queryRes.json();
  
  const workItemIds = queryData.workItems.map(wi => wi.id);
  if (workItemIds.length === 0) {
    console.log("No work items found in this query.");
    return;
  }
  console.log(`Found ${workItemIds.length} work items.`);

  // 2. Fetch full details for the Work Items (Azure batch API limit = 200 per request)
  const batchUrl = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/workitemsbatch?api-version=7.1`;
  const BATCH_SIZE = 200;
  const allItems = [];
  for (let i = 0; i < workItemIds.length; i += BATCH_SIZE) {
    const chunk = workItemIds.slice(i, i + BATCH_SIZE);
    const batchRes = await fetch(batchUrl, {
      method: 'POST',
      headers: azureHeaders,
      body: JSON.stringify({
        ids: chunk,
        fields: [
          "System.Id",
          "System.Title",
          "System.IterationPath",
          "System.State",
          "System.AssignedTo",
          "Custom.Points",
          "System.AreaPath"
        ]
      })
    });
    if (!batchRes.ok) throw new Error(`Azure Batch fetch failed: ${batchRes.statusText}`);
    const batchData = await batchRes.json();
    allItems.push(...batchData.value);
  }
  const batchData = { value: allItems };

  // 3. Process into our Firebase schema
  let batchWrite = writeBatch(db);
  let syncCount = 0;
  
  let targetSprintIndex = currentSprint - 1;

  for (const item of batchData.value) {
    const fields = item.fields;
    
    // Parse Sprint Index from Iteration Path (e.g. "M\2026\11")
    const iteration = fields["System.IterationPath"] || "";
    const sprintMatch = iteration.match(/\\(\d+)$/);
    if (sprintMatch) {
      targetSprintIndex = parseInt(sprintMatch[1], 10) - 1;
    }

    const assignedTo = fields["System.AssignedTo"];
    if (syncCount === 0) {
      console.log("Raw AssignedTo field:", assignedTo);
    }
    let project = fields["System.AreaPath"] || "General";
    if (project.startsWith(`${AZURE_PROJECT}\\`)) {
      project = project.substring(AZURE_PROJECT.length + 1);
    } else if (project === AZURE_PROJECT) {
      project = "General";
    }

    const taskObj = {
      id: String(fields["System.Id"]),
      title: fields["System.Title"] || "Untitled",
      state: fields["System.State"] || "New",
      points: parseFloat(fields["Custom.Points"] || 0),
      person: mapAzureUserToShortName(assignedTo),
      project: project,
      sprint: targetSprintIndex + 1,
      type: "Task" // Or derive from Work Item Type
    };

    const docRef = doc(db, "tasks", `task_${taskObj.id}`);
    batchWrite.set(docRef, taskObj, { merge: true });
    syncCount++;
    
    if (syncCount % 400 === 0) {
      await batchWrite.commit();
      batchWrite = writeBatch(db);
    }
  }

  if (syncCount % 400 !== 0) {
    await batchWrite.commit();
  }
  console.log(`Successfully synced ${syncCount} tasks into Firestore.`);

  // Recalculate stats for the synced sprint
  console.log("Recalculating Sprint Stats...");
  const userStats = {};
  const projStats = {};
  const uniqueProjects = new Set();
  
  for (const item of batchData.value) {
    const fields = item.fields;
    const person = mapAzureUserToShortName(fields["System.AssignedTo"]);
    let project = fields["System.AreaPath"] || "General";
    if (project.startsWith(`${AZURE_PROJECT}\\`)) {
      project = project.substring(AZURE_PROJECT.length + 1);
    } else if (project === AZURE_PROJECT) {
      project = "General";
    }
    const pts = parseFloat(fields["Custom.Points"] || 0);
    
    uniqueProjects.add(project);

    if (!userStats[person]) userStats[person] = { points: 0, tasks: 0 };
    userStats[person].points += pts;
    userStats[person].tasks += 1;
    
    if (!projStats[project]) projStats[project] = 0;
    projStats[project] += pts;
  }
  
  let statsBatch = writeBatch(db);
  
  for (const [person, stats] of Object.entries(userStats)) {
    const docRef = doc(db, "sprintUserStats", `sprint_${targetSprintIndex + 1}_${person}`);
    statsBatch.set(docRef, {
      sprintIndex: targetSprintIndex,
      userId: person,
      points: stats.points,
      tasks: stats.tasks
    }, { merge: true });
  }
  
  for (const [project, pts] of Object.entries(projStats)) {
    const docRef = doc(db, "sprintProjectStats", `sprint_${targetSprintIndex + 1}_${project.replace(/\\/g, "_")}`);
    statsBatch.set(docRef, {
      sprintIndex: targetSprintIndex,
      projectId: project.replace(/\\/g, "_"),
      points: pts
    }, { merge: true });
  }
  
  await statsBatch.commit();
  console.log("Sprint stats successfully updated in Firestore!");

  // 4. Auto-register new projects to Firestore if they don't exist
  console.log("Checking for new projects...");
  const projectsSnap = await getDocs(collection(db, "projects"));
  const existingProjects = new Set();
  projectsSnap.forEach(d => existingProjects.add(d.data().id));

  let newProjectsAdded = 0;
  let projBatch = writeBatch(db);
  for (const proj of uniqueProjects) {
    const safeId = proj.replace(/\\/g, "_");
    if (!existingProjects.has(safeId)) {
      const docRef = doc(db, "projects", `proj_${safeId}`);
      projBatch.set(docRef, {
        id: safeId,
        name: proj,
        tags: ["auto-synced"]
      });
      newProjectsAdded++;
      console.log(`Registered new project: ${proj}`);
    }
  }

  if (newProjectsAdded > 0) {
    await projBatch.commit();
    console.log(`Successfully added ${newProjectsAdded} new projects to the database.`);
  } else {
    console.log("No new projects found.");
  }

  // 5. Save last sync timestamp to Firestore
  await setDoc(doc(db, "dashboardStats", "v1"), {
    lastSyncedAt: new Date().toISOString(),
    lastSyncedSprint: currentSprint,
    lastSyncedTasks: syncCount
  }, { merge: true });
  console.log("Last sync timestamp saved.");

  // 6. Notify external system via API (Webhook)
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    console.log(`Sending webhook notification to ${webhookUrl}...`);
    try {
      const payload = {
        status: "success",
        message: `Azure Sync complete for Sprint ${currentSprint}`,
        tasksSynced: syncCount,
        newProjectsAdded: newProjectsAdded,
        timestamp: new Date().toISOString()
      };
      
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!webhookRes.ok) {
        console.error(`Webhook failed: ${webhookRes.status} ${webhookRes.statusText}`);
      } else {
        console.log("Webhook notification sent successfully!");
      }
    } catch (e) {
      console.error("Failed to send webhook notification:", e.message);
    }
  }
}

runSync().then(() => {
  console.log("Sync complete!");
  process.exit(0);
}).catch(err => {
  console.error("Sync Error:", err);
  process.exit(1);
});
