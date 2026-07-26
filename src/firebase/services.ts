import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { db } from "./config";
import {
  UserProfile,
  BankAccount,
  Transaction,
  BillItem,
  Contact,
  NotificationItem,
  AIInsightItem,
  UserPreferences,
  FinancialGoal,
  MoneySnapshotData
} from "../types";

// User Profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "Users", uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn("getUserProfile error:", err);
  }
  return null;
};

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  const docRef = doc(db, "Users", profile.uid);
  await setDoc(docRef, profile, { merge: true });
};

// Bank Accounts
export const getBankAccounts = async (userId: string): Promise<BankAccount[]> => {
  try {
    const q = query(collection(db, "BankAccounts"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BankAccount));
  } catch (err) {
    console.warn("getBankAccounts error:", err);
    return [];
  }
};

export const saveBankAccount = async (account: Omit<BankAccount, 'id'> & { id?: string }): Promise<string> => {
  if (account.id) {
    const ref = doc(db, "BankAccounts", account.id);
    await setDoc(ref, account, { merge: true });
    return account.id;
  } else {
    const ref = await addDoc(collection(db, "BankAccounts"), account);
    return ref.id;
  }
};

// Transactions
export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const q = query(collection(db, "Transactions"), where("userId", "==", userId));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Transaction));
    return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  } catch (err) {
    console.warn("getTransactions error:", err);
    return [];
  }
};

export const addTransaction = async (tx: Omit<Transaction, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, "Transactions"), {
    ...tx,
    timestamp: Date.now()
  });
  return ref.id;
};

// Bills
export const getBills = async (userId: string): Promise<BillItem[]> => {
  try {
    const q = query(collection(db, "Bills"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BillItem));
  } catch (err) {
    console.warn("getBills error:", err);
    return [];
  }
};

export const markBillPaid = async (billId: string): Promise<void> => {
  const ref = doc(db, "Bills", billId);
  await updateDoc(ref, { isPaid: true, dueDate: 'Paid' });
};

export const addBill = async (bill: Omit<BillItem, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, "Bills"), bill);
  return ref.id;
};

// Contacts
export const getContacts = async (userId: string): Promise<Contact[]> => {
  try {
    const q = query(collection(db, "Contacts"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Contact));
  } catch (err) {
    console.warn("getContacts error:", err);
    return [];
  }
};

export const addContact = async (contact: Omit<Contact, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, "Contacts"), contact);
  return ref.id;
};

// Goals
export const getGoals = async (userId: string): Promise<FinancialGoal[]> => {
  try {
    const q = query(collection(db, "Goals"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      const remaining = Math.max(0, data.targetAmount - data.currentAmount);
      const percentage = Math.min(100, Math.round((data.currentAmount / data.targetAmount) * 100));
      return {
        id: d.id,
        title: data.title,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount,
        percentage,
        remainingAmount: remaining,
        targetDate: data.targetDate,
        category: data.category,
        userId: data.userId
      } as FinancialGoal;
    });
  } catch (err) {
    console.warn("getGoals error:", err);
    return [];
  }
};

export const addGoal = async (goal: Omit<FinancialGoal, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, "Goals"), goal);
  return ref.id;
};

// User Preferences
export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  try {
    const ref = doc(db, "UserPreferences", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserPreferences;
    }
  } catch (err) {
    console.warn("getUserPreferences error:", err);
  }
  return null;
};

export const saveUserPreferences = async (prefs: UserPreferences): Promise<void> => {
  const ref = doc(db, "UserPreferences", prefs.userId);
  await setDoc(ref, prefs, { merge: true });
};

// Real-time listener hooks
export const subscribeToTransactions = (
  userId: string,
  callback: (transactions: Transaction[]) => void
) => {
  const q = query(collection(db, "Transactions"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Transaction));
    list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    callback(list);
  }, (err) => console.warn("Transactions listener error:", err));
};

export const subscribeToBills = (
  userId: string,
  callback: (bills: BillItem[]) => void
) => {
  const q = query(collection(db, "Bills"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as BillItem));
    callback(list);
  }, (err) => console.warn("Bills listener error:", err));
};

export const subscribeToBankAccounts = (
  userId: string,
  callback: (accounts: BankAccount[]) => void
) => {
  const q = query(collection(db, "BankAccounts"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as BankAccount));
    callback(list);
  }, (err) => console.warn("BankAccounts listener error:", err));
};
