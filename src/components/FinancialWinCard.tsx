import React, { useState } from 'react';
import { Trophy, TrendingDown, TrendingUp, Sparkles, Volume2, VolumeX, RefreshCw, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FinancialWinCardProps {
  onAskAI?: (prompt: string) => void;
}

export const FinancialWinCard: React.FC<FinancialWinCardProps> = ({ onAskAI }) => {
  const [activeWinIndex, setActiveWinIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const wins = [
    {
      title: "Food & Dining Spend",
      stat: "9% Lower",
      tag: "Saved ₹1,240",
      description: "Food spending is 9% lower than last week. You cooked 4 home meals!",
      icon: TrendingDown,
      trendColor: "text-emerald-600 bg-emerald-50",
      type: "Savings Win"
    },
    {
      title: "Investment Portfolio",
      stat: "+₹1,250 Today",
      tag: "+1.4% gain",
      description: "Investment portfolio gained ₹1,250 today driven by Nifty 50 Index SIPs.",
      icon: TrendingUp,
      trendColor: "text-emerald-600 bg-emerald-50",
      type: "Wealth Win"
    },
    {
      title: "Smart Cash Flow",
      stat: "₹42,500 Surplus",
      tag: "Positive Flow",
      description: "Monthly income exceeds planned expenses by 32%. Great reserve buffer!",
      icon: Trophy,
      trendColor: "text-amber-600 bg-amber-50",
      type: "Buffer Win"
    }
  ];

  const currentWin = wins[activeWinIndex];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(currentWin.description);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const nextWin = () => {
    setActiveWinIndex((prev) => (prev + 1) % wins.length);
  };

  const Icon = currentWin.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5 relative overflow-hidden"
    >
      {/* Top Tag & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-emerald-50 text-[#0F8A5F]">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-[#0F8A5F] tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Today's Financial Win
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleSpeak}
            className={`p-1 rounded-md text-gray-400 hover:text-[#0F8A5F] hover:bg-emerald-50 transition-colors cursor-pointer ${
              isSpeaking ? 'text-[#0F8A5F] bg-emerald-50' : ''
            }`}
            title="Listen to Financial Win"
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>

          <button
            onClick={nextWin}
            className="p-1 rounded-md text-gray-400 hover:text-[#0F8A5F] hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Next Financial Win"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Win Highlight Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWinIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FAFAF8] p-2.5 rounded-[14px] border border-black/[0.03] space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`p-1 rounded-md text-xs font-bold ${currentWin.trendColor}`}>
                <Icon className="w-3.5 h-3.5 inline mr-0.5" />
                {currentWin.stat}
              </span>
              <span className="text-[10px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded border border-black/[0.04]">
                {currentWin.tag}
              </span>
            </div>

            <span className="text-[9px] font-mono text-gray-400">{currentWin.type}</span>
          </div>

          <p className="text-xs font-semibold text-[#1A1A1A] leading-snug">
            "{currentWin.description}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Switcher Dots & AI prompt */}
      <div className="flex items-center justify-between pt-0.5 text-[10px]">
        <div className="flex items-center gap-1">
          {wins.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWinIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeWinIndex === idx ? 'w-4 bg-[#0F8A5F]' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {onAskAI && (
          <button
            onClick={() => onAskAI(`How can I replicate this win: "${currentWin.description}"?`)}
            className="text-[#0F8A5F] font-bold hover:underline flex items-center gap-0.5 cursor-pointer text-[10px]"
          >
            Ask How <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
