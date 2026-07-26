import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Zap, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello Rishabh! I'm Kangfinz AI. I've audited your ₹5,46,550 net worth and Emergency Fund progress (78%). How can I assist your financial growth today?",
      timestamp: 'Just now',
      quickPrompts: [
        'How can I reach my Emergency Fund goal this month?',
        'Where did I spend most money this week?',
        'Can I afford a ₹15,000 purchase right now?',
        'Suggest an optimal investment allocation',
      ],
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiReply: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply || 'I am tracking your finances closely!',
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      const fallbackReply: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Based on your current Bank Balance (₹1,84,250) and low debt ratio, your financial baseline is very healthy! Keeping your monthly SIPs active will build robust long-term wealth.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md h-[85vh] bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/[0.08] flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.06] bg-gradient-to-r from-emerald-900 to-[#0F8A5F] text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-300 border border-white/10">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">Kangfinz AI Copilot</h3>
                <p className="text-[10px] text-emerald-200 font-mono">Gemini 3.6 Flash • Real-Time Finance</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFAF8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#0F8A5F] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-[18px] text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0F8A5F] text-white rounded-tr-none font-medium'
                        : 'bg-white text-[#1A1A1A] border border-black/[0.05] rounded-tl-none font-normal'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick Prompts if attached */}
                  {msg.quickPrompts && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-amber-500" /> Suggested Prompts:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {msg.quickPrompts.map((qp, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(qp)}
                            className="text-left px-3 py-2 rounded-xl bg-white border border-black/[0.06] text-xs font-semibold text-[#0F8A5F] hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer active:scale-98 shadow-2xs"
                          >
                            👉 {qp}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#0F8A5F] font-semibold p-3 bg-white rounded-2xl border border-black/[0.05] w-fit shadow-xs">
                <RefreshCw className="w-4 h-4 animate-spin" /> Kangfinz AI is analyzing your portfolio...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-black/[0.06] flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your money, budget, goals..."
              className="flex-1 bg-[#FAFAF8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#0F8A5F]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputPrompt.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#0F8A5F] text-white disabled:opacity-40 hover:bg-[#0B6E4C] transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
