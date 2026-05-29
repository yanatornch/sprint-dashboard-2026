import 'dotenv/config';
import { db } from './firebase.js';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

async function check() {
  const q = query(collection(db, "tasks"), where("sprint", "==", 11));
  const snap = await getDocs(q);
  
  const projects = {};
  snap.forEach(d => {
    const t = d.data();
    if (!projects[t.project]) projects[t.project] = { tasks: 0, points: 0 };
    projects[t.project].tasks++;
    projects[t.project].points += t.points || 0;
  });
  
  console.log("Projects in Sprint 11:");
  for (const [proj, stats] of Object.entries(projects)) {
    console.log(`- ${proj}: ${stats.tasks} tasks, ${stats.points} points`);
  }
  process.exit(0);
}

check();
