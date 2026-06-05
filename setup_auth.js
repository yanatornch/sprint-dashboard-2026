import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

const ADMINS = new Set(["no", "karn"]);

const TEAM = [
  { id: "Waew",  email: "waew@morestudio.co.th" },
  { id: "Torfah",email: "torfah@morestudio.co.th" },
  { id: "Tae",   email: "tae@morestudio.co.th" },
  { id: "Ploy",  email: "ploy@morestudio.co.th" },
  { id: "Gib",   email: "gib@morestudio.co.th" },
  { id: "Nine",  email: "nine@morestudio.co.th" },
  { id: "Ping",  email: "ping@morestudio.co.th" },
  { id: "Dream", email: "dream@morestudio.co.th" },
  { id: "Karn",  email: "karn@morestudio.co.th" },
  { id: "Ohm",   email: "ohm@morestudio.co.th" },
  { id: "Nust",  email: "nust@morestudio.co.th" },
  { id: "Unn",   email: "unn@morestudio.co.th" },
  { id: "Praew", email: "praew@morestudio.co.th" },
  { id: "P",     email: "p@morestudio.co.th" },
  { id: "No",    email: "no@morestudio.co.th" },
  { id: "Tum",   email: "tum@morestudio.co.th" },
];

console.log("Setting up auth roles in Firestore...\n");

for (const member of TEAM) {
  const role = ADMINS.has(member.id.toLowerCase()) ? "admin" : "user";
  await setDoc(doc(db, "users", member.id), { email: member.email, role }, { merge: true });
  console.log(`✓ ${member.id.padEnd(8)} ${member.email.padEnd(28)} → ${role}`);
}

console.log("\nDone! All users have email + role set.");
