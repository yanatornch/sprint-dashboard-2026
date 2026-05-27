import 'dotenv/config';
import { db } from './firebase.js';
import { doc, setDoc, writeBatch, collection, getDocs } from 'firebase/firestore';

// Environment variables
const AZURE_ORG = process.env.AZURE_ORG || process.env.ADO_ORG || 'morestudio';
const AZURE_PROJECT = process.env.AZURE_PROJECT || process.env.ADO_PROJECT || 'M';
const AZURE_PAT = process.env.AZURE_PAT || process.env.ADO_PAT;

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
  console.log(`Starting Azure Sync for Org: ${AZURE_ORG}, Project: ${AZURE_PROJECT}`);
  
  // 1. Execute WIQL Query to get current sprint tasks
  // Using @currentIteration allows Azure to automatically find the current active sprint!
  const wiqlQuery = {
    query: `
      SELECT [System.Id] 
      FROM workitems 
      WHERE [System.TeamProject] = '${AZURE_PROJECT}' 
        AND [System.WorkItemType] IN ('Task', 'Bug')
        AND [System.IterationPath] = @currentIteration('[${AZURE_PROJECT}]\\<id-of-team>')
    `
  };
  
  // Note: @currentIteration requires the team context. A safer fallback if you know the exact sprint path is:
  // AND [System.IterationPath] UNDER '${AZURE_PROJECT}\\Sprint 11'
  const fallbackWiql = {
    query: `
      SELECT [System.Id] 
      FROM workitems 
      WHERE [System.TeamProject] = '${AZURE_PROJECT}' 
        AND [System.WorkItemType] IN ('Task', 'Bug')
        AND [System.IterationPath] UNDER '${AZURE_PROJECT}\\2026\\11'
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

  // 2. Fetch full details for the Work Items
  const batchUrl = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/workitemsbatch?api-version=7.1`;
  const batchRes = await fetch(batchUrl, {
    method: 'POST',
    headers: azureHeaders,
    body: JSON.stringify({
      ids: workItemIds,
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

  // 3. Process into our Firebase schema
  let batchWrite = writeBatch(db);
  let syncCount = 0;
  
  // We assume the query is returning tasks for a specific sprint.
  // We extract the sprint index from the iteration path, or hardcode it for now.
  let targetSprintIndex = 10; // Default to Sprint 11 (0-indexed)

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

  // 5. Notify external system via API (Webhook)
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    console.log(`Sending webhook notification to ${webhookUrl}...`);
    try {
      const payload = {
        status: "success",
        message: `Azure Sync complete for Sprint ${targetSprintIndex + 1}`,
        tasksSynced: syncCount,
        newProjectsAdded: newProjectsAdded,
        timestamp: new Date().toISOString()
      };
      
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you need auth headers, you can map them from env vars here:
          // 'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
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
