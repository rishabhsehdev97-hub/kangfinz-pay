import React, { useState } from 'react';
import { X, Smartphone, Globe, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onAppleSignIn: () => void;
  onGuestSignIn: () => void;
  currentEmail?: string;
  currentName?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
  onAppleSignIn,
  onGuestSignIn,
  currentEmail,
  currentName
}) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setVerified(true);
      setTimeout(() => {
        onGuestSignIn();
        onClose();
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-6 shadow-2xl border border-black/5 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F8A5F] flex items-center justify-center font-bold">
                KF
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#1A1A1A]">Firebase Auth</h3>
                <p className="text-[11px] text-gray-500">Secure Fintech Login & Session</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Session Banner */}
          {currentName && (
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider block">Active Session</span>
                <p className="font-semibold text-[#1A1A1A] text-[13px]">{currentName}</p>
                <p className="text-[11px] text-gray-500">{currentEmail}</p>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-medium">Verified</span>
            </div>
          )}

          {/* Mobile OTP Form */}
          <div className="space-y-3 pt-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Mobile Number OTP Login
            </label>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 font-medium">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full pl-11 pr-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#0F8A5F]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="px-4 py-2.5 bg-[#0F8A5F] text-white rounded-xl text-[12px] font-medium disabled:opacity-50 hover:bg-[#0B6E4C] transition-all flex items-center gap-1 cursor-pointer"
                >
                  Get OTP <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : verified ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-[#0F8A5F] text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F8A5F]" /> Phone verified via Firebase OTP!
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP (e.g. 1234)"
                  maxLength={6}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#0F8A5F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#0F8A5F] text-white rounded-xl text-[12px] font-medium hover:bg-[#0B6E4C] transition-all cursor-pointer"
                >
                  Verify
                </button>
              </form>
            )}
          </div>

          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-gray-100 w-full"></div>
            <span className="bg-white px-3 text-[10px] text-gray-400 uppercase font-medium absolute">Or Continue With</span>
          </div>

          {/* Social Sign In Options */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => { onGoogleSignIn(); onClose(); }}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-[12px] font-medium text-[#1A1A1A] transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-600" /> Google
            </button>

            <button
              onClick={() => { onAppleSignIn(); onClose(); }}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-black hover:text-white flex items-center justify-center gap-2 text-[12px] font-medium transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4" /> Apple ID
            </button>
          </div>

          <button
            onClick={() => { onGuestSignIn(); onClose(); }}
            className="w-full py-2.5 text-center text-[11px] font-medium text-gray-500 hover:text-[#0F8A5F] transition-colors cursor-pointer"
          >
            Continue in Demo Session Mode
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
