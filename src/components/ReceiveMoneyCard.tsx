import React, { useState } from 'react';
import {
  QrCode,
  ArrowDownLeft,
  Copy,
  Check,
  Share2,
  Download,
  Link as LinkIcon,
  Send,
  Building2,
  User,
  ShieldCheck,
  Receipt,
  History,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ReceiveMoneyCardProps {
  onOpenMyQR: (mode?: 'personal' | 'business') => void;
  onOpenRequestMoney: (tab?: 'request' | 'link' | 'invoice' | 'history') => void;
}

export const ReceiveMoneyCard: React.FC<ReceiveMoneyCardProps> = ({
  onOpenMyQR,
  onOpenRequestMoney,
}) => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const upiId = isBusiness ? 'kangfinz.design@upi' : 'rishabh@kangfinz';
  const name = isBusiness ? 'Kangfinz Design Studio' : 'Rishabh Sehdev';
  const paymentLink = `https://pay.kangfinz.in/${isBusiness ? 'b/kangfinz' : 'p/rishabh'}`;

  const handleCopyUpi = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyLink = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(paymentLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadQr = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#0F8A5F', '#10B981'],
      });
      const element = document.createElement('a');
      const file = new Blob([
        `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#fff"/><text x="20" y="40" font-family="sans-serif" font-size="16" fill="#0F8A5F">Kangfinz Pay QR - ${name}</text><text x="20" y="70" font-size="14" fill="#333">${upiId}</text></svg>`
      ], { type: 'image/svg+xml' });
      element.href = URL.createObjectURL(file);
      element.download = `${name.replace(/\s+/g, '_')}_UPI_QR.svg`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  const handleShareQr = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Pay ${name}`,
        text: `Pay ${name} via UPI (${upiId})`,
        url: paymentLink,
      }).catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3 relative overflow-hidden"
    >
      {/* Section Header with Personal vs Business Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-[#0F8A5F]">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A]">Receive Money</h3>
            <span className="text-[10px] text-gray-400 font-medium">Accept UPI & QR payments</span>
          </div>
        </div>

        {/* Business Mode Switcher Pill */}
        <button
          onClick={() => setIsBusiness(!isBusiness)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer border ${
            isBusiness
              ? 'bg-[#0F8A5F] text-white border-[#0F8A5F] shadow-2xs'
              : 'bg-[#FAFAF8] text-gray-600 border-black/[0.06] hover:bg-emerald-50'
          }`}
        >
          {isBusiness ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
          <span>{isBusiness ? 'Business Mode ON' : 'Personal Mode'}</span>
        </button>
      </div>

      {/* Main Receiving ID Banner */}
      <div className="bg-[#FAFAF8] p-2.5 rounded-[14px] border border-black/[0.04] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0F8A5F]/10 border border-[#0F8A5F]/20 text-[#0F8A5F] flex items-center justify-center font-black text-xs">
              {isBusiness ? 'KD' : 'RS'}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-extrabold text-[#1A1A1A]">{name}</h4>
                <ShieldCheck className="w-3 h-3 text-[#0F8A5F]" />
              </div>
              <p className="text-[10px] text-gray-500 font-mono font-bold flex items-center gap-1">
                <span>{upiId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyUpi}
            className="px-2 py-1 rounded-lg bg-white border border-black/[0.08] hover:bg-emerald-50 text-[10px] font-bold text-[#0F8A5F] flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedUpi ? 'Copied' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Quick QR & Link Action Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/[0.04]">
          <button
            onClick={() => onOpenMyQR(isBusiness ? 'business' : 'personal')}
            className="p-2 rounded-xl bg-white border border-emerald-100 hover:border-[#0F8A5F] text-[#0F8A5F] font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
          >
            <span className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#0F8A5F] group-hover:scale-110 transition-transform" />
              <span>{isBusiness ? 'Business QR' : 'My QR Code'}</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0F8A5F]" />
          </button>

          <button
            onClick={() => onOpenRequestMoney('link')}
            className="p-2 rounded-xl bg-white border border-black/[0.06] hover:border-[#0F8A5F] text-[#1A1A1A] font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
          >
            <span className="flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-[#0F8A5F] group-hover:scale-110 transition-transform" />
              <span>Payment Link</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0F8A5F]" />
          </button>
        </div>
      </div>

      {/* Grid of Receive Money Utilities */}
      <div className="grid grid-cols-4 gap-1.5">
        <button
          onClick={() => onOpenRequestMoney('request')}
          className="p-2 rounded-xl bg-[#FAFAF8] border border-black/[0.04] hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 group"
        >
          <div className="p-1.5 rounded-lg bg-emerald-100/60 text-[#0F8A5F] mb-1 group-hover:scale-105 transition-transform">
            <Send className="w-3.5 h-3.5 rotate-180" />
          </div>
          <span className="text-[9px] font-bold text-[#1A1A1A]">Request</span>
        </button>

        <button
          onClick={handleDownloadQr}
          className="p-2 rounded-xl bg-[#FAFAF8] border border-black/[0.04] hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 group"
        >
          <div className="p-1.5 rounded-lg bg-emerald-100/60 text-[#0F8A5F] mb-1 group-hover:scale-105 transition-transform">
            <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
          </div>
          <span className="text-[9px] font-bold text-[#1A1A1A]">Download</span>
        </button>

        <button
          onClick={handleShareQr}
          className="p-2 rounded-xl bg-[#FAFAF8] border border-black/[0.04] hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 group"
        >
          <div className="p-1.5 rounded-lg bg-emerald-100/60 text-[#0F8A5F] mb-1 group-hover:scale-105 transition-transform">
            <Share2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-bold text-[#1A1A1A]">Share QR</span>
        </button>

        <button
          onClick={handleCopyUpi}
          className="p-2 rounded-xl bg-[#FAFAF8] border border-black/[0.04] hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 group"
        >
          <div className="p-1.5 rounded-lg bg-emerald-100/60 text-[#0F8A5F] mb-1 group-hover:scale-105 transition-transform">
            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </div>
          <span className="text-[9px] font-bold text-[#1A1A1A]">{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
        </button>
      </div>

      {/* Business Mode Suite (Always visible in Business Mode) */}
      {isBusiness && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 rounded-2xl bg-gradient-to-br from-[#0F8A5F] to-emerald-900 text-white space-y-2.5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-300" />
              <div>
                <h4 className="text-xs font-black">Business Collection Hub</h4>
                <p className="text-[9px] text-emerald-100">Kangfinz Merchant Suite</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-emerald-200 font-mono text-[9px] font-bold">
              GST Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => onOpenRequestMoney('invoice')}
              className="p-2 rounded-xl bg-white text-[#0F8A5F] hover:bg-emerald-50 text-[10px] font-extrabold flex items-center justify-between transition-all cursor-pointer shadow-xs"
            >
              <span className="flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5" /> Invoice Collection
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => onOpenRequestMoney('history')}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[10px] font-extrabold flex items-center justify-between transition-all cursor-pointer border border-white/20"
            >
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-emerald-300" /> Collection History
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[10px] text-emerald-100 font-medium">
            <span>July Total Collections: <strong>₹28,500</strong></span>
            <span className="text-emerald-300 font-bold">12 Invoices Paid</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
