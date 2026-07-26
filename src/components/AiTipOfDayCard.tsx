import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface AiTipOfDayCardProps {
  onAskAI: (prompt?: string) => void;
}

export const AiTipOfDayCard: React.FC<AiTipOfDayCardProps> = ({ onAskAI }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-3.5 rounded-[18px] bg-gradient-to-r from-[#FAFAF8] via-[#F3F8F5] to-emerald-50/60 border border-emerald-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2 relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-[#0F8A5F] text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1A1A1A]">AI Tip of the Day</h3>
            <span className="text-[11px] font-normal text-[#0F8A5F]">Personalized for Rishabh</span>
          </div>
        </div>

        <button
          onClick={() => onAskAI('Give me today\'s custom financial tip and optimization strategy')}
          className="p-1 rounded-full hover:bg-emerald-100/60 text-[#0F8A5F] transition-colors cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
        </button>
      </div>

      <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-100/80 text-[13px] text-[#1A1A1A] space-y-1">
        <p className="font-normal leading-relaxed">
          💡 Auto-routing 15% of your dining cashbacks into your High-Yield Liquid SIP could net an extra <strong className="text-[#0F8A5F] font-semibold">₹2,400</strong> this month.
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-gray-500 font-normal">Updated 10m ago based on UPI activity</span>
        <button
          onClick={() => onAskAI('Help me set up cashback auto-routing to my Liquid SIP')}
          className="font-medium text-[#0F8A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>Auto-apply Tip</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};
