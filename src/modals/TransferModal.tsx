import React, { useState } from 'react';
import { Send, X, User, CheckCircle2, ArrowRight, Building2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { sampleContacts } from '../data/initialData';
import { Contact } from '../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessTransfer: (amount: number, recipientName: string) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onSuccessTransfer,
}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(sampleContacts[0]);
  const [customUpi, setCustomUpi] = useState('');
  const [amount, setAmount] = useState('2500');
  const [note, setNote] = useState('Dinner split');
  const [step, setStep] = useState<'select' | 'amount' | 'success'>('select');

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    const recipientName = selectedContact ? selectedContact.name : customUpi || 'Bank Beneficiary';
    onSuccessTransfer(parseFloat(amount), recipientName);
    setStep('success');

    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#0F8A5F', '#10B981', '#3B82F6'],
    });
  };

  const handleReset = () => {
    setStep('select');
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
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base">Instant Money Transfer</h3>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {step === 'select' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Recent Contacts
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleContacts.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedContact(c);
                          setStep('amount');
                        }}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          selectedContact?.id === c.id
                            ? 'border-[#0F8A5F] bg-emerald-50/60'
                            : 'border-black/[0.06] bg-[#FAFAF8] hover:border-emerald-200'
                        }`}
                      >
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover border border-white"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-[#1A1A1A] truncate">{c.name}</div>
                          <div className="text-[10px] text-gray-400 truncate">{c.bankName}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Or Enter Bank UPI ID / A/C
                  </label>
                  <div className="relative mt-1">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customUpi}
                      onChange={(e) => {
                        setCustomUpi(e.target.value);
                        setSelectedContact(null);
                      }}
                      placeholder="e.g. friend@okaxis or Account No."
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep('amount')}
                  className="w-full py-3 rounded-2xl bg-[#0F8A5F] text-white font-bold text-sm hover:bg-[#0B6E4C] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'amount' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAFAF8] border border-black/[0.05]">
                  {selectedContact ? (
                    <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F8A5F] flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">
                      {selectedContact ? selectedContact.name : customUpi || 'Bank Account'}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {selectedContact ? selectedContact.upiId : 'Direct Bank Transfer'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Transfer Amount (₹)</label>
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

                {/* Quick Amount Chips */}
                <div className="flex items-center gap-2">
                  {['500', '1000', '2500', '5000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-black/[0.06] text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0F8A5F] transition-all cursor-pointer"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Add Remark</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                  />
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full py-3.5 rounded-2xl bg-[#0F8A5F] text-white font-bold text-sm hover:bg-[#0B6E4C] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Send ₹{amount || '0'} Now
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Transfer Successful!</h3>
                  <p className="text-2xl font-black text-[#0F8A5F] mt-1">₹{amount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Sent to {selectedContact ? selectedContact.name : customUpi}
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
