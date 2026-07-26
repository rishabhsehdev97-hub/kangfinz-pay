import React from 'react';
import { QrCode, Send, ArrowDownLeft, Receipt, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeActionGridProps {
  onScanPay: () => void;
  onTransfer: () => void;
  onOpenMyQR: (mode?: 'personal' | 'business') => void;
  onPayBills: () => void;
}

export const HomeActionGrid: React.FC<HomeActionGridProps> = ({
  onScanPay,
  onTransfer,
  onOpenMyQR,
  onPayBills,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-[15px] font-semibold text-[#1A1A1A] tracking-tight">
          Primary Actions
        </h2>
        <span className="text-[11px] font-medium text-[#0F8A5F] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Zero-Fee UPI 2.0
        </span>
      </div>

      {/* 2x2 Grid of Primary Actions */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* 1. Scan & Pay */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onScanPay}
          className="p-3.5 rounded-[20px] bg-gradient-to-br from-[#0F8A5F] to-[#0B6E4C] text-white flex flex-col justify-between h-28 shadow-sm hover:shadow-md transition-all cursor-pointer text-left relative overflow-hidden group active:scale-95"
        >
          <div className="p-1.5 rounded-xl bg-white/20 w-fit backdrop-blur-md group-hover:scale-110 transition-transform">
            <QrCode className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-emerald-100/90 tracking-wide block">
              Camera Scanner
            </span>
            <h3 className="text-[14px] font-medium text-white leading-snug">Scan & Pay</h3>
          </div>
        </motion.button>

        {/* 2. Send Money */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onTransfer}
          className="p-3.5 rounded-[20px] bg-white border border-black/[0.08] text-[#1A1A1A] flex flex-col justify-between h-28 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-emerald-300 transition-all cursor-pointer text-left group active:scale-95"
        >
          <div className="p-1.5 rounded-xl bg-emerald-50 text-[#0F8A5F] w-fit group-hover:scale-110 transition-transform">
            <Send className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-gray-500 tracking-wide block">
              UPI & Bank
            </span>
            <h3 className="text-[14px] font-medium text-[#1A1A1A] leading-snug">Send Money</h3>
          </div>
        </motion.button>

        {/* 3. Receive Money */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpenMyQR('personal')}
          className="p-3.5 rounded-[20px] bg-white border border-emerald-200 text-[#1A1A1A] flex flex-col justify-between h-28 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#0F8A5F] hover:bg-emerald-50/30 transition-all cursor-pointer text-left group active:scale-95"
        >
          <div className="p-1.5 rounded-xl bg-emerald-100/80 text-[#0F8A5F] w-fit group-hover:scale-110 transition-transform">
            <ArrowDownLeft className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-[#0F8A5F] tracking-wide block">
              QR Code & Links
            </span>
            <h3 className="text-[14px] font-medium text-[#1A1A1A] leading-snug">Receive Money</h3>
          </div>
        </motion.button>

        {/* 4. Pay Bills */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onPayBills}
          className="p-3.5 rounded-[20px] bg-white border border-black/[0.08] text-[#1A1A1A] flex flex-col justify-between h-28 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-amber-300 transition-all cursor-pointer text-left group active:scale-95"
        >
          <div className="p-1.5 rounded-xl bg-amber-50 text-amber-600 w-fit group-hover:scale-110 transition-transform">
            <Receipt className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-amber-600 tracking-wide block">
              Utilities & Cards
            </span>
            <h3 className="text-[14px] font-medium text-[#1A1A1A] leading-snug">Pay Bills</h3>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
