import React, { useState } from 'react';
import { Eye, EyeOff, Landmark, Wallet, Banknote, TrendingUp, ChevronRight, PieChart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MoneySnapshotData } from '../types';

interface MoneySnapshotCardProps {
  data: MoneySnapshotData;
  onOpenBreakdown?: () => void;
  onOpenAddFunds?: () => void;
}

export const MoneySnapshotCard: React.FC<MoneySnapshotCardProps> = ({
  data,
  onOpenBreakdown,
  onOpenAddFunds,
}) => {
  const [showBalance, setShowBalance] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const hiddenMask = '••••••••';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5"
    >
      {/* Header with Net Worth & Eye toggle */}
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
        <div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            <span>Total Net Worth</span>
            <span className="px-1 py-0.2 text-[9px] bg-emerald-50 text-[#0F8A5F] font-bold rounded border border-emerald-100">
              Live Sync
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
              {showBalance ? formatCurrency(data.netWorth) : hiddenMask}
            </span>
            {showBalance && (
              <span className="text-[10px] font-bold text-[#0F8A5F] bg-emerald-50 px-1.5 py-0.2 rounded-full">
                +12.4% yr
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1.5 rounded-full bg-[#FAFAF8] border border-black/[0.06] text-gray-600 hover:text-[#0F8A5F] hover:bg-emerald-50 transition-colors active:scale-95 cursor-pointer flex items-center justify-center"
            title={showBalance ? 'Hide Balances' : 'Reveal Balances'}
          >
            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full bg-[#FAFAF8] border border-black/[0.06] text-gray-600 hover:text-[#0F8A5F] transition-colors active:scale-95 cursor-pointer"
            title={isExpanded ? 'Collapse Snapshot' : 'Expand Snapshot'}
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Snapshot breakdown items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-2"
          >
            {/* Bank Balance */}
            <div className="p-2.5 rounded-[14px] bg-[#FAFAF8] border border-black/[0.04] hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-0.5">
                <span className="flex items-center gap-1 text-gray-700">
                  <Landmark className="w-3 h-3 text-[#0F8A5F]" /> Bank
                </span>
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">
                {showBalance ? formatCurrency(data.bankBalance) : hiddenMask}
              </p>
              <span className="text-[9px] text-gray-400">HDFC & ICICI</span>
            </div>

            {/* Cash */}
            <div className="p-2.5 rounded-[14px] bg-[#FAFAF8] border border-black/[0.04] hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-0.5">
                <span className="flex items-center gap-1 text-gray-700">
                  <Banknote className="w-3 h-3 text-[#0F8A5F]" /> Cash
                </span>
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">
                {showBalance ? formatCurrency(data.cash) : hiddenMask}
              </p>
              <span className="text-[9px] text-gray-400">In-hand</span>
            </div>

            {/* Wallet */}
            <div className="p-2.5 rounded-[14px] bg-[#FAFAF8] border border-black/[0.04] hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-0.5">
                <span className="flex items-center gap-1 text-gray-700">
                  <Wallet className="w-3 h-3 text-[#0F8A5F]" /> Wallet
                </span>
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">
                {showBalance ? formatCurrency(data.wallet) : hiddenMask}
              </p>
              <span className="text-[9px] text-gray-400">1-Tap Cash</span>
            </div>

            {/* Investments */}
            <div className="p-2.5 rounded-[14px] bg-[#FAFAF8] border border-black/[0.04] hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-0.5">
                <span className="flex items-center gap-1 text-gray-700">
                  <TrendingUp className="w-3 h-3 text-[#0F8A5F]" /> Investments
                </span>
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">
                {showBalance ? formatCurrency(data.investments) : hiddenMask}
              </p>
              <span className="text-[9px] text-emerald-600 font-medium">SIPs & Stocks</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer bar with quick action to manage assets */}
      <div className="pt-0.5 flex items-center justify-between text-[11px]">
        <button
          onClick={onOpenBreakdown}
          className="text-[#0F8A5F] font-bold flex items-center gap-1 hover:underline cursor-pointer text-[11px]"
        >
          <PieChart className="w-3 h-3" /> Asset Breakdown
        </button>

        <button
          onClick={onOpenAddFunds}
          className="px-2.5 py-1 rounded-full bg-[#0F8A5F] text-white font-semibold text-[10px] shadow-2xs hover:bg-[#0B6E4C] active:scale-95 transition-all cursor-pointer"
        >
          + Add Funds
        </button>
      </div>
    </motion.div>
  );
};
