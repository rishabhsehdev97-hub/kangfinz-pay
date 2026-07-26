import React, { useState } from 'react';
import { Quote, Sparkles, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightBannerProps {
  quote?: string;
  onRefreshQuote?: () => void;
}

export const InsightBanner: React.FC<InsightBannerProps> = ({
  quote = "Every small financial decision today builds a stronger tomorrow.",
  onRefreshQuote,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quote);

  const sampleQuotes = [
    "Every small financial decision today builds a stronger tomorrow.",
    "Consistency in saving compounds faster than chasing high risks.",
    "Your 78% Emergency Fund goal protects your future peace of mind.",
    "Do not save what is left after spending, but spend what is left after saving."
  ];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(currentQuote);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleCycleQuote = () => {
    const nextIdx = (sampleQuotes.indexOf(currentQuote) + 1) % sampleQuotes.length;
    setCurrentQuote(sampleQuotes[nextIdx]);
    if (onRefreshQuote) onRefreshQuote();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[16px] bg-white border border-black/[0.05] p-2.5 px-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group"
    >
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#0F8A5F] rounded-l-[16px]" />

      <div className="flex items-center justify-between gap-2 pl-1.5">
        <div className="flex gap-2 items-center">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-[#0F8A5F] shrink-0">
            <Quote className="w-3.5 h-3.5 fill-[#0F8A5F]/20" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold tracking-wider text-[#0F8A5F] uppercase flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Today's Financial Win
              </span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A] leading-tight italic">
              "{currentQuote}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={handleSpeak}
            className={`p-1 rounded-md text-gray-400 hover:text-[#0F8A5F] hover:bg-emerald-50 transition-colors cursor-pointer ${isSpeaking ? 'text-[#0F8A5F] bg-emerald-50' : ''}`}
            title={isSpeaking ? "Stop Voice" : "Listen to Insight"}
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
          <button
            onClick={handleCycleQuote}
            className="p-1 rounded-md text-gray-400 hover:text-[#0F8A5F] hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Next Inspiration"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
