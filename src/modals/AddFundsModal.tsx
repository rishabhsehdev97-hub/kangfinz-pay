import React, { useState } from 'react';
import { Plus, X, Landmark, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFundsSuccess: (amount: number, target: string) => void;
}

export const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  onAddFundsSuccess,
}) => {
  const [amount, setAmount] = useState('5000');
  const [target, setTarget] = useState<'emergency' | 'bank'>('emergency');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    onAddFundsSuccess(
      parseFloat(amount),
      target === 'emergency' ? 'Emergency Fund' : 'Bank Balance'
    );
    setIsSuccess(true);

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#0F8A5F', '#10B981', '#34D399'],
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-sm bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/[0.08]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-[#0F8A5F]">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base">Deposit & Save</h3>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {!isSuccess ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Destination Account
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTarget('emergency')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        target === 'emergency'
                          ? 'border-[#0F8A5F] bg-emerald-50/70 text-[#0F8A5F]'
                          : 'border-black/[0.06] bg-[#FAFAF8] text-gray-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Emergency Fund</div>
                      <div className="text-[10px] text-gray-500">Goal Progress +</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTarget('bank')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        target === 'bank'
                          ? 'border-[#0F8A5F] bg-emerald-50/70 text-[#0F8A5F]'
                          : 'border-black/[0.06] bg-[#FAFAF8] text-gray-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Bank Balance</div>
                      <div className="text-[10px] text-gray-500">Liquid Savings</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Deposit Amount (₹)</label>
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-2xl font-extrabold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {['1000', '2000', '5000', '10000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-black/[0.06] text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0F8A5F] transition-all cursor-pointer"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleDeposit}
                  className="w-full py-3.5 rounded-2xl bg-[#0F8A5F] text-white font-bold text-sm hover:bg-[#0B6E4C] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Deposit ₹{amount || '0'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Deposit Successful!</h3>
                  <p className="text-2xl font-black text-[#0F8A5F] mt-1">₹{amount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Added to {target === 'emergency' ? 'Emergency Fund Goal' : 'Bank Balance'}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-2xl bg-[#0F8A5F] text-white font-bold text-sm hover:bg-[#0B6E4C] transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
