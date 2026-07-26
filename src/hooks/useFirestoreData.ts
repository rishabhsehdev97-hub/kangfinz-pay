import { useState, useEffect } from "react";
import {
  subscribeToTransactions,
  subscribeToBills,
  subscribeToBankAccounts,
  getContacts,
  getGoals,
  markBillPaid,
  addTransaction
} from "../firebase/services";
import {
  Transaction,
  BillItem,
  BankAccount,
  Contact,
  FinancialGoal,
  MoneySnapshotData
} from "../types";
import { initialTransactions, initialBills, sampleContacts, initialGoals } from "../data/initialData";

export const useFirestoreData = (userId: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [bills, setBills] = useState<BillItem[]>(initialBills);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    // Real-time listener for Transactions
    const unsubTx = subscribeToTransactions(userId, (txs) => {
      if (txs.length > 0) setTransactions(txs);
    });

    // Real-time listener for Bills
    const unsubBills = subscribeToBills(userId, (bls) => {
      if (bls.length > 0) setBills(bls);
    });

    // Real-time listener for BankAccounts
    const unsubBanks = subscribeToBankAccounts(userId, (accs) => {
      if (accs.length > 0) setBankAccounts(accs);
    });

    // One-time fetch for Contacts & Goals
    getContacts(userId).then(cList => {
      if (cList.length > 0) setContacts(cList);
    });

    getGoals(userId).then(gList => {
      if (gList.length > 0) setGoals(gList);
    });

    setLoading(false);

    return () => {
      unsubTx();
      unsubBills();
      unsubBanks();
    };
  }, [userId]);

  // Derived Money Snapshot
  const bankBalance = bankAccounts.length > 0
    ? bankAccounts.reduce((sum, a) => sum + a.balance, 0)
    : 184250;

  const moneySnapshot: MoneySnapshotData = {
    bankBalance,
    cash: 12500,
    wallet: 4800,
    investments: 345000,
    netWorth: bankBalance + 12500 + 4800 + 345000,
    mutualFunds: 420000,
    gold: 125000,
    loans: 110000,
    creditCardDebt: 14200
  };

  const handlePayBill = async (billId: string) => {
    await markBillPaid(billId);
    setBills(prev => prev.map(b => b.id === billId ? { ...b, isPaid: true, dueDate: 'Paid' } : b));
  };

  return {
    transactions,
    bills,
    bankAccounts,
    contacts,
    goals,
    moneySnapshot,
    loading,
    handlePayBill
  };
};
