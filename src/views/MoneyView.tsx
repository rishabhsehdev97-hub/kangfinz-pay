import {
  addBankAccount,
  getBankAccounts,
  setPrimaryBank,
  updateBankAccount,
} from "../firebase/bankService";
import React, { useEffect, useState } from 'react';
import { banks } from "../data/bank";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Landmark,
  Wallet,
  CreditCard,
  TrendingUp,
  PieChart,
  Coins,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Plus,
  Shield,
  BadgePercent,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MoneySnapshotData } from '../types';
import { BiometricAuthModal } from '../modals/BiometricAuthModal';

interface MoneyViewProps {
  data: MoneySnapshotData;
  onOpenAddFunds: () => void;
  onOpenTransfer: () => void;
}

export const MoneyView: React.FC<MoneyViewProps> = ({
  data,
  onOpenAddFunds,
  onOpenTransfer,
}) => {
  // Default privacy state is ALWAYS hidden every time the component loads
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const [bankName, setBankName] = useState("");
const [accountHolder, setAccountHolder] = useState("");
const [accountNumber, setAccountNumber] = useState("");
const [ifscCode, setIfscCode] = useState("");
const [linkedBanks, setLinkedBanks] = useState<any[]>([]);
const [selectedBank, setSelectedBank] = useState<any | null>(null);
const [showBankDetails, setShowBankDetails] = useState(false);
const [showEditBank, setShowEditBank] = useState(false);

const [editBank, setEditBank] = useState({
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifscCode: "",
});

  const handleAuthSuccess = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  useEffect(() => {
  async function loadBanks() {
    try {
      const bankList = await getBankAccounts();
      setLinkedBanks(bankList);
    } catch (error) {
      console.error("Failed to load bank accounts:", error);
    }
  }

  loadBanks();
}, []);

  return (
    <div className="space-y-3 pb-4">
      {/* Page Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Private Vault</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0F8A5F] font-mono text-[10px] font-medium">
              PRIVATE
            </span>
          </div>
          <p className="text-[12px] text-gray-500 font-normal">All your bank accounts, assets & net worth in one place</p>
        </div>

        {/* Lock/Unlock Quick Status Badge */}
        {isUnlocked ? (
          <button
            onClick={handleLock}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5 text-[#0F8A5F]" />
            <span>Hide Balances</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#0F8A5F] text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Balances</span>
          </button>
        )}
      </div>

      {/* PRIVACY LOCK HERO BANNER (When hidden) */}
      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-[22px] bg-gradient-to-br from-[#1A1A1A] via-[#262626] to-[#0F8A5F] text-white space-y-4 shadow-md relative overflow-hidden border border-black/10 text-center"
        >
          {/* Subtle Privacy Shield Pattern Background */}
          <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
            <Shield className="w-32 h-32 text-emerald-400" />
          </div>

          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-emerald-300">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">Your financial information is hidden.</h3>
            <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
              Kangfinz Privacy Mode protects your bank balances, net worth, and investments from onlookers.
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full max-w-xs mx-auto py-3 px-4 rounded-xl bg-[#0F8A5F] hover:bg-[#0B6E4C] text-white text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Show Balances (Face ID / PIN)</span>
          </button>

          <div className="pt-1 flex items-center justify-center gap-1 text-[9px] text-gray-400 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> 256-Bit Hardware Encrypted Privacy Layer
          </div>
        </motion.div>
      ) : (
        /* UNLOCKED FULL FINANCIAL DASHBOARD */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* 1. Net Worth Hero Card */}
          <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#0F8A5F] via-[#0B6E4C] to-emerald-900 text-white space-y-3 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Net Worth Overview
                </span>
                <div className="text-2xl font-black mt-0.5 tracking-tight">
                  {formatCurrency(data.netWorth || 899650)}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  <TrendingUp className="w-3 h-3" /> +3.2%
                </span>
                <p className="text-[9px] text-emerald-100 mt-1 font-medium">+₹42,500 this month</p>
              </div>
            </div>

            {/* Assets vs Liabilities Breakdown Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-100">
                <span>Assets: ₹10,09,650</span>
                <span>Liabilities: ₹1,10,000</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-300 w-[89%]" />
                <div className="h-full bg-amber-400 w-[11%]" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-white/15 text-xs">
              <button
                onClick={onOpenAddFunds}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white text-[#0F8A5F] font-bold text-xs hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Money
              </button>
              <button
                onClick={onOpenTransfer}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" /> Transfer Funds
              </button>
            </div>
          </div>

          {/* 2. Bank Accounts */}
          <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#0F8A5F]" />
                <div className="flex items-center justify-between">
  <h3 className="text-[15px] font-semibold text-[#1A1A1A]">
    Bank Accounts ({linkedBanks.length})
  </h3>

  <button
  onClick={() => setShowAddBank(true)}
  className="text-[12px] font-semibold text-[#0F8A5F]"
>
  + Add Bank
</button>
</div>
              </div>
              <span className="text-[11px] font-semibold text-[#0F8A5F]">
                Total: {formatCurrency(data.bankBalance + 68400)}
              </span>
            </div>

            <div className="space-y-2">
              

              {linkedBanks.map((bank, index) => (
  <div
  key={index}
  onClick={() => {
    setSelectedBank(bank);
    setShowBankDetails(true);
  }}
  className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between cursor-pointer"
>
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
        🏦
      </div>

      <div>
        <div className="flex items-center gap-2">
  <h4 className="text-[13px] font-medium text-[#1A1A1A]">
    {bank.bankName}
  </h4>

  {bank.isPrimary && (
    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
      ⭐ Primary
    </span>
  )}
</div>

        <p className="text-[11px] text-gray-500 font-mono">
          •••• {bank.accountNumber.slice(-4)}
        </p>
      </div>
    </div>

    <span className="text-[12px] text-[#0F8A5F] font-semibold">
      Linked
    </span>
  </div>
))}
            </div>
          </div>

          {/* 3. Cash & Wallets */}
          <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[#0F8A5F]" />
                <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Cash & Wallets</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#0F8A5F]">
                Total: {formatCurrency(data.cash + data.wallet)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04]">
                <div className="text-[11px] text-gray-500 font-medium">Kangfinz Wallet</div>
                <div className="text-[14px] font-semibold text-[#1A1A1A] mt-0.5">
                  {formatCurrency(data.wallet)}
                </div>
                <p className="text-[10px] text-emerald-600 font-medium mt-1">Instant UPI 2.0</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04]">
                <div className="text-[11px] text-gray-500 font-medium">Cash in Hand</div>
                <div className="text-[14px] font-semibold text-[#1A1A1A] mt-0.5">
                  {formatCurrency(data.cash)}
                </div>
                <p className="text-[10px] text-gray-500 font-normal mt-1">Physical Currency</p>
              </div>
            </div>
          </div>

          {/* 4. Investments & Wealth Portfolio */}
          <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#0F8A5F]" />
                <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Investments & Wealth</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#0F8A5F]">
                Total: {formatCurrency(645000)}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-medium text-[#1A1A1A]">Equity Mutual Funds (SIPs)</h4>
                  <p className="text-[11px] text-gray-500 font-normal">Nifty 50 + MidCap Index</p>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">{formatCurrency(420000)}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">+14.2% CAGR</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-medium text-[#1A1A1A]">Sovereign Gold Bonds & ETF</h4>
                  <p className="text-[11px] text-gray-500 font-normal">Hedge allocation</p>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">{formatCurrency(125000)}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">+9.8%</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-medium text-[#1A1A1A]">High-Yield Liquid Funds</h4>
                  <p className="text-[11px] text-gray-500 font-normal">Emergency reserve</p>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">{formatCurrency(100000)}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">+7.1% T-Bill</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Credit Cards & Loans (Liabilities) */}
          <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#0F8A5F]" />
                <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Credit Cards & Loans</h3>
              </div>
              <span className="text-[11px] font-semibold text-amber-600">
                Outstanding: {formatCurrency(124200)}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-[#1A1A1A]">HDFC Regalia Credit Card</h4>
                    <p className="text-[11px] text-gray-500 font-normal">Limit ₹5,00,000 • Due 10 Aug</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-amber-700">{formatCurrency(14200)}</span>
                  <p className="text-[10px] text-gray-500 font-normal">Unbilled</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <BadgePercent className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-[#1A1A1A]">HDFC Auto Loan EMI</h4>
                    <p className="text-[11px] text-gray-500 font-normal">₹8,500/mo • 13 months left</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">{formatCurrency(110000)}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">Auto-Debit Active</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Biometric Verification Modal */}
      <BiometricAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      {showAddBank && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">
        Add Bank Account
      </h2>

      <select
  value={bankName}
  onChange={(e) => setBankName(e.target.value)}
  className="w-full border rounded-lg p-3 mb-3 bg-white"
>
  <option value="">Select Bank</option>

  {banks.map((bank) => (
    <option key={bank.id} value={bank.name}>
      {bank.name}
    </option>
  ))}
</select>

      <input
  type="text"
  placeholder="Account Holder Name"
  value={accountHolder}
  onChange={(e) => setAccountHolder(e.target.value)}
  className="w-full border rounded-lg p-3 mb-3"
/>

      <input
  type="text"
  placeholder="Account Number"
  value={accountNumber}
  onChange={(e) => setAccountNumber(e.target.value)}
  className="w-full border rounded-lg p-3 mb-3"
/>

      <input
  type="text"
  placeholder="IFSC Code"
  value={ifscCode}
  onChange={(e) => setIfscCode(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
/>


      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowAddBank(false)}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
  onClick={async () => {
    try {
      await addBankAccount({
        bankName,
        accountHolder,
        accountNumber,
        ifscCode,
      });

      alert("Bank account added successfully!");

      setShowAddBank(false);

      setBankName("");
      setAccountHolder("");
      setAccountNumber("");
      setIfscCode("");
    } catch (error) {
      console.error(error);
      alert("Failed to save bank account.");
    }
  }}
  className="px-4 py-2 rounded-lg bg-[#0F8A5F] text-white"
>
  Save
</button>
      </div>
    </div>
  </div>
)}
{showBankDetails && selectedBank && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">
          🏦 {selectedBank.bankName}
        </h2>

        <button
          onClick={() => setShowBankDetails(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>
      

      <div className="space-y-4">

        <div>
          <p className="text-gray-500 text-sm">Account Holder</p>
          <p className="font-semibold">{selectedBank.accountHolder}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Account Number</p>
          <p className="font-semibold">{selectedBank.accountNumber}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">IFSC Code</p>
          <p className="font-semibold">{selectedBank.ifscCode}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <p className="text-green-600 font-semibold">
            🟢 Linked
          </p>
        </div>

      </div>

      {selectedBank?.isPrimary ? (
  <button
    disabled
    className="w-full rounded-lg bg-yellow-100 text-yellow-700 py-3 mb-3 cursor-not-allowed font-semibold"
  >
    ⭐ This is your Primary Bank
  </button>
) : (
  <button
    onClick={async () => {
      if (!selectedBank) return;

      await setPrimaryBank(selectedBank.accountNumber);

      const updatedBanks = await getBankAccounts();
      setLinkedBanks(updatedBanks);

      setSelectedBank(
        updatedBanks.find(
          (bank: any) =>
            bank.accountNumber === selectedBank.accountNumber
        )
      );
    }}
    className="w-full rounded-lg bg-yellow-500 text-white py-3 mb-3"
  >
    ⭐ Set as Primary
  </button>
)}

<button
  onClick={() => {
    if (!selectedBank) return;

    setEditBank({
      bankName: selectedBank.bankName,
      accountHolder: selectedBank.accountHolder,
      accountNumber: selectedBank.accountNumber,
      ifscCode: selectedBank.ifscCode,
    });

    setShowBankDetails(false);
    setShowEditBank(true);
  }}
  className="w-full rounded-lg bg-blue-600 text-white py-3 mb-3"
>
  ✏️ Edit Bank
</button>
<button
  onClick={() => setShowBankDetails(false)}
  className="w-full rounded-lg bg-[#0F8A5F] text-white py-3"
>
  Close
</button>

    </div>
  </div>
)}
{showEditBank && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <h2 className="text-xl font-semibold mb-5">
        ✏️ Edit Bank
      </h2>

      <input
        type="text"
        placeholder="Bank Name"
        value={editBank.bankName}
        onChange={(e) =>
          setEditBank({
            ...editBank,
            bankName: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3 mb-3"
      />

      <input
        type="text"
        placeholder="Account Holder"
        value={editBank.accountHolder}
        onChange={(e) =>
          setEditBank({
            ...editBank,
            accountHolder: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3 mb-3"
      />
      <input
  type="text"
  placeholder="Account Number"
  value={editBank.accountNumber}
  onChange={(e) =>
    setEditBank({
      ...editBank,
      accountNumber: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-3"
/>

<input
  type="text"
  placeholder="IFSC Code"
  value={editBank.ifscCode}
  onChange={(e) =>
    setEditBank({
      ...editBank,
      ifscCode: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-4"
/>

    </div>
  </div>
)}

    </div>
  );
};
