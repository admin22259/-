import React, { useState } from 'react';
import { SaleRecord } from '../types';
import { Trash2, Search } from 'lucide-react';

interface SalesTableProps {
  sales: SaleRecord[];
  onDelete: (id: string) => void;
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSales = sales.filter(sale => 
    sale.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-gray-800">سجل المبيعات</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث باسم المنتج..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors whitespace-nowrap">
            تصدير التقرير
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4">المنتج</th>
              <th className="px-6 py-4">الكمية</th>
              <th className="px-6 py-4">السعر</th>
              <th className="px-6 py-4">الإجمالي</th>
              <th className="px-6 py-4">الدفع</th>
              <th className="px-6 py-4">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">لا توجد نتائج مطابقة</td>
              </tr>
            ) : (
              filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{sale.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{sale.productName}</td>
                  <td className="px-6 py-4 text-gray-600">{sale.quantity}</td>
                  <td className="px-6 py-4 text-gray-600">{sale.price.toFixed(3)}</td>
                  <td className="px-6 py-4 font-bold text-green-600">{sale.total.toFixed(3)} ر.ع.</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{sale.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onDelete(sale.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};