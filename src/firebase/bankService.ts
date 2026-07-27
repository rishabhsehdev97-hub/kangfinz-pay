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
export async function setPrimaryBank(accountNumber: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error("User not found");
  }

  const data = snapshot.data();

  const updatedBanks = (data.banks || []).map((bank: any) => ({
    ...bank,
    isPrimary: bank.accountNumber === accountNumber,
  }));

  await updateDoc(userRef, {
    banks: updatedBanks,
  });
}
export async function updateBankAccount(updatedBank: {
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
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error("User not found");
  }

  const data = snapshot.data();

  const updatedBanks = (data.banks || []).map((bank: any) =>
    bank.accountNumber === updatedBank.accountNumber
      ? {
          ...bank,
          bankName: updatedBank.bankName,
          accountHolder: updatedBank.accountHolder,
          ifscCode: updatedBank.ifscCode,
        }
      : bank
  );

  await updateDoc(userRef, {
    banks: updatedBanks,
  });
}