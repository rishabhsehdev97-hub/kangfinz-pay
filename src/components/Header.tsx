import { auth } from "../firebase/config";
import React from 'react';
import { Bell, Smartphone, Monitor, ShieldCheck, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  isFrameView: boolean;
  setIsFrameView: (val: boolean) => void;
  onOpenProfile: () => void;
  onOpenAI: () => void;
  activeTab?: TabType;
  unreadCount?: number;

}

export const Header: React.FC<HeaderProps> = ({
  isFrameView,
  setIsFrameView,
  onOpenProfile,
  onOpenAI,
  activeTab = 'home',
  unreadCount = 2,
}) => {
  const user = auth.currentUser;
  console.log("Current Firebase User:", user);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {getGreeting()}, {user?.displayName || "Guest"} <span className="animate-bounce inline-block text-sm">👋</span>
          </>
        );
      case 'money':
        return 'Private Vault';
      case 'payments':
        return 'Payments';
      case 'ai':
        return 'AI Financial Assistant';
      case 'insights':
        return 'Insights';
      case 'profile':
        return 'Profile';
      default:
        return (
          <>
            {getGreeting()}, {user?.displayName || "Guest"} <span className="animate-bounce inline-block text-sm">👋</span>
          </>
        );
    }
  };

  return (
    <header className="flex items-center justify-between pt-1 pb-2 px-0.5">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenProfile}
          className="relative group cursor-pointer focus:outline-none"
          title="Open Profile"
        >
          <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#0F8A5F] via-[#10B981] to-[#34D399] transition-transform group-hover:scale-105 active:scale-95">
            <img
              src={user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.displayName || "Guest"}
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0F8A5F] border-2 border-white rounded-full"></span>
        </button>

        <div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-semibold tracking-wide text-[#0F8A5F] uppercase flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Kangfinz Pay
            </span>
          </div>
          <h1 className={`font-semibold text-[#1A1A1A] tracking-tight leading-snug flex items-center gap-1 ${
            activeTab === 'home' ? 'text-[17px]' : 'text-[20px]'
          }`}>
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Device View Mode Toggle button */}
        <button
          onClick={() => setIsFrameView(!isFrameView)}
          className="p-1.5 rounded-full bg-white border border-black/[0.06] text-gray-600 hover:text-[#0F8A5F] hover:bg-emerald-50/50 transition-all shadow-2xs active:scale-95 cursor-pointer"
          title={isFrameView ? "Switch to Canvas View" : "Switch to iPhone 15 Frame"}
        >
          {isFrameView ? (
            <Monitor className="w-3.5 h-3.5" />
          ) : (
            <Smartphone className="w-3.5 h-3.5 text-[#0F8A5F]" />
          )}
        </button>

        {/* AI Copilot Quick Launcher */}
        <button
          onClick={onOpenAI}
          className="p-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#0F8A5F] hover:bg-emerald-100/60 transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center justify-center"
          title="Ask Kangfinz AI"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => alert("Notification: You received ₹35,000 freelance payout from UI Design Sprint!")}
          className="relative p-1.5 rounded-full bg-white border border-black/[0.06] text-gray-700 hover:text-[#0F8A5F] hover:bg-emerald-50/50 transition-all shadow-2xs active:scale-95 cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#0F8A5F] rounded-full ring-2 ring-white"></span>
          )}
        </button>
      </div>
    </header>
  );
};
