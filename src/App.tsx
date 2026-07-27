import React, { useEffect, useState } from 'react';
import { getWalletData } from "./firebase/walletService";
import { Header } from './components/Header';
import { HomeActionGrid } from './components/HomeActionGrid';
import { FavouriteContacts } from './components/FavouriteContacts';
import { AiTipOfDayCard } from './components/AiTipOfDayCard';
import { FinancialWinCard } from './components/FinancialWinCard';
import { AIRecommendationCard } from './components/AIRecommendationCard';
import { FinancialGoalsCard } from './components/FinancialGoalsCard';
import { UpcomingBillsCard } from './components/UpcomingBillsCard';
import { WeeklyStoryCard } from './components/WeeklyStoryCard';
import { RecentTransactions } from './components/RecentTransactions';
import { QuickActions } from './components/QuickActions';
import { AIInsightCard } from './components/AIInsightCard';
import { BottomNav } from './components/BottomNav';

// Views and Modals
import { MoneyView } from './views/MoneyView';
import { InsightsView } from './views/InsightsView';
import { ProfileView } from './views/ProfileView';

import { ScanPayModal } from './modals/ScanPayModal';
import { TransferModal } from './modals/TransferModal';
import { PayBillsModal } from './modals/PayBillsModal';
import { AskAIModal } from './modals/AskAIModal';
import { AddFundsModal } from './modals/AddFundsModal';
import { TransactionDetailsModal } from './modals/TransactionDetailsModal';
import { MyQRModal } from './modals/MyQRModal';
import { RequestMoneyModal } from './modals/RequestMoneyModal';

// Initial Data
import {
  initialMoneySnapshot,
  initialGoals,
  initialTransactions,
  initialBills,
} from './data/initialData';
import { TabType, Transaction, FinancialGoal, BillItem, MoneySnapshotData } from './types';

export default function App() {
  console.log("🔥 APP COMPONENT RENDERED");
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isFrameView, setIsFrameView] = useState<boolean>(true);

  // Core Financial State
  const [moneySnapshot, setMoneySnapshot] = useState<MoneySnapshotData>(initialMoneySnapshot);
  useEffect(() => {
  console.log("🚀 useEffect started");

  async function loadWallet() {
    console.log("📦 loadWallet called");

    try {
      const result = await getWalletData();

      console.log("Result:", result);

      if (result.wallet) {
        setMoneySnapshot((prev) => ({
          ...prev,
          wallet: result.wallet.balance,
        }));

        console.log("✅ Wallet loaded:", result.wallet);
      } else {
        console.warn("⚠️ Wallet is undefined");
      }
    } catch (err) {
      console.error("❌ Failed to load wallet:", err);
    }
  }

  loadWallet();
}, []);

  
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [bills, setBills] = useState<BillItem[]>(initialBills);

  // Modal States
  const [isScanPayOpen, setIsScanPayOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isPayBillsOpen, setIsPayBillsOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isMyQROpen, setIsMyQROpen] = useState(false);
  const [myQRMode, setMyQRMode] = useState<'personal' | 'business'>('personal');
  const [isRequestMoneyOpen, setIsRequestMoneyOpen] = useState(false);
  const [requestMoneyTab, setRequestMoneyTab] = useState<'request' | 'link' | 'invoice' | 'history'>('request');

  const handleOpenMyQR = (mode: 'personal' | 'business' = 'personal') => {
    setMyQRMode(mode);
    setIsMyQROpen(true);
  };

  const handleOpenRequestMoney = (tab: 'request' | 'link' | 'invoice' | 'history' = 'request') => {
    setRequestMoneyTab(tab);
    setIsRequestMoneyOpen(true);
  };

  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Handlers for state updates
  const handleSuccessScanPay = (amount: number, recipientName: string, note: string) => {
    // Deduct from wallet / bank balance
    setMoneySnapshot((prev) => {
      const newWallet = Math.max(0, prev.wallet - amount);
      const newNet = prev.bankBalance + prev.cash + newWallet + prev.investments;
      return { ...prev, wallet: newWallet, netWorth: newNet };
    });

    // Add transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: recipientName,
      category: 'Shopping',
      amount,
      type: 'debit',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconName: 'ShoppingBag',
      status: 'Success',
      paymentMethod: 'Kangfinz Wallet',
      referenceId: `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      note,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSuccessTransfer = (amount: number, recipientName: string) => {
    // Deduct from Bank Balance
    setMoneySnapshot((prev) => {
      const newBank = Math.max(0, prev.bankBalance - amount);
      const newNet = newBank + prev.cash + prev.wallet + prev.investments;
      return { ...prev, bankBalance: newBank, netWorth: newNet };
    });

    // Log transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: recipientName,
      category: 'Transfers',
      amount,
      type: 'debit',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconName: 'Send',
      status: 'Success',
      paymentMethod: 'HDFC Bank ****4092',
      referenceId: `IMPS/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handlePayBillSuccess = (bill: BillItem) => {
    // Deduct from bank balance
    setMoneySnapshot((prev) => {
      const newBank = Math.max(0, prev.bankBalance - bill.amount);
      const newNet = newBank + prev.cash + prev.wallet + prev.investments;
      return { ...prev, bankBalance: newBank, netWorth: newNet };
    });

    // Log transaction
    const newTx: Transaction = {
      id: `tx-bill-${Date.now()}`,
      title: bill.title,
      category: 'Utilities & Bills',
      amount: bill.amount,
      type: 'debit',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconName: 'Zap',
      status: 'Success',
      paymentMethod: 'Auto-Debit',
      referenceId: `BBPS/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAddFundsSuccess = (amount: number, target: string) => {
    if (target === 'Emergency Fund') {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id === 'goal-1') {
            const newCurr = g.currentAmount + amount;
            const newPerc = Math.min(100, Math.round((newCurr / g.targetAmount) * 100));
            const newRem = Math.max(0, g.targetAmount - newCurr);
            return {
              ...g,
              currentAmount: newCurr,
              percentage: newPerc,
              remainingAmount: newRem,
            };
          }
          return g;
        })
      );
    } else {
      setMoneySnapshot((prev) => {
        const newBank = prev.bankBalance + amount;
        const newNet = newBank + prev.cash + prev.wallet + prev.investments;
        return { ...prev, bankBalance: newBank, netWorth: newNet };
      });
    }

    // Log credit transaction
    const newTx: Transaction = {
      id: `tx-add-${Date.now()}`,
      title: `Deposit to ${target}`,
      category: 'Transfers',
      amount,
      type: 'credit',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconName: 'ArrowDownLeft',
      status: 'Success',
      paymentMethod: 'Self Bank Deposit',
      referenceId: `DEP/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleOpenAskAI = (prompt?: string) => {
    setAiInitialPrompt(prompt);
    setIsAskAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-sans antialiased selection:bg-emerald-100 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Container - Handles either iPhone frame preview or full canvas layout */}
      <div
        className={`w-full transition-all duration-300 ${
          isFrameView
            ? 'max-w-[390px] h-[844px] my-auto bg-[#FAFAF8] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border-[10px] border-gray-900 relative flex flex-col overflow-hidden ring-1 ring-black/10'
            : 'max-w-md min-h-screen sm:min-h-[844px] bg-[#FAFAF8] sm:rounded-[28px] sm:shadow-xl sm:border sm:border-black/[0.06] relative flex flex-col overflow-hidden'
        }`}
      >
        {/* iPhone Dynamic Island Mock for Frame View */}
        {isFrameView && (
          <div className="w-full pt-3 pb-1 flex justify-center items-center z-50 bg-[#FAFAF8] shrink-0">
            <div className="w-28 h-5 bg-black rounded-full flex items-center justify-between px-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping" />
              <span className="text-[9px] font-mono text-gray-400 font-semibold tracking-tighter">
                Kangfinz 5G
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="px-3 shrink-0 bg-[#FAFAF8] z-30">
          <Header
            isFrameView={isFrameView}
            setIsFrameView={setIsFrameView}
            onOpenProfile={() => setActiveTab('profile')}
            onOpenAI={() => handleOpenAskAI()}
            activeTab={activeTab}
          />
        </div>

        {/* Scrollable Body Content */}
        <main className="flex-1 overflow-y-auto px-3 space-y-2.5 no-scrollbar pb-4">
          {/* Active Tab Routing */}
          {activeTab === 'home' && (
            <>
              {/* Four Primary Action Cards (Action Hub) */}
              <HomeActionGrid
                onScanPay={() => setIsScanPayOpen(true)}
                onTransfer={() => setIsTransferOpen(true)}
                onOpenMyQR={(mode) => handleOpenMyQR(mode)}
                onPayBills={() => setIsPayBillsOpen(true)}
              />

              {/* 1. Favourite Contacts for 1-Tap Quick Transfers */}
              <FavouriteContacts
                onSelectContact={() => setIsTransferOpen(true)}
                onViewAll={() => setIsTransferOpen(true)}
              />

              {/* 2. Upcoming Bills & Common Bill Shortcuts */}
              <UpcomingBillsCard
                bills={bills}
                onPayBill={() => setIsPayBillsOpen(true)}
                onViewAllBills={() => setIsPayBillsOpen(true)}
              />

              {/* 3. Recent Payments */}
              <RecentTransactions
                transactions={transactions}
                onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                onAddTransaction={() => setIsTransferOpen(true)}
                onViewAll={() => setActiveTab('money')}
              />

              {/* 4. AI Tip of the Day */}
              <AiTipOfDayCard onAskAI={(p) => handleOpenAskAI(p)} />
            </>
          )}

          {activeTab === 'money' && (
            <MoneyView
              data={moneySnapshot}
              onOpenAddFunds={() => setIsAddFundsOpen(true)}
              onOpenTransfer={() => setIsTransferOpen(true)}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsView onAskAI={(p) => handleOpenAskAI(p)} />
          )}

          {activeTab === 'ai' && (
            <div className="pt-2 space-y-3 text-center">
              <div className="p-4 bg-emerald-50 rounded-[20px] text-[#0F8A5F] border border-emerald-200/60">
                <h2 className="text-lg font-bold">AI Wealth Assistant Active</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Click below to open the full interactive Gemini 3.6 Flash financial copilot!
                </p>
                <button
                  onClick={() => handleOpenAskAI()}
                  className="mt-3 px-5 py-2.5 rounded-full bg-[#0F8A5F] text-white font-bold text-xs shadow-md hover:bg-[#0B6E4C] transition-all cursor-pointer"
                >
                  Launch Copilot Chat
                </button>
              </div>

              {/* Quick Insights preview */}
              <AIInsightCard
                insight="You're on track to reach your emergency fund this month."
                onAskAI={(p) => handleOpenAskAI(p)}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileView
              isFrameView={isFrameView}
              setIsFrameView={setIsFrameView}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Interactive Modals */}
      <ScanPayModal
        isOpen={isScanPayOpen}
        onClose={() => setIsScanPayOpen(false)}
        onSuccessPayment={handleSuccessScanPay}
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        onSuccessTransfer={handleSuccessTransfer}
      />

      <PayBillsModal
        isOpen={isPayBillsOpen}
        onClose={() => setIsPayBillsOpen(false)}
        onPayBillSuccess={handlePayBillSuccess}
      />

      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => {
          setIsAskAIOpen(false);
          setAiInitialPrompt(undefined);
        }}
        initialPrompt={aiInitialPrompt}
      />

      <AddFundsModal
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onAddFundsSuccess={handleAddFundsSuccess}
      />

      <TransactionDetailsModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <MyQRModal
        isOpen={isMyQROpen}
        onClose={() => setIsMyQROpen(false)}
        initialMode={myQRMode}
        onRequestMoney={() => {
          setIsMyQROpen(false);
          handleOpenRequestMoney('invoice');
        }}
      />

      <RequestMoneyModal
        isOpen={isRequestMoneyOpen}
        onClose={() => setIsRequestMoneyOpen(false)}
        initialTab={requestMoneyTab}
      />
    </div>
  );
}
