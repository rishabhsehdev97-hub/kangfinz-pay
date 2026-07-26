import React from 'react';
import { ShieldCheck, Target, ArrowRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { FinancialGoal } from '../types';

interface FinancialGoalsCardProps {
  goal: FinancialGoal;
  onAddFunds: (goal: FinancialGoal) => void;
  onViewAllGoals: () => void;
}

export const FinancialGoalsCard: React.FC<FinancialGoalsCardProps> = ({
  goal,
  onAddFunds,
  onViewAllGoals,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-emerald-50 text-[#0F8A5F]">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A]">
              {goal.title} Progress
            </h3>
            <span className="text-[10px] text-gray-400 font-medium">Target: {formatCurrency(goal.targetAmount)}</span>
          </div>
        </div>

        <button
          onClick={onViewAllGoals}
          className="text-[10px] font-bold text-[#0F8A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          View Goals <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Main Guidance Callout */}
      <div className="bg-[#FAFAF8] p-2.5 rounded-[14px] border border-black/[0.03] space-y-2">
        <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-100 text-[#0F8A5F]">
          <p className="text-xs font-extrabold text-[#0F8A5F] flex items-center gap-1">
            🎯 You are {formatCurrency(goal.remainingAmount)} away from your {goal.title}!
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
            Guidance: Setting aside ₹2,000/week completes your safety net 14 days early.
          </p>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <span className="text-[10px] text-gray-500 font-medium">Saved so far</span>
            <p className="text-sm font-extrabold text-[#1A1A1A]">
              {formatCurrency(goal.currentAmount)}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-[#0F8A5F]">
              {goal.percentage}% Goal Met
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${goal.percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#0F8A5F] to-[#10B981] rounded-full relative"
          >
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-white/40 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <Target className="w-3 h-3 text-[#0F8A5F]" />
          <span>Est: <strong className="text-gray-700">Aug 2026</strong></span>
        </div>

        <button
          onClick={() => onAddFunds(goal)}
          className="px-2.5 py-1 rounded-full bg-[#0F8A5F] text-white text-[10px] font-semibold shadow-2xs hover:bg-[#0B6E4C] active:scale-95 transition-all cursor-pointer flex items-center gap-0.5"
        >
          <Plus className="w-3 h-3" /> Deposit
        </button>
      </div>
    </motion.div>
  );
};
