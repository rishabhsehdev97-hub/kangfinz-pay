import React from 'react';
import { QrCode, Send, Receipt, Landmark, Smartphone, ArrowDownLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BillItem } from '../types';
import { ReceiveMoneyCard } from '../components/ReceiveMoneyCard';

interface PaymentsViewProps {
  onScanPay: () => void;
  onTransfer: () => void;
  onPayBills: () => void;
  onOpenMyQR: (mode?: 'personal' | 'business') => void;
  onOpenRequestMoney: (tab?: 'request' | 'link' | 'invoice' | 'history') => void;
  bills: BillItem[];
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  onScanPay,
  onTransfer,
  onPayBills,
  onOpenMyQR,
  onOpenRequestMoney,
  bills,
}) => {
  return (
    <div className="space-y-2.5 pb-2">
      <div className="pt-1">
        <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Payments</h2>
        <p className="text-[11px] text-gray-500 font-normal">Zero-fee instant UPI 2.0 payments</p>
      </div>

      {/* Main Payment Options */}
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onScanPay}
          className="p-3 rounded-[16px] bg-[#0F8A5F] text-white flex flex-col justify-between h-24 shadow-xs hover:bg-[#0B6E4C] transition-all cursor-pointer text-left"
        >
          <div className="p-1.5 rounded-xl bg-white/20 w-fit">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-emerald-100/90 tracking-wide block">Scanner</span>
            <h3 className="text-[14px] font-medium text-white">Scan Any QR</h3>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onTransfer}
          className="p-3 rounded-[16px] bg-white border border-black/[0.06] text-[#1A1A1A] flex flex-col justify-between h-24 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-emerald-300 transition-all cursor-pointer text-left"
        >
          <div className="p-1.5 rounded-xl bg-emerald-50 text-[#0F8A5F] w-fit">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-normal text-gray-500 tracking-wide block">To Contact / Bank</span>
            <h3 className="text-[14px] font-medium text-[#1A1A1A]">Send Money</h3>
          </div>
        </motion.button>
      </div>

      {/* NEW: Receive Money Section directly below Scan & Pay */}
      <ReceiveMoneyCard
        onOpenMyQR={onOpenMyQR}
        onOpenRequestMoney={onOpenRequestMoney}
      />

      {/* Bill Payments Overview */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Recharge & Pay Bills</h3>
              <p className="text-[11px] text-gray-500 font-normal">Electricity, Credit Cards, Broadband</p>
            </div>
          </div>
          <button
            onClick={onPayBills}
            className="text-[11px] font-medium text-[#0F8A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Manage <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { label: 'Electricity', icon: '⚡' },
            { label: 'Mobile', icon: '📱' },
            { label: 'DTH', icon: '📺' },
            { label: 'Fastag', icon: '🚗' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={onPayBills}
              className="p-2 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex flex-col items-center justify-center text-center hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[11px] font-medium text-gray-700 mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Linked Bank Accounts</h3>

        <div className="space-y-1.5">
          <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-[10px]">HDFC</div>
              <div>
                <h4 className="text-[13px] font-medium text-[#1A1A1A]">HDFC Bank •••• 4092</h4>
                <p className="text-[11px] text-emerald-600 font-medium">Primary UPI Bank</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#0F8A5F]">Active</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 font-bold text-[10px]">ICICI</div>
              <div>
                <h4 className="text-[13px] font-medium text-[#1A1A1A]">ICICI Bank •••• 8821</h4>
                <p className="text-[11px] text-gray-500 font-normal">Savings Account</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-gray-500">Secondary</span>
          </div>
        </div>
      </div>
    </div>
  );
};
