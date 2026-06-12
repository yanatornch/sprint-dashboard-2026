// ---- Mock data for Ohm, reconstructed from the live dashboard ----
window.DATA = {
  person: {
    name: "Ohm",
    initials: "OH",
    role: "Dev",
    sprintsActive: 11,
    sprintsTotal: 12,
    totalPoints: 718,
    totalTasks: 247,
  },

  stats: {
    totalPoints: 718,
    totalTasks: 247,
    doneRatePct: 92.4,
    donePts: 678,
    targetPts: 734,
    avgPtsPerTask: 2.91,
    activeSprints: 11,
    sprintsTotal: 12,
    projects: 7,
  },

  // The three the manager wants front-and-center, plus the rest
  statusHero: [
    { key: "done", label: "Done", tasks: 211, pts: 678, color: "var(--green)", emoji: "✅" },
    { key: "inprogress", label: "In Progress", tasks: 23, pts: 41, color: "var(--cyan)", emoji: "🛠️" },
    { key: "review", label: "Waiting for Review", tasks: 10, pts: 13, color: "var(--indigo)", emoji: "👀" },
  ],
  statusRest: [
    { label: "Ready for test", tasks: 3, pts: 0, color: "var(--teal)" },
    { label: "Waiting to PRD deploy", tasks: 10, pts: 0, color: "var(--orange)" },
    { label: "To Do", tasks: 15, pts: 30, color: "var(--faint)" },
    { label: "Blocked", tasks: 1, pts: 5, color: "var(--red)" },
    { label: "Bugged", tasks: 0, pts: 0, color: "var(--red)" },
    { label: "Removed/Cancelled", tasks: 1, pts: 8, color: "var(--faint)" },
  ],

  insights: [
    { emoji: "📦", title: "Workload", value: "718 pts · 247 tasks", sub: "Active in 11/12 sprints · avg 2.91 pts/task", dot: "var(--green)" },
    { emoji: "✅", title: "Done Rate", value: "92.4% ของ points", sub: "678 / 734 pts", dot: "var(--green)" },
    { emoji: "📈", title: "Recent Trend", value: "ชะลอลง (−54%)", sub: "เทียบ 3 sprints ล่าสุด vs 3 ก่อนหน้า", dot: "var(--orange)" },
    { emoji: "🚀", title: "Peak Sprint", value: "Sprint 7 — 161 pts", sub: "สูงสุดของปี", dot: "var(--cyan)" },
    { emoji: "🎯", title: "Top Projects", value: "NCSWT (647) · InsureTech (29)", sub: "7 projects contributed", dot: "var(--cyan)" },
    { emoji: "⚠️", title: "Risk Flags", value: "1 Blocked · 0 Bugged", sub: "ต้องติดตามปลดล็อกและแก้ไข", dot: "var(--red)" },
  ],

  // Sprint trend: story points (bars) + task count (line, right axis)
  sprintTrend: [
    { sprint: 1, pts: 8, tasks: 10 },
    { sprint: 2, pts: 15, tasks: 3 },
    { sprint: 3, pts: 131, tasks: 19 },
    { sprint: 4, pts: 93, tasks: 21 },
    { sprint: 5, pts: 104, tasks: 19 },
    { sprint: 6, pts: 58, tasks: 11 },
    { sprint: 7, pts: 161, tasks: 40 },
    { sprint: 8, pts: 30, tasks: 5 },
    { sprint: 9, pts: 35, tasks: 22 },
    { sprint: 10, pts: 47, tasks: 55 },
    { sprint: 11, pts: 36, tasks: 42 },
    { sprint: 12, pts: 0, tasks: 0 },
  ],

  // Gamification — every +50 pts unlocks a reward to redeem.
  // state is derived at runtime from points vs threshold + claimed set.
  rewards: [
    { pts: 50,  emoji: "☕", name: "Coffee Voucher", desc: "ฟรีกาแฟ 1 แก้ว ที่ร้านในตึก", tag: "Café" },
    { pts: 100, emoji: "🍜", name: "Restaurant 10% Off", desc: "ส่วนลด 10% ร้านอาหารพาร์ทเนอร์", tag: "Dining" },
    { pts: 150, emoji: "🎬", name: "Movie Ticket ×1", desc: "ตั๋วหนัง 1 ใบ รอบปกติ", tag: "Leisure" },
    { pts: 200, emoji: "🍱", name: "Free Team Lunch", desc: "ข้าวกล่องพรีเมียม 1 มื้อ", tag: "Dining" },
    { pts: 250, emoji: "🎧", name: "฿500 Gadget Credit", desc: "เครดิตซื้ออุปกรณ์ทำงาน", tag: "Gear" },
    { pts: 300, emoji: "🛒", name: "฿500 Shopping Voucher", desc: "บัตรกำนัลห้างสรรพสินค้า", tag: "Voucher" },
    { pts: 350, emoji: "🚗", name: "Grab Credit ฿300", desc: "เครดิตเดินทาง 1 เดือน", tag: "Travel" },
    { pts: 400, emoji: "🍰", name: "Dessert Party", desc: "ขนมหวานเลี้ยงทีม", tag: "Dining" },
    { pts: 450, emoji: "📚", name: "฿1,000 Learning Budget", desc: "คอร์ส/หนังสือพัฒนาตัวเอง", tag: "Growth" },
    { pts: 500, emoji: "🏖️", name: "Half Day Off", desc: "ลาครึ่งวันแบบไม่หักวันลา", tag: "Time off" },
    { pts: 550, emoji: "💆", name: "Spa & Massage", desc: "นวดผ่อนคลาย 60 นาที", tag: "Wellness" },
    { pts: 600, emoji: "🎁", name: "Mystery Box", desc: "กล่องสุ่มของรางวัลพิเศษ", tag: "Surprise" },
    { pts: 650, emoji: "🍽️", name: "Dinner for Two", desc: "ดินเนอร์ 2 ที่ ร้านพรีเมียม", tag: "Dining" },
    { pts: 700, emoji: "🏨", name: "Hotel Staycation", desc: "เข้าพักโรงแรม 1 คืน", tag: "Travel" },
    { pts: 750, emoji: "🎮", name: "Game Console Raffle", desc: "สิทธิ์ลุ้นเครื่องเกม", tag: "Surprise" },
    { pts: 800, emoji: "✈️", name: "Full Day Off", desc: "วันหยุดพิเศษ 1 วันเต็ม", tag: "Time off" },
  ],

  // Tiers / levels (named ranks)
  tiers: [
    { name: "Bronze",   min: 0,   color: "#c98a4b" },
    { name: "Silver",   min: 200, color: "#aab4c6" },
    { name: "Gold",     min: 400, color: "#f5c518" },
    { name: "Platinum", min: 600, color: "#6ee7e0" },
    { name: "Diamond",  min: 800, color: "#8b9cff" },
  ],

  leave: { sprint: 11, kind: "vacation", days: 5, range: "2026-06-01 – 2026-06-05" },
};
