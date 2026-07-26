import React from 'react';
import { QrCode, Send, Receipt, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickActionsProps {
  onScanPay: () => void;
  onTransfer: () => void;
  onPayBills: () => void;
  onAskAI: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onScanPay,
  onTransfer,
  onPayBills,
  onAskAI,
}) => {
  const actions = [
    {
      id: 'scan',
      label: 'Scan & Pay',
      icon: QrCode,
      onClick: onScanPay,
      isPrimary: true,
      badge: 'UPI',
    },
    {
      id: 'transfer',
      label: 'Transfer',
      icon: Send,
      onClick: onTransfer,
      isPrimary: false,
    },
    {
      id: 'bills',
      label: 'Pay Bills',
      icon: Receipt,
      onClick: onPayBills,
      isPrimary: false,
      badge: 'Due',
    },
    {
      id: 'ai',
      label: 'Ask AI',
      icon: Sparkles,
      onClick: onAskAI,
      isPrimary: false,
      isAi: true,
    },
  ];

  return (
    <div className="py-1">
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Quick Actions</h2>
        <span className="text-[10px] font-bold text-[#0F8A5F] flex items-center gap-1">
          Instant UPI 2.0
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.04 + 0.05 }}
              onClick={action.onClick}
              className={`relative flex flex-col items-center justify-center p-2.5 rounded-[16px] transition-all cursor-pointer active:scale-95 group ${
                action.isPrimary
                  ? 'bg-[#0F8A5F] text-white shadow-xs hover:bg-[#0B6E4C]'
                  : action.isAi
                  ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-600/10 border border-emerald-300/40 text-[#0F8A5F] hover:border-emerald-500/60'
                  : 'bg-white border border-black/[0.05] text-[#1A1A1A] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-emerald-200 hover:bg-emerald-50/30'
              }`}
            >
              {action.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[8px] font-extrabold rounded-full bg-amber-500 text-white shadow-2xs">
                  {action.badge}
                </span>
              )}

              <div
                className={`p-2 rounded-full mb-1 transition-transform group-hover:scale-105 ${
                  action.isPrimary
                    ? 'bg-white/20 text-white'
                    : action.isAi
                    ? 'bg-[#0F8A5F] text-white shadow-2xs'
                    : 'bg-[#FAFAF8] text-[#0F8A5F] border border-black/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className={`text-[11px] font-bold tracking-tight text-center ${action.isPrimary ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
