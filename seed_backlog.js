import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BACKLOG_ITEMS = [
  {
    order: 1,
    title: "HC Registration — UAT & Delivery",
    priority: "p1",
    status: "New",
    tags: ["HC Reg", "Dev"],
    notes: ["Next sprint focus", "UAT · Delivery"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 2,
    title: "ปิดงานของ Market Village",
    priority: "p1",
    status: "Blocked",
    tags: ["Delivery", "Client"],
    notes: ["⏳ Waiting for ICT", "External dep."],
    noteTypes: ["warn", "default"],
    isNew: false
  },
  {
    order: 3,
    title: "Present AEO สำหรับ Chang HomePro",
    priority: "p1",
    status: "Blocked",
    tags: ["Biz Dev"],
    notes: ["K. Ar not responding", "Follow-up required"],
    noteTypes: ["warn", "default"],
    isNew: false
  },
  {
    order: 4,
    title: "UAT สภาสังคมสงเคราะห์ — ทุก Module",
    priority: "p2",
    status: "New",
    tags: ["UAT"],
    notes: ["All modules", "UAT · QA · Client"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 5,
    title: "Kick off TailMed Development",
    priority: "p2",
    status: "New",
    tags: ["TailMed", "Kick-off"],
    notes: ["New design + latest Req Doc", "TailMed · Dev"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 6,
    title: "Support VFM — Final Delivery",
    priority: "p2",
    status: "New",
    tags: ["VFM", "Support"],
    notes: ["~1–2 manday effort", "VFM · Delivery"],
    noteTypes: ["good", "default"],
    isNew: true
  },
  {
    order: 7,
    title: "Cut to Size — Get Requirement",
    priority: "p3",
    status: "New",
    tags: ["Research"],
    notes: ["Requirements"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 8,
    title: "POS Expense Module — Deploy for Nua",
    priority: "p3",
    status: "New",
    tags: ["POS", "Deploy"],
    notes: ["POS · Expense"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 9,
    title: "Genco Report — Production & Next Phase Meeting",
    priority: "p3",
    status: "New",
    tags: ["Genco"],
    notes: ["Setup meeting for next phase", "Genco"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 10,
    title: "Kick off ตรอ Project",
    priority: "p3",
    status: "New",
    tags: ["ตรอ", "Kick-off"],
    notes: ["Prototype done", "Waiting IST → client", "Next step: IST"],
    noteTypes: ["good", "warn", "default"],
    isNew: true
  },
  {
    order: 11,
    title: "Gamesmith Website — Content Updates",
    priority: "p3",
    status: "New",
    tags: ["Gamesmith", "Content"],
    notes: ["docs.google.com → Gamesmith Content Doc", "Gamesmith · Content"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 12,
    title: "POS VDO Content Launch — 3 Videos",
    priority: "p4",
    status: "New",
    tags: ["POS", "Content"],
    notes: ["POS · Content", "3 videos"],
    noteTypes: ["default", "default"],
    isNew: true
  },
  {
    order: 13,
    title: "POS Image Content Launch — 6 Images",
    priority: "p4",
    status: "New",
    tags: ["POS", "Content"],
    notes: ["POS · Content", "6 images"],
    noteTypes: ["default", "default"],
    isNew: true
  },
  {
    order: 14,
    title: "POS — Find 3 More Customers",
    priority: "p4",
    status: "New",
    tags: ["POS", "Sales"],
    notes: ["POS · Sales"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 15,
    title: "POS — Find More Distribution Channels",
    priority: "p4",
    status: "New",
    tags: ["POS", "Biz Dev"],
    notes: ["POS · Biz Dev"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 16,
    title: "Follow up Seree — Usability & Adjustment",
    priority: "p4",
    status: "New",
    tags: ["POS", "Client"],
    notes: ["POS · Follow-up"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 17,
    title: "Set up meeting with Thepleela",
    priority: "p4",
    status: "New",
    tags: ["Admin"],
    notes: ["Admin · Meeting"],
    noteTypes: ["default"],
    isNew: true
  },
  {
    order: 18,
    title: "Develop SME Pack — Business Plan & Milestone",
    priority: "p4",
    status: "New",
    tags: ["SME", "BRD"],
    notes: ["BRD in progress", "SME · Planning"],
    noteTypes: ["info", "default"],
    isNew: true
  },
  {
    order: 19,
    title: "สำนักงานกองทุนหมู่บ้าน — Deployment & Paperwork",
    priority: "carryover",
    status: "In Progress",
    tags: ["Deploy"],
    notes: ["Cloud running", "Client agreed", "Paperwork remaining"],
    noteTypes: ["good", "good", "warn"],
    isNew: false
  },
  {
    order: 20,
    title: "HC Registration — Dev Remaining (Home Card, Event Reg)",
    priority: "carryover",
    status: "In Progress",
    tags: ["HC Reg", "Dev"],
    notes: ["Cat L1/2/3 done", "Tap Bar done", "~60% complete"],
    noteTypes: ["good", "good", "info"],
    isNew: false
  },
  {
    order: 21,
    title: "TailMed App Design — Finalise",
    priority: "carryover",
    status: "In Progress",
    tags: ["TailMed", "Design"],
    notes: ["Design · TailMed"],
    noteTypes: ["default"],
    isNew: false
  },
  {
    order: 22,
    title: "Breaking Par — Awaiting Requirement Confirmation",
    priority: "waiting",
    status: "Waiting",
    tags: ["Breaking Par"],
    notes: ["Req. not confirmed", "On Hold"],
    noteTypes: ["warn", "default"],
    isNew: false
  },
  {
    order: 23,
    title: "Genco Report — Waiting for Deploy",
    priority: "waiting",
    status: "Waiting",
    tags: ["Genco"],
    notes: ["Deploy dependent", "Genco"],
    noteTypes: ["warn", "default"],
    isNew: false
  },
  {
    order: 24,
    title: "แก้ Progress Bar ตอนไม่ Unlock (Accumulate)",
    priority: "waiting",
    status: "Pending",
    tags: ["Bug Fix"],
    notes: ["Bug Fix · UI"],
    noteTypes: ["default"],
    isNew: false
  }
];

async function seedBacklog() {
  console.log(`Seeding ${BACKLOG_ITEMS.length} backlog items into Firestore...`);

  const batch = writeBatch(db);
  const col = collection(db, "backlog");

  BACKLOG_ITEMS.forEach(item => {
    const ref = doc(col);
    batch.set(ref, item);
  });

  await batch.commit();
  console.log(`Done! ${BACKLOG_ITEMS.length} items written to 'backlog' collection.`);
}

seedBacklog().catch(err => {
  console.error("Error seeding backlog:", err);
  process.exit(1);
});
