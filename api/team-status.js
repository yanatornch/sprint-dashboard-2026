import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(request, response) {
  try {
    const snap = await getDocs(collection(db, "tasks"));
    const tasks = [];
    snap.forEach(doc => tasks.push(doc.data()));

    const teamStatus = {};
    
    tasks.forEach(t => {
      const person = t.person || "Unassigned";
      const state = t.state || "To Do";
      
      if (!teamStatus[person]) {
        teamStatus[person] = {
          "To Do": [],
          "Doing": [],
          "Review": [],
          "Blocked": [],
          "Done": []
        };
      }
      
      let mappedState = "To Do";
      const s = state.toLowerCase();
      if (s.includes("done") || s.includes("closed")) mappedState = "Done";
      else if (s.includes("doing") || s.includes("progress") || s === "active") mappedState = "Doing";
      else if (s.includes("review") || s.includes("test")) mappedState = "Review";
      else if (s.includes("block") || s.includes("hold")) mappedState = "Blocked";
      
      if (!teamStatus[person][mappedState]) teamStatus[person][mappedState] = [];
      
      teamStatus[person][mappedState].push({
        id: t.id,
        title: t.title,
        project: t.project,
        sprint: t.sprint,
        points: t.points,
        originalState: t.state
      });
    });

    response.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      data: teamStatus
    });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
}
