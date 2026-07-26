import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import { User } from "firebase/auth";

export async function createUserIfNotExists(user: User) {
  try {
    console.log("📄 Creating Firestore document...");

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      console.log("🆕 User doesn't exist. Creating...");

      await setDoc(userRef, {
  uid: user.uid,

  profile: {
    fullName: user.displayName || "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    photoURL: user.photoURL || "",
    provider: user.providerData[0]?.providerId || "google.com",
  },

  wallet: {
    balance: 0,
    cashback: 0,
    currency: "INR",
  },

  banks: [],

  upi: {
    ids: [],
    primary: "",
  },

  kyc: {
    status: "pending",
    verified: false,
  },

  preferences: {
    language: "en",
    theme: "light",
    notifications: true,
  },

  createdAt: serverTimestamp(),
  lastLogin: serverTimestamp(),

  appVersion: "1.0.0",
});

      console.log("✅ Firestore document created");
    } else {
      console.log("♻️ User exists. Updating last login...");

      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
      });

      console.log("✅ Last login updated");
    }
  } catch (err) {
    console.error("🔥 FIRESTORE ERROR:", err);
    throw err;
  }
}