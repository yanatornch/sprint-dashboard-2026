import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

async function check() {
  const docRef = doc(db, "dashboard", "data");
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data();
    console.log("Data exists! Sprints:", data.sprints?.length);
    console.log("Points keys:", Object.keys(data.points || {}).length);
  } else {
    console.log("Document DOES NOT exist!");
  }
  process.exit(0);
}
check();
