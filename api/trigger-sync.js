import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { cert, getApps as getAdminApps, initializeApp as initAdmin } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

const firebaseConfig = {
  projectId: "morestudio-sprint-2026",
  appId: "1:97508017044:web:0707e3f2138ed43f8a0581",
  storageBucket: "morestudio-sprint-2026.firebasestorage.app",
  apiKey: "AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",
  authDomain: "morestudio-sprint-2026.firebaseapp.com",
  messagingSenderId: "97508017044"
};

// getApps() guard: Vercel may reuse the function instance (Fluid Compute),
// so avoid re-initializing the Firebase app on a warm invocation.
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// firebase-admin, used to verify a signed-in admin's ID token from the browser
// Sync button. Initialized lazily from a service-account JSON in an env var.
// Returns null if the credential is not configured (button path then rejected).
function getAdminAuthOrNull() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    const adminApp = getAdminApps().length
      ? getAdminApps()[0]
      : initAdmin({ credential: cert(JSON.parse(raw)) });
    return getAdminAuth(adminApp);
  } catch (e) {
    console.error("firebase-admin init failed:", e.message);
    return null;
  }
}

// Minimum seconds between real triggers. Bulk work-item creates in Azure fire
// one webhook each; without this, 20 new tasks would kick off 20 full syncs.
const DEBOUNCE_SECONDS = 60;

// Authorize the caller. Two accepted paths:
//  1) Azure Service Hook / server-to-server: Bearer ${WEBHOOK_SECRET}
//  2) Signed-in admin using the Sync button: a Firebase ID token whose user
//     doc has role "admin". Returns true if either check passes.
async function isAuthorized(request) {
  const auth = request.headers["authorization"] || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!bearer) return false;

  // Path 1: shared secret (Azure).
  const secret = process.env.WEBHOOK_SECRET;
  if (secret && bearer === secret) return true;

  // Path 2: Firebase ID token from an admin user.
  const adminAuth = getAdminAuthOrNull();
  if (!adminAuth) return false;
  try {
    const decoded = await adminAuth.verifyIdToken(bearer);
    const email = decoded.email;
    if (!email) return false;
    // Role lives on the users doc, looked up by the `email` field (see auth.js).
    const { collection, query, where, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(query(collection(db, "users"), where("email", "==", email)));
    if (snap.empty) return false;
    return (snap.docs[0].data().role ?? "user") === "admin";
  } catch (e) {
    console.error("ID token verification failed:", e.message);
    return false;
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!(await isAuthorized(request))) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const token = process.env.GITHUB_ACTIONS_TOKEN;
  if (!token) {
    return response.status(500).json({ error: "GITHUB_ACTIONS_TOKEN not configured" });
  }

  // Debounce: skip if a trigger fired within the last DEBOUNCE_SECONDS. We stamp
  // a dedicated doc AT TRIGGER TIME (not dashboardStats/v1.lastSyncedAt, which is
  // only written ~1-2 min later when the GitHub Actions run finishes).
  const triggerRef = doc(db, "dashboardStats", "syncTrigger");
  try {
    const snap = await getDoc(triggerRef);
    const last = snap.exists() ? snap.data().lastTriggeredAt : null;
    if (last) {
      const elapsed = (Date.now() - new Date(last).getTime()) / 1000;
      if (elapsed < DEBOUNCE_SECONDS) {
        return response.status(200).json({
          success: true,
          debounced: true,
          message: `Sync already triggered ${Math.round(elapsed)}s ago; skipping (debounce ${DEBOUNCE_SECONDS}s).`
        });
      }
    }
  } catch (e) {
    // Non-fatal: if the debounce read fails, fall through and trigger anyway.
    console.error("Debounce check failed, proceeding:", e.message);
  }

  const owner = "yanatornch";
  const repo = "sprint-dashboard-2026";
  const workflow = "azure-sync.yml";

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );

  if (res.status === 204) {
    // Stamp the trigger time only after a successful dispatch.
    try {
      await setDoc(triggerRef, { lastTriggeredAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.error("Failed to stamp trigger time:", e.message);
    }
    return response.status(200).json({ success: true, message: "Sync triggered" });
  }

  const text = await res.text();
  return response.status(res.status).json({ error: text || "GitHub API error" });
}
