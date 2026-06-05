import { auth, db } from "./firebase.js";
import {
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({
  tenant: "2e4e0da2-49c7-4d00-9942-bd882f2a0353"
});

export async function signInWithMicrosoft() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

// Returns "admin" | "user" | null (null = email not found in users collection)
// Looks up by the `email` field on the user doc.
export async function getUserRole(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data().role ?? "user";
}

// Resolves with { user, role } or redirects to login.html if not authenticated
export function requireAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login.html";
        return;
      }
      const role = await getUserRole(user.email);
      resolve({ user, role });
    });
  });
}

export { onAuthStateChanged, auth };
