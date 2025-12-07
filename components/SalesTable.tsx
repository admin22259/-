import React from 'react';
import { SaleRecord } from '../types';
import { Trash2 } from 'lucide-react';

interface SalesTableProps {
  sales: SaleRecord[];
  onDelete: (id: string) => void;
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">سجل المبيعات</h3>
        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
          تصدير التقرير
        </button>
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
            {sales.map((sale) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};