import React, { useState } from 'react';
import { ShieldCheck, Fingerprint, Lock, X, Check, KeyRound, Sparkles, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface BiometricAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BiometricAuthModal: React.FC<BiometricAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [authMethod, setAuthMethod] = useState<'biometric' | 'pin'>('biometric');
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const triggerScan = () => {
    setIsScanning(true);
    setPinError(false);

    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#0F8A5F', '#10B981', '#34D399'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 700);
    }, 1200);
  };

  const handlePinInput = (num: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = num;
    setPin(newPin);
    setPinError(false);

    // Auto focus next input
    if (num && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Check if full PIN entered
    if (newPin.every((digit) => digit !== '')) {
      const fullPin = newPin.join('');
      if (fullPin === '1234' || fullPin === '0000' || fullPin.length === 4) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setPin(['', '', '', '']);
          onSuccess();
          onClose();
        }, 600);
      } else {
        setPinError(true);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-xs bg-white rounded-[24px] shadow-2xl border border-black/[0.08] overflow-hidden text-center p-5 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4 text-[#0F8A5F]" />
              <span>Biometric Security Verification</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/5 text-gray-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Biometric Scanner Visual */}
          {authMethod === 'biometric' ? (
            <div className="space-y-4 py-2">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                {/* Pulse Rings */}
                <motion.div
                  animate={isScanning ? { scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] } : {}}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute inset-0 rounded-full bg-emerald-100/80 -z-10"
                />
                <div
                  onClick={triggerScan}
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isSuccess
                      ? 'bg-[#0F8A5F] text-white'
                      : isScanning
                      ? 'bg-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-emerald-50 text-[#0F8A5F] border-2 border-emerald-200 hover:scale-105 shadow-2xs'
                  }`}
                >
                  {isSuccess ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <Fingerprint className={`w-8 h-8 ${isScanning ? 'animate-pulse' : ''}`} />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#1A1A1A]">
                  {isSuccess
                    ? 'Identity Verified!'
                    : isScanning
                    ? 'Scanning Face ID / Fingerprint...'
                    : 'Tap Fingerprint Sensor'}
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Confirm your identity to reveal sensitive balances
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAuthMethod('pin')}
                  className="text-xs font-bold text-[#0F8A5F] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" /> Use Security PIN Instead
                </button>
              </div>
            </div>
          ) : (
            /* PIN Input Form */
            <div className="space-y-4 py-2">
              <div>
                <h3 className="text-sm font-extrabold text-[#1A1A1A]">Enter 4-Digit Security PIN</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Default demo PIN: 1234 or any 4 digits</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    id={`pin-input-${i}`}
                    type="password"
                    maxLength={1}
                    value={pin[i]}
                    onChange={(e) => handlePinInput(e.target.value, i)}
                    className="w-10 h-12 text-center text-lg font-black bg-[#FAFAF8] border border-black/[0.1] rounded-xl focus:border-[#0F8A5F] focus:outline-none"
                  />
                ))}
              </div>

              {pinError && (
                <p className="text-[10px] text-red-500 font-bold">Incorrect PIN. Please try again.</p>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setAuthMethod('biometric')}
                  className="text-xs font-bold text-gray-500 hover:text-[#0F8A5F] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <Fingerprint className="w-3.5 h-3.5" /> Switch to Face ID / Fingerprint
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-black/[0.05] text-[9px] text-gray-400 font-medium flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#0F8A5F]" /> 256-Bit Encrypted Kangfinz Privacy Lock
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
