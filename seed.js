import { db } from "./firebase.js";
import { DATA } from "./data.js";
import { doc, setDoc } from "firebase/firestore";

async function seed() {
  console.log("Starting data seed...");
  try {
    const docRef = doc(db, "dashboard", "data");
    await setDoc(docRef, DATA);
    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (e) {
    console.error("Error seeding data: ", e);
    process.exit(1);
  }
}

seed();
