import { DATA } from "./data.js";

const calculatedPoints = {};
const calculatedTasks = {};

DATA.sprints.forEach((_, sprintIdx) => {
  const sprintNum = sprintIdx + 1;
  DATA.movement.forEach(t => {
    if (t.sprint === sprintNum) {
      if (!calculatedPoints[t.person]) calculatedPoints[t.person] = new Array(DATA.sprints.length).fill(0);
      if (!calculatedTasks[t.person]) calculatedTasks[t.person] = new Array(DATA.sprints.length).fill(0);
      
      calculatedPoints[t.person][sprintIdx] += (t.points || 0);
      calculatedTasks[t.person][sprintIdx] += 1;
    }
  });
});

let diffCount = 0;
for (const person in DATA.points) {
  for (let i=0; i<DATA.sprints.length; i++) {
    const origPt = DATA.points[person][i];
    const calcPt = calculatedPoints[person]?.[i] || 0;
    if (Math.abs(origPt - calcPt) > 0.1) {
      console.log(`Diff for ${person} sprint ${i+1}: Orig=${origPt}, Calc=${calcPt}`);
      diffCount++;
    }
  }
}

console.log(`Found ${diffCount} differences in points.`);
process.exit(0);
