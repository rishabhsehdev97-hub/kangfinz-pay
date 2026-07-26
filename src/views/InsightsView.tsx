import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Sparkles, TrendingUp, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { spendingCategoryBreakdown, monthlyTrendData } from '../data/initialData';

interface InsightsViewProps {
  onAskAI: (prompt?: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onAskAI }) => {
  return (
    <div className="space-y-2.5 pb-2">
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Insights</h2>
          <p className="text-[11px] text-gray-500 font-normal">AI-driven cash flow analysis</p>
        </div>
        <button
          onClick={() => onAskAI('Audit my entire budget and recommend savings')}
          className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#0F8A5F] text-[11px] font-medium hover:bg-emerald-100 transition-all flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3 h-3" /> Ask AI Audit
        </button>
      </div>

      {/* Spending Health Score */}
      <div className="p-3.5 rounded-[18px] bg-gradient-to-br from-emerald-900 to-[#0F8A5F] text-white shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-emerald-200 uppercase tracking-wider">
            Kangfinz Health Index
          </span>
          <div className="text-xl font-bold mt-0.5">88 / 100</div>
          <p className="text-[11px] text-emerald-100 mt-0.5 font-normal">Excellent financial discipline this month!</p>
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-emerald-300/40 flex items-center justify-center font-bold text-xs bg-white/10 backdrop-blur-md">
          Top 5%
        </div>
      </div>

      {/* Recharts Category Pie Chart */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Spending By Category</h3>

        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingCategoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={58}
                paddingAngle={3}
                dataKey="value"
              >
                {spendingCategoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Spent']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-0.5">
          {spendingCategoryBreakdown.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600 font-medium">{item.name}:</span>
              <strong className="text-[#1A1A1A] ml-auto">₹{item.value.toLocaleString('en-IN')}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Savings Trajectory Bar Chart */}
      <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Income vs Expenses (INR)</h3>

        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`]} />
              <Bar dataKey="income" fill="#0F8A5F" radius={[3, 3, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#F59E0B" radius={[3, 3, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
