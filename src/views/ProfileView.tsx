import React from 'react';
import { User, ShieldCheck, CreditCard, Lock, Bell, HelpCircle, LogOut, ChevronRight, Smartphone, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileViewProps {
  isFrameView: boolean;
  setIsFrameView: (val: boolean) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  isFrameView,
  setIsFrameView,
}) => {
  return (
    <div className="space-y-2.5 pb-2">
      <div className="pt-1">
        <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Profile</h2>
        <p className="text-[11px] text-gray-500 font-normal">Account security & preferences</p>
      </div>

      {/* User Card */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
        <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#0F8A5F] to-[#34D399] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Rishabh"
            className="w-full h-full object-cover rounded-full border-2 border-white"
          />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[14px] font-medium text-[#1A1A1A]">Rishabh Sehdev</h3>
            <span className="px-1.5 py-0.2 text-[10px] bg-emerald-100 text-[#0F8A5F] font-semibold rounded">
              Premium
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-mono">+91 98765 43210</p>
          <p className="text-[11px] text-[#0F8A5F] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> KYC Verified
          </p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Preferences</h3>

        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => setIsFrameView(!isFrameView)}
            className="w-full p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between hover:bg-emerald-50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-[#1A1A1A] font-medium text-[13px]">
              <Smartphone className="w-3.5 h-3.5 text-[#0F8A5F]" /> Device View Layout
            </div>
            <span className="text-gray-500 font-mono text-[11px]">
              {isFrameView ? 'iPhone 15 Frame' : 'Fluid Canvas'}
            </span>
          </button>

          <div className="w-full p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#1A1A1A] font-medium text-[13px]">
              <Lock className="w-3.5 h-3.5 text-[#0F8A5F]" /> Biometric Face ID
            </div>
            <span className="text-emerald-600 font-medium text-[11px]">Enabled</span>
          </div>

          <div className="w-full p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#1A1A1A] font-medium text-[13px]">
              <Bell className="w-3.5 h-3.5 text-[#0F8A5F]" /> Instant Spend Alerts
            </div>
            <span className="text-emerald-600 font-medium text-[11px]">SMS & Push</span>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center py-1 space-y-0.5">
        <p className="text-[11px] font-medium text-[#0F8A5F]">Kangfinz Pay v1.2.0</p>
        <p className="text-[11px] text-gray-500 font-normal">Secured with 256-Bit Financial Encryption</p>
      </div>
    </div>
  );
};
