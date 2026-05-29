window.onerror = function(msg, url, lineNo, columnNo, error) {
  document.body.innerHTML += "<div style='color:red; background:#fff; position:absolute; z-index:9999; top:0; left:0; width:100%; padding:20px; font-family:sans-serif;'><h1>Global Error</h1><pre>" + msg + "<br/>" + (error ? error.stack : '') + "</pre></div>";
  return false;
};
import { db } from "./firebase.js";
import { collection, doc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

let DATA = {};
try {
  console.log("Fetching from normalized collections...");
  const [
    usersSnap, sprintsSnap, projectsSnap, tasksSnap,
    userStatsSnap, projStatsSnap, dashboardStatsSnap, leavesSnap
  ] = await Promise.all([
    getDocs(collection(db, "users")),
    getDocs(collection(db, "sprints")),
    getDocs(collection(db, "projects")),
    getDocs(collection(db, "tasks")),
    getDocs(collection(db, "sprintUserStats")),
    getDocs(collection(db, "sprintProjectStats")),
    getDoc(doc(db, "dashboardStats", "v1")),
    getDocs(collection(db, "leaves"))
  ]);

  const sprintDocs = [];
  sprintsSnap.forEach(d => sprintDocs.push(d.data()));
  sprintDocs.sort((a,b) => a.index - b.index);
  DATA.sprints = sprintDocs.map(s => s.name);

  DATA.movement = [];
  tasksSnap.forEach(d => DATA.movement.push(d.data()));

  const projMap = {};
  projectsSnap.forEach(d => projMap[d.data().id] = d.data().name);

  DATA.points = {};
  DATA.tasks = {};
  const users = [];
  usersSnap.forEach(d => users.push(d.data().id));
  users.forEach(u => {
    DATA.points[u] = new Array(DATA.sprints.length).fill(0);
    DATA.tasks[u] = new Array(DATA.sprints.length).fill(0);
  });

  userStatsSnap.forEach(d => {
    const s = d.data();
    if (!DATA.points[s.userId]) DATA.points[s.userId] = new Array(DATA.sprints.length).fill(0);
    if (!DATA.tasks[s.userId]) DATA.tasks[s.userId] = new Array(DATA.sprints.length).fill(0);
    DATA.points[s.userId][s.sprintIndex] = s.points;
    DATA.tasks[s.userId][s.sprintIndex] = s.tasks;
  });

  DATA.projectSprint = {};
  Object.values(projMap).forEach(name => {
    DATA.projectSprint[name] = new Array(DATA.sprints.length).fill(0);
  });
  projStatsSnap.forEach(d => {
    const s = d.data();
    const origName = projMap[s.projectId] || s.projectId;
    if (!DATA.projectSprint[origName]) DATA.projectSprint[origName] = new Array(DATA.sprints.length).fill(0);
    DATA.projectSprint[origName][s.sprintIndex] = s.points;
  });

  const dashData = dashboardStatsSnap.data() || {};
  if (dashData.lastSyncedAt) {
    const d = new Date(dashData.lastSyncedAt);
    const fmt = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("updated").textContent = `Data updated: ${fmt} ${time}`;
  }

  // Leaves: indexed by sprint, then by person
  DATA.leaves = {}; // { [sprint]: { [person]: [{type, startDate, endDate, days}] } }
  leavesSnap.forEach(d => {
    const l = d.data();
    const s = l.sprint;
    if (!s) return;
    if (!DATA.leaves[s]) DATA.leaves[s] = {};
    if (!DATA.leaves[s][l.person]) DATA.leaves[s][l.person] = [];
    DATA.leaves[s][l.person].push({ type: l.type, startDate: l.startDate, endDate: l.endDate, days: l.days || 1 });
  });

  // Dynamically compute legacy aggregates from movement
  DATA.contribution = {};
  DATA.personProject = {};
  DATA.projectPerson = {};
  DATA.statusPersonCount = { "To Do": {}, "Doing": {}, "Done": {}, "Holding": {}, "Canceled": {} };
  DATA.statusPersonPts = { "To Do": {}, "Doing": {}, "Done": {}, "Holding": {}, "Canceled": {} };
  DATA.statusProjectPts = { "To Do": {}, "Doing": {}, "Done": {}, "Holding": {}, "Canceled": {} };
  DATA.statusProjectCount = { "To Do": {}, "Doing": {}, "Done": {}, "Holding": {}, "Canceled": {} };
  
  DATA.movement.forEach(t => {
    const person = t.person;
    const project = t.project;
    const sprintIdx = (t.sprint || 1) - 1;
    const pts = parseFloat(t.points) || 0;
    
    let state = "To Do";
    const st = (t.state || "").toLowerCase();
    if (st.includes("done") || st === "closed") state = "Done";
    else if (st.includes("doing") || st === "active" || st.includes("progress")) state = "Doing";
    else if (st.includes("hold")) state = "Holding";
    else if (st.includes("cancel") || st.includes("remove")) state = "Canceled";
    
    if (!DATA.contribution[person]) DATA.contribution[person] = {};
    if (!DATA.contribution[person][project]) DATA.contribution[person][project] = new Array(DATA.sprints.length).fill(0);
    DATA.contribution[person][project][sprintIdx] += pts;
    
    if (!DATA.personProject[person]) DATA.personProject[person] = {};
    DATA.personProject[person][project] = (DATA.personProject[person][project] || 0) + pts;
    
    if (!DATA.projectPerson[project]) DATA.projectPerson[project] = {};
    DATA.projectPerson[project][person] = (DATA.projectPerson[project][person] || 0) + pts;
    
    if (!DATA.statusPersonCount[state][person]) DATA.statusPersonCount[state][person] = 0;
    DATA.statusPersonCount[state][person]++;
    
    if (!DATA.statusPersonPts[state][person]) DATA.statusPersonPts[state][person] = 0;
    DATA.statusPersonPts[state][person] += pts;
    
    if (!DATA.statusProjectPts[state][project]) DATA.statusProjectPts[state][project] = 0;
    DATA.statusProjectPts[state][project] += pts;
    
    if (!DATA.statusProjectCount[state][project]) DATA.statusProjectCount[state][project] = 0;
    DATA.statusProjectCount[state][project]++;
  });

  console.log("Firebase data loaded and computed dynamically:", DATA);
} catch (e) {
  document.body.innerHTML = "<div style='color:red; padding:20px'><h1>Firebase Error</h1><pre>" + e.stack + "</pre></div>";
  throw e;
}
// ============================================================================
//  DATA
// ============================================================================

const VIEW_LABEL = { points: "Story Points", tasks: "Tasks" };

// ---- Company holidays (hardcoded for 2026) ----
const COMPANY_HOLIDAYS = [
  { name: "New Year",         dates: ["2026-01-01","2026-01-02"], sprint: 1  },
  { name: "Makha Bucha",      dates: ["2026-03-03"],              sprint: 4  },
  { name: "Songkran",         dates: ["2026-04-13","2026-04-14","2026-04-15"], sprint: 8 },
  { name: "Labour Day",       dates: ["2026-05-01"],              sprint: 9  },
  { name: "Coronation Day",   dates: ["2026-05-04"],              sprint: 9  },
  { name: "Visakha Bucha",    dates: ["2026-06-01"],              sprint: 11 },
  { name: "Asanha Bucha",     dates: ["2026-06-03"],              sprint: 11 },
  { name: "Asanha Bucha+1",   dates: ["2026-07-28","2026-07-29"], sprint: 12 },
  { name: "Queen's Birthday", dates: ["2026-08-12"],              sprint: 12 },
  { name: "King Memorial",    dates: ["2026-10-13"],              sprint: null },
  { name: "New Year's Eve",   dates: ["2026-12-31"],              sprint: null },
];

// ---- Sprint calendar (2-week sprints) — used to pick "current sprint" by date ----
const SPRINT_DATES = [
  { s: "2026-01-05", e: "2026-01-18" },  // Sprint 1
  { s: "2026-01-19", e: "2026-02-01" },  // Sprint 2
  { s: "2026-02-02", e: "2026-02-15" },  // Sprint 3
  { s: "2026-02-16", e: "2026-03-01" },  // Sprint 4
  { s: "2026-03-02", e: "2026-03-15" },  // Sprint 5
  { s: "2026-03-16", e: "2026-03-29" },  // Sprint 6
  { s: "2026-03-30", e: "2026-04-12" },  // Sprint 7
  { s: "2026-04-13", e: "2026-04-26" },  // Sprint 8
  { s: "2026-04-27", e: "2026-05-10" },  // Sprint 9
  { s: "2026-05-11", e: "2026-05-24" },  // Sprint 10
  { s: "2026-05-25", e: "2026-06-07" },  // Sprint 11
  { s: "2026-06-08", e: "2026-06-21" }   // Sprint 12
];
// Reference date = data snapshot date (so results don't drift with real-world clock)
const SNAPSHOT_DATE = "2026-05-25";
function currentSprintIdxByDate(dateStr){
  const d = dateStr || SNAPSHOT_DATE;
  for (let i = 0; i < SPRINT_DATES.length; i++) {
    if (d >= SPRINT_DATES[i].s && d <= SPRINT_DATES[i].e) return i;
  }
  // before first sprint or after last
  if (d < SPRINT_DATES[0].s) return 0;
  return SPRINT_DATES.length - 1;
}
const CURRENT_SPRINT_IDX = Math.min(currentSprintIdxByDate(), DATA.sprints.length - 1);

// ---- Any-task-assigned index (ALL states, for staleness checks) ----
// ANY_TASKS[name][sprintIdx] = count of tasks assigned to name in that sprint, regardless of state
const ANY_TASKS = (() => {
  const out = {};
  Object.keys(DATA.points).forEach(n => { out[n] = new Array(DATA.sprints.length).fill(0); });
  (DATA.movement || []).forEach(r => {
    const idx = (r.sprint|0) - 1;
    if (out[r.person] && idx >= 0 && idx < DATA.sprints.length) out[r.person][idx] += 1;
  });
  return out;
})();
function hasAnyTask(name, sprintIdx){ return (ANY_TASKS[name]?.[sprintIdx] || 0) > 0; }

// ---- Roles ----
const ROLES = {
  "Waew":"BA", "Torfah":"BA", "Tae":"BA",
  "Ploy":"Designer", "Gib":"Designer", "Nine":"Designer",
  "Ping":"Tester",
  "Dream":"PC",
  "Karn":"CEO",
  "Ohm":"Dev", "Nust":"Dev", "Unn":"Dev", "Praew":"Dev", "P":"Dev", "No":"Dev", "Tum":"Dev"
};
const ROLE_ORDER = ["Dev","Designer","BA","Tester","PC","CEO"];
const ROLE_COLORS = {
  "Dev":"#6366f1", "Designer":"#ec4899", "BA":"#a855f7",
  "Tester":"#06b6d4", "PC":"#f59e0b", "CEO":"#10b981"
};
function roleOf(name){ return ROLES[name] || "—"; }
function peopleInRole(role){
  if (!role || role === "all") return Object.keys(DATA.points);
  return Object.keys(DATA.points).filter(n => roleOf(n) === role);
}
function roleBadge(name){
  const r = roleOf(name);
  if (r === "—") return "";
  const c = ROLE_COLORS[r] || "#94a3b8";
  return `<span style="display:inline-block; padding:1px 7px; border-radius:999px; font-size:10px; font-weight:600; background:${c}22; color:${c}; border:1px solid ${c}55; margin-left:6px; vertical-align:middle;">${r}</span>`;
}
const PALETTE = [
  "#6366f1","#22d3ee","#f97316","#10b981","#f43f5e",
  "#eab308","#a855f7","#14b8a6","#3b82f6","#ec4899",
  "#84cc16","#06b6d4","#f59e0b","#8b5cf6","#ef4444","#64748b"
];
const PROJ_PALETTE = [
  "#6366f1","#22d3ee","#f97316","#10b981","#f43f5e","#eab308","#a855f7","#14b8a6",
  "#3b82f6","#ec4899","#84cc16","#06b6d4","#f59e0b","#8b5cf6","#ef4444","#64748b",
  "#c084fc","#fb923c","#4ade80","#60a5fa","#f472b6","#fbbf24","#34d399","#93c5fd",
  "#fda4af","#a3e635","#67e8f9","#d8b4fe","#fdba74","#86efac","#c4b5fd","#fca5a5","#fde047","#d1d5db"
];

// ============================================================================
//  THEME (dark / light)
// ============================================================================
const THEME = { grid: "#334155", tick: "#cbd5e1" };
function readThemeFromCSS(){
  const cs = getComputedStyle(document.documentElement);
  const g = cs.getPropertyValue("--grid").trim();
  const t = cs.getPropertyValue("--tick").trim();
  if (g) THEME.grid = g;
  if (t) THEME.tick = t;
}
function applyTheme(mode){
  const root = document.documentElement;
  if (mode === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  readThemeFromCSS();
  Chart.defaults.color = THEME.tick;
  const btn = document.getElementById("themeToggle");
  if (btn) {
    document.getElementById("themeIcon").textContent = mode === "light" ? "☀️" : "🌙";
    document.getElementById("themeLabel").textContent = mode === "light" ? "Light" : "Dark";
  }
  try { localStorage.setItem("theme", mode); } catch(e){}
  if (typeof refresh === "function") refresh();
}
(function initTheme(){
  let saved = "dark";
  try { saved = localStorage.getItem("theme") || "dark"; } catch(e){}
  if (saved === "light") document.documentElement.setAttribute("data-theme","light");
  readThemeFromCSS();
})();

// ============================================================================
//  STATE & CHARTS
// ============================================================================
// Chart.js global font sizing responsive to viewport width
(function tuneChartDefaults(){
  const w = window.innerWidth;
  Chart.defaults.font.size = w <= 420 ? 9 : w <= 600 ? 10 : w <= 900 ? 11 : 12;
  Chart.defaults.color = THEME.tick;
})();
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const newSize = w <= 420 ? 9 : w <= 600 ? 10 : w <= 900 ? 11 : 12;
  if (Chart.defaults.font.size !== newSize) {
    Chart.defaults.font.size = newSize;
    if (typeof refresh === "function") refresh();
  }
});

// Chart.js plugin — render stacked totals above each bar (respects legend hide).
// Opt-in per chart via options.plugins.stackTotals = { enabled: true }
const stackTotalsPlugin = {
  id: "stackTotals",
  afterDatasetsDraw(chart, _args, opts) {
    if (!opts || !opts.enabled) return;
    const xScale = chart.scales.x, yScale = chart.scales.y;
    if (!xScale || !yScale) return;
    const isHorizontal = chart.options.indexAxis === "y";
    const labelCount = chart.data.labels.length;
    const totals = new Array(labelCount).fill(0);
    chart.data.datasets.forEach((ds, i) => {
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) return;
      const dsType = ds.type || meta.type || chart.config.type;
      if (dsType !== "bar") return;
      ds.data.forEach((v, idx) => { totals[idx] += (+v || 0); });
    });
    const ctx = chart.ctx;
    ctx.save();
    ctx.fillStyle = opts.color || THEME.tick || "#e2e8f0";
    const fontSize = opts.fontSize || Math.max(10, (Chart.defaults.font.size || 11) - 1);
    ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const decimals = opts.decimals ?? 1;
    if (isHorizontal) {
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      totals.forEach((total, idx) => {
        if (!total) return;
        const y = yScale.getPixelForValue(idx);
        const x = xScale.getPixelForValue(total);
        ctx.fillText(total.toLocaleString(undefined, { maximumFractionDigits: decimals }), x + 6, y);
      });
    } else {
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      totals.forEach((total, idx) => {
        if (!total) return;
        const x = xScale.getPixelForValue(idx);
        const y = yScale.getPixelForValue(total);
        ctx.fillText(total.toLocaleString(undefined, { maximumFractionDigits: decimals }), x, y - 4);
      });
    }
    ctx.restore();
  }
};
Chart.register(stackTotalsPlugin);

let trendChart, topChart, capacityChart, avgTrendChart,
    personProjChart, projTrendChart, projTopChart, projDrillChart, statusChart,
    bugTrendChart,
    devTrendChart, designTrendChart, otherTrendChart;

let S = {
  section: "overview",
  view: "points",
  highlight: "All",
  range: "all",
  chartType: "bar",
  projRange: "all",
  projTopN: "25",
  projRole: "all",
  projDrill: "__all__",
  projDrillMetric: "points",
  projDrillStatus: "all",
  statusMetric: "points",
  statusView: "person",
  doneOnly: false,
  role: "all",
  topSprint: "all"
};

// ============================================================================
//  DONE-ONLY: ratio helpers (status[0] = Done bucket)
// ============================================================================
const DONE_RATIO = {
  personPts: {}, personCount: {},
  projPts: {}, projCount: {}
};

// Reformat the dynamically computed maps { "To Do": { Ohm: 5 }, "Done": { Ohm: 10 } }
// into the array format expected by the ratio calculation: [Done, Doing, To Do, Holding, Canceled]
function buildStatusArray(mapObj, key) {
  return [
    (mapObj["Done"] || {})[key] || 0,
    (mapObj["Doing"] || {})[key] || 0,
    (mapObj["To Do"] || {})[key] || 0,
    (mapObj["Holding"] || {})[key] || 0,
    (mapObj["Canceled"] || {})[key] || 0
  ];
}

Object.keys(DATA.points).forEach(n => {
  const a = buildStatusArray(DATA.statusPersonPts, n);
  const t = a.reduce((x,y)=>x+y,0);
  DONE_RATIO.personPts[n] = t ? a[0]/t : 0;
  
  const ac = buildStatusArray(DATA.statusPersonCount, n);
  const tc = ac.reduce((x,y)=>x+y,0);
  DONE_RATIO.personCount[n] = tc ? ac[0]/tc : 0;
});

Object.keys(DATA.projectSprint).forEach(n => {
  const a = buildStatusArray(DATA.statusProjectPts, n);
  const t = a.reduce((x,y)=>x+y,0);
  DONE_RATIO.projPts[n] = t ? a[0]/t : 0;
  
  const ac = buildStatusArray(DATA.statusProjectCount, n);
  const tc = ac.reduce((x,y)=>x+y,0);
  DONE_RATIO.projCount[n] = tc ? ac[0]/tc : 0;
});

function getPersonPoints(name) {
  const a = DATA.points[name] || [];
  if (!S.doneOnly) return a;
  const r = DONE_RATIO.personPts[name] || 0;
  return a.map(v => v * r);
}
function getPersonTasks(name) {
  const a = DATA.tasks[name] || [];
  if (!S.doneOnly) return a;
  const r = DONE_RATIO.personCount[name] || 0;
  return a.map(v => v * r);
}
function getProjectSprint(name) {
  const a = DATA.projectSprint[name] || [];
  if (!S.doneOnly) return a;
  const r = DONE_RATIO.projPts[name] || 0;
  return a.map(v => v * r);
}
// Role-filtered project-sprint array (used by Projects section only).
// When S.projRole === "all" or not set, falls back to full project totals.
function getProjectSprintFiltered(name) {
  const role = S.projRole;
  if (!role || role === "all") return getProjectSprint(name);
  const members = peopleInRole(role);
  const len = DATA.sprints.length;
  const out = new Array(len).fill(0);
  members.forEach(person => {
    const contrib = (DATA.contribution[person] || {})[name] || [];
    for (let i = 0; i < len; i++) out[i] += (+contrib[i] || 0);
  });
  return out;
}
function getContributionRow(person, project) {
  const a = (DATA.contribution[person] || {})[project] || [];
  if (!S.doneOnly) return a;
  // scale by the project's done rate (most accurate proxy at this granularity)
  const r = DONE_RATIO.projPts[project] || 0;
  return a.map(v => v * r);
}
function getPersonProjectVal(person, project) {
  const v = (DATA.personProject[person] || {})[project] || 0;
  if (!S.doneOnly) return v;
  return v * (DONE_RATIO.projPts[project] || 0);
}
// Per-sprint contribution for the People drill-down, respecting S.personMetric.
// Tasks contribution isn't stored directly; approximate per sprint by
// scaling the points contribution by the person's task/point ratio for that sprint.
function getContributionRowByMetric(person, project) {
  const row = getContributionRow(person, project);
  if (S.personMetric !== "tasks") return row;
  const pPts = getPersonPoints(person);
  const pTasks = getPersonTasks(person);
  return row.map((v, i) => {
    if (!v) return 0;
    const pts = pPts[i] || 0;
    if (!pts) return 0;
    return v * ((pTasks[i] || 0) / pts);
  });
}
function getPersonProjectValByMetric(person, project) {
  const v = getPersonProjectVal(person, project);
  if (S.personMetric !== "tasks") return v;
  const totalPts = sum(getPersonPoints(person));
  const totalTasks = sum(getPersonTasks(person));
  if (!totalPts) return 0;
  return v * (totalTasks / totalPts);
}

// ============================================================================
//  HELPERS
// ============================================================================
function sum(arr){ return arr.reduce((a,b)=>a+(+b||0),0); }
function rangeIdx(range){
  if (range === "all") return [0,1,2,3,4,5,6,7,8,9,10,11];
  const [s,e] = range.split("-").map(Number);
  return Array.from({length:e-s+1}, (_,i)=>s-1+i);
}
function sliceRange(arr, range){
  const idx = rangeIdx(range);
  return idx.map(i => arr[i] ?? 0);
}
function heatColor(v, max){
  if (!max || !v) return "transparent";
  const r = Math.min(1, v / max);
  const a = 0.08 + r * 0.72;
  return `rgba(99,102,241,${a.toFixed(2)})`;
}
function fmt(v){
  if (v === 0 || v == null) return "—";
  return Number.isInteger(v) ? v : (+v).toFixed(2);
}
function percent(v){ return (v*100).toFixed(1) + "%"; }
function colorFor(name, i, palette=PALETTE){ return palette[i % palette.length]; }

// ============================================================================
//  OVERVIEW
// ============================================================================
function updateKPIs(){
  const idx = rangeIdx(S.range);
  const person = S.highlight;
  const isFilter = person !== "All";
  const tag = '';

  if (isFilter) {
    const ptsArr = getPersonPoints(person);
    const tasksArr = getPersonTasks(person);
    const totalPoints = sum(idx.map(i => ptsArr[i]||0));
    const totalTasks = sum(idx.map(i => tasksArr[i]||0));
    const projObj = DATA.contribution[person] || {};
    const activeProjects = Object.entries(projObj).filter(([proj,a]) => {
      const row = S.doneOnly ? getContributionRow(person, proj) : a;
      return idx.some(i => row[i] > 0);
    }).length;
    const avgPerTask = totalTasks ? (totalPoints/totalTasks) : 0;
    const sp = DATA.statusPersonPts[person] || [0,0,0,0,0,0];
    const spTot = sum(sp);
    const doneRate = spTot ? sp[0]/spTot : 0;
    const teamPts = idx.reduce((acc,i) => acc + sum(Object.keys(DATA.points).map(n=>getPersonPoints(n)[i]||0)), 0);
    const share = teamPts ? totalPoints/teamPts : 0;

    document.getElementById("kpis").innerHTML = `
      <div class="kpi"><div class="label">${person} · Points${tag}</div><div class="value">${totalPoints.toLocaleString(undefined,{maximumFractionDigits:1})}</div><div class="hint">in selected range</div></div>
      <div class="kpi"><div class="label">${person} · Tasks${tag}</div><div class="value">${totalTasks.toLocaleString(undefined,{maximumFractionDigits:1})}</div><div class="hint">all item types</div></div>
      <div class="kpi"><div class="label">Projects Touched</div><div class="value">${activeProjects}</div><div class="hint">in range</div></div>
      <div class="kpi"><div class="label">Team Share</div><div class="value">${percent(share)}</div><div class="hint">of team points</div></div>
      <div class="kpi"><div class="label">Avg Pts / Task</div><div class="value">${avgPerTask.toFixed(2)}</div><div class="hint">${person}'s avg</div></div>
      <div class="kpi"><div class="label">% Done (pts)</div><div class="value">${percent(doneRate)}</div><div class="hint">${person} full-year</div></div>
    `;
    return;
  }

  const roleNames = peopleInRole(S.role);
  const roleSet = new Set(roleNames);
  const roleSuffix = S.role === "all" ? "" : ` · ${S.role}`;
  let totalPoints=0, totalTasks=0, activePeople=new Set();
  roleNames.forEach(n => {
    const arr = getPersonPoints(n);
    idx.forEach(i => { if (arr[i] > 0) { totalPoints += arr[i]; activePeople.add(n); } });
  });
  roleNames.forEach(n => {
    const arr = getPersonTasks(n);
    idx.forEach(i => totalTasks += arr[i]||0);
  });
  const activeProjects = Object.keys(DATA.projectSprint).filter(n => {
    const arr = getProjectSprint(n);
    return idx.some(i => arr[i] > 0);
  }).length;
  const avgPerTask = totalTasks ? (totalPoints/totalTasks) : 0;

  const totalDonePts = sum(roleNames.map(n => (DATA.statusPersonPts[n]||[])[0]||0));
  const totalAllPts = sum(roleNames.map(n => sum(DATA.statusPersonPts[n]||[])));
  const doneRate = totalAllPts ? (totalDonePts/totalAllPts) : 0;

  document.getElementById("kpis").innerHTML = `
    <div class="kpi"><div class="label">Total Points${roleSuffix}</div><div class="value">${totalPoints.toLocaleString(undefined,{maximumFractionDigits:1})}</div><div class="hint">selected range</div></div>
    <div class="kpi"><div class="label">Total Tasks${roleSuffix}</div><div class="value">${totalTasks.toLocaleString(undefined,{maximumFractionDigits:1})}</div><div class="hint">Done only</div></div>
    <div class="kpi"><div class="label">Active People</div><div class="value">${activePeople.size}</div><div class="hint">of ${roleNames.length}${roleSuffix?` ${S.role}`:''}</div></div>
    <div class="kpi"><div class="label">Active Projects</div><div class="value">${activeProjects}</div><div class="hint">of ${Object.keys(DATA.projectSprint).length}</div></div>
    <div class="kpi"><div class="label">Avg Pts / Task</div><div class="value">${avgPerTask.toFixed(2)}</div><div class="hint">${S.role==="all"?"team-wide":S.role}</div></div>
    <div class="kpi"><div class="label">% Done (pts)</div><div class="value">${percent(doneRate)}</div><div class="hint">full-year</div></div>
  `;
}

function renderLeaveStrip() {
  const el = document.getElementById("leaveStrip");
  if (!el) return;

  const LEAVE_ICON = { "vacation": "🏖", "sick": "🤒", "personal": "🏠", "other": "📅" };
  const idx = rangeIdx(S.range);
  const sprintNums = idx.map(i => i + 1);

  // Collect personal leave per sprint
  const personalBySprint = {};
  sprintNums.forEach(s => {
    const entries = DATA.leaves[s] || {};
    if (Object.keys(entries).length > 0) personalBySprint[s] = entries;
  });

  // Collect company holidays per sprint
  const holidayBySprint = {};
  COMPANY_HOLIDAYS.forEach(h => {
    if (h.sprint && sprintNums.includes(h.sprint)) {
      if (!holidayBySprint[h.sprint]) holidayBySprint[h.sprint] = [];
      holidayBySprint[h.sprint].push(h);
    }
  });

  const allSprints = [...new Set([...Object.keys(holidayBySprint), ...Object.keys(personalBySprint)])].map(Number).sort((a,b)=>a-b);

  if (allSprints.length === 0) {
    el.innerHTML = "";
    return;
  }

  let rows = "";
  allSprints.forEach(sprint => {
    let tags = "";

    // Company holidays — shown first with distinct style
    (holidayBySprint[sprint] || []).forEach(h => {
      const tip = h.dates.join(", ") + ` · ${h.dates.length}d`;
      tags += `<span class="leave-tag leave-company" title="${tip}">🏢 ${h.name} <span class="leave-type">${h.dates.length}d</span></span>`;
    });

    // Personal leave
    const sprintLeaves = personalBySprint[sprint] || {};
    Object.entries(sprintLeaves).forEach(([person, leaves]) => {
      leaves.forEach(l => {
        const icon = LEAVE_ICON[l.type?.toLowerCase()] || "📅";
        const tip = `${l.startDate}${l.endDate !== l.startDate ? " – " + l.endDate : ""} · ${l.days}d`;
        tags += `<span class="leave-tag" title="${tip}">${icon} ${person} <span class="leave-type">${l.type} ${l.days}d</span></span>`;
      });
    });

    rows += `<div class="leave-row"><span class="leave-sprint">Sprint ${sprint}</span>${tags}</div>`;
  });

  el.innerHTML = `<div class="leave-strip"><span class="leave-title">🗓 Leave & Holidays</span>${rows}</div>`;
}

function buildTrendChart(){
  const ctx = document.getElementById("trendChart");
  const idx = rangeIdx(S.range);
  const labels = idx.map(i => DATA.sprints[i]);
  const person = S.highlight;
  const isFilter = person !== "All";

  const tagSuffix = '';
  let datasets;
  if (isFilter) {
    const proj = DATA.contribution[person] || {};
    const projects = Object.keys(proj).sort((a,b)=>sum(getContributionRow(person,b))-sum(getContributionRow(person,a)));
    datasets = projects.map((p, i) => {
      const row = getContributionRow(person, p);
      const sliced = idx.map(j => row[j] ?? 0);
      const color = colorFor(p, i, PROJ_PALETTE);
      return {
        label: p, data: sliced,
        backgroundColor: S.chartType === "bar" ? color : color + "22",
        borderColor: color,
        borderWidth: 2,
        pointRadius: S.chartType === "line" ? 3 : 0,
        fill: false, stack: "a", tension: 0.25
      };
    });
    document.getElementById("trendTitleText").textContent = `Sprint Trend — ${person} by Project`;
    document.getElementById("trendTag").textContent = `${VIEW_LABEL[S.view]}${tagSuffix}`;
  } else {
    const getter = S.view === "points" ? getPersonPoints : getPersonTasks;
    const names = peopleInRole(S.role).slice();
    names.sort((a,b)=> sum(idx.map(i=>getter(b)[i]||0)) - sum(idx.map(i=>getter(a)[i]||0)));
    datasets = names.map((name, i) => {
      const arr = getter(name);
      const sliced = idx.map(j => arr[j] ?? 0);
      const color = colorFor(name, i);
      return {
        label: name, data: sliced,
        backgroundColor: S.chartType === "bar" ? color : color + "22",
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: S.chartType === "line" ? 2 : 0,
        fill: false, stack: "a"
      };
    });
    const roleSuffix = S.role === "all" ? "" : ` · ${S.role}`;
    document.getElementById("trendTitleText").textContent = `Sprint Trend by Person`;
    document.getElementById("trendTag").textContent = `${VIEW_LABEL[S.view]}${roleSuffix}`;
  }

  // Build leave lookup: sprintLabel -> { holidays: [], personal: {} }
  const leaveLookup = {};
  labels.forEach((label, li) => {
    const sprint = idx[li] + 1;
    const holidays = COMPANY_HOLIDAYS.filter(h => h.sprint === sprint);
    const personal = DATA.leaves[sprint] || {};
    leaveLookup[label] = { holidays, personal };
  });

  // Plugin: draw rounded pill below every sprint bar
  const PILL_H = 20;
  const PILL_OFFSET = 38;
  const LEAVE_TOOLTIP_EL = (() => {
    let el = document.getElementById("leaveTooltip");
    if (!el) {
      el = document.createElement("div");
      el.id = "leaveTooltip";
      el.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none; display:none;
        background:#1e293b; border:1px solid #334155; border-radius:12px;
        padding:12px 16px; max-width:320px; box-shadow:0 8px 32px rgba(0,0,0,0.5);
        font-size:13px; color:#e2e8f0; line-height:1.6;
      `;
      document.body.appendChild(el);
    }
    return el;
  })();

  const leaveIndicatorPlugin = {
    id: "leaveIndicator",
    afterDraw(chart) {
      if (S.chartType !== "bar") return;
      const { ctx: c, scales: { x, y } } = chart;
      const step = x.getPixelForValue(1) - x.getPixelForValue(0);
      const pillW = Math.max(step * 0.72, 20);
      const pillY = y.bottom + PILL_OFFSET;

      labels.forEach((label, li) => {
        const info = leaveLookup[label] || {};
        const hasHoliday = (info.holidays||[]).length > 0;
        const hasPersonal = Object.keys(info.personal||{}).length > 0;
        const cx = x.getPixelForValue(li);
        const x0 = cx - pillW / 2;

        c.beginPath();
        c.roundRect(x0, pillY, pillW, PILL_H, PILL_H / 2);

        if (hasHoliday && hasPersonal) {
          // Split pill: left orange, right purple
          const grad = c.createLinearGradient(x0, 0, x0 + pillW, 0);
          grad.addColorStop(0, "rgba(251,146,60,0.9)");
          grad.addColorStop(0.5, "rgba(251,146,60,0.9)");
          grad.addColorStop(0.5, "rgba(99,102,241,0.9)");
          grad.addColorStop(1, "rgba(99,102,241,0.9)");
          c.fillStyle = grad;
        } else if (hasHoliday) {
          c.fillStyle = "rgba(251,146,60,0.85)";
        } else if (hasPersonal) {
          c.fillStyle = "rgba(99,102,241,0.75)";
        } else {
          c.fillStyle = "rgba(255,255,255,0.06)";
        }
        c.fill();
      });
    },

    afterEvent(chart, args) {
      if (S.chartType !== "bar") return;
      const e = args.event;
      const { scales: { x, y }, canvas } = chart;
      const step = x.getPixelForValue(1) - x.getPixelForValue(0);
      const pillW = Math.max(step * 0.72, 20);
      const pillY = y.bottom + PILL_OFFSET;
      const rect = canvas.getBoundingClientRect();

      if (e.type === "mousemove") {
        const mx = e.native.clientX - rect.left;
        const my = e.native.clientY - rect.top;
        let found = false;

        labels.forEach((label, li) => {
          const cx = x.getPixelForValue(li);
          const x0 = cx - pillW / 2;
          if (mx >= x0 && mx <= x0 + pillW && my >= pillY && my <= pillY + PILL_H) {
            const info = leaveLookup[label] || {};
            const holidays = info.holidays || [];
            const personal = info.personal || {};
            const totalDays = holidays.reduce((a,h)=>a+h.dates.length,0)
              + Object.values(personal).flat().reduce((a,l)=>a+(l.days||1),0);
            const capacity = totalDays > 0 ? Math.round((totalDays / 10) * 100) : 0;

            let html = `<div style="font-weight:700;font-size:14px;margin-bottom:8px">🗓 ${label}</div>`;

            if (holidays.length) {
              html += `<div style="color:#fb923c;font-weight:600;margin-bottom:4px">🏢 Company Holidays</div>`;
              holidays.forEach(h => {
                html += h.dates.map(d => `<div style="color:#94a3b8">📅 ${d} — ${h.name}</div>`).join("");
              });
            }

            const personalEntries = Object.entries(personal);
            if (personalEntries.length) {
              html += `<div style="color:#818cf8;font-weight:600;margin-top:8px;margin-bottom:4px">👤 Personal Leave</div>`;
              personalEntries.forEach(([person, leaves]) => {
                leaves.forEach(l => {
                  const dateStr = l.startDate === l.endDate ? l.startDate : `${l.startDate} – ${l.endDate}`;
                  html += `<div style="color:#94a3b8">${l.type === "vacation" ? "🏖" : l.type === "sick" ? "🤒" : "📅"} ${person} · ${l.type} ${l.days}d <span style="color:#64748b">(${dateStr})</span></div>`;
                });
              });
            }

            if (totalDays > 0) {
              html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #334155;color:#94a3b8">Capacity impacted: ~${capacity}%</div>`;
            }

            if (!holidays.length && !personalEntries.length) {
              html += `<div style="color:#64748b">No leave or holidays this sprint</div>`;
            }

            LEAVE_TOOLTIP_EL.innerHTML = html;
            LEAVE_TOOLTIP_EL.style.display = "block";
            const tx = e.native.clientX + 16;
            const ty = e.native.clientY - 10;
            LEAVE_TOOLTIP_EL.style.left = Math.min(tx, window.innerWidth - 340) + "px";
            LEAVE_TOOLTIP_EL.style.top = ty + "px";
            found = true;
          }
        });

        if (!found) LEAVE_TOOLTIP_EL.style.display = "none";
      } else if (e.type === "mouseout") {
        LEAVE_TOOLTIP_EL.style.display = "none";
      }
    }
  };

  if (trendChart) trendChart.destroy();
  trendChart = new Chart(ctx, {
    type: S.chartType,
    data: { labels, datasets },
    plugins: [leaveIndicatorPlugin],
    options: {
      responsive:true, maintainAspectRatio:false,
      layout: { padding: { bottom: S.chartType === "bar" ? 68 : 0 } },
      interaction: S.chartType === "bar"
        ? { mode:"index", intersect:false }
        : { mode:"index", intersect:false },
      scales: {
        x: { stacked: S.chartType==="bar", grid:{color:THEME.grid}, ticks:{color:THEME.tick} },
        y: { stacked: S.chartType==="bar", beginAtZero:true, grid:{color:THEME.grid}, ticks:{color:THEME.tick} }
      },
      plugins: {
        legend: { position:"bottom", labels:{color:THEME.tick, boxWidth:10, font:{size:11}} },
        stackTotals: { enabled: S.chartType === "bar" },
        tooltip: S.chartType === "bar" ? {
          callbacks: {
            title: its => its.length ? its[0].label : '',
            label: it => `${it.dataset.label}: ${(it.parsed.y||0).toLocaleString(undefined,{maximumFractionDigits:2})} ${VIEW_LABEL[S.view]}`,
          }
        } : {
          callbacks: { footer: its => "Total: " + its.reduce((a,b)=>a+(b.parsed.y||0),0).toLocaleString(undefined,{maximumFractionDigits:2}) }
        }
      }
    }
  });
}

// ============================================================================
//  ROLE CHARTS — helper functions
// ============================================================================

// Returns up-to-2-letter initials from a name (e.g. "Ohm" → "OH", "No" → "NO")
function getInitials(name) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Build the leave indicator plugin object (reusable factory)
function buildLeavePlugin(labels, idx, leaveLookup, chartTypeRef) {
  const PILL_H = 20;
  const PILL_OFFSET = 38;
  const LEAVE_TOOLTIP_EL = (() => {
    let el = document.getElementById("leaveTooltip");
    if (!el) {
      el = document.createElement("div");
      el.id = "leaveTooltip";
      el.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none; display:none;
        background:#1e293b; border:1px solid #334155; border-radius:12px;
        padding:12px 16px; max-width:320px; box-shadow:0 8px 32px rgba(0,0,0,0.5);
        font-size:13px; color:#e2e8f0; line-height:1.6;
      `;
      document.body.appendChild(el);
    }
    return el;
  })();

  return {
    id: "leaveIndicator_" + Math.random().toString(36).slice(2),
    afterDraw(chart) {
      if (chartTypeRef() !== "bar") return;
      const { ctx: c, scales: { x, y } } = chart;
      const step = x.getPixelForValue(1) - x.getPixelForValue(0);
      const pillW = Math.max(step * 0.72, 20);
      const pillY = y.bottom + PILL_OFFSET;

      labels.forEach((label, li) => {
        const info = leaveLookup[label] || {};
        const hasHoliday = (info.holidays || []).length > 0;
        const hasPersonal = Object.keys(info.personal || {}).length > 0;
        const cx = x.getPixelForValue(li);
        const x0 = cx - pillW / 2;

        c.beginPath();
        c.roundRect(x0, pillY, pillW, PILL_H, PILL_H / 2);

        if (hasHoliday && hasPersonal) {
          const grad = c.createLinearGradient(x0, 0, x0 + pillW, 0);
          grad.addColorStop(0, "rgba(251,146,60,0.9)");
          grad.addColorStop(0.5, "rgba(251,146,60,0.9)");
          grad.addColorStop(0.5, "rgba(99,102,241,0.9)");
          grad.addColorStop(1, "rgba(99,102,241,0.9)");
          c.fillStyle = grad;
        } else if (hasHoliday) {
          c.fillStyle = "rgba(251,146,60,0.85)";
        } else if (hasPersonal) {
          c.fillStyle = "rgba(99,102,241,0.75)";
        } else {
          c.fillStyle = "rgba(255,255,255,0.06)";
        }
        c.fill();
      });
    },

    afterEvent(chart, args) {
      if (chartTypeRef() !== "bar") return;
      const e = args.event;
      const { scales: { x, y }, canvas } = chart;
      const step = x.getPixelForValue(1) - x.getPixelForValue(0);
      const pillW = Math.max(step * 0.72, 20);
      const pillY = y.bottom + PILL_OFFSET;
      const rect = canvas.getBoundingClientRect();

      if (e.type === "mousemove") {
        const mx = e.native.clientX - rect.left;
        const my = e.native.clientY - rect.top;
        let found = false;

        labels.forEach((label, li) => {
          const cx = x.getPixelForValue(li);
          const x0 = cx - pillW / 2;
          if (mx >= x0 && mx <= x0 + pillW && my >= pillY && my <= pillY + PILL_H) {
            const info = leaveLookup[label] || {};
            const holidays = info.holidays || [];
            const personal = info.personal || {};
            const totalDays = holidays.reduce((a, h) => a + h.dates.length, 0)
              + Object.values(personal).flat().reduce((a, l) => a + (l.days || 1), 0);
            const capacity = totalDays > 0 ? Math.round((totalDays / 10) * 100) : 0;

            let html = `<div style="font-weight:700;font-size:14px;margin-bottom:8px">🗓 ${label}</div>`;
            if (holidays.length) {
              html += `<div style="color:#fb923c;font-weight:600;margin-bottom:4px">🏢 Company Holidays</div>`;
              holidays.forEach(h => {
                html += h.dates.map(d => `<div style="color:#94a3b8">📅 ${d} — ${h.name}</div>`).join("");
              });
            }
            const personalEntries = Object.entries(personal);
            if (personalEntries.length) {
              html += `<div style="color:#818cf8;font-weight:600;margin-top:8px;margin-bottom:4px">👤 Personal Leave</div>`;
              personalEntries.forEach(([person, leaves]) => {
                leaves.forEach(l => {
                  const dateStr = l.startDate === l.endDate ? l.startDate : `${l.startDate} – ${l.endDate}`;
                  html += `<div style="color:#94a3b8">${l.type === "vacation" ? "🏖" : l.type === "sick" ? "🤒" : "📅"} ${person} · ${l.type} ${l.days}d <span style="color:#64748b">(${dateStr})</span></div>`;
                });
              });
            }
            if (totalDays > 0) {
              html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #334155;color:#94a3b8">Capacity impacted: ~${capacity}%</div>`;
            }
            if (!holidays.length && !personalEntries.length) {
              html += `<div style="color:#64748b">No leave or holidays this sprint</div>`;
            }

            LEAVE_TOOLTIP_EL.innerHTML = html;
            LEAVE_TOOLTIP_EL.style.display = "block";
            const tx = e.native.clientX + 16;
            const ty = e.native.clientY - 10;
            LEAVE_TOOLTIP_EL.style.left = Math.min(tx, window.innerWidth - 340) + "px";
            LEAVE_TOOLTIP_EL.style.top = ty + "px";
            found = true;
          }
        });

        if (!found) LEAVE_TOOLTIP_EL.style.display = "none";
      } else if (e.type === "mouseout") {
        LEAVE_TOOLTIP_EL.style.display = "none";
      }
    }
  };
}

// Build a rich HTML bar-hover tooltip for role charts
function buildBarHoverPlugin(labels, idx, roleNames, leaveLookup) {
  const el = (() => {
    let t = document.getElementById("barHoverTooltip");
    if (!t) {
      t = document.createElement("div");
      t.id = "barHoverTooltip";
      t.style.cssText = `position:fixed; z-index:9998; pointer-events:none; display:none;
        background:#1e293b; border:1px solid #334155; border-radius:12px;
        padding:12px 16px; max-width:280px; box-shadow:0 8px 32px rgba(0,0,0,0.5);
        font-size:13px; color:#e2e8f0; line-height:1.6;`;
      document.body.appendChild(t);
    }
    return t;
  })();

  return {
    id: "barHover_" + Math.random().toString(36).slice(2),
    afterEvent(chart, args) {
      const e = args.event;
      if (e.type === "mouseout") { el.style.display = "none"; return; }
      if (e.type !== "mousemove") return;

      const points = chart.getElementsAtEventForMode(e.native, "nearest", { intersect: true }, false);
      if (!points.length) { el.style.display = "none"; return; }

      const { datasetIndex, index: sprintLocalIdx } = points[0];
      const ds = chart.data.datasets[datasetIndex];
      const person = ds.label;
      const sprintLabel = labels[sprintLocalIdx];
      const sprintGlobalIdx = idx[sprintLocalIdx];

      const pts = (DATA.points[person] || [])[sprintGlobalIdx] || 0;
      const tasks = (DATA.tasks[person] || [])[sprintGlobalIdx] || 0;
      const ytdPts = sum((DATA.points[person] || []).slice(0, sprintGlobalIdx + 1));
      const role = roleOf(person);
      const color = ds.backgroundColor;

      let html = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="width:10px;height:10px;border-radius:2px;background:${color};flex-shrink:0;"></span>
        <span style="font-weight:700;font-size:14px;">${person}</span>
        <span style="font-size:11px;background:${ROLE_COLORS[role]||'#94a3b8'}22;color:${ROLE_COLORS[role]||'#94a3b8'};border:1px solid ${ROLE_COLORS[role]||'#94a3b8'}55;padding:1px 7px;border-radius:999px;font-weight:600;">${role}</span>
      </div>`;
      html += `<div style="font-size:12px;color:#94a3b8;margin-bottom:6px;">${sprintLabel}</div>`;
      html += `<div style="display:flex;flex-direction:column;gap:4px;">`;
      html += `<div>Sprint contribution: <strong style="color:#e2e8f0;">${pts.toLocaleString(undefined,{maximumFractionDigits:1})} pts</strong></div>`;
      html += `<div>YTD total: <strong style="color:#22d3ee;">${ytdPts.toLocaleString(undefined,{maximumFractionDigits:1})} pts</strong></div>`;
      html += `<div>Sprint tasks: <strong style="color:#a5b4fc;">${tasks}</strong></div>`;
      html += `</div>`;

      el.innerHTML = html;
      el.style.display = "block";
      const tx = e.native.clientX + 16;
      const ty = e.native.clientY - 10;
      el.style.left = Math.min(tx, window.innerWidth - 300) + "px";
      el.style.top = Math.max(0, ty) + "px";
    }
  };
}

// Build one role-based stacked bar trend chart
function buildRoleChart(canvasId, legendId, rolePeople, idx, labels, leaveLookup, chartRef) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const getter = S.view === "points" ? getPersonPoints : getPersonTasks;
  // Sort by total desc
  const names = rolePeople.slice().sort((a, b) =>
    sum(idx.map(i => getter(b)[i] || 0)) - sum(idx.map(i => getter(a)[i] || 0))
  );

  const datasets = names.map((name, i) => {
    const arr = getter(name);
    const sliced = idx.map(j => arr[j] ?? 0);
    const color = colorFor(name, i);
    return {
      label: name,
      data: sliced,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      stack: "a"
    };
  });

  const leavePlugin = buildLeavePlugin(labels, idx, leaveLookup, () => "bar");
  const hoverPlugin = buildBarHoverPlugin(labels, idx, names, leaveLookup);

  if (chartRef.current) chartRef.current.destroy();
  chartRef.current = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets },
    plugins: [leavePlugin, hoverPlugin],
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { bottom: 68 } },
      interaction: { mode: "nearest", intersect: true },
      scales: {
        x: { stacked: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick } },
        y: { stacked: true, beginAtZero: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick } }
      },
      plugins: {
        legend: { display: false }, // custom HTML legend below
        stackTotals: { enabled: true },
        tooltip: { enabled: false } // using our custom HTML tooltip
      }
    }
  });

  // Render custom HTML legend with avatar initials
  const legendEl = document.getElementById(legendId);
  if (legendEl) {
    legendEl.innerHTML = names.map((name, i) => {
      const color = colorFor(name, i);
      const initials = getInitials(name);
      return `<span class="role-legend-item">
        <span class="role-legend-avatar" style="background:${color};">${initials}</span>
        ${name}
      </span>`;
    }).join("");
  }

  return chartRef.current;
}

// Render the holiday context banner below the 3 role charts
function renderHolidayBanner() {
  const el = document.getElementById("holidayBanner");
  if (!el) return;

  const idx = rangeIdx(S.range);
  const sprintNums = idx.map(i => i + 1);

  const grouped = {};
  COMPANY_HOLIDAYS.forEach(h => {
    if (!h.sprint || !sprintNums.includes(h.sprint)) return;
    if (!grouped[h.sprint]) grouped[h.sprint] = [];
    grouped[h.sprint].push(h);
  });

  const sprintKeys = Object.keys(grouped).map(Number).sort((a, b) => a - b);
  if (!sprintKeys.length) { el.innerHTML = ""; return; }

  const chips = sprintKeys.map(sp => {
    return grouped[sp].map(h => {
      const days = h.dates.length;
      return `<span class="holiday-chip">Sprint ${sp}: ${h.name} ${days}d</span>`;
    }).join("");
  }).join(" · ");

  el.innerHTML = `<div class="holiday-banner">
    <div class="holiday-banner-title">🏢 Holiday Context</div>
    <div class="holiday-banner-body">${chips}</div>
  </div>`;
}

// Build all 3 role trend charts + holiday banner
const _roleChartRefs = {
  dev: { current: null },
  design: { current: null },
  other: { current: null },
  ceo: { current: null }
};

function buildRoleCharts() {
  const idx = rangeIdx(S.range);
  const labels = idx.map(i => DATA.sprints[i]);

  // Build leave lookup
  const leaveLookup = {};
  labels.forEach((label, li) => {
    const sprint = idx[li] + 1;
    const holidays = COMPANY_HOLIDAYS.filter(h => h.sprint === sprint);
    const personal = DATA.leaves[sprint] || {};
    leaveLookup[label] = { holidays, personal };
  });

  const allPeople = Object.keys(DATA.points);
  const devPeople = allPeople.filter(n => ["Dev", "Tester"].includes(roleOf(n)));
  const designPeople = allPeople.filter(n => roleOf(n) === "BA");
  const otherPeople = allPeople.filter(n => roleOf(n) === "Designer");
  const ceoPeople = allPeople.filter(n => ["CEO", "PC"].includes(roleOf(n)));

  buildRoleChart("devTrendChart", "devLegend", devPeople, idx, labels, leaveLookup, _roleChartRefs.dev);
  buildRoleChart("designTrendChart", "designLegend", designPeople, idx, labels, leaveLookup, _roleChartRefs.design);
  buildRoleChart("otherTrendChart", "otherLegend", otherPeople, idx, labels, leaveLookup, _roleChartRefs.other);
  buildRoleChart("ceoTrendChart", "ceoLegend", ceoPeople, idx, labels, leaveLookup, _roleChartRefs.ceo);

  renderHolidayBanner();
}

function buildTopChart(){
  const ctx = document.getElementById("topChart");
  const singleSprint = S.topSprint !== "all";
  const idx = singleSprint ? [parseInt(S.topSprint, 10) - 1] : rangeIdx(S.range);
  const person = S.highlight;
  const isFilter = person !== "All";

  const tagSuffix = singleSprint ? ` · Sprint ${S.topSprint}` : '';
  let labels, vals, colors, title, tag;
  if (isFilter) {
    const proj = DATA.contribution[person] || {};
    const arr = Object.keys(proj).map(n => ({n, v:sum(idx.map(i => getContributionRow(person,n)[i]||0))}))
      .filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
    labels = arr.map(x=>x.n);
    vals = arr.map(x=>x.v);
    colors = labels.map((n,i)=>colorFor(n, i, PROJ_PALETTE));
    title = `${person}'s Top Projects`;
    tag = `${labels.length} projects${tagSuffix}`;
  } else {
    const getter = S.view === "points" ? getPersonPoints : getPersonTasks;
    const pool = peopleInRole(S.role);
    let arr = pool.map(n => ({n, v:sum(idx.map(i => getter(n)[i]||0)), role:roleOf(n)}))
      .filter(x=>x.v>0);
    if (S.role === "all") {
      // group by role (ROLE_ORDER), then by value desc within group
      arr.sort((a,b) => {
        const ra = ROLE_ORDER.indexOf(a.role), rb = ROLE_ORDER.indexOf(b.role);
        if (ra !== rb) return ra - rb;
        return b.v - a.v;
      });
    } else {
      arr.sort((a,b)=>b.v-a.v);
    }
    labels = arr.map(x=>`${x.n} · ${x.role}`);
    vals = arr.map(x=>x.v);
    colors = arr.map(x => ROLE_COLORS[x.role] || "#94a3b8");
    title = S.role === "all" ? "Top Contributors (grouped by role)" : `Top ${S.role}`;
    tag = `${VIEW_LABEL[S.view]} · ${labels.length} people${tagSuffix}`;
  }

  if (topChart) topChart.destroy();
  topChart = new Chart(ctx, {
    type:"bar",
    data:{ labels, datasets:[{data:vals, backgroundColor:colors, borderRadius:6}] },
    options:{
      indexAxis:"y", responsive:true, maintainAspectRatio:false,
      onHover: (e, els) => { e.native.target.style.cursor = 'default'; },
      scales:{
        x:{beginAtZero:true, grid:{color:THEME.grid}, ticks:{color:THEME.tick}},
        y:{grid:{display:false}, ticks:{color:THEME.tick}}
      },
      plugins:{
        legend:{display:false},
        tooltip:{}
      }
    }
  });
  document.getElementById("topTitleText").textContent = title;
  document.getElementById("topTag").textContent = tag;
}

function buildCapacityChart(){
  const ctx = document.getElementById("capacityChart");
  const idx = rangeIdx(S.range);
  const labels = idx.map(i=>DATA.sprints[i]);
  const person = S.highlight;
  const isFilter = person !== "All";

  const tagText = `Points + Tasks`;
  let pts, items;
  if (isFilter) {
    const pArr = getPersonPoints(person);
    const tArr = getPersonTasks(person);
    pts = idx.map(i => pArr[i] || 0);
    items = idx.map(i => tArr[i] || 0);
    document.getElementById("capTitle").innerHTML = `${person}'s Capacity by Sprint <span class="tag" id="capTag">${tagText}</span>`;
  } else {
    const pool = peopleInRole(S.role);
    pts = idx.map(i => sum(pool.map(n => getPersonPoints(n)[i]||0)));
    items = idx.map(i => sum(pool.map(n => getPersonTasks(n)[i]||0)));
    const titleLbl = S.role === "all" ? "Team Capacity by Sprint" : `${S.role} Capacity by Sprint`;
    document.getElementById("capTitle").innerHTML = `${titleLbl} <span class="tag" id="capTag">${tagText}</span>`;
  }

  if (capacityChart) capacityChart.destroy();
  capacityChart = new Chart(ctx, {
    data: {
      labels,
      datasets: [
        { type:"bar", label:"Story Points", data:pts, backgroundColor:"#6366f1cc", borderRadius:6, yAxisID:"y" },
        { type:"line", label:"Tasks (count)", data:items, borderColor:"#22d3ee", backgroundColor:"#22d3ee22", tension:0.35, yAxisID:"y1", borderWidth:2, pointRadius:3 }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:"nearest",intersect:true},
      scales:{
        x:{grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick},title:{display:true,text:"Points",color:"#94a3b8"}},
        y1:{beginAtZero:true,grid:{display:false},ticks:{color:THEME.tick},position:"right",title:{display:true,text:"Tasks",color:"#94a3b8"}}
      },
      plugins:{legend:{labels:{color:THEME.tick}}}
    }
  });
}

function buildAvgTrendChart(){
  const ctx = document.getElementById("avgTrendChart");
  const idx = rangeIdx(S.range);
  const labels = idx.map(i=>DATA.sprints[i]);
  const person = S.highlight;
  const isFilter = person !== "All";

  const tagText = 'per sprint';
  let pts, tasks;
  if (isFilter) {
    const pArr = getPersonPoints(person);
    const tArr = getPersonTasks(person);
    pts = idx.map(i => pArr[i] || 0);
    tasks = idx.map(i => tArr[i] || 0);
    document.getElementById("avgTitle").innerHTML = `${person}'s Avg Points / Task <span class="tag" id="avgTag">${tagText}</span>`;
  } else {
    const pool = peopleInRole(S.role);
    pts = idx.map(i=>sum(pool.map(n => getPersonPoints(n)[i]||0)));
    tasks = idx.map(i=>sum(pool.map(n => getPersonTasks(n)[i]||0)));
    const lbl = S.role === "all" ? "Team-wide" : S.role;
    document.getElementById("avgTitle").innerHTML = `Avg Points / Task Trend <span class="tag" id="avgTag">${lbl}</span>`;
  }
  const avg = pts.map((p,i)=> tasks[i] ? p/tasks[i] : 0);

  if (avgTrendChart) avgTrendChart.destroy();
  avgTrendChart = new Chart(ctx, {
    type:"line",
    data:{
      labels,
      datasets:[{
        label:"Avg Pts / Task",
        data:avg,
        borderColor:"#a855f7",
        backgroundColor:"#a855f733",
        tension:0.35,
        borderWidth:2.5,
        pointRadius:4,
        fill:true
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}}
      },
      plugins:{legend:{labels:{color:THEME.tick}}}
    }
  });
}

// ============================================================================
//  PEOPLE — INSIGHTS
// ============================================================================
function renderPersonInsights(person){
  const el = document.getElementById("personInsights");
  if (!el) return;
  const pts = DATA.points[person] || [];
  const tks = DATA.tasks[person] || [];
  const contrib = DATA.contribution[person] || {};
  const statusCount = DATA.statusPersonCount[person] || [];
  const statusPts = DATA.statusPersonPts[person] || [];
  const SPR = DATA.sprints.length;

  const totalPts = pts.reduce((a,b)=>a+(+b||0),0);
  const totalTasks = tks.reduce((a,b)=>a+(+b||0),0);
  const activeSprints = pts.filter((v,i)=>((+v||0)>0 || (+tks[i]||0)>0)).length;
  const avgPerTask = totalTasks ? (totalPts/totalTasks) : 0;

  // Latest sprint = current calendar sprint (capped at active data window)
  const names = Object.keys(DATA.points);
  let latest = -1;
  for (let i=Math.min(SPR-1, CURRENT_SPRINT_IDX);i>=0;i--){
    if (names.some(n => hasAnyTask(n, i))) { latest = i; break; }
  }
  // Stale: no task assigned (any state) in last 2 sprints
  const stale = latest >= 1 && !hasAnyTask(person, latest) && !hasAnyTask(person, latest-1);

  // Trend: compare recent 3 sprints vs previous 3 (relative to latest)
  let trendLabel = "—", trendClass = "info";
  if (latest >= 2) {
    const recent = pts.slice(Math.max(0,latest-2), latest+1).reduce((a,b)=>a+(+b||0),0);
    const prior = pts.slice(Math.max(0,latest-5), Math.max(0,latest-2)).reduce((a,b)=>a+(+b||0),0);
    if (recent === 0 && prior === 0) { trendLabel = "ไม่มีข้อมูลเพียงพอ"; trendClass = "info"; }
    else if (prior === 0) { trendLabel = `เพิ่มขึ้น (+${recent.toFixed(0)} pts ช่วงหลัง)`; trendClass = "good"; }
    else {
      const delta = recent - prior;
      const pct = (delta/prior)*100;
      if (delta > 0) { trendLabel = `📈 กำลังเร่ง (+${pct.toFixed(0)}%)`; trendClass = "good"; }
      else if (delta < 0) { trendLabel = `📉 ชะลอลง (${pct.toFixed(0)}%)`; trendClass = pct < -40 ? "warn" : "info"; }
      else { trendLabel = "คงที่"; trendClass = "info"; }
    }
  }

  // Top projects (by points)
  const projEntries = Object.entries(contrib)
    .map(([k,arr]) => [k, arr.reduce((a,b)=>a+(+b||0),0)])
    .filter(([,v]) => v > 0)
    .sort((a,b) => b[1]-a[1]);
  const topProjects = projEntries.slice(0,3);

  // Status insights
  const SL = DATA.statusLabels;
  const donePts = statusPts[SL.indexOf("Done")] || 0;
  const blockedC = statusCount[SL.indexOf("Blocked")] || 0;
  const buggedC = statusCount[SL.indexOf("Bugged")] || 0;
  const wipC = (statusCount[SL.indexOf("In Progress")] || 0)
             + (statusCount[SL.indexOf("Ready for review")] || 0)
             + (statusCount[SL.indexOf("Ready for test")] || 0)
             + (statusCount[SL.indexOf("Waiting to INT deploy")] || 0)
             + (statusCount[SL.indexOf("Waiting to PRD deploy")] || 0);
  const todoC = statusCount[SL.indexOf("To Do")] || 0;
  const grandPts = statusPts.reduce((a,b)=>a+(+b||0),0);
  const doneRate = grandPts ? (donePts/grandPts*100) : 0;

  // Peak sprint
  let peakIdx = 0, peakVal = 0;
  pts.forEach((v,i) => { if ((+v||0) > peakVal) { peakVal = +v; peakIdx = i; } });

  // Compose cards
  const cards = [];

  // Workload summary
  cards.push({
    cls: totalPts === 0 ? "warn" : "info",
    title: "📊 Workload",
    value: `${totalPts.toLocaleString(undefined,{maximumFractionDigits:1})} pts · ${totalTasks} tasks`,
    hint: `Active in ${activeSprints}/${SPR} sprints · avg ${avgPerTask.toFixed(2)} pts/task`
  });

  // Done rate
  cards.push({
    cls: doneRate >= 70 ? "good" : doneRate >= 40 ? "info" : "warn",
    title: "✅ Done Rate",
    value: `${doneRate.toFixed(0)}% ของ points`,
    hint: `${donePts.toLocaleString(undefined,{maximumFractionDigits:1})} / ${grandPts.toLocaleString(undefined,{maximumFractionDigits:1})} pts`
  });

  // Trend
  cards.push({
    cls: trendClass,
    title: "📈 Recent Trend",
    value: trendLabel,
    hint: `เทียบ 3 sprints ล่าสุด vs 3 sprints ก่อนหน้า`
  });

  // Peak
  if (peakVal > 0) {
    cards.push({
      cls: "info",
      title: "🏔️ Peak Sprint",
      value: `Sprint ${peakIdx+1} — ${peakVal.toLocaleString(undefined,{maximumFractionDigits:1})} pts`,
      hint: `สูงสุดของปี`
    });
  }

  // Top projects
  if (topProjects.length) {
    const list = topProjects.map(([k,v]) => `${k} (${v.toFixed(0)})`).join(" · ");
    cards.push({
      cls: "info",
      title: "🎯 Top Projects",
      value: list,
      hint: `${projEntries.length} projects contributed`
    });
  } else {
    cards.push({
      cls: "warn",
      title: "🎯 Top Projects",
      value: "ยังไม่มี contribution",
      hint: "ไม่พบ project ในปีนี้"
    });
  }

  // WIP + risk
  if (blockedC > 0 || buggedC > 0) {
    cards.push({
      cls: "bad",
      title: "⚠️ Risk Flags",
      value: `${blockedC} Blocked · ${buggedC} Bugged`,
      hint: "ต้องติดตามปลดล็อกและแก้ไข"
    });
  }
  if (wipC > 0) {
    cards.push({
      cls: wipC > 15 ? "warn" : "info",
      title: "🔄 Work in Progress",
      value: `${wipC} tasks กำลังดำเนินการ`,
      hint: `(In Progress + Review/Test + Waiting deploy)`
    });
  }
  if (todoC > 0) {
    cards.push({
      cls: todoC > 20 ? "warn" : "info",
      title: "📝 Backlog (To Do)",
      value: `${todoC} tasks รอเริ่ม`,
      hint: todoC > 20 ? "Backlog ค่อนข้างใหญ่" : "ปริมาณปกติ"
    });
  }

  // Stale
  if (stale) {
    cards.push({
      cls: "bad",
      title: "⏰ Stale",
      value: `ไม่พบ task งาน 2 sprints ล่าสุด`,
      hint: `Sprint ${latest}-${latest+1} ไม่มี activity`
    });
  }

  // Leave history
  const LEAVE_ICON = { "vacation": "🏖", "sick": "🤒", "personal": "🏠", "other": "📅" };
  const personLeaves = [];
  Object.entries(DATA.leaves || {}).forEach(([sprint, byPerson]) => {
    if (byPerson[person]) {
      byPerson[person].forEach(l => personLeaves.push({ sprint: parseInt(sprint), ...l }));
    }
  });
  if (personLeaves.length > 0) {
    personLeaves.sort((a,b) => b.sprint - a.sprint);
    const leaveList = personLeaves.map(l => {
      const icon = LEAVE_ICON[l.type?.toLowerCase()] || "📅";
      return `${icon} Sprint ${l.sprint} · ${l.type} ${l.days}d (${l.startDate}${l.endDate !== l.startDate ? "–"+l.endDate : ""})`;
    }).join("<br>");
    cards.push({
      cls: "info",
      title: "🗓 Leave History",
      value: `${personLeaves.length} leave record${personLeaves.length > 1 ? "s" : ""}`,
      hint: leaveList
    });
  }

  // Role-based observation
  const role = roleOf(person);
  if (role !== "—") {
    const roleObs = {
      "Dev": totalPts > 200 ? "Heavy delivery — dev หลักของทีม" : "Contributor สาย dev",
      "Designer": totalPts > 100 ? "Core designer ของทีม" : "Designer contributor",
      "BA": totalPts > 100 ? "BA/Analyst หลัก" : "BA/Analyst support",
      "Tester": "QA/Tester — ดูแล test manual + automation",
      "PC": "Project Coordinator — จัดการ cross-project ops",
      "CEO": "Executive — leadership & oversight"
    };
    cards.push({
      cls: "info",
      title: `👤 Role · ${role}`,
      value: roleObs[role] || role,
      hint: `รวม ${totalPts.toLocaleString(undefined,{maximumFractionDigits:1})} pts ทั้งปี`
    });
  }

  el.innerHTML = cards.map(c =>
    `<div class="insight ${c.cls}">
       <div class="ins-title">${c.title}</div>
       <div class="ins-value">${c.value}</div>
       <div class="ins-hint">${c.hint}</div>
     </div>`
  ).join("");
}

// ============================================================================
//  PEOPLE — DRILL DOWN
// ============================================================================
function buildPersonDrill(){
  const person = S.person;
  const metric = S.personMetric;
  const proj = DATA.contribution[person] || {};

  // ---- header stats (done-only) ----
  const totalPts = sum(getPersonPoints(person));
  const totalTasks = sum(getPersonTasks(person));
  const projCount = Object.keys(proj).filter(p => sum(getContributionRow(person,p)) > 0).length;
  document.getElementById("drillName").innerHTML = `👤 ${person}${roleBadge(person)}`;
  document.getElementById("drillStat").textContent = `${totalPts.toLocaleString(undefined,{maximumFractionDigits:1})} pts · ${totalTasks.toLocaleString(undefined,{maximumFractionDigits:1})} tasks · ${projCount} projects`;

  // ---- status breakdown pills (all statuses, from status sheet — exact numbers) ----
  const statusCount = DATA.statusPersonCount[person] || [0,0,0,0,0,0];
  const statusPts = DATA.statusPersonPts[person] || [0,0,0,0,0,0];
  const grandCount = sum(statusCount);
  const grandPts = sum(statusPts);
  const pillsHtml = DATA.statusLabels.map((lbl, i) => {
    const c = statusCount[i], p = statusPts[i];
    const pct = grandCount ? Math.round(c/grandCount*100) : 0;
    const empty = c === 0 ? ' is-empty' : '';
    return `<div class="status-pill${empty}" style="--c:${DATA.statusColors[i]};">
      <div class="sp-head"><span class="sp-dot"></span><span class="sp-label">${lbl}</span></div>
      <div class="sp-num"><span class="sp-count">${c.toLocaleString()}</span><span class="sp-unit">งาน</span></div>
      <div class="sp-bar"><i style="width:${Math.min(100,pct)}%"></i></div>
      <div class="sp-foot"><span>${p.toLocaleString(undefined,{maximumFractionDigits:1})} pts</span><span class="sp-pct">${pct}%</span></div>
    </div>`;
  }).join("");
  document.getElementById("drillStatusPills").innerHTML = pillsHtml;

  // ---- insights (auto-generated analysis per person) ----
  renderPersonInsights(person);

  // ---- sprint-by-sprint stacked chart (respects S.personMetric) ----
  const labels = DATA.sprints;
  const projects = Object.keys(proj).sort((a,b) => sum(getContributionRowByMetric(person,b)) - sum(getContributionRowByMetric(person,a)));
  const datasets = projects.map((p,i) => ({
    label: p,
    data: getContributionRowByMetric(person, p),
    backgroundColor: colorFor(p, i, PROJ_PALETTE),
    borderRadius: 4,
    stack: "a"
  }));

  if (personProjChart) personProjChart.destroy();
  personProjChart = new Chart(document.getElementById("personProjChart"), {
    type:"bar",
    data:{labels, datasets},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:"nearest",intersect:true,axis:"xy"},
      scales:{
        x:{stacked:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{stacked:true,beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}}
      },
      plugins:{
        legend:{position:"bottom",labels:{color:THEME.tick,boxWidth:10,font:{size:11}}},
        tooltip:{
          callbacks:{
            title: its => its.length ? `${its[0].dataset.label} · ${its[0].label}` : '',
            label: it => `${(it.parsed.y||0).toLocaleString(undefined,{maximumFractionDigits:2})}`
          }
        }
      }
    }
  });

  // ---- project summary table (project × sprint heatmap, respects metric) ----
  let html = `<table><thead><tr><th>Project</th>${labels.map((_,i)=>`<th>Sp ${i+1}</th>`).join("")}<th>Total</th></tr></thead><tbody>`;
  const allVals = projects.flatMap(p=>getContributionRowByMetric(person,p));
  const max = Math.max(1, ...allVals);
  projects.forEach(p => {
    const vals = getContributionRowByMetric(person, p);
    const tot = sum(vals);
    if (tot <= 0) return;
    html += `<tr><td style="font-weight:500">${p}</td>`
          + vals.map(v => `<td style="background:${heatColor(v,max)}">${fmt(v)}</td>`).join("")
          + `<td style="font-weight:600">${fmt(tot)}</td></tr>`;
  });
  if (projects.filter(p => sum(getContributionRowByMetric(person,p)) > 0).length === 0) {
    html += `<tr><td colspan="11" style="text-align:center;color:var(--muted)">No completed contributions recorded</td></tr>`;
  }
  html += "</tbody></table>";
  document.getElementById("personTable").innerHTML = html;
  document.getElementById("drillTableTag").textContent = `${VIEW_LABEL[metric]}`;
  const chartTag = document.getElementById("drillChartTag");
  if (chartTag) chartTag.textContent = `${VIEW_LABEL[metric]}${metric === "tasks" ? " (approx)" : ""}`;
}

function buildPersonProjectMatrix(){
  const people = Object.keys(DATA.personProject);
  const allProjects = new Set();
  Object.values(DATA.personProject).forEach(o => Object.keys(o).forEach(p => allProjects.add(p)));
  const projects = Array.from(allProjects).sort((a,b) => sum(getProjectSprint(b)) - sum(getProjectSprint(a)));

  const allVals = people.flatMap(p => projects.map(pr => getPersonProjectValByMetric(p, pr)));
  const maxVal = Math.max(1, ...allVals);

  const headerCells = people.map(p => {
    const r = roleOf(p);
    const c = ROLE_COLORS[r] || "#94a3b8";
    return `<th><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><span>${p}</span><span style="font-size:9px; color:${c}; font-weight:500;">${r}</span></div></th>`;
  }).join("");
  let html = `<table><thead><tr><th>Project</th>${headerCells}<th>Total</th></tr></thead><tbody>`;
  projects.forEach(proj => {
    const row = people.map(p => getPersonProjectValByMetric(p, proj));
    const tot = sum(row);
    html += `<tr><td>${proj}</td>` + row.map(v=>`<td style="background:${heatColor(v,maxVal)}">${fmt(v)}</td>`).join("") + `<td style="font-weight:600">${fmt(tot)}</td></tr>`;
  });
  const colTot = people.map(p => sum(projects.map(pr => getPersonProjectValByMetric(p, pr))));
  html += `<tr class="total-row"><td>TOTAL</td>${colTot.map(v=>`<td>${fmt(v)}</td>`).join("")}<td>${fmt(sum(colTot))}</td></tr>`;
  html += "</tbody></table>";
  document.getElementById("matrixTable").innerHTML = html;
  document.getElementById("matrixTag").textContent = `${VIEW_LABEL[S.personMetric]}${S.personMetric === "tasks" ? " (approx)" : ""}`;
}

// ============================================================================
//  PROJECTS — INSIGHTS
// ============================================================================
function renderProjectInsights(){
  const el = document.getElementById("projectInsights");
  if (!el) return;
  const idx = rangeIdx(S.projRange);
  const SPR = DATA.sprints.length;
  const teamFiltered = S.projRole && S.projRole !== "all";
  const teamLabel = teamFiltered ? ` · Team: ${S.projRole}` : "";

  // Team latest active sprint (across all projects)
  const allProjects = Object.keys(DATA.projectSprint);
  let latest = -1;
  for (let i = SPR-1; i >= 0; i--) {
    if (allProjects.some(p => (+DATA.projectSprint[p][i]||0) > 0)) { latest = i; break; }
  }

  // Build per-project stats in range
  const stats = allProjects.map(n => {
    const arr = getProjectSprintFiltered(n);
    const rangeTotal = sum(idx.map(i => +arr[i]||0));
    const yearTotal = sum(arr);
    const activeSprintsInRange = idx.filter(i => (+arr[i]||0) > 0).length;
    const activeSprintsAll = arr.filter(v => (+v||0) > 0).length;
    // peak
    let peakI = -1, peakV = 0;
    arr.forEach((v,i) => { if ((+v||0) > peakV) { peakV = +v; peakI = i; } });
    // recent vs prior activity (global latest)
    let trend = null;
    if (latest >= 2) {
      const recent = arr.slice(Math.max(0,latest-2), latest+1).reduce((a,b)=>a+(+b||0),0);
      const prior  = arr.slice(Math.max(0,latest-5), Math.max(0,latest-2)).reduce((a,b)=>a+(+b||0),0);
      trend = { recent, prior, delta: recent - prior };
    }
    // stale within range: 0 in last 2 sprints of range (if range has ≥ 2)
    const stale = idx.length >= 2 && (+arr[idx[idx.length-1]]||0) === 0 && (+arr[idx[idx.length-2]]||0) === 0 && rangeTotal > 0;
    // status (year-wide from status sheet)
    const sc = DATA.statusProjectCount[n] || [];
    const sp = DATA.statusProjectPts[n] || [];
    const SL = DATA.statusLabels;
    const donePts = +sp[SL.indexOf("Done")]||0;
    const blocked = +sc[SL.indexOf("Blocked")]||0;
    const bugged  = +sc[SL.indexOf("Bugged")]||0;
    const wip = (+sc[SL.indexOf("In Progress")]||0)
              + (+sc[SL.indexOf("Ready for review")]||0)
              + (+sc[SL.indexOf("Ready for test")]||0)
              + (+sc[SL.indexOf("Waiting to INT deploy")]||0)
              + (+sc[SL.indexOf("Waiting to PRD deploy")]||0);
    const todo = +sc[SL.indexOf("To Do")]||0;
    const grandPts = sp.reduce((a,b)=>a+(+b||0),0);
    const doneRate = grandPts ? donePts/grandPts*100 : 0;
    return { n, arr, rangeTotal, yearTotal, activeSprintsInRange, activeSprintsAll, peakI, peakV, trend, stale, donePts, grandPts, doneRate, blocked, bugged, wip, todo };
  });

  const activeStats = stats.filter(s => s.rangeTotal > 0).sort((a,b)=>b.rangeTotal-a.rangeTotal);
  const totalPts = activeStats.reduce((a,b)=>a+b.rangeTotal,0);
  const totalProjects = activeStats.length;

  const cards = [];

  // Portfolio summary
  cards.push({
    cls: "info",
    title: "🗂️ Portfolio",
    value: `${totalProjects} active projects · ${totalPts.toFixed(0)} pts`,
    hint: teamFiltered
      ? `เฉพาะทีม ${S.projRole} (${peopleInRole(S.projRole).length} คน) · ใน range ที่เลือก`
      : `ใน range ที่เลือก · รวม ${allProjects.length} projects ทั้งหมด`
  });

  // Top 3 share (concentration)
  const top3 = activeStats.slice(0,3);
  const top3Share = totalPts ? top3.reduce((a,b)=>a+b.rangeTotal,0)/totalPts*100 : 0;
  const concCls = top3Share >= 70 ? "warn" : top3Share >= 50 ? "info" : "good";
  cards.push({
    cls: concCls,
    title: "🎯 Concentration",
    value: `Top-3 = ${top3Share.toFixed(0)}% ของ points`,
    hint: top3.map(t => `${t.n} (${t.rangeTotal.toFixed(0)})`).join(" · ") || "—"
  });

  // Leader
  if (activeStats.length) {
    const top = activeStats[0];
    cards.push({
      cls: "good",
      title: "🏆 Leader",
      value: `${top.n} — ${top.rangeTotal.toFixed(0)} pts`,
      hint: `active ${top.activeSprintsInRange}/${idx.length} sprints in range`
    });
  }

  // Rising star — biggest positive delta (recent vs prior, 3v3)
  if (latest >= 2) {
    const rising = stats
      .filter(s => s.trend && s.trend.recent > 0 && s.trend.delta > 0 && s.yearTotal > 5)
      .sort((a,b) => b.trend.delta - a.trend.delta)[0];
    if (rising) {
      cards.push({
        cls: "good",
        title: "📈 Rising",
        value: `${rising.n} — +${rising.trend.delta.toFixed(0)} pts`,
        hint: `3 sprints ล่าสุด ${rising.trend.recent.toFixed(0)} vs ก่อนหน้า ${rising.trend.prior.toFixed(0)}`
      });
    }
    // Fading — biggest negative delta
    const fading = stats
      .filter(s => s.trend && s.trend.prior > 0 && s.trend.delta < 0 && s.yearTotal > 10)
      .sort((a,b) => a.trend.delta - b.trend.delta)[0];
    if (fading) {
      cards.push({
        cls: "warn",
        title: "📉 Fading",
        value: `${fading.n} — ${fading.trend.delta.toFixed(0)} pts`,
        hint: `ช่วงหลังชะลอ (${fading.trend.recent.toFixed(0)} vs ${fading.trend.prior.toFixed(0)})`
      });
    }
  }

  // Stale projects (ran in range but 0 in last 2 sprints of range)
  const staleList = activeStats.filter(s => s.stale).map(s => s.n);
  if (staleList.length) {
    cards.push({
      cls: "bad",
      title: "⏰ Stale Projects",
      value: `${staleList.length} project ไม่มี activity 2 sprints ล่าสุด`,
      hint: staleList.slice(0,4).join(" · ") + (staleList.length > 4 ? ` · +${staleList.length-4}` : "")
    });
  }

  // Risk / Done rate / Backlog / WIP insights rely on project-wide status totals
  // which are not split per-role, so skip them when a team filter is active.
  if (!teamFiltered) {

  // Risk (blocked/bugged)
  const riskList = stats
    .filter(s => s.blocked > 0 || s.bugged > 0)
    .sort((a,b) => (b.blocked+b.bugged)-(a.blocked+a.bugged));
  if (riskList.length) {
    const top = riskList.slice(0,3);
    cards.push({
      cls: "bad",
      title: "⚠️ Risk Projects",
      value: `${riskList.length} projects มี Blocked/Bugged`,
      hint: top.map(r => `${r.n} (${r.blocked}B/${r.bugged}🐞)`).join(" · ")
    });
  }

  // Done rate — best and worst (only projects with meaningful volume)
  const withVol = stats.filter(s => s.grandPts >= 30);
  if (withVol.length) {
    const sorted = withVol.slice().sort((a,b) => b.doneRate - a.doneRate);
    const best = sorted[0];
    const worst = sorted[sorted.length-1];
    cards.push({
      cls: best.doneRate >= 70 ? "good" : "info",
      title: "✅ Best Done Rate",
      value: `${best.n} — ${best.doneRate.toFixed(0)}%`,
      hint: `${best.donePts.toFixed(0)} / ${best.grandPts.toFixed(0)} pts · ≥30 pts volume`
    });
    if (best !== worst) {
      cards.push({
        cls: worst.doneRate < 40 ? "warn" : "info",
        title: "🚧 Lowest Done Rate",
        value: `${worst.n} — ${worst.doneRate.toFixed(0)}%`,
        hint: `${worst.donePts.toFixed(0)} / ${worst.grandPts.toFixed(0)} pts`
      });
    }
  }

  // Backlog-heavy projects (To Do > 20 tasks)
  const heavy = stats.filter(s => s.todo > 20).sort((a,b) => b.todo - a.todo).slice(0,3);
  if (heavy.length) {
    cards.push({
      cls: "warn",
      title: "📝 Big Backlog",
      value: `${heavy.length} projects มี To Do > 20`,
      hint: heavy.map(h => `${h.n} (${h.todo})`).join(" · ")
    });
  }

  // WIP heavy
  const wipHeavy = stats.filter(s => s.wip > 15).sort((a,b) => b.wip - a.wip).slice(0,3);
  if (wipHeavy.length) {
    cards.push({
      cls: "info",
      title: "🔄 WIP Concentration",
      value: `${wipHeavy.length} projects มี WIP > 15`,
      hint: wipHeavy.map(h => `${h.n} (${h.wip})`).join(" · ")
    });
  }

  } // end !teamFiltered

  if (teamFiltered) {
    cards.push({
      cls: "info",
      title: "ℹ️ Team Filter Active",
      value: `แสดงเฉพาะ contribution ของทีม ${S.projRole}`,
      hint: `Done rate / Risk / Backlog / WIP ถูกซ่อน (project-level status ไม่ได้แยกตาม role)`
    });
  }

  el.innerHTML = cards.map(c =>
    `<div class="insight ${c.cls}">
       <div class="ins-title">${c.title}</div>
       <div class="ins-value">${c.value}</div>
       <div class="ins-hint">${c.hint}</div>
     </div>`
  ).join("");
}

// ============================================================================
//  PROJECTS
// ============================================================================
function updateProjKPIs(){
  const idx = rangeIdx(S.projRange);
  const activeProjects = Object.keys(DATA.projectSprint).filter(n => {
    const arr = getProjectSprintFiltered(n);
    return idx.some(i => arr[i] > 0);
  });
  const totalPts = sum(activeProjects.map(n => sum(idx.map(i => getProjectSprintFiltered(n)[i]||0))));
  const top = activeProjects.map(n => ({n, v: sum(idx.map(i => getProjectSprintFiltered(n)[i]||0))})).sort((a,b)=>b.v-a.v);
  const topProj = top[0] || {n:"—", v:0};
  const concentration = totalPts ? (top.slice(0,3).reduce((a,b)=>a+b.v,0) / totalPts) : 0;
  const tag = S.doneOnly ? ' <span class="pill good">Done</span>' : '';
  const teamTag = (S.projRole && S.projRole !== "all") ? ` <span class="pill neutral">${S.projRole}</span>` : '';

  document.getElementById("projKpis").innerHTML = `
    <div class="kpi"><div class="label">Active Projects${teamTag}</div><div class="value">${activeProjects.length}</div><div class="hint">in range</div></div>
    <div class="kpi"><div class="label">Total Points${tag}</div><div class="value">${totalPts.toLocaleString(undefined,{maximumFractionDigits:1})}</div><div class="hint">across projects</div></div>
    <div class="kpi"><div class="label">#1 Project</div><div class="value" style="font-size:18px">${topProj.n}</div><div class="hint">${topProj.v.toFixed(1)} pts</div></div>
    <div class="kpi"><div class="label">Top-3 Share</div><div class="value">${percent(concentration)}</div><div class="hint">of total points</div></div>
  `;
}

function buildProjTrendChart(){
  const ctx = document.getElementById("projTrendChart");
  const idx = rangeIdx(S.projRange);
  const labels = idx.map(i=>DATA.sprints[i]);

  const proj = Object.keys(DATA.projectSprint)
    .map(n => { const arr = getProjectSprintFiltered(n); return {n, arr:idx.map(i=>arr[i]||0), total:sum(idx.map(i=>arr[i]||0))}; })
    .filter(p=>p.total>0)
    .sort((a,b)=>b.total-a.total);

  let topN = S.projTopN === "all" ? proj.length : +S.projTopN;
  const top = proj.slice(0, topN);
  const rest = proj.slice(topN);
  const datasets = top.map((p,i)=>({
    label: p.n, data: p.arr,
    backgroundColor: colorFor(p.n, i, PROJ_PALETTE),
    borderRadius:4, stack:"a"
  }));
  if (rest.length) {
    const otherArr = idx.map((_,i) => rest.reduce((a,b)=>a+b.arr[i], 0));
    datasets.push({ label:`Other (${rest.length})`, data:otherArr, backgroundColor:"#64748b", borderRadius:4, stack:"a" });
  }

  if (projTrendChart) projTrendChart.destroy();
  projTrendChart = new Chart(ctx, {
    type:"bar",
    data:{labels, datasets},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:"nearest",intersect:true,axis:"xy"},
      scales:{
        x:{stacked:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{stacked:true,beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}}
      },
      plugins:{
        legend:{position:"bottom",labels:{color:THEME.tick,boxWidth:10,font:{size:11}}},
        tooltip:{
          callbacks:{
            title: its => its.length ? `${its[0].dataset.label} · ${its[0].label}` : '',
            label: it => `${(it.parsed.y||0).toLocaleString(undefined,{maximumFractionDigits:2})}`
          }
        }
      }
    }
  });
  document.getElementById("projTrendTag").textContent = `${top.length} projects shown`;
}

function buildProjTopChart(){
  const ctx = document.getElementById("projTopChart");
  const idx = rangeIdx(S.projRange);
  const proj = Object.keys(DATA.projectSprint)
    .map(n => ({n, v: sum(idx.map(i => getProjectSprintFiltered(n)[i]||0))}))
    .filter(p=>p.v>0)
    .sort((a,b)=>b.v-a.v);

  let topN = S.projTopN === "all" ? proj.length : +S.projTopN;
  const labels = proj.slice(0, topN).map(p=>p.n);
  const vals = proj.slice(0, topN).map(p=>p.v);
  const colors = labels.map((n,i)=>colorFor(n, i, PROJ_PALETTE));

  if (projTopChart) projTopChart.destroy();
  projTopChart = new Chart(ctx, {
    type:"bar",
    data:{labels, datasets:[{data:vals, backgroundColor:colors, borderRadius:6}]},
    options:{
      indexAxis:"y", responsive:true, maintainAspectRatio:false,
      scales:{
        x:{beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{grid:{display:false},ticks:{color:THEME.tick}}
      },
      plugins:{legend:{display:false}}
    }
  });
}

function buildProjTable(){
  const idx = rangeIdx(S.projRange);
  const sprintsShown = idx.map(i=>DATA.sprints[i]);
  const rows = Object.keys(DATA.projectSprint).map(n => {
    const a = getProjectSprintFiltered(n);
    return {n, vals:idx.map(i=>a[i]||0), total:sum(idx.map(i=>a[i]||0))};
  }).filter(r=>r.total>0).sort((a,b)=>b.total-a.total);
  const maxVal = Math.max(1, ...rows.flatMap(r=>r.vals));

  let html = `<table><thead><tr><th>Project</th>${sprintsShown.map(s=>`<th>${s}</th>`).join("")}<th>Total</th></tr></thead><tbody>`;
  rows.forEach(r => {
    html += `<tr><td>${r.n}</td>` + r.vals.map(v=>`<td style="background:${heatColor(v,maxVal)}">${fmt(v)}</td>`).join("") + `<td style="font-weight:600">${fmt(r.total)}</td></tr>`;
  });
  const colTot = sprintsShown.map((_,i)=>sum(rows.map(r=>r.vals[i])));
  html += `<tr class="total-row"><td>TOTAL</td>${colTot.map(v=>`<td>${fmt(v)}</td>`).join("")}<td>${fmt(sum(colTot))}</td></tr>`;
  html += "</tbody></table>";
  document.getElementById("projTable").innerHTML = html;
}

// ============================================================================
//  PROJECTS — DRILL DOWN
// ============================================================================
const WIP_STATES = ["In Progress","Ready for review","Ready for test","Waiting to INT deploy","Waiting to PRD deploy"];

function getProjectContributors(proj){
  const isAll = proj === "__all__";
  const roleFilter = S.projRole && S.projRole !== "all" ? S.projRole : null;
  const passRole = (name) => !roleFilter || roleOf(name) === roleFilter;
  // Done-only sprint contributions, from DATA.contribution (matches Done-rule)
  const sprintsArr = {};
  Object.keys(DATA.contribution).forEach(person => {
    if (!passRole(person)) return;
    if (isAll) {
      const sumArr = new Array(DATA.sprints.length).fill(0);
      Object.values(DATA.contribution[person] || {}).forEach(arr => {
        arr.forEach((v, i) => { sumArr[i] += (+v||0); });
      });
      if (sumArr.some(v => v > 0)) sprintsArr[person] = sumArr;
    } else {
      const arr = DATA.contribution[person][proj];
      if (arr && arr.some(v => (+v||0) > 0)) sprintsArr[person] = arr.slice();
    }
  });
  // Task counts per state per person, from DATA.movement
  const stats = {};
  const ensure = (p) => stats[p] = stats[p] || { donePts:0, doneT:0, wip:0, wipPts:0, blocked:0, blockedPts:0, bugged:0, buggedPts:0, todo:0, todoPts:0, removed:0, total:0, totalPts:0, doneTasksSprint:new Array(DATA.sprints.length).fill(0) };
  const source = isAll ? (DATA.movement||[]) : (DATA.movement||[]).filter(m => m.project === proj);
  source.forEach(m => {
    if (!passRole(m.person)) return;
    const r = ensure(m.person);
    r.total++; r.totalPts += (+m.points||0);
    if (m.state === "Done") { r.donePts += (+m.points||0); r.doneT++; r.doneTasksSprint[m.sprint-1] += 1; }
    else if (WIP_STATES.indexOf(m.state) >= 0) { r.wip++; r.wipPts += (+m.points||0); }
    else if (m.state === "Blocked") { r.blocked++; r.blockedPts += (+m.points||0); }
    else if (m.state === "Bugged")  { r.bugged++;  r.buggedPts  += (+m.points||0); }
    else if (m.state === "To Do")   { r.todo++;    r.todoPts    += (+m.points||0); }
    else if (m.state === "Removed") { r.removed++; }
  });
  return { sprintsArr, stats };
}

function buildProjectDrill(){
  const proj = S.projDrill;
  const metric = S.projDrillMetric || "points";
  const nameEl = document.getElementById("projDrillName");
  const statEl = document.getElementById("projDrillStat");
  const tableEl = document.getElementById("projDrillContribTable");

  const isAll = proj === "__all__";
  if (!proj || (!isAll && !DATA.projectSprint[proj])) {
    nameEl.textContent = "Select a project";
    statEl.textContent = "—";
    tableEl.innerHTML = "";
    if (projDrillChart) { projDrillChart.destroy(); projDrillChart = null; }
    return;
  }

  const { sprintsArr, stats } = getProjectContributors(proj);
  const statusFilter = S.projDrillStatus && S.projDrillStatus !== "all" ? S.projDrillStatus : null;

  // Compute per-person sprint arrays from movement.
  // statusFilter=null → include ALL states (so "All Statuses" truly means all work)
  // statusFilter=X → only that state
  // Track BOTH a count map (for membership) and metric map (for chart values).
  const { filteredCountByPerson, filteredMetricByPerson } = (() => {
    const roleFilter = S.projRole && S.projRole !== "all" ? S.projRole : null;
    const cnt = {}, met = {};
    const N = DATA.sprints.length;
    (DATA.movement || []).forEach(m => {
      if (statusFilter && m.state !== statusFilter) return;
      if (proj !== "__all__" && m.project !== proj) return;
      if (roleFilter && roleOf(m.person) !== roleFilter) return;
      cnt[m.person] = cnt[m.person] || new Array(N).fill(0);
      met[m.person] = met[m.person] || new Array(N).fill(0);
      cnt[m.person][m.sprint - 1] += 1;
      met[m.person][m.sprint - 1] += metric === "tasks" ? 1 : (+m.points || 0);
    });
    return { filteredCountByPerson: cnt, filteredMetricByPerson: met };
  })();

  // Contributor list: based on task count in the filtered (or all-state) data
  const contributors = Object.keys(filteredCountByPerson)
    .filter(p => (filteredCountByPerson[p] || []).some(v => v > 0))
    .sort((a,b) => {
      const ac = (filteredCountByPerson[a] || []).reduce((x,y)=>x+y,0);
      const bc = (filteredCountByPerson[b] || []).reduce((x,y)=>x+y,0);
      if (bc !== ac) return bc - ac;
      const am = (filteredMetricByPerson[a] || []).reduce((x,y)=>x+y,0);
      const bm = (filteredMetricByPerson[b] || []).reduce((x,y)=>x+y,0);
      return bm - am;
    });

  // Header stats — done-only + all-status totals
  const donePts = contributors.reduce((s,p) => s + stats[p].donePts, 0);
  const doneT = contributors.reduce((s,p) => s + stats[p].doneT, 0);
  const totalT = contributors.reduce((s,p) => s + stats[p].total, 0);
  const totalPts = contributors.reduce((s,p) => s + stats[p].totalPts, 0);
  const doneRate = totalT ? (doneT/totalT*100) : 0;
  const roleFilter = S.projRole && S.projRole !== "all" ? S.projRole : null;
  const rolePill = roleFilter ? ` <span class="pill neutral" style="margin-left:6px; font-size:11px;">${roleFilter}</span>` : "";
  const statusPill = statusFilter ? ` <span class="pill warn" style="margin-left:6px; font-size:11px;">${statusFilter}</span>` : "";
  nameEl.innerHTML = (isAll ? `🗂️ All Projects` : `🗂️ ${proj}`) + rolePill + statusPill;
  const projCountSuffix = isAll ? ` · ${Object.keys(DATA.projectSprint).filter(n => DATA.projectSprint[n].some(v => v>0)).length} projects` : "";
  // Stats text — always derived from the filtered/all-state data
  const filteredTaskTotal = contributors.reduce((s,p) => s + (filteredCountByPerson[p] || []).reduce((x,y)=>x+y,0), 0);
  const filteredMetricTotal = contributors.reduce((s,p) => s + (filteredMetricByPerson[p] || []).reduce((x,y)=>x+y,0), 0);
  if (statusFilter) {
    const metricStr = metric === "tasks"
      ? `${filteredTaskTotal} tasks`
      : `${filteredMetricTotal.toLocaleString(undefined,{maximumFractionDigits:1})} pts · ${filteredTaskTotal} tasks`;
    statEl.textContent = `${metricStr} in "${statusFilter}" · ${contributors.length} contributors${projCountSuffix}`;
  } else {
    // "All Statuses" → all work including Done/WIP/To Do/Blocked/...
    // Show overall + done breakdown for context
    statEl.textContent = `${filteredMetricTotal.toLocaleString(undefined,{maximumFractionDigits:1})} pts · ${filteredTaskTotal} tasks (all statuses) · ${doneT} Done · ${doneRate.toFixed(0)}% done · ${contributors.length} contributors${projCountSuffix}`;
  }

  // ---- Contributors × Sprint stacked chart ----
  const labels = DATA.sprints;
  const N = DATA.sprints.length;
  // Fallback rule: if total metric is 0 across all contributors (e.g. RR/Bugged
  // tickets that are all 0 pts), use task count so the chart isn't empty.
  const usesCount = contributors.length > 0 && contributors.every(p =>
    !(filteredMetricByPerson[p] || []).some(v => v > 0)
  );
  const datasets = contributors.map((person, i) => {
    const data = usesCount
      ? (filteredCountByPerson[person] || new Array(N).fill(0))
      : (filteredMetricByPerson[person] || new Array(N).fill(0));
    return {
      label: person,
      data,
      backgroundColor: colorFor(person, i, PALETTE),
      borderRadius: 4,
      stack: "a"
    };
  });
  const unitLabel = usesCount ? "tasks (no pts)" : (metric === "tasks" ? "tasks" : "pts");
  const statusLabel = statusFilter
    ? `${statusFilter} · ${unitLabel}`
    : `All Statuses · ${unitLabel}`;
  document.getElementById("projDrillChartTag").textContent = statusLabel;

  // Per-(person × sprint × state) breakdown for tooltip
  // Respects project + role + status filter. When status is filtered, only that state is included.
  const tooltipBreakdown = (() => {
    const out = {};
    const roleFilter2 = S.projRole && S.projRole !== "all" ? S.projRole : null;
    const useCount = usesCount || metric === "tasks";
    (DATA.movement || []).forEach(m => {
      if (proj !== "__all__" && m.project !== proj) return;
      if (roleFilter2 && roleOf(m.person) !== roleFilter2) return;
      if (statusFilter && m.state !== statusFilter) return;
      out[m.person] = out[m.person] || [];
      out[m.person][m.sprint - 1] = out[m.person][m.sprint - 1] || {};
      out[m.person][m.sprint - 1][m.state] = (out[m.person][m.sprint - 1][m.state] || 0) + (useCount ? 1 : (+m.points || 0));
    });
    return out;
  })();
  const tooltipUnit = (usesCount || metric === "tasks") ? "tasks" : "pts";
  // Stack state colors so the tooltip swatches roughly match Status pill colors
  const STATE_COLOR = {
    "Done": "#10b981", "In Progress": "#3b82f6", "Ready for review": "#6366f1",
    "Ready for test": "#06b6d4", "Waiting to INT deploy": "#f59e0b",
    "Waiting to PRD deploy": "#f97316", "To Do": "#94a3b8",
    "Blocked": "#ef4444", "Bugged": "#ec4899", "Removed": "#475569"
  };

  if (projDrillChart) projDrillChart.destroy();
  projDrillChart = new Chart(document.getElementById("projDrillChart"), {
    type: "bar",
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: true, axis: "xy" },
      scales: {
        x: { stacked: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick } },
        y: { stacked: true, beginAtZero: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick } }
      },
      plugins: {
        legend: { position: "bottom", labels: { color: THEME.tick, boxWidth: 10, font: { size: 11 } } },
        stackTotals: { enabled: true, decimals: (metric === "tasks" || usesCount) ? 0 : 1 },
        tooltip: {
          callbacks: {
            title: its => its.length ? `${its[0].dataset.label} · ${its[0].label}` : "",
            label: it => {
              const total = (it.parsed.y || 0).toLocaleString(undefined,{maximumFractionDigits:2});
              const breakdown = tooltipBreakdown[it.dataset.label]?.[it.dataIndex];
              if (!breakdown) return [`${total} ${tooltipUnit}`];
              const entries = Object.entries(breakdown).sort((a,b) => b[1] - a[1]);
              if (entries.length === 1) {
                // Single state — show inline: "16 pts · In Progress"
                return [`${total} ${tooltipUnit} · ${entries[0][0]}`];
              }
              const lines = [`${total} ${tooltipUnit}`];
              entries.forEach(([state, val]) => {
                lines.push(`  ${state}: ${val.toLocaleString(undefined,{maximumFractionDigits:1})}`);
              });
              return lines;
            }
          }
        }
      }
    }
  });

  // ---- Contributor breakdown table (metric-aware: Done / WIP / Bugged / Blocked / To Do / Total) ----
  const useTasks = metric === "tasks";
  const tableUnitLabel = useTasks ? "Tasks Count" : "Story Points";
  document.getElementById("projDrillTableTag").textContent = `${contributors.length} contributors · ${tableUnitLabel}`;
  if (!contributors.length) {
    tableEl.innerHTML = `<div style="color:var(--muted); padding:14px;">ยังไม่มีคน contribute project นี้</div>`;
    return;
  }
  const fmtN = v => !v ? "" : (useTasks ? v.toString() : v.toLocaleString(undefined,{maximumFractionDigits:1}));
  const cell = (v, color) => `<td style="text-align:right; ${color && v ? `color:${color}; font-weight:600;` : ""}">${fmtN(v)}</td>`;
  const get = (r, key) => useTasks ? r[key + "T"] : r[key + "Pts"];
  // Map keys to the stat fields:
  //   done → doneT / donePts
  //   wip  → wip / wipPts
  //   bugged → bugged / buggedPts
  //   blocked → blocked / blockedPts
  //   todo → todo / todoPts
  //   total → total / totalPts
  // Normalize so get(r, k) works:
  const norm = (r) => ({
    doneT: r.doneT, donePts: r.donePts,
    wipT: r.wip, wipPts: r.wipPts,
    buggedT: r.bugged, buggedPts: r.buggedPts,
    blockedT: r.blocked, blockedPts: r.blockedPts,
    todoT: r.todo, todoPts: r.todoPts,
    totalT: r.total, totalPts: r.totalPts
  });

  let html = `<table><thead><tr>
    <th>Person</th>
    <th style="text-align:right">Done</th>
    <th style="text-align:right">WIP</th>
    <th style="text-align:right">Bugged</th>
    <th style="text-align:right">Blocked</th>
    <th style="text-align:right">To Do</th>
    <th style="text-align:right">Total</th>
  </tr></thead><tbody>`;
  contributors.forEach(p => {
    const r = norm(stats[p]);
    const rate = stats[p].total ? (stats[p].doneT/stats[p].total*100) : 0;
    html += `<tr>
      <td style="font-weight:500;">${p}${roleBadge(p)}<span style="margin-left:8px; font-size:10px; color:var(--muted);">${rate.toFixed(0)}%</span></td>
      ${cell(get(r,"done"), "var(--good-text)")}
      ${cell(get(r,"wip"), "var(--accent-text)")}
      ${cell(get(r,"bugged"), "var(--bad-text)")}
      ${cell(get(r,"blocked"), "var(--bad-text)")}
      ${cell(get(r,"todo"), "var(--warn-text)")}
      <td style="text-align:right; font-weight:600;">${fmtN(get(r,"total"))}</td>
    </tr>`;
  });
  // Totals row
  const totals = contributors.reduce((acc,p) => {
    const r = norm(stats[p]);
    acc.done += get(r,"done"); acc.wip += get(r,"wip"); acc.bugged += get(r,"bugged");
    acc.blocked += get(r,"blocked"); acc.todo += get(r,"todo"); acc.total += get(r,"total");
    return acc;
  }, { done:0, wip:0, bugged:0, blocked:0, todo:0, total:0 });
  html += `<tr class="total-row">
    <td>TOTAL</td>
    <td style="text-align:right;">${fmtN(totals.done)}</td>
    <td style="text-align:right;">${fmtN(totals.wip)}</td>
    <td style="text-align:right;">${fmtN(totals.bugged)}</td>
    <td style="text-align:right;">${fmtN(totals.blocked)}</td>
    <td style="text-align:right;">${fmtN(totals.todo)}</td>
    <td style="text-align:right;">${fmtN(totals.total)}</td>
  </tr>`;
  html += "</tbody></table>";
  tableEl.innerHTML = html;
}

// ============================================================================
//  BUGS
// ============================================================================
const BUG_STATE_COLORS = {
  "Done": "#10b981",
  "Removed": "#475569",
  "Blocked": "#ef4444",
  "Bugged": "#ec4899",
  "In Progress": "#3b82f6",
  "Ready for review": "#6366f1",
  "Ready for test": "#06b6d4",
  "Waiting to INT deploy": "#f59e0b",
  "Waiting to PRD deploy": "#f97316",
  "To Do": "#94a3b8"
};

function buildBugsTab(){
  const bugs = (DATA.movement || []).filter(m => m.type === "Bug");
  const N = DATA.sprints.length;

  // ---- KPIs ----
  const total = bugs.length;
  const done = bugs.filter(b => b.state === "Done").length;
  const open = bugs.filter(b => !["Done","Removed"].includes(b.state)).length;
  const removed = bugs.filter(b => b.state === "Removed").length;
  const closeRate = total ? (done/total*100) : 0;
  document.getElementById("bugKpis").innerHTML = `
    <div class="kpi"><div class="label">Total Bugs</div><div class="value">${total}</div><div class="hint">Work Item Type = Bug</div></div>
    <div class="kpi"><div class="label">Closed (Done)</div><div class="value" style="color:var(--good-text);">${done}</div><div class="hint">${closeRate.toFixed(0)}% close rate</div></div>
    <div class="kpi"><div class="label">Open</div><div class="value" style="color:${open > 0 ? 'var(--bad-text)' : 'var(--muted)'};">${open}</div><div class="hint">In Progress / Blocked / RR / etc.</div></div>
    <div class="kpi"><div class="label">Removed</div><div class="value" style="color:var(--muted);">${removed}</div><div class="hint">cancelled / out-of-scope</div></div>
  `;

  // ---- Bug Trend by Sprint (stacked bar) ----
  // Build per-state per-sprint counts
  const stateSet = Array.from(new Set(bugs.map(b => b.state)));
  // Order states for chart stacking: Done first (bottom), then critical states
  const stateOrder = ["Done","Removed","In Progress","Ready for review","Ready for test","Waiting to INT deploy","Waiting to PRD deploy","To Do","Blocked","Bugged"]
    .filter(s => stateSet.includes(s));

  const labels = DATA.sprints;
  const datasets = stateOrder.map((state, i) => {
    const arr = new Array(N).fill(0);
    bugs.filter(b => b.state === state).forEach(b => { arr[b.sprint - 1] += 1; });
    return {
      label: state,
      data: arr,
      backgroundColor: BUG_STATE_COLORS[state] || "#64748b",
      borderRadius: 4,
      stack: "a"
    };
  });

  if (bugTrendChart) bugTrendChart.destroy();
  bugTrendChart = new Chart(document.getElementById("bugTrendChart"), {
    type: "bar",
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: true, axis: "xy" },
      scales: {
        x: { stacked: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick } },
        y: { stacked: true, beginAtZero: true, grid: { color: THEME.grid }, ticks: { color: THEME.tick, precision: 0 } }
      },
      plugins: {
        legend: { position: "bottom", labels: { color: THEME.tick, boxWidth: 10, font: { size: 11 } } },
        stackTotals: { enabled: true, decimals: 0 },
        tooltip: {
          callbacks: {
            title: its => its.length ? `${its[0].dataset.label} · ${its[0].label}` : "",
            label: it => `${it.parsed.y} ${it.parsed.y === 1 ? "bug" : "bugs"}`
          }
        }
      }
    }
  });
  document.getElementById("bugTrendTag").textContent = `${stateOrder.length} states · ${total} bugs across ${N} sprints`;

  // ---- Bugs by Person ----
  const byPerson = {};
  bugs.forEach(b => {
    byPerson[b.person] = byPerson[b.person] || { done:0, open:0, removed:0, total:0 };
    byPerson[b.person].total++;
    if (b.state === "Done") byPerson[b.person].done++;
    else if (b.state === "Removed") byPerson[b.person].removed++;
    else byPerson[b.person].open++;
  });
  const persons = Object.keys(byPerson).sort((a,b) => byPerson[b].total - byPerson[a].total);
  document.getElementById("bugPersonTag").textContent = `${persons.length} people · ${total} bugs`;
  let phtml = `<table><thead><tr><th>Person</th><th style="text-align:right">Done</th><th style="text-align:right">Open</th><th style="text-align:right">Removed</th><th style="text-align:right">Total</th><th style="text-align:right">Close %</th></tr></thead><tbody>`;
  persons.forEach(p => {
    const r = byPerson[p];
    const rate = r.total ? (r.done/r.total*100) : 0;
    phtml += `<tr>
      <td style="font-weight:500;">${p}${roleBadge(p)}</td>
      <td style="text-align:right; color:var(--good-text); font-weight:600;">${r.done}</td>
      <td style="text-align:right; ${r.open?'color:var(--bad-text); font-weight:600;':''}">${r.open || ""}</td>
      <td style="text-align:right; color:var(--muted);">${r.removed || ""}</td>
      <td style="text-align:right; font-weight:600;">${r.total}</td>
      <td style="text-align:right; color:var(--muted);">${rate.toFixed(0)}%</td>
    </tr>`;
  });
  phtml += "</tbody></table>";
  document.getElementById("bugPersonTable").innerHTML = phtml;

  // ---- Bugs by Project ----
  const byProject = {};
  bugs.forEach(b => {
    byProject[b.project] = byProject[b.project] || { done:0, open:0, removed:0, total:0 };
    byProject[b.project].total++;
    if (b.state === "Done") byProject[b.project].done++;
    else if (b.state === "Removed") byProject[b.project].removed++;
    else byProject[b.project].open++;
  });
  const projs = Object.keys(byProject).sort((a,b) => byProject[b].total - byProject[a].total);
  document.getElementById("bugProjectTag").textContent = `${projs.length} projects · ${total} bugs`;
  let projHtml = `<table><thead><tr><th>Project</th><th style="text-align:right">Done</th><th style="text-align:right">Open</th><th style="text-align:right">Removed</th><th style="text-align:right">Total</th><th style="text-align:right">Close %</th></tr></thead><tbody>`;
  projs.forEach(p => {
    const r = byProject[p];
    const rate = r.total ? (r.done/r.total*100) : 0;
    projHtml += `<tr>
      <td style="font-weight:500;">${p}</td>
      <td style="text-align:right; color:var(--good-text); font-weight:600;">${r.done}</td>
      <td style="text-align:right; ${r.open?'color:var(--bad-text); font-weight:600;':''}">${r.open || ""}</td>
      <td style="text-align:right; color:var(--muted);">${r.removed || ""}</td>
      <td style="text-align:right; font-weight:600;">${r.total}</td>
      <td style="text-align:right; color:var(--muted);">${rate.toFixed(0)}%</td>
    </tr>`;
  });
  projHtml += "</tbody></table>";
  document.getElementById("bugProjectTable").innerHTML = projHtml;
}

// ============================================================================
//  STATUS
// ============================================================================
function updateStatusKPIs(){
  const src = S.statusMetric === "points" ? DATA.statusPersonPts : DATA.statusPersonCount;
  const totals = DATA.statusLabels.map((_,si) => sum(Object.values(src).map(a=>a[si])));
  const grand = sum(totals);

  const html = DATA.statusLabels.map((lbl,i) => {
    const v = totals[i], pct = grand ? (v/grand*100) : 0;
    const cls = i===0 ? "good" : (i===7 || i===8 ? "bad" : (i>=1 && i<=5 ? "warn" : "neutral"));
    const valueDisplay = S.statusMetric === "points" ? v.toLocaleString(undefined,{maximumFractionDigits:1}) : v;
    return `<div class="kpi"><div class="label">${lbl}</div><div class="value" style="color:${DATA.statusColors[i]}">${valueDisplay}</div><div class="hint"><span class="pill ${cls}">${pct.toFixed(1)}%</span></div></div>`;
  }).join("");
  document.getElementById("statusKpis").innerHTML = html;
}

let statusHoverIndex = null;
let statusEntries = [];

function applyStatusHover(idx){
  if (!statusChart) return;
  if (idx === statusHoverIndex) return;
  statusHoverIndex = idx;
  statusChart.data.datasets.forEach(ds => {
    const base = ds.__base;
    ds.backgroundColor = ds.data.map((_, j) => {
      if (idx === null) return base;
      return j === idx ? base : base + "1a";
    });
  });
  statusChart.update("none");

  const name = idx === null ? null : (statusEntries[idx] && statusEntries[idx].n);
  document.querySelectorAll("#doneTable tbody tr").forEach(tr => {
    const match = name && tr.dataset.name === name;
    tr.style.background = match ? "rgba(99,102,241,0.18)" : "";
    tr.style.outline = match ? "1px solid #6366f1" : "";
  });
  const tagEl = document.getElementById("statusTag");
  if (tagEl && tagEl.dataset.base) {
    tagEl.textContent = name ? `${name} only` : tagEl.dataset.base;
  }
}

function buildStatusChart(){
  const ctx = document.getElementById("statusChart");
  const isPerson = S.statusView === "person";
  const src = isPerson
    ? (S.statusMetric === "points" ? DATA.statusPersonPts : DATA.statusPersonCount)
    : (S.statusMetric === "points" ? DATA.statusProjectPts : DATA.statusProjectCount);

  // sort by total descending
  const entries = Object.entries(src).map(([n,a])=>({n, a, total:sum(a)})).sort((a,b)=>b.total-a.total);
  statusEntries = entries;
  statusHoverIndex = null;
  const labels = entries.map(e=>e.n);

  const datasets = DATA.statusLabels.map((lbl,si)=>{
    const base = DATA.statusColors[si];
    return {
      label: lbl,
      data: entries.map(e=>e.a[si]),
      backgroundColor: entries.map(() => base),
      __base: base,
      borderRadius: 4,
      stack: "a"
    };
  });

  if (statusChart) statusChart.destroy();
  statusChart = new Chart(ctx, {
    type:"bar",
    data:{labels, datasets},
    options:{
      indexAxis:"y",
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:"nearest", intersect:true, axis:"xy"},
      onHover: (evt, els) => {
        const newIdx = els.length ? els[0].index : null;
        applyStatusHover(newIdx);
      },
      scales:{
        x:{stacked:true,beginAtZero:true,grid:{color:THEME.grid},ticks:{color:THEME.tick}},
        y:{stacked:true,grid:{display:false},ticks:{color:THEME.tick}}
      },
      plugins:{
        legend:{position:"bottom",labels:{color:THEME.tick,boxWidth:10,font:{size:11}}},
        tooltip:{
          callbacks:{
            title: its => its.length ? `${its[0].dataset.label} · ${its[0].label}` : '',
            label: it => `${(it.parsed.x||0).toLocaleString(undefined,{maximumFractionDigits:2})}`
          }
        }
      }
    }
  });

  const baseTag = `By ${isPerson?"Person":"Project"} · ${VIEW_LABEL[S.statusMetric==="points"?"points":"tasks"]}`;
  const tagEl = document.getElementById("statusTag");
  tagEl.textContent = baseTag;
  tagEl.dataset.base = baseTag;

  ctx.onmouseleave = () => applyStatusHover(null);
}

function buildDoneTable(){
  const isPerson = S.statusView === "person";
  const src = isPerson
    ? (S.statusMetric === "points" ? DATA.statusPersonPts : DATA.statusPersonCount)
    : (S.statusMetric === "points" ? DATA.statusProjectPts : DATA.statusProjectCount);

  const rows = Object.entries(src).map(([n,a])=>{
    const total = sum(a);
    const done = a[0];
    const rate = total ? done/total : 0;
    return {n, a, total, done, rate};
  }).sort((a,b)=> b.rate - a.rate);

  let html = `<table><thead><tr><th>${isPerson?"Name":"Project"}</th>${DATA.statusLabels.map(l=>`<th>${l}</th>`).join("")}<th>Total</th><th>% Done</th><th>Progress</th></tr></thead><tbody>`;
  rows.forEach(r => {
    const pct = (r.rate*100).toFixed(1);
    const nameCell = isPerson ? `<td>${r.n}${roleBadge(r.n)}</td>` : `<td>${r.n}</td>`;
    html += `<tr data-name="${r.n}">${nameCell}${r.a.map((v,i)=>`<td style="color:${v?DATA.statusColors[i]:'#64748b'}">${fmt(v)}</td>`).join("")}<td style="font-weight:600">${fmt(r.total)}</td><td>${pct}%</td><td><span class="progress"><div style="width:${pct}%"></div></span></td></tr>`;
  });
  html += "</tbody></table>";
  document.getElementById("doneTable").innerHTML = html;

  const tbody = document.querySelector("#doneTable tbody");
  if (tbody) {
    tbody.addEventListener("mouseover", e => {
      const tr = e.target.closest("tr[data-name]");
      if (!tr) return;
      const idx = statusEntries.findIndex(en => en.n === tr.dataset.name);
      if (idx !== -1) applyStatusHover(idx);
    });
    tbody.addEventListener("mouseleave", () => applyStatusHover(null));
  }
}

// ============================================================================
//  POPULATE & WIRE UP
// ============================================================================
function populateSelects(){
  const allNames = Object.keys(DATA.points);
  // group people by role for grouped dropdown
  const grouped = ROLE_ORDER.map(role => ({
    role,
    members: allNames.filter(n => roleOf(n) === role)
  })).filter(g => g.members.length);
  const optgroups = grouped.map(g =>
    `<optgroup label="${g.role}">` +
    g.members.map(n => `<option value="${n}">${n} · ${g.role}</option>`).join("") +
    `</optgroup>`
  ).join("");
  document.getElementById("memberSelect").innerHTML =
    `<option value="All">All (no highlight)</option>` + optgroups;

  // Project drill dropdown — list projects with any Done points, sorted by total desc
  const projectsRanked = Object.entries(DATA.projectSprint)
    .map(([n, arr]) => [n, arr.reduce((a,b)=>a+(+b||0),0)])
    .filter(([,v]) => v > 0)
    .sort((a,b) => b[1] - a[1]);
  const allTotal = projectsRanked.reduce((s,[,v]) => s + v, 0);
  const projOpts = `<option value="__all__">🗂️ All Projects · ${allTotal.toLocaleString(undefined,{maximumFractionDigits:1})} pts</option>` +
    projectsRanked.map(([n,v]) =>
      `<option value="${n}">${n} · ${v.toLocaleString(undefined,{maximumFractionDigits:1})} pts</option>`
    ).join("");
  document.getElementById("projDrill").innerHTML = projOpts;
  if (!S.projDrill) S.projDrill = "__all__";
  document.getElementById("projDrill").value = S.projDrill;
}

function switchSection(name){
  S.section = name;
  document.querySelectorAll(".navtab").forEach(t => t.classList.toggle("active", t.dataset.section === name));
  document.querySelectorAll(".section").forEach(s => s.classList.toggle("active", s.id === `section-${name}`));
  const banner = document.getElementById("staleBanner");
  if (banner && banner.dataset.hasContent === "1") {
    const only = name !== "people";
    banner.classList.toggle("section-only", only);
    banner.style.display = only ? "none" : "block";
  }
  refresh();
}

function refresh(){
  if (S.section === "overview") {
    updateKPIs();
    renderLeaveStrip();
    buildTrendChart();
    buildRoleCharts();
    buildTopChart();
    buildCapacityChart();
    buildAvgTrendChart();
  } else if (S.section === "projects") {
    updateProjKPIs();
    buildProjectDrill();
  } else if (S.section === "bugs") {
    buildBugsTab();
  } else if (S.section === "status") {
    updateStatusKPIs();
    buildStatusChart();
    buildDoneTable();
  } else if (S.section === "logic") {
    buildLogicTab();
  }
}

// ============================================================================
//  LOGIC / METHODOLOGY TAB
// ============================================================================
function buildLogicTab(){
  // Sprint coverage from data (sprints with at least one Done task)
  const sprintTotals = DATA.sprints.map((_, i) =>
    Object.values(DATA.points).reduce((a, arr) => a + (arr[i] || 0), 0)
  );
  const activeSprints = sprintTotals.map((v, i) => v > 0 ? i + 1 : null).filter(v => v !== null);
  const sprintRangeLabel = activeSprints.length
    ? `Sprint ${activeSprints[0]}–${activeSprints[activeSprints.length - 1]} (${activeSprints.length} sprints loaded)`
    : "no data";

  const totalDonePts = sum(Object.values(DATA.points).map(sum));
  const totalDoneTasks = sum(Object.values(DATA.tasks).map(sum));
  const totalAllPts = sum(Object.values(DATA.statusPersonPts).map(sum));
  const totalAllTasks = sum(Object.values(DATA.statusPersonCount).map(sum));

  // ---- Card 1: Filtering ----
  const iterRange = activeSprints.length
    ? `M\\2026\\${activeSprints[0]} → M\\2026\\${activeSprints[activeSprints.length - 1]}`
    : "—";
  const filterCard = `<div class="card">
    <h3>1 · Filtering Rules <span class="tag">what gets included</span></h3>
    <div class="insights-grid" style="margin-top:8px;">
      <div class="insight">
        <div class="ins-title">Work Item Type</div>
        <div class="ins-value">Task · Bug</div>
        <div class="ins-hint">ตัด Feature · PBI · Epic ออก</div>
      </div>
      <div class="insight info">
        <div class="ins-title">Iteration</div>
        <div class="ins-value">${iterRange}</div>
        <div class="ins-hint">${sprintRangeLabel} · auto-refresh ทุก sprint ที่อัปไฟล์</div>
      </div>
      <div class="insight warn">
        <div class="ins-title">Assignee</div>
        <div class="ins-value">required</div>
        <div class="ins-hint">Task ไม่มีคน assign → ข้าม</div>
      </div>
      <div class="insight good">
        <div class="ins-title">Backlog / Out-of-scope</div>
        <div class="ins-value">excluded</div>
        <div class="ins-hint">M\\Backlog · M\\2025\\* · iteration ที่ไม่มี sprint number</div>
      </div>
    </div>
  </div>`;

  // ---- Card 2: Point Counting ----
  const pointCard = `<div class="card" style="margin-top:14px;">
    <h3>2 · Point Counting <span class="tag">Done-only</span></h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:8px;">
      <div style="background:rgba(16,185,129,0.08); border:1px solid #10b98155; border-radius:10px; padding:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="width:10px; height:10px; border-radius:2px; background:#10b981;"></span>
          <span style="font-weight:600; color:var(--good-text);">นับ Point</span>
        </div>
        <div style="font-size:13px; color:var(--text); line-height:1.7;">
          เฉพาะ <code style="background:var(--panel-2); border:1px solid var(--border); padding:1px 6px; border-radius:4px; color:var(--accent-text); font-weight:600;">state == "Done"</code>
          เท่านั้นที่บวกเข้า:<br>
          • Total Points / Tasks per person<br>
          • Project × Sprint contribution<br>
          • Person × Project matrix<br>
          • KPIs ในทุก tab (ยกเว้น Status)
        </div>
        <div style="margin-top:10px; padding:8px 10px; background:rgba(0,0,0,0.2); border-radius:6px; font-size:12px;">
          <strong style="color:var(--good-text);">${totalDonePts.toLocaleString()}</strong> pts ·
          <strong style="color:var(--good-text);">${totalDoneTasks}</strong> tasks · Done
        </div>
      </div>
      <div style="background:rgba(148,163,184,0.06); border:1px solid #475569; border-radius:10px; padding:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="width:10px; height:10px; border-radius:2px; background:#94a3b8;"></span>
          <span style="font-weight:600; color:var(--text);">ไม่นับ Point</span>
        </div>
        <div style="font-size:13px; color:var(--text); line-height:1.7;">
          งานสถานะอื่น (In Progress, Ready for review/test, Waiting to deploy, To Do, Blocked, Bugged, Removed) →<br>
          • <strong style="color:var(--warn-text);">ไม่บวก</strong> เข้า KPI ใน Overview/People/Projects<br>
          • <strong style="color:#22d3ee;">โชว์ครบ</strong> ใน Status tab (เห็น pipeline)
        </div>
        <div style="margin-top:10px; padding:8px 10px; background:rgba(0,0,0,0.2); border-radius:6px; font-size:12px;">
          <strong style="color:var(--text);">${totalAllPts.toLocaleString(undefined,{maximumFractionDigits:1})}</strong> pts ·
          <strong style="color:var(--text);">${totalAllTasks}</strong> tasks · all statuses
        </div>
      </div>
    </div>
  </div>`;

  // ---- Card 3: Status Buckets ----
  const pillFor = (i) => i===0 ? "good" : (i===7||i===8 ? "bad" : (i>=1&&i<=5 ? "warn" : "neutral"));
  const statusRows = DATA.statusLabels.map((lbl, i) => {
    const c = DATA.statusColors[i];
    const cls = pillFor(i);
    const counted = i === 0 ? "✓ Counted" : "—";
    return `<tr>
      <td style="padding:10px 12px; text-align:left; border-bottom:1px solid var(--border);">
        <span style="display:inline-block; width:10px; height:10px; border-radius:2px; background:${c}; margin-right:10px; vertical-align:middle;"></span>
        <span style="font-weight:500; color:var(--text);">${lbl}</span>
      </td>
      <td style="padding:10px 12px; text-align:center; border-bottom:1px solid var(--border);">
        <span style="font-family:monospace; font-size:11px; color:var(--muted);">${c}</span>
      </td>
      <td style="padding:10px 12px; text-align:center; border-bottom:1px solid var(--border);">
        <span class="pill ${cls}">${cls}</span>
      </td>
      <td style="padding:10px 12px; text-align:right; border-bottom:1px solid var(--border); color:${i===0?'var(--good-text)':'#64748b'}; font-weight:${i===0?600:400};">${counted}</td>
    </tr>`;
  }).join("");
  const statusCard = `<div class="card" style="margin-top:14px;">
    <h3>3 · Status Buckets <span class="tag">${DATA.statusLabels.length} statuses · ตรงตาม Azure 100%</span></h3>
    <div style="overflow:auto; border-radius:10px; border:1px solid var(--border); margin-top:8px;">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="background:var(--panel-2);">
            <th style="padding:10px 12px; text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Status</th>
            <th style="padding:10px 12px; text-align:center; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Color</th>
            <th style="padding:10px 12px; text-align:center; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Pill</th>
            <th style="padding:10px 12px; text-align:right; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Counts in KPI?</th>
          </tr>
        </thead>
        <tbody>${statusRows}</tbody>
      </table>
    </div>
  </div>`;

  // ---- Card 4: Project Mapping ----
  const projectGroups = [
    {name:"NCSWT", rules:["HCA / NCSWT / NSCWT prefix", "scholarship modules (Student, Fund Type, Fund Allocation, Academic)"]},
    {name:"Gift-Card-2026", rules:["HCA Gift Card / Top-up"]},
    {name:"Event-Registration-2026", rules:["HCA Event Registration"]},
    {name:"P2CR2", rules:["ChangHP P2-CR2 / Coupon / Key account / Personal assistant"]},
    {name:"Chang HomePro", rules:["Chang Homepro / Chang HP (other)"]},
    {name:"InsureTech", rules:["IST: / Insurtech / [Insurtech] prefix"]},
    {name:"Village Fund", rules:["VFM / VF- / VFM-PC prefix"]},
    {name:"VFM-MA_25", rules:["VFM-MA_25 (specific)"]},
    {name:"MorePOS", rules:["MorePOS / MPOS / POS:"]},
    {name:"Breaking Par", rules:["BKP prefix"]},
    {name:"Merlin", rules:["Merlin / Merlin POC / Merlin MVP / Merin"]},
    {name:"Gamesmith", rules:["Gamesmith (anywhere)"]},
    {name:"khaojai it", rules:["khaojai / Khojai"]},
    {name:"AdelphiISRP", rules:["Adelphi / PAM01"]},
    {name:"Ship360EXP", rules:["Ship360 / Ship 360"]},
    {name:"POC", rules:["Thai Alexa / MoreChange / Maggie POC / ADO POC"]},
    {name:"2026-1", rules:["Hatyai / HatYai (Hatyai project)"]},
    {name:"Andaman Phuket", rules:["Vana Nava / Andaman"]},
    {name:"Other singles", rules:["Zleep, GENCO, MeApp, OEG, Seree Golf, Market Village, Monty, AI, Campaign-Accumulate-2025, Additional Requirement"]},
    {name:"Internal/Ops", rules:["Fallback: meetings, year review, recruitment, research, Morestudio internal, generic ops"]},
  ];
  const projChips = projectGroups.map(g => `
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${g.name}</div>
      <div style="font-size:12px; color:var(--muted); line-height:1.5;">
        ${g.rules.map(r => `• ${r}`).join("<br>")}
      </div>
    </div>`).join("");
  const projectCard = `<div class="card" style="margin-top:14px;">
    <h3>4 · Project Mapping <span class="tag">${Object.keys(DATA.projectSprint).length} projects · prefix-based rules</span></h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px; margin-top:8px;">
      ${projChips}
    </div>
  </div>`;

  // ---- Card 5: Roles ----
  const roleGroups = ROLE_ORDER.map(role => ({
    role,
    members: Object.keys(ROLES).filter(n => ROLES[n] === role)
  })).filter(g => g.members.length);
  const roleRows = roleGroups.map(g => {
    const c = ROLE_COLORS[g.role];
    return `<div style="background:var(--panel-2); border-radius:10px; padding:14px; border-left:4px solid ${c};">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <span style="font-weight:700; color:${c}; font-size:14px;">${g.role}</span>
        <span style="font-size:11px; color:var(--muted);">${g.members.length} ${g.members.length === 1 ? 'person' : 'people'}</span>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${g.members.map(n => `<span style="background:${c}22; color:${c}; border:1px solid ${c}55; padding:3px 10px; border-radius:999px; font-size:12px; font-weight:500;">${n}</span>`).join("")}
      </div>
    </div>`;
  }).join("");
  const totalPeople = Object.keys(ROLES).length;
  const roleCard = `<div class="card" style="margin-top:14px;">
    <h3>5 · Team Roles <span class="tag">${totalPeople} people · ${roleGroups.length} roles</span></h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:8px;">
      ${roleRows}
    </div>
  </div>`;

  // ---- Card 6: People Insights criteria ----
  const insightRules = [
    { icon:"📊", title:"Workload", rule:"รวม Story Points & Tasks ทั้งปี + นับจำนวน sprint ที่มี activity + Avg pts/task", flag:"warn เมื่อ total points = 0" },
    { icon:"✅", title:"Done Rate", rule:"donePts / allStatusPts × 100 (จาก status sheet)", flag:"good ≥ 70% · info 40–69% · warn < 40%" },
    { icon:"📈", title:"Recent Trend", rule:"เทียบผลรวมของ 3 sprints ล่าสุด (latest-2 ถึง latest) กับ 3 sprints ก่อนหน้า (latest-5 ถึง latest-3)", flag:"good = เพิ่มขึ้น · warn = ลดลง > 40% · info = ลดลง ≤ 40% หรือคงที่" },
    { icon:"🏔️", title:"Peak Sprint", rule:"หา sprint ที่ได้ points สูงสุดทั้งปี", flag:"info เสมอ (ถ้ามี activity)" },
    { icon:"🎯", title:"Top Projects", rule:"เลือก 3 project ที่ contribute points มากที่สุด (ตัดที่ 0)", flag:"warn ถ้าไม่มี project" },
    { icon:"⚠️", title:"Risk Flags", rule:"แสดงเมื่อ Blocked > 0 หรือ Bugged > 0 (จำนวน tasks)", flag:"bad เสมอ (ถ้าเจอ)" },
    { icon:"🔄", title:"Work in Progress", rule:"รวม In Progress + Ready for review + Ready for test + Waiting to INT/PRD deploy", flag:"warn > 15 · info ≤ 15" },
    { icon:"📝", title:"Backlog (To Do)", rule:"จำนวน tasks สถานะ To Do", flag:"warn > 20 · info ≤ 20" },
    { icon:"⏰", title:"Stale", rule:"ไม่มี task assigned (ทุก state) ทั้งใน sprint ล่าสุด (latest) และ sprint ก่อนหน้า (latest-1)", flag:"bad · สอดคล้องกับ warning banner ด้านบน" },
    { icon:"👤", title:"Role Observation", rule:"ข้อความสรุปตาม role ของบุคคล (Dev / Designer / BA / Tester / PC / CEO) + threshold ของ points รวมทั้งปี", flag:"info เสมอ" },
  ];
  const insightChips = insightRules.map(r => `
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent-2);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${r.icon} ${r.title}</div>
      <div style="font-size:12px; color:var(--text); line-height:1.55; margin-bottom:6px;">${r.rule}</div>
      <div style="font-size:11px; color:var(--muted);"><strong style="color:var(--warn-text);">Flag:</strong> ${r.flag}</div>
    </div>`).join("");
  const insightCard = `<div class="card" style="margin-top:14px;">
    <h3>6 · People · 🔍 Insights criteria <span class="tag">${insightRules.length} rules · auto per person</span></h3>
    <div style="font-size:13px; color:var(--muted); margin:4px 0 12px;">
      เกณฑ์ที่ใช้คำนวณการ์ด Insight แต่ละใบในหน้า <strong style="color:var(--text);">People</strong> (แสดงเฉพาะเมื่อเลือก person)
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
      ${insightChips}
    </div>
    <div style="margin-top:12px; padding:10px 12px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px; font-size:12px; color:var(--warn-text);">
      <strong>Stale rule (สอดคล้องกับ warning banner):</strong> "sprint ล่าสุด" ใช้ <strong>ปฏิทิน sprint</strong> (SPRINT_DATES) เทียบกับวัน snapshot (${SNAPSHOT_DATE}) ไม่ใช่ sprint ที่ไกลที่สุดที่มี task assigned. ตรวจ 2 sprint ย้อนหลัง (latest-1, latest). ถ้าคน ๆ นั้น <strong>ไม่มี task assigned เลย</strong> (<em>นับทุก state</em>) ทั้งสอง sprint → ถือว่า <strong>ไม่พบ task งานเกิน 2 sprints</strong>. เกณฑ์นี้ไม่ลงโทษคนที่มีงาน In Progress / Waiting to deploy / Blocked และไม่ treat sprint ที่ยังมาไม่ถึงเป็น "ปัจจุบัน"
    </div>
  </div>`;

  // ---- Header ----
  const header = `<div style="background:linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.05)); border:1px solid var(--border); border-radius:14px; padding:20px 24px; margin-bottom:14px;">
    <h2 style="margin:0; font-size:20px; color:var(--text); font-weight:700;">Methodology &amp; Logic</h2>
    <div style="color:var(--muted); font-size:13px; margin-top:6px;">วิธีคำนวณตัวเลขในแดชบอร์ด · refresh ทุกครั้งที่อัปไฟล์ CSV ใหม่</div>
  </div>`;

  // ---- Card 7: Project Insights criteria ----
  const projInsightRules = [
    { icon:"🗂️", title:"Portfolio", rule:"นับ active projects และผลรวม points ใน sprint range ที่เลือก", flag:"info เสมอ" },
    { icon:"🎯", title:"Concentration (Top-3 Share)", rule:"ผลรวม points ของ 3 projects ใหญ่สุด ÷ total points ใน range", flag:"good < 50% · info 50–69% · warn ≥ 70% (กระจุก)" },
    { icon:"🏆", title:"Leader", rule:"Project ที่มี points สูงสุดใน range", flag:"good เสมอ (ถ้ามี)" },
    { icon:"📈", title:"Rising", rule:"Project ที่ delta = (3 sprints ล่าสุด) − (3 sprints ก่อนหน้า) บวกสูงสุด (ต้องมี yearTotal > 5)", flag:"good" },
    { icon:"📉", title:"Fading", rule:"Project ที่ delta ลบหนักสุด (ต้องมี prior > 0 และ yearTotal > 10)", flag:"warn" },
    { icon:"⏰", title:"Stale Projects", rule:"Project ที่มี points ใน range > 0 แต่ 2 sprints สุดท้ายใน range = 0", flag:"bad" },
    { icon:"⚠️", title:"Risk Projects", rule:"Project ที่มี Blocked หรือ Bugged > 0 (นับจาก status sheet ทั้งปี)", flag:"bad · โชว์ top 3" },
    { icon:"✅", title:"Best / Lowest Done Rate", rule:"donePts/grandPts × 100 · เฉพาะ project ที่มี grandPts ≥ 30 (ตัด noise)", flag:"best: good ≥ 70% · worst: warn < 40%" },
    { icon:"📝", title:"Big Backlog", rule:"Project ที่มี tasks สถานะ To Do > 20", flag:"warn · โชว์ top 3" },
    { icon:"🔄", title:"WIP Concentration", rule:"Project ที่รวม In Progress + Review/Test + Waiting deploy > 15", flag:"info · โชว์ top 3" },
  ];
  const projInsightChips = projInsightRules.map(r => `
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent-2);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${r.icon} ${r.title}</div>
      <div style="font-size:12px; color:var(--text); line-height:1.55; margin-bottom:6px;">${r.rule}</div>
      <div style="font-size:11px; color:var(--muted);"><strong style="color:var(--warn-text);">Flag:</strong> ${r.flag}</div>
    </div>`).join("");
  const projInsightCard = `<div class="card" style="margin-top:14px;">
    <h3>7 · Projects · 🔍 Insights criteria <span class="tag">${projInsightRules.length} rules · auto</span></h3>
    <div style="font-size:13px; color:var(--muted); margin:4px 0 12px;">
      เกณฑ์ที่ใช้คำนวณการ์ด Insight ในหน้า <strong style="color:var(--text);">Projects</strong> (reactive ตาม Sprint Range ที่เลือก)
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
      ${projInsightChips}
    </div>
    <div style="margin-top:12px; padding:10px 12px; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.3); border-radius:8px; font-size:12px; color:var(--accent-text);">
      <strong>Trend window:</strong> recent = 3 sprints สุดท้ายก่อน latest (inclusive) · prior = 3 sprints ก่อนหน้า · latest = sprint ล่าสุดที่ <em>ทีมใด ๆ</em> มี activity
    </div>
  </div>`;

  document.getElementById("logicContent").innerHTML = header + filterCard + pointCard + statusCard + projectCard + roleCard + insightCard + projInsightCard;
}

function wireUp(){
  document.querySelectorAll(".navtab").forEach(t => t.addEventListener("click", () => switchSection(t.dataset.section)));

  document.getElementById("viewSelect").addEventListener("change", e => { S.view = e.target.value; refresh(); });
  document.getElementById("memberSelect").addEventListener("change", e => { S.highlight = e.target.value; refresh(); });
  document.getElementById("roleSelect").addEventListener("change", e => { S.role = e.target.value; refresh(); });
  document.getElementById("sprintRange").addEventListener("change", e => { S.range = e.target.value; refresh(); });
  document.getElementById("chartType").addEventListener("change", e => { S.chartType = e.target.value; buildTrendChart(); });
  document.getElementById("topSprint").addEventListener("change", e => { S.topSprint = e.target.value; buildTopChart(); });

  document.getElementById("projSprintRange").addEventListener("change", e => { S.projRange = e.target.value; refresh(); });
  document.getElementById("projRole").addEventListener("change", e => { S.projRole = e.target.value; refresh(); });
  document.getElementById("projDrill").addEventListener("change", e => { S.projDrill = e.target.value; buildProjectDrill(); });
  document.getElementById("projDrillMetric").addEventListener("change", e => { S.projDrillMetric = e.target.value; buildProjectDrill(); });
  document.getElementById("projDrillStatus").addEventListener("change", e => { S.projDrillStatus = e.target.value; buildProjectDrill(); });

  document.getElementById("statusMetric").addEventListener("change", e => { S.statusMetric = e.target.value; refresh(); });
  document.getElementById("statusView").addEventListener("change", e => { S.statusView = e.target.value; refresh(); });
}


// ---- Stale contributor warning (no updates in last 2 sprints) ----
(function renderStaleBanner(){
  const names = Object.keys(DATA.points);
  // Determine latest sprint based on calendar (SPRINT_DATES vs SNAPSHOT_DATE), capped at data range
  let latest = -1;
  for (let i = Math.min(DATA.sprints.length - 1, CURRENT_SPRINT_IDX); i >= 0; i--) {
    if (names.some(n => hasAnyTask(n, i))) { latest = i; break; }
  }
  const banner = document.getElementById("staleBanner");
  if (latest < 1) { banner.style.display = "none"; banner.dataset.hasContent = "0"; return; }
  banner.dataset.hasContent = "1";
  const windowIdx = [latest - 1, latest]; // last 2 sprints
  const stale = names.filter(n => windowIdx.every(i => !hasAnyTask(n, i)));
  const windowLabel = `Sprint ${windowIdx[0]+1}–${windowIdx[1]+1}`;
  if (stale.length === 0) {
    banner.className = "stale-banner ok";
    banner.innerHTML = `<span class="stale-icon">✅</span>ทุกคนมี task งานในช่วง <strong>${windowLabel}</strong> ที่ผ่านมา`;
    banner.style.display = "block";
    return;
  }
  const chips = stale.map(n => `<span class="stale-chip">${n}${roleOf(n)!=="—"?` · ${roleOf(n)}`:""}</span>`).join("");
  banner.className = "stale-banner";
  banner.innerHTML = `<span class="stale-icon">⚠️</span><strong>ไม่พบ task งานเกิน 2 Sprints:</strong> ${chips}`;
  banner.style.display = "block";
})();
populateSelects();
wireUp();
// Theme toggle button wiring + restore saved label
(function wireTheme(){
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const saved = (function(){ try { return localStorage.getItem("theme") || "dark"; } catch(e){ return "dark"; } })();
  document.getElementById("themeIcon").textContent = saved === "light" ? "☀️" : "🌙";
  document.getElementById("themeLabel").textContent = saved === "light" ? "Light" : "Dark";
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });
})();
function showToast(message, type = "info", duration = 4000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = "";
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "⟳";
  toast.textContent = `${icon} ${message}`;
  toast.className = `show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = ""; }, duration);
}

// Sync button
(function wireSyncBtn(){
  const btn = document.getElementById("syncBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.classList.add("syncing");
    document.getElementById("syncLabel").textContent = "Syncing…";
    showToast("Triggering Azure sync…", "info");
    try {
      const res = await fetch("/api/trigger-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        document.getElementById("syncLabel").textContent = "Triggered!";
        showToast("Sync triggered! Data will update in ~1 minute.", "success", 6000);
      } else {
        document.getElementById("syncLabel").textContent = "Failed";
        showToast(data.error || "Sync failed", "error", 6000);
      }
    } catch (e) {
      document.getElementById("syncLabel").textContent = "Error";
      showToast("Network error — could not reach server", "error", 6000);
    } finally {
      setTimeout(() => {
        document.getElementById("syncLabel").textContent = "Sync Azure";
        btn.disabled = false;
        btn.classList.remove("syncing");
      }, 3000);
    }
  });
})();
refresh();
