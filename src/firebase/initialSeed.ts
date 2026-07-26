import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import { initialGoals, initialTransactions, initialBills, sampleContacts } from "../data/initialData";
import { UserProfile, UserPreferences } from "../types";

export const ensureUserSeeded = async (userId: string, defaultName = "Rishabh Sehdev", defaultEmail = "rishabh@kangfinz.com"): Promise<void> => {
  try {
    // 1. User Profile
    const userRef = doc(db, "Users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      const profile: UserProfile = {
        uid: userId,
        name: defaultName,
        email: defaultEmail,
        phone: "+91 98765 43210",
        kycVerified: true,
        tier: "Premium",
        upiId: `${defaultName.toLowerCase().replace(/\s+/g, '')}@kangfinz`,
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, profile);
    }

    // 2. User Preferences
    const prefRef = doc(db, "UserPreferences", userId);
    const prefSnap = await getDoc(prefRef);
    if (!prefSnap.exists()) {
      const prefs: UserPreferences = {
        userId,
        biometricEnabled: true,
        instantAlerts: true,
        deviceViewLayout: "frame",
        pinCode: "1234"
      };
      await setDoc(prefRef, prefs);
    }

    // 3. Bank Accounts
    const bankQuery = query(collection(db, "BankAccounts"), where("userId", "==", userId));
    const bankSnap = await getDocs(bankQuery);
    if (bankSnap.empty) {
      await addDoc(collection(db, "BankAccounts"), {
        userId,
        bankName: "HDFC Bank Savings",
        accountType: "Savings",
        accountNumberLast4: "4092",
        balance: 184250,
        isPrimary: true,
        autoSwept: true
      });
      await addDoc(collection(db, "BankAccounts"), {
        userId,
        bankName: "ICICI Bank iMobile",
        accountType: "Salary",
        accountNumberLast4: "8821",
        balance: 68400,
        isPrimary: false,
        autoSwept: false
      });
    }

    // 4. Goals
    const goalQuery = query(collection(db, "Goals"), where("userId", "==", userId));
    const goalSnap = await getDocs(goalQuery);
    if (goalSnap.empty) {
      for (const g of initialGoals) {
        await addDoc(collection(db, "Goals"), {
          userId,
          title: g.title,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          category: g.category,
          targetDate: g.targetDate
        });
      }
    }

    // 5. Transactions
    const txQuery = query(collection(db, "Transactions"), where("userId", "==", userId));
    const txSnap = await getDocs(txQuery);
    if (txSnap.empty) {
      let ts = Date.now();
      for (const t of initialTransactions) {
        await addDoc(collection(db, "Transactions"), {
          userId,
          title: t.title,
          category: t.category,
          amount: t.amount,
          type: t.type,
          date: t.date,
          time: t.time,
          iconName: t.iconName,
          status: t.status,
          paymentMethod: t.paymentMethod,
          referenceId: t.referenceId,
          note: t.note || "",
          timestamp: ts--
        });
      }
    }

    // 6. Bills
    const billQuery = query(collection(db, "Bills"), where("userId", "==", userId));
    const billSnap = await getDocs(billQuery);
    if (billSnap.empty) {
      for (const b of initialBills) {
        await addDoc(collection(db, "Bills"), {
          userId,
          title: b.title,
          provider: b.provider,
          accountNo: b.accountNo,
          amount: b.amount,
          dueDate: b.dueDate,
          category: b.category,
          icon: b.icon,
          isPaid: b.isPaid || false
        });
      }
    }

    // 7. Contacts
    const contactQuery = query(collection(db, "Contacts"), where("userId", "==", userId));
    const contactSnap = await getDocs(contactQuery);
    if (contactSnap.empty) {
      for (const c of sampleContacts) {
        await addDoc(collection(db, "Contacts"), {
          userId,
          name: c.name,
          phone: c.phone,
          upiId: c.upiId,
          avatar: c.avatar,
          bankName: c.bankName,
          isFavourite: true
        });
      }
    }

    // 8. AI Insights
    const aiQuery = query(collection(db, "AIInsights"), where("userId", "==", userId));
    const aiSnap = await getDocs(aiQuery);
    if (aiSnap.empty) {
      await addDoc(collection(db, "AIInsights"), {
        userId,
        tip: "Auto-routing 15% of dining cashbacks to Liquid SIP could net +₹2,400 this month.",
        category: "Savings",
        actionable: true,
        updatedAt: new Date().toISOString()
      });
    }

    // 9. Notifications
    const notifQuery = query(collection(db, "Notifications"), where("userId", "==", userId));
    const notifSnap = await getDocs(notifQuery);
    if (notifSnap.empty) {
      await addDoc(collection(db, "Notifications"), {
        userId,
        title: "Welcome to Kangfinz Pay",
        message: "Your zero-fee UPI 2.0 account is active and verified.",
        read: false,
        createdAt: new Date().toISOString()
      });
    }

  } catch (err) {
    console.warn("ensureUserSeeded error:", err);
  }
};
