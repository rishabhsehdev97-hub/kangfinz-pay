import React, { useState } from 'react';
import { Receipt, X, Zap, Wifi, CreditCard, Droplets, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { initialBills } from '../data/initialData';
import { BillItem } from '../types';

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayBillSuccess: (bill: BillItem) => void;
}

export const PayBillsModal: React.FC<PayBillsModalProps> = ({
  isOpen,
  onClose,
  onPayBillSuccess,
}) => {
  const [bills, setBills] = useState<BillItem[]>(initialBills);
  const [selectedBill, setSelectedBill] = useState<BillItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const getBillIcon = (cat: string) => {
    switch (cat) {
      case 'Electricity':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Broadband':
        return <Wifi className="w-5 h-5 text-blue-500" />;
      case 'Credit Card':
        return <CreditCard className="w-5 h-5 text-purple-500" />;
      case 'Water':
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      default:
        return <Receipt className="w-5 h-5 text-[#0F8A5F]" />;
    }
  };

  const handlePay = (bill: BillItem) => {
    setSelectedBill(bill);
    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, isPaid: true, dueDate: 'Paid' } : b))
    );
    setIsSuccess(true);
    onPayBillSuccess(bill);

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#0F8A5F', '#10B981', '#34D399'],
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSelectedBill(null);
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
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base">Bills & Utilities</h3>
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
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Upcoming & Active Bills
                </p>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {bills.map((bill) => (
                    <div
                      key={bill.id}
                      className="p-3.5 rounded-[18px] bg-[#FAFAF8] border border-black/[0.05] flex items-center justify-between hover:border-emerald-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white border border-black/[0.04]">
                          {getBillIcon(bill.category)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1A1A1A]">{bill.title}</h4>
                          <p className="text-[10px] text-gray-400 font-medium">{bill.provider}</p>
                          <span
                            className={`inline-block mt-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${
                              bill.isPaid
                                ? 'bg-emerald-100 text-[#0F8A5F]'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {bill.dueDate}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#1A1A1A]">
                          ₹{bill.amount.toLocaleString('en-IN')}
                        </span>
                        {!bill.isPaid ? (
                          <button
                            onClick={() => handlePay(bill)}
                            className="block mt-1 px-3 py-1 bg-[#0F8A5F] text-white rounded-full text-[11px] font-semibold hover:bg-[#0B6E4C] transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            Pay Bill
                          </button>
                        ) : (
                          <span className="block mt-1 text-[11px] font-bold text-[#0F8A5F] flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Bill Payment Complete!</h3>
                  <p className="text-2xl font-black text-[#0F8A5F] mt-1">
                    ₹{selectedBill?.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Paid to {selectedBill?.title}</p>
                </div>

                <div className="p-3 bg-[#FAFAF8] rounded-2xl text-left text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">BBPS Ref:</span>
                    <span className="font-bold text-[#1A1A1A]">BBPS/88921049</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Consumer No:</span>
                    <span className="text-[#1A1A1A]">{selectedBill?.accountNo}</span>
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
