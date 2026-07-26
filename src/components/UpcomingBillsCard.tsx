import React from 'react';
import { Receipt, Calendar, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BillItem } from '../types';

interface UpcomingBillsCardProps {
  bills: BillItem[];
  onPayBill: (bill: BillItem) => void;
  onViewAllBills: () => void;
}

export const UpcomingBillsCard: React.FC<UpcomingBillsCardProps> = ({
  bills,
  onPayBill,
  onViewAllBills,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-amber-50 text-amber-600">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Upcoming Bills & EMIs</h3>
            <span className="text-[11px] text-gray-500 font-normal">Smart due alerts</span>
          </div>
        </div>

        <button
          onClick={onViewAllBills}
          className="text-[11px] font-medium text-[#0F8A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          All Bills <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Bill Shortcuts Grid */}
      <div className="grid grid-cols-4 gap-1.5 pt-0.5 pb-1">
        {[
          { label: 'Electricity', icon: '⚡', category: 'Electricity' },
          { label: 'Water', icon: '💧', category: 'Water' },
          { label: 'Gas Cyl', icon: '🔥', category: 'Gas' },
          { label: 'Mobile', icon: '📱', category: 'Mobile' },
          { label: 'Broadband', icon: '🌐', category: 'Broadband' },
          { label: 'DTH', icon: '📺', category: 'DTH' },
          { label: 'Credit Card', icon: '💳', category: 'Credit Card' },
          { label: 'More Bills', icon: '➕', category: 'More' },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={onViewAllBills}
            className="p-1.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 group"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-[11px] font-medium text-gray-700 mt-0.5 truncate max-w-full">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bill Items */}
      <div className="space-y-2">
        {bills.slice(0, 2).map((bill) => (
          <div
            key={bill.id}
            className="p-2.5 rounded-[14px] bg-[#FAFAF8] border border-black/[0.03] hover:border-emerald-200 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white border border-black/[0.05] text-amber-600 font-bold text-xs">
                  {bill.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#1A1A1A]">{bill.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-normal">
                    <Calendar className="w-2.5 h-2.5 text-gray-400" />
                    <span>Due in {bill.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[14px] font-semibold text-[#1A1A1A]">
                  {formatCurrency(bill.amount)}
                </p>
                <button
                  onClick={() => onPayBill(bill)}
                  className="mt-0.5 px-2.5 py-0.5 rounded-full bg-[#0F8A5F] hover:bg-[#0B6E4C] text-white text-[11px] font-medium active:scale-95 transition-all cursor-pointer"
                >
                  Pay Now
                </button>
              </div>
            </div>

            {/* Smart Advice */}
            <div className="p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100/60 flex items-center justify-between text-[11px] text-[#0F8A5F]">
              <span className="flex items-center gap-1 font-normal">
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                Paying today saves ₹150 late fee & keeps CIBIL above 790.
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
