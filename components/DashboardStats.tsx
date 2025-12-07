import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle } from 'lucide-react';
import { KPIData } from '../types';

interface DashboardStatsProps {
  data: KPIData;
  lowStockCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data, lowStockCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Revenue */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">إجمالي المبيعات</p>
            <h3 className="text-2xl font-bold text-gray-800">{data.totalRevenue.toFixed(3)} ر.ع.</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <DollarSign size={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-500 gap-1">
          <TrendingUp size={16} />
          <span>+12% عن الأسبوع الماضي</span>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">المصروفات</p>
            <h3 className="text-2xl font-bold text-gray-800">{data.totalExpenses.toFixed(3)} ر.ع.</h3>
          </div>
          <div className="bg-red-100 p-3 rounded-xl text-red-600">
            <TrendingDown size={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-400 gap-1">
          <span>ضمن الميزانية المحددة</span>
        </div>
      </div>

      {/* Net Profit */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg shadow-orange-500/20 text-white flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium mb-1">صافي الربح</p>
            <h3 className="text-3xl font-bold">{data.netProfit.toFixed(3)} ر.ع.</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <TrendingUp size={24} color="white" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-orange-100 gap-1 opacity-90">
          <span>هامش ربح ممتاز هذا الشهر</span>
        </div>
      </div>

      {/* Alerts */}
      <div className={`p-6 rounded-2xl shadow-sm border flex flex-col justify-between hover:shadow-md transition-shadow ${lowStockCount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className={`${lowStockCount > 0 ? 'text-amber-800' : 'text-gray-500'} text-sm font-medium mb-1`}>تنبيهات المخزون</p>
            <h3 className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-amber-900' : 'text-gray-800'}`}>
              {lowStockCount} {lowStockCount === 1 ? 'تنبيه' : 'تنبيهات'}
            </h3>
          </div>
          <div className={`${lowStockCount > 0 ? 'bg-amber-200 text-amber-700' : 'bg-gray-100 text-gray-500'} p-3 rounded-xl`}>
            {lowStockCount > 0 ? <AlertTriangle size={24} /> : <Package size={24} />}
          </div>
        </div>
        <div className="mt-4 text-sm">
          {lowStockCount > 0 ? (
            <span className="text-amber-700 font-medium">يرجى مراجعة النواقص فوراً</span>
          ) : (
            <span className="text-green-500 font-medium">المخزون في حالة جيدة</span>
          )}
        </div>
      </div>
    </div>
  );
};