import React, { useState } from 'react';
import { Sparkles, CalendarCheck, Zap, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIRecommendationCardProps {
  onAskAI: (prompt?: string) => void;
  onActionClick?: (actionType: string) => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  onAskAI,
  onActionClick,
}) => {
  const [recommendations] = useState([
    {
      id: 'salary-sip',
      title: 'Salary Expected Tomorrow',
      highlight: '₹1,25,000 Payday',
      message: 'Your salary is expected tomorrow. Pre-schedule your ₹20,000 Auto-SIP to maximize compound interest.',
      actionText: 'Pre-schedule Auto-SIP',
      actionPayload: 'schedule-sip',
      impact: '+₹4,200 annual interest gain'
    },
    {
      id: 'surplus-cash',
      title: 'Idle Cash Optimization',
      highlight: '₹35,000 Idle Cash',
      message: 'You have ₹35,000 lying in liquid savings earning 3% p.a. Move ₹20,000 to Liquid Fund earning 7.1% p.a.',
      actionText: 'Transfer to Liquid Fund',
      actionPayload: 'liquid-fund',
      impact: '+₹1,420 risk-free returns'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeRec = recommendations[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-[18px] bg-gradient-to-br from-emerald-950 via-[#0C583E] to-[#083E2C] text-white p-3.5 shadow-[0_4px_16px_rgba(15,138,95,0.2)] relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-emerald-200 tracking-wider uppercase flex items-center gap-1">
            AI Recommendation
          </span>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % recommendations.length)}
          className="text-[10px] font-bold text-emerald-300 hover:text-white flex items-center gap-0.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 transition-all cursor-pointer"
        >
          Next Insight <ChevronRight className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRec.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 space-y-2"
        >
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-[14px] border border-white/15 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-emerald-300 flex items-center gap-1">
                <CalendarCheck className="w-3 h-3 text-amber-300" /> {activeRec.title}
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-400/20 text-emerald-200 font-mono rounded text-[9px]">
                {activeRec.highlight}
              </span>
            </div>

            <p className="text-xs font-semibold text-white leading-snug">
              "{activeRec.message}"
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-emerald-200">
              <span className="flex items-center gap-1 font-medium">
                <Zap className="w-3 h-3 text-amber-300" /> Impact: {activeRec.impact}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => {
                if (onActionClick) onActionClick(activeRec.actionPayload);
                else onAskAI(`Apply recommendation: ${activeRec.title}`);
              }}
              className="flex-1 px-3 py-1.5 rounded-full bg-[#0F8A5F] hover:bg-[#0B6E4C] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              {activeRec.actionText}
            </button>

            <button
              onClick={() => onAskAI(`Explain why: ${activeRec.message}`)}
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold border border-white/15 active:scale-95 transition-all cursor-pointer flex items-center gap-0.5"
            >
              Ask AI <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
