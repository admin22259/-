import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { SaleRecord, ExpenseRecord } from '../types';

interface ChartsSectionProps {
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ sales, expenses }) => {
  // Process data for Area Chart (Sales over time)
  const salesByDate = sales.reduce((acc, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const areaChartData = Object.keys(salesByDate).map(date => ({
    name: date.split('-').slice(1).join('/'), // Format MM/DD
    المبيعات: salesByDate[date],
  }));

  // Process data for Pie Chart (Expense Categories)
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.keys(expensesByCategory).map(cat => ({
    name: cat,
    value: expensesByCategory[cat],
  }));

  const COLORS = ['#F97316', '#84CC16', '#EF4444', '#3B82F6', '#A855F7', '#EC4899'];

  // Process data for Bar Chart (Top Products)
  const salesByProduct = sales.reduce((acc, sale) => {
    acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.keys(salesByProduct)
    .map(name => ({ name, الكمية: salesByProduct[name] }))
    .sort((a, b) => b.الكمية - a.الكمية)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sales Trend */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-r-4 border-orange-500 pr-3">تحليل المبيعات اليومية</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{fill: '#6b7280'}} />
              <YAxis tick={{fill: '#6b7280'}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#f97316', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey="المبيعات" stroke="#f97316" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-r-4 border-red-500 pr-3">توزيع المصروفات</h3>
        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-r-4 border-lime-500 pr-3">المنتجات الأكثر مبيعاً</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb"/>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} tick={{fill: '#374151', fontSize: 14, fontWeight: 500}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="الكمية" fill="#84cc16" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};