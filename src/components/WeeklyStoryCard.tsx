import React, { useState } from 'react';
import { BookOpen, Sparkles, TrendingDown, ArrowRight, PieChart } from 'lucide-react';
import { motion } from 'motion/react';

interface WeeklyStoryCardProps {
  onAskAI: (prompt: string) => void;
}

export const WeeklyStoryCard: React.FC<WeeklyStoryCardProps> = ({ onAskAI }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const stories = [
    {
      title: "Weekly Overview",
      headline: "Spent 14% less than last week",
      narrative: "You stayed 14% under budget this week by reducing restaurant orders. Your auto-roundup saved ₹420 directly to digital gold.",
      badge: "Discipline Champion 🏆",
      stat1: "₹18,400 Net Savings",
      stat2: "Groceries (Top Spend)",
    },
    {
      title: "Cashflow Trajectory",
      headline: "Income exceeds spend by 2.4x",
      narrative: "Your side-hustle payment of ₹35,000 boosted your net savings rate to 44% for July.",
      badge: "Growth Surge 📈",
      stat1: "+₹35,000 Inflow",
      stat2: "44% Savings Rate",
    }
  ];

  const currentStory = stories[activeStoryIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-purple-50 text-purple-600">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A]">Weekly Financial Story</h3>
            <span className="text-[10px] text-gray-400 font-medium">July Week 4 Edition</span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[9px] border border-purple-100">
          {currentStory.badge}
        </span>
      </div>

      {/* Story Card Content */}
      <div className="bg-gradient-to-r from-purple-50/50 via-indigo-50/30 to-emerald-50/40 p-2.5 rounded-[14px] border border-purple-100/50 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            {currentStory.headline}
          </h4>
          <span className="text-[9px] font-mono text-gray-400">{currentStory.title}</span>
        </div>

        <p className="text-xs font-medium text-gray-700 leading-snug">
          "{currentStory.narrative}"
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-purple-100/60 text-[10px]">
          <div className="bg-white/80 p-1.5 rounded-lg border border-black/[0.04]">
            <span className="text-gray-400 block text-[9px]">Highlight 1</span>
            <strong className="text-[#0F8A5F]">{currentStory.stat1}</strong>
          </div>
          <div className="bg-white/80 p-1.5 rounded-lg border border-black/[0.04]">
            <span className="text-gray-400 block text-[9px]">Highlight 2</span>
            <strong className="text-[#1A1A1A]">{currentStory.stat2}</strong>
          </div>
        </div>
      </div>

      {/* Footer / AI Story Breakdown */}
      <div className="flex items-center justify-between pt-0.5 text-[10px]">
        <div className="flex items-center gap-1">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStoryIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeStoryIndex === idx ? 'w-4 bg-purple-600' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => onAskAI("Analyze my weekly financial story in detail and give me 3 actionable tips")}
          className="text-[#0F8A5F] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          Full Story AI Audit <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </motion.div>
  );
};
