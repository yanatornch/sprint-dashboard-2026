import { db } from "./firebase.js";
import { doc, setDoc, writeBatch } from "firebase/firestore";
import { DATA } from "./data.js";

// Hardcoded roles mapping from main.js
const ROLES = {
  "Waew": "BA",
  "Unn": "BA",
  "Ploy": "Designer",
  "Gib": "Designer",
  "Nust": "Dev",
  "Ohm": "Dev",
  "Ping": "Dev",
  "Tae": "Dev",
  "Tum": "Dev",
  "Karn": "Dev",
  "Dream": "Dev",
  "Torfah": "Dev",
  "Praew": "Tester",
  "Nine": "Tester",
  "No": "CEO",
  "P": "PC",
  "MeApp": "Project" // Wait, 'MeApp' is not a user
};
// Re-build exact roles from original
const ROLES_EXT = {
  "Ohm": "Dev", "Nust": "Dev", "Waew": "BA", "Ploy": "Designer",
  "Gib": "Designer", "Unn": "BA", "Nine": "Tester", "Ping": "Dev",
  "Praew": "Tester", "P": "PC", "No": "CEO", "Tae": "Dev",
  "Tum": "Dev", "Karn": "Dev", "Dream": "Dev", "Torfah": "Dev"
};

async function run() {
  console.log("Starting normalization...");
  
  // 1. Sprints
  const sprints = DATA.sprints.map((name, i) => ({
    id: `sprint_${i+1}`,
    name,
    index: i,
    startDate: "", // We can backfill this later if needed from SPRINT_DATES
    endDate: ""
  }));
  for (const s of sprints) {
    await setDoc(doc(db, "sprints", s.id), s);
  }
  console.log("Written sprints.");

  // 2. Users
  for (const [name, role] of Object.entries(ROLES_EXT)) {
    await setDoc(doc(db, "users", name), { id: name, name, role });
  }
  console.log("Written users.");

  // 3. Projects
  const projectNames = Object.keys(DATA.projectSprint);
  for (const p of projectNames) {
    await setDoc(doc(db, "projects", p.replace(/\//g, "_")), { id: p.replace(/\//g, "_"), name: p });
  }
  console.log("Written projects.");

  // 4. Tasks (Batched)
  let batch = writeBatch(db);
  let count = 0;
  for (const t of DATA.movement) {
    // Generate a unique ID if it doesn't exist, else use its ID
    const taskId = t.id ? `task_${t.id}` : `task_${Math.random().toString(36).substr(2, 9)}`;
    const docRef = doc(db, "tasks", taskId);
    batch.set(docRef, t);
    count++;
    if (count % 400 === 0) {
      await batch.commit();
      batch = writeBatch(db);
    }
  }
  if (count % 400 !== 0) await batch.commit();
  console.log("Written tasks.");

  // 5. Aggregates (Stats)
  batch = writeBatch(db);
  count = 0;
  
  // 5a. sprintUserStats
  for (const user of Object.keys(DATA.points)) {
    for (let i = 0; i < DATA.sprints.length; i++) {
      const pts = DATA.points[user][i] || 0;
      const tsk = DATA.tasks[user]?.[i] || 0;
      
      const statDoc = doc(db, "sprintUserStats", `sprint_${i+1}_${user}`);
      batch.set(statDoc, {
        sprintIndex: i,
        userId: user,
        points: pts,
        tasks: tsk
      });
      count++;
      if (count % 400 === 0) { await batch.commit(); batch = writeBatch(db); }
    }
  }

  // 5b. sprintProjectStats
  for (const proj of Object.keys(DATA.projectSprint)) {
    for (let i = 0; i < DATA.sprints.length; i++) {
      const pts = DATA.projectSprint[proj][i] || 0;
      
      const statDoc = doc(db, "sprintProjectStats", `sprint_${i+1}_${proj.replace(/\//g, "_")}`);
      batch.set(statDoc, {
        sprintIndex: i,
        projectId: proj.replace(/\//g, "_"),
        points: pts
      });
      count++;
      if (count % 400 === 0) { await batch.commit(); batch = writeBatch(db); }
    }
  }
  
  // Write the remaining bulk stats to a single 'dashboardStats/v1' document for the UI to reconstruct easily
  // like statusPersonCount, contribution, personProject
  if (count % 400 !== 0) await batch.commit();
  console.log("Written stats.");

  // Also write the complex nested aggregates into a single document so the UI reconstruction is trivial
  await setDoc(doc(db, "dashboardStats", "v1"), {
    personProject: DATA.personProject,
    contribution: DATA.contribution,
    statusPersonCount: DATA.statusPersonCount,
    statusPersonPts: DATA.statusPersonPts,
    statusProjectCount: DATA.statusProjectCount,
    statusProjectPts: DATA.statusProjectPts
  });

  console.log("All done!");
  process.exit(0);
}

run().catch(console.error);
