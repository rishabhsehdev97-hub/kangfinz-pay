import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./config";
export async function addBankAccount(bank: {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    banks: arrayUnion(bank),
  });
}
export async function getBankAccounts() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.data();

  return data.banks || [];
}