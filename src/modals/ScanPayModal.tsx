import React, { useState } from 'react';
import { QrCode, X, Camera, ShieldCheck, CheckCircle2, User, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ScanPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessPayment: (amount: number, recipient: string, note: string) => void;
}

export const ScanPayModal: React.FC<ScanPayModalProps> = ({
  isOpen,
  onClose,
  onSuccessPayment,
}) => {
  const [step, setStep] = useState<'scan' | 'amount' | 'pin' | 'success'>('scan');
  const [recipient, setRecipient] = useState({
    name: 'Starbucks Coffee HQ',
    upiId: 'starbucks@icici',
    avatar: '☕',
  });
  const [amount, setAmount] = useState('380');
  const [note, setNote] = useState('Iced Caramel Macchiato');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSelectMockQr = (name: string, upiId: string, emoji: string) => {
    setRecipient({ name, upiId, avatar: emoji });
    setStep('amount');
  };

  const handlePay = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('pin');
  };

  const handleConfirmPin = () => {
    if (pin.length < 4) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onSuccessPayment(parseFloat(amount), recipient.name, note);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F8A5F', '#10B981', '#34D399', '#F59E0B'],
      });
    }, 1200);
  };

  const handleReset = () => {
    setStep('scan');
    setPin('');
    setAmount('380');
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
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base">UPI Scan & Pay</h3>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {step === 'scan' && (
              <div className="space-y-4 text-center">
                {/* Viewfinder Simulator */}
                <div className="relative w-full h-56 bg-gray-900 rounded-[20px] overflow-hidden flex flex-col items-center justify-center border-2 border-emerald-500/40">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-pulse" />

                  {/* Corner Target Markers */}
                  <div className="w-40 h-40 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center relative">
                    <Camera className="w-8 h-8 text-emerald-400 opacity-60 animate-bounce" />
                    <span className="absolute -bottom-6 text-[10px] text-emerald-300 font-mono tracking-wider uppercase">
                      Point camera at QR
                    </span>
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Or Tap Mock QR Merchant:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSelectMockQr('Starbucks Cafe', 'starbucks@icici', '☕')}
                      className="p-3 rounded-xl border border-black/[0.06] bg-[#FAFAF8] hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-lg">☕</span>
                      <div>
                        <div className="text-xs font-bold text-[#1A1A1A]">Starbucks</div>
                        <div className="text-[10px] text-gray-400">starbucks@icici</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectMockQr('BigBasket Supermarket', 'bigbasket@axis', '🛒')}
                      className="p-3 rounded-xl border border-black/[0.06] bg-[#FAFAF8] hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-lg">🛒</span>
                      <div>
                        <div className="text-xs font-bold text-[#1A1A1A]">BigBasket</div>
                        <div className="text-[10px] text-gray-400">bigbasket@axis</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'amount' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAFAF8] border border-black/[0.05]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-xl flex items-center justify-center">
                    {recipient.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{recipient.name}</h4>
                    <p className="text-xs text-gray-400 font-mono">{recipient.upiId}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Enter Amount (₹)</label>
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

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Add Note</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Coffee, Groceries, etc."
                    className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                  />
                </div>

                <button
                  onClick={handlePay}
                  className="w-full py-3.5 rounded-2xl bg-[#0F8A5F] text-white font-bold text-sm hover:bg-[#0B6E4C] transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  Proceed to Pay ₹{amount || '0'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'pin' && (
              <div className="space-y-4 text-center py-2">
                <div className="p-3 bg-emerald-50 text-[#0F8A5F] rounded-2xl inline-block">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1A1A1A]">Enter 4-Digit UPI PIN</h4>
                  <p className="text-xs text-gray-500">Paying ₹{amount} to {recipient.name}</p>
                </div>

                <div className="flex justify-center gap-2 my-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold ${
                        pin.length > idx
                          ? 'border-[#0F8A5F] bg-emerald-50 text-[#0F8A5F]'
                          : 'border-gray-200 bg-[#FAFAF8]'
                      }`}
                    >
                      {pin.length > idx ? '•' : ''}
                    </div>
                  ))}
                </div>

                {/* Simulated Keypad */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (key === 'C') setPin('');
                        else if (key === '✓') handleConfirmPin();
                        else if (pin.length < 4) setPin((prev) => prev + key);
                      }}
                      className="py-3 bg-[#FAFAF8] border border-black/[0.04] rounded-xl font-bold text-sm hover:bg-emerald-50 hover:text-[#0F8A5F] transition-all active:scale-95 cursor-pointer"
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {isProcessing && (
                  <div className="flex items-center justify-center gap-2 text-xs text-[#0F8A5F] font-semibold pt-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying with Bank...
                  </div>
                )}
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Payment Successful!</h3>
                  <p className="text-2xl font-black text-[#0F8A5F] mt-1">₹{amount}</p>
                  <p className="text-xs text-gray-500 mt-1">Paid to {recipient.name}</p>
                </div>

                <div className="p-3 bg-[#FAFAF8] rounded-2xl text-left text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ref ID:</span>
                    <span className="font-bold text-[#1A1A1A]">UPI/99820129</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-[#1A1A1A]">Kangfinz Wallet</span>
                  </div>
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
