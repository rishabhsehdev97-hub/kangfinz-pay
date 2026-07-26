import React from 'react';
import { Home, Wallet, PieChart, Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'money' as TabType, label: 'Money', icon: Wallet },
    { id: 'ai' as TabType, label: 'AI', icon: Sparkles, isAi: true },
    { id: 'insights' as TabType, label: 'Insights', icon: PieChart },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/[0.06] px-2 py-1 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 min-w-[50px] min-h-[42px] rounded-xl transition-all cursor-pointer active:scale-95 group ${
                isActive ? 'text-[#0F8A5F]' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-emerald-50 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#0F8A5F] stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
                {tab.isAi && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                )}
              </div>

              <span
                className={`text-[11px] mt-0.5 font-medium tracking-tight ${
                  isActive ? 'text-[#0F8A5F]' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
