import React, { useState } from 'react';
import {
  X,
  Send,
  Link,
  Receipt,
  History,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Bell,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'request' | 'link' | 'invoice' | 'history';
}

export const RequestMoneyModal: React.FC<RequestMoneyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'request',
}) => {
  const [activeTab, setActiveTab] = useState<'request' | 'link' | 'invoice' | 'history'>(
    initialTab
  );

  // Request Money State
  const [vpa, setVpa] = useState('');
  const [amount, setAmount] = useState('1500');
  const [note, setNote] = useState('Design Services Deposit');
  const [requestSent, setRequestSent] = useState(false);

  // Payment Link State
  const [linkAmount, setLinkAmount] = useState('2500');
  const [linkTitle, setLinkTitle] = useState('Project Milestone Payment');
  const [copiedLink, setCopiedLink] = useState(false);

  // Invoice Collection State
  const [clientName, setClientName] = useState('Acme Corp Design');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-042');
  const [invoiceAmount, setInvoiceAmount] = useState('12500');
  const [invoiceCreated, setInvoiceCreated] = useState(false);

  // Collection History State
  const [historyList, setHistoryList] = useState([
    {
      id: 'c1',
      client: 'Karan Sharma',
      upi: 'karan@icici',
      amount: 4500,
      date: 'Today, 2:15 PM',
      type: 'Request',
      status: 'Paid',
    },
    {
      id: 'c2',
      client: 'Acme Corp Studio',
      upi: 'acme@axis',
      amount: 12500,
      date: 'Yesterday, 5:30 PM',
      type: 'Invoice',
      status: 'Pending',
    },
    {
      id: 'c3',
      client: 'Priya Verma',
      upi: 'priya@okhdfc',
      amount: 800,
      date: '23 Jul 2026',
      type: 'Payment Link',
      status: 'Paid',
    },
  ]);

  if (!isOpen) return null;

  const handleSendRequest = () => {
    if (!vpa || !amount) return;
    setRequestSent(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0F8A5F', '#10B981', '#F59E0B'],
    });

    // Append to collection history
    setHistoryList((prev) => [
      {
        id: `c_${Date.now()}`,
        client: vpa,
        upi: vpa,
        amount: parseFloat(amount),
        date: 'Just now',
        type: 'Request',
        status: 'Pending',
      },
      ...prev,
    ]);

    setTimeout(() => {
      setRequestSent(false);
      onClose();
    }, 1800);
  };

  const handleCreateInvoice = () => {
    if (!clientName || !invoiceAmount) return;
    setInvoiceCreated(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    setHistoryList((prev) => [
      {
        id: `inv_${Date.now()}`,
        client: clientName,
        upi: `${invoiceNumber.toLowerCase()}@kangfinz`,
        amount: parseFloat(invoiceAmount),
        date: 'Just now',
        type: 'Invoice',
        status: 'Pending',
      },
      ...prev,
    ]);

    setTimeout(() => {
      setInvoiceCreated(false);
      setActiveTab('history');
    }, 1500);
  };

  const generatedLink = `https://pay.kangfinz.in/req/${encodeURIComponent(
    linkTitle.replace(/\s+/g, '-').toLowerCase()
  )}?amt=${linkAmount || '0'}`;

  const handleCopyPaymentLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
                <Send className="w-4 h-4 rotate-180" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#1A1A1A] text-sm">Request & Collect Money</h3>
                <p className="text-[10px] text-gray-400 font-medium">Instant UPI request & links</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center justify-around border-b border-black/[0.05] bg-[#FAFAF8] px-2 text-[11px] font-bold">
            <button
              onClick={() => setActiveTab('request')}
              className={`py-2 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'request'
                  ? 'border-[#0F8A5F] text-[#0F8A5F]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <Send className="w-3 h-3 rotate-180" /> Request
            </button>

            <button
              onClick={() => setActiveTab('link')}
              className={`py-2 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'link'
                  ? 'border-[#0F8A5F] text-[#0F8A5F]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <Link className="w-3 h-3" /> Payment Link
            </button>

            <button
              onClick={() => setActiveTab('invoice')}
              className={`py-2 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'invoice'
                  ? 'border-[#0F8A5F] text-[#0F8A5F]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <Receipt className="w-3 h-3" /> Invoice
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'history'
                  ? 'border-[#0F8A5F] text-[#0F8A5F]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <History className="w-3 h-3" /> History
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
            {/* 1. Request Money Tab */}
            {activeTab === 'request' && (
              <div className="space-y-3">
                {requestSent ? (
                  <div className="text-center py-6 space-y-2">
                    <div className="w-12 h-12 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-extrabold text-[#1A1A1A]">UPI Collect Request Sent!</h4>
                    <p className="text-xs text-gray-500">
                      Requested ₹{amount} from <strong className="text-[#1A1A1A]">{vpa}</strong>
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">
                        Payer UPI ID or Phone
                      </label>
                      <input
                        type="text"
                        value={vpa}
                        onChange={(e) => setVpa(e.target.value)}
                        placeholder="e.g. rahul@okaxis or 9876543210"
                        className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">
                        Amount (₹)
                      </label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-lg font-extrabold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">
                        Note / Description
                      </label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. Dinner bill split, Freelance fee"
                        className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                      />
                    </div>

                    <button
                      onClick={handleSendRequest}
                      className="w-full py-3 rounded-xl bg-[#0F8A5F] text-white text-xs font-bold hover:bg-[#0B6E4C] transition-all shadow-xs active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Send UPI Collect Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* 2. Payment Link Tab */}
            {activeTab === 'link' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    Payment Title / Purpose
                  </label>
                  <input
                    type="text"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="e.g. Photography Session"
                    className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    Fixed Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={linkAmount}
                    onChange={(e) => setLinkAmount(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-sm font-extrabold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                  />
                </div>

                {/* Link Preview Box */}
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-black/[0.06] space-y-1.5">
                  <span className="text-[9px] font-mono text-gray-400 uppercase">
                    Generated UPI Link
                  </span>
                  <div className="text-[10px] font-mono font-bold text-[#0F8A5F] break-all bg-white p-2 rounded-lg border border-emerald-100">
                    {generatedLink}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyPaymentLink}
                    className="py-2.5 rounded-xl bg-[#0F8A5F] text-white text-xs font-bold hover:bg-[#0B6E4C] transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: linkTitle, url: generatedLink });
                      } else {
                        handleCopyPaymentLink();
                      }
                    }}
                    className="py-2.5 rounded-xl bg-white border border-black/[0.08] text-[#1A1A1A] text-xs font-bold hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Share via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Invoice Collection Tab */}
            {activeTab === 'invoice' && (
              <div className="space-y-3">
                {invoiceCreated ? (
                  <div className="text-center py-6 space-y-2">
                    <div className="w-12 h-12 bg-emerald-100 text-[#0F8A5F] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-extrabold text-[#1A1A1A]">Invoice Created!</h4>
                    <p className="text-xs text-gray-500">
                      Invoice <strong className="text-[#1A1A1A]">{invoiceNumber}</strong> for ₹
                      {invoiceAmount} generated for {clientName}.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 text-xs text-[#0F8A5F] font-semibold">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Business Mode: Automatic payment reconciliation & tax logs</span>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">
                        Client / Business Name
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">
                          Invoice #
                        </label>
                        <input
                          type="text"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={invoiceAmount}
                          onChange={(e) => setInvoiceAmount(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-[#FAFAF8] border border-black/[0.08] rounded-xl text-xs font-extrabold text-[#1A1A1A] focus:outline-none focus:border-[#0F8A5F]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleCreateInvoice}
                      className="w-full py-3 rounded-xl bg-[#0F8A5F] text-white text-xs font-bold hover:bg-[#0B6E4C] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Generate & Issue Invoice</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {/* 4. Collection History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Recent Incoming Requests</span>
                  <span className="text-[#0F8A5F]">Total Collected: ₹5,300</span>
                </div>

                <div className="space-y-1.5">
                  {historyList.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#FAFAF8] border border-black/[0.04] flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">{item.client}</h5>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-gray-200/60 text-gray-600">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400">{item.date}</p>
                      </div>

                      <div className="text-right space-y-0.5">
                        <span className="text-xs font-black text-[#1A1A1A]">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                        <div>
                          <span
                            className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              item.status === 'Paid'
                                ? 'bg-emerald-100 text-[#0F8A5F]'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
