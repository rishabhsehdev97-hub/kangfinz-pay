import React, { useState } from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  ArrowDownLeft,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onAddTransaction: () => void;
  onViewAll: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onSelectTransaction,
  onAddTransaction,
  onViewAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getIcon = (iconName: string, title: string) => {
    if (title.toLowerCase().includes('zomato') || iconName === 'Utensils') {
      return <Utensils className="w-4 h-4 text-rose-600" />;
    }
    if (title.toLowerCase().includes('uber') || iconName === 'Car') {
      return <Car className="w-4 h-4 text-black" />;
    }
    if (title.toLowerCase().includes('amazon') || iconName === 'ShoppingBag') {
      return <ShoppingBag className="w-4 h-4 text-amber-600" />;
    }
    if (title.toLowerCase().includes('electricity') || iconName === 'Zap') {
      return <Zap className="w-4 h-4 text-amber-500" />;
    }
    if (iconName === 'ArrowDownLeft') {
      return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
    }
    return <TrendingUp className="w-4 h-4 text-[#0F8A5F]" />;
  };

  const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills'];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Food') return matchesSearch && tx.category.includes('Food');
    if (selectedCategory === 'Travel') return matchesSearch && tx.category.includes('Travel');
    if (selectedCategory === 'Shopping') return matchesSearch && tx.category.includes('Shopping');
    if (selectedCategory === 'Bills') return matchesSearch && tx.category.includes('Utilities');

    return matchesSearch;
  });

  const getAiInsight = (title: string, type: string) => {
    if (title.toLowerCase().includes('zomato')) return '✨ Food spend 9% lower than last week';
    if (title.toLowerCase().includes('uber')) return '✨ Commute cost on track';
    if (title.toLowerCase().includes('ui design') || type === 'credit') return '✨ Auto-allocated 20% to Emergency Fund';
    if (title.toLowerCase().includes('electricity') || title.toLowerCase().includes('bescom')) return '✨ 8% lower than June billing cycle';
    return '✨ Verified UPI 2.0 Instant Settlement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="rounded-[18px] bg-white border border-black/[0.05] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#1A1A1A] tracking-tight">Recent Transactions</h2>
          <p className="text-[11px] text-gray-500 font-normal">Real-time activity with AI insights</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onAddTransaction}
            className="p-1.5 rounded-full bg-emerald-50 text-[#0F8A5F] hover:bg-emerald-100 transition-colors cursor-pointer active:scale-95"
            title="Log Expense or Income"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={onViewAll}
            className="text-[11px] font-medium text-[#0F8A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search & Quick Filter Pills */}
      <div className="space-y-1.5">
        <div className="relative">
          <Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Zomato, Uber, Bills..."
            className="w-full bg-[#FAFAF8] border border-black/[0.05] rounded-lg pl-8 pr-2.5 py-1.5 text-[11px] text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#0F8A5F] transition-all"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-[10px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0F8A5F] text-white shadow-2xs'
                  : 'bg-[#FAFAF8] text-gray-600 hover:bg-emerald-50 hover:text-[#0F8A5F] border border-black/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List with AI Insights */}
      <div className="space-y-2">
        <AnimatePresence>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-4 text-[11px] text-gray-400">
              No transactions match "{searchTerm}".
            </div>
          ) : (
            filteredTransactions.slice(0, 5).map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                onClick={() => onSelectTransaction(tx)}
                className="p-2 rounded-[14px] bg-[#FAFAF8] border border-black/[0.03] hover:border-emerald-200 hover:bg-emerald-50/40 transition-all cursor-pointer group active:scale-[0.99] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/[0.05] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      {getIcon(tx.iconName, tx.title)}
                    </div>

                    <div>
                      <h3 className="text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#0F8A5F] transition-colors">
                        {tx.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 font-normal">
                        <span>{tx.category}</span>
                        <span>•</span>
                        <span>{tx.date}, {tx.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[14px] font-semibold ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                    <div className="text-[11px] text-gray-500 font-normal">
                      {tx.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* AI Insight Tag */}
                <div className="px-2 py-0.5 rounded-md bg-emerald-50/80 border border-emerald-100/70 text-[11px] font-normal text-[#0F8A5F] w-fit">
                  {getAiInsight(tx.title, tx.type)}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
