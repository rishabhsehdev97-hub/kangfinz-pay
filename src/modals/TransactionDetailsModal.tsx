import React from 'react';
import { X, CheckCircle2, Share2, Download, ShieldCheck, Utensils, Car, ShoppingBag, Zap, ArrowDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../types';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('zomato')) return <Utensils className="w-6 h-6 text-rose-600" />;
    if (title.toLowerCase().includes('uber')) return <Car className="w-6 h-6 text-black" />;
    if (title.toLowerCase().includes('amazon')) return <ShoppingBag className="w-6 h-6 text-amber-600" />;
    if (title.toLowerCase().includes('electricity')) return <Zap className="w-6 h-6 text-amber-500" />;
    return <ArrowDownLeft className="w-6 h-6 text-emerald-600" />;
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
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Transaction Receipt
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] border border-black/[0.06] flex items-center justify-center mx-auto shadow-2xs">
              {getIcon(transaction.title)}
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[#1A1A1A]">{transaction.title}</h3>
              <p className="text-3xl font-black text-[#1A1A1A] mt-1">
                {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
              <div className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0F8A5F]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Payment {transaction.status}
              </div>
            </div>

            {/* Receipt Details Table */}
            <div className="bg-[#FAFAF8] p-4 rounded-2xl border border-black/[0.04] text-left text-xs space-y-2.5 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="font-bold text-[#1A1A1A]">{transaction.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="text-[#1A1A1A]">{transaction.date}, {transaction.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Source:</span>
                <span className="text-[#1A1A1A]">{transaction.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reference ID:</span>
                <span className="text-[#1A1A1A]">{transaction.referenceId}</span>
              </div>
              {transaction.note && (
                <div className="flex justify-between pt-1 border-t border-black/[0.05]">
                  <span className="text-gray-400">Remark:</span>
                  <span className="text-gray-800 italic">{transaction.note}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => alert("Receipt copied to clipboard!")}
                className="flex-1 py-2.5 rounded-xl border border-black/[0.08] bg-[#FAFAF8] text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-[#0F8A5F] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Receipt
              </button>
              <button
                onClick={() => alert("Downloading PDF receipt...")}
                className="flex-1 py-2.5 rounded-xl bg-[#0F8A5F] text-white text-xs font-bold hover:bg-[#0B6E4C] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
