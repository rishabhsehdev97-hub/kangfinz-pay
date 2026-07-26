import React, { useState } from 'react';
import {
  QrCode,
  X,
  ShieldCheck,
  Share2,
  Download,
  Copy,
  Check,
  Building2,
  User,
  Landmark,
  Sparkles,
  Receipt,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface MyQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'personal' | 'business';
  onRequestMoney?: () => void;
}

export const MyQRModal: React.FC<MyQRModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'personal',
  onRequestMoney,
}) => {
  const [mode, setMode] = useState<'personal' | 'business'>(initialMode);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSettingAmount, setIsSettingAmount] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState<'hdfc' | 'icici'>('hdfc');

  if (!isOpen) return null;

  const upiId = mode === 'personal' ? 'rishabh@kangfinz' : 'kangfinz.design@upi';
  const name = mode === 'personal' ? 'Rishabh Sehdev' : 'Kangfinz Design Studio';
  const paymentLink = `https://pay.kangfinz.in/${mode === 'personal' ? 'p/rishabh' : 'b/kangfinz'}${
    customAmount ? `?amt=${customAmount}` : ''
  }`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareQr = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pay ${name} via UPI`,
          text: `Scan or click to pay ${name} (${upiId})`,
          url: paymentLink,
        });
      } catch (e) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQr = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#0F8A5F', '#10B981', '#34D399'],
      });
      // Trigger artificial download
      const element = document.createElement('a');
      const file = new Blob([
        `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#fff"/><text x="20" y="40" font-family="sans-serif" font-size="16" fill="#0F8A5F">Kangfinz Pay QR - ${name}</text><text x="20" y="70" font-size="14" fill="#333">${upiId}</text></svg>`
      ], { type: 'image/svg+xml' });
      element.href = URL.createObjectURL(file);
      element.download = `${name.replace(/\s+/g, '_')}_UPI_QR.svg`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-sm bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/[0.08]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/[0.06] bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-[#0F8A5F]">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#1A1A1A] text-sm">My Payment QR</h3>
                <p className="text-[10px] text-gray-400 font-medium">Instant zero-fee incoming UPI</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3.5 max-h-[80vh] overflow-y-auto no-scrollbar">
            {/* Mode Switcher: Personal vs Business */}
            <div className="grid grid-cols-2 p-1 bg-[#FAFAF8] rounded-xl border border-black/[0.05] text-xs font-bold">
              <button
                onClick={() => setMode('personal')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'personal'
                    ? 'bg-white text-[#0F8A5F] shadow-2xs font-extrabold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Personal QR
              </button>
              <button
                onClick={() => setMode('business')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'business'
                    ? 'bg-[#0F8A5F] text-white shadow-2xs font-extrabold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" /> Business Mode
              </button>
            </div>

            {/* QR Card Canvas Wrapper */}
            <div className="relative p-4 rounded-[20px] bg-gradient-to-b from-[#FAFAF8] to-emerald-50/30 border border-emerald-100 text-center space-y-3 shadow-xs">
              {/* User / Merchant Details */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#0F8A5F] to-[#34D399] mb-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-black text-[#0F8A5F]">
                    {mode === 'personal' ? 'RS' : 'KD'}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-extrabold text-[#1A1A1A]">{name}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F8A5F]" />
                </div>

                <span className="text-[9px] font-bold text-[#0F8A5F] bg-emerald-100/70 px-2 py-0.5 rounded-full mt-0.5">
                  {mode === 'personal' ? '✓ KYC & UPI 2.0 Verified' : '⚡ GST Registered Merchant'}
                </span>
              </div>

              {/* Vector QR Code Display */}
              <div className="relative w-44 h-44 mx-auto bg-white p-2.5 rounded-2xl border-2 border-emerald-600/30 shadow-md flex items-center justify-center">
                {/* Custom QR Grid Pattern SVG */}
                <svg className="w-full h-full text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer Position Detection Squares */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F8A5F" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="13" width="10" height="10" fill="#0F8A5F" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F8A5F" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="77" y="13" width="10" height="10" fill="#0F8A5F" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F8A5F" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="77" width="10" height="10" fill="#0F8A5F" />

                  {/* Random Pattern Dots */}
                  <rect x="36" y="5" width="6" height="6" rx="1" />
                  <rect x="46" y="5" width="6" height="6" rx="1" />
                  <rect x="56" y="5" width="6" height="6" rx="1" />
                  <rect x="36" y="15" width="6" height="12" rx="1" />
                  <rect x="50" y="15" width="12" height="6" rx="1" />
                  <rect x="36" y="30" width="6" height="6" rx="1" />
                  <rect x="46" y="25" width="16" height="6" rx="1" />

                  <rect x="5" y="36" width="6" height="12" rx="1" />
                  <rect x="15" y="36" width="12" height="6" rx="1" />
                  <rect x="15" y="50" width="6" height="12" rx="1" />

                  <rect x="70" y="36" width="6" height="12" rx="1" />
                  <rect x="80" y="36" width="12" height="6" rx="1" />
                  <rect x="70" y="52" width="16" height="6" rx="1" />

                  <rect x="36" y="70" width="12" height="6" rx="1" />
                  <rect x="52" y="70" width="6" height="12" rx="1" />
                  <rect x="36" y="82" width="6" height="12" rx="1" />
                  <rect x="48" y="82" width="16" height="6" rx="1" />
                  <rect x="70" y="70" width="10" height="10" rx="2" />
                  <rect x="84" y="82" width="8" height="8" rx="1" />
                </svg>

                {/* Central Kangfinz Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#0F8A5F] text-white p-1 shadow-lg border-2 border-white flex items-center justify-center">
                    <span className="font-black text-xs tracking-tighter">⚡ K</span>
                  </div>
                </div>
              </div>

              {/* Displayed UPI ID */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/[0.08] rounded-full shadow-2xs font-mono text-xs font-bold text-[#1A1A1A]">
                  <span>{upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 hover:bg-emerald-50 text-gray-400 hover:text-[#0F8A5F] rounded-full transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {customAmount && (
                  <p className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block">
                    Fixed Amount Encoded: ₹{customAmount}
                  </p>
                )}
              </div>

              {/* Add Custom Amount Trigger */}
              {!isSettingAmount ? (
                <button
                  onClick={() => setIsSettingAmount(true)}
                  className="text-[10px] font-bold text-[#0F8A5F] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Set Custom Amount for QR
                </button>
              ) : (
                <div className="flex items-center gap-1.5 max-w-[200px] mx-auto pt-1">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter ₹ amount"
                    className="w-full text-xs font-bold px-2 py-1 bg-white border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#0F8A5F]"
                  />
                  <button
                    onClick={() => setIsSettingAmount(false)}
                    className="px-2 py-1 bg-[#0F8A5F] text-white text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Set
                  </button>
                </div>
              )}
            </div>

            {/* Set Default Receiving Account Selector */}
            <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-black/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-[#0F8A5F]" /> Default Deposit Bank
                </span>
                <span className="text-[9px] font-semibold text-emerald-600">Instant Credit</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setDefaultAccount('hdfc')}
                  className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    defaultAccount === 'hdfc'
                      ? 'bg-emerald-50/80 border-[#0F8A5F] text-[#1A1A1A] font-bold'
                      : 'bg-white border-black/[0.05] text-gray-600'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold">HDFC Bank</div>
                    <div className="text-[9px] text-gray-400 font-mono">•••• 4092</div>
                  </div>
                  {defaultAccount === 'hdfc' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F8A5F]" />}
                </button>

                <button
                  onClick={() => setDefaultAccount('icici')}
                  className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    defaultAccount === 'icici'
                      ? 'bg-emerald-50/80 border-[#0F8A5F] text-[#1A1A1A] font-bold'
                      : 'bg-white border-black/[0.05] text-gray-600'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold">ICICI Bank</div>
                    <div className="text-[9px] text-gray-400 font-mono">•••• 8821</div>
                  </div>
                  {defaultAccount === 'icici' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F8A5F]" />}
                </button>
              </div>
            </div>

            {/* Main Action Buttons: Share, Download, Copy */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleShareQr}
                className="py-2.5 px-2 rounded-xl bg-white border border-black/[0.08] text-[#1A1A1A] text-xs font-bold hover:bg-emerald-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-2xs"
              >
                <Share2 className="w-4 h-4 text-[#0F8A5F]" />
                <span>Share QR</span>
              </button>

              <button
                onClick={handleDownloadQr}
                disabled={downloading}
                className="py-2.5 px-2 rounded-xl bg-white border border-black/[0.08] text-[#1A1A1A] text-xs font-bold hover:bg-emerald-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-2xs"
              >
                <Download className={`w-4 h-4 text-[#0F8A5F] ${downloading ? 'animate-bounce' : ''}`} />
                <span>{downloading ? 'Saving...' : 'Download'}</span>
              </button>

              <button
                onClick={handleCopyUpi}
                className="py-2.5 px-2 rounded-xl bg-[#0F8A5F] text-white text-xs font-bold hover:bg-[#0B6E4C] transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-xs"
              >
                {copiedUpi ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
              </button>
            </div>

            {/* Business Mode Extra Actions */}
            {mode === 'business' && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#0F8A5F] text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-extrabold">Business Collection Tools</h5>
                    <p className="text-[10px] text-emerald-100">Send invoices & instant client links</p>
                  </div>
                  <Receipt className="w-4 h-4 text-emerald-300" />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      if (onRequestMoney) onRequestMoney();
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-white text-[#0F8A5F] text-[10px] font-bold hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    Create Invoice <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="py-1.5 px-2 rounded-lg bg-white/20 text-white text-[10px] font-bold hover:bg-white/30 transition-all cursor-pointer"
                  >
                    {copiedLink ? 'Link Copied!' : 'Copy Payment Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
