import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, Zap, BrainCircuit, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface AIInsightCardProps {
  insight?: string;
  onAskAI: (prompt?: string) => void;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  insight = "You're on track to reach your emergency fund this month.",
  onAskAI,
}) => {
  const [activeTab, setActiveTab] = useState<'insight' | 'tips'>('insight');
  const [loading, setLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(insight);

  const extraTips = [
    { title: 'Smart Budget Alert', desc: 'You spent 18% less on food delivery this week. Great discipline!' },
    { title: 'Tax Saving Tip', desc: 'Investing ₹12,500 more in ELSS before Q3 saves up to ₹3,870 in taxes.' },
    { title: 'Bill Optimizer', desc: 'Automating your Electricity Bill prevents late fees of ₹150 every billing cycle.' },
  ];

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-insight');
      if (res.ok) {
        const data = await res.json();
        if (data.insight) setCurrentInsight(data.insight);
      }
    } catch (err) {
      console.log('AI Insight fetch failed fallback', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-[18px] bg-gradient-to-br from-emerald-900 via-[#0C583E] to-[#083E2C] text-white p-3.5 shadow-[0_4px_16px_rgba(15,138,95,0.2)] relative overflow-hidden"
    >
      {/* Decorative background glow rings */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-emerald-200 tracking-wider uppercase flex items-center gap-1">
            Today's AI Insight
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
            title="Refresh AI Analysis"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => onAskAI('Tell me more about my emergency fund progress')}
            className="text-[10px] font-bold text-emerald-300 hover:text-white flex items-center gap-0.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            Ask Copilot <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-2">
        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-[14px] border border-white/15">
          <p className="text-xs font-semibold text-white leading-snug flex items-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            "{currentInsight}"
          </p>

          <div className="mt-1.5 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-200/90">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" /> Auto-analyzed cash flow
            </span>
            <span className="font-mono text-[9px] text-white/60">v2.5</span>
          </div>
        </div>

        {/* Quick Follow-up prompt pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[10px]">
          <button
            onClick={() => onAskAI('How can I reach my ₹1,00,000 goal faster?')}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold transition-all cursor-pointer active:scale-95"
          >
            💡 Reach goal faster
          </button>
          <button
            onClick={() => onAskAI('Analyze my monthly spending trends')}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold transition-all cursor-pointer active:scale-95"
          >
            📊 Spend analysis
          </button>
          <button
            onClick={() => onAskAI('Where can I cut expenses safely?')}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold transition-all cursor-pointer active:scale-95"
          >
            ✂️ Cut expenses
          </button>
        </div>
      </div>
    </motion.div>
  );
};
