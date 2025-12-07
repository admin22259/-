import React from 'react';
import { InventoryItem } from '../types';
import { AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

interface InventoryTableProps {
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">حالة المخزون</h3>
        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
          تصدير التقرير
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">اسم الصنف</th>
              <th className="px-6 py-4 font-medium">القسم</th>
              <th className="px-6 py-4 font-medium">الكمية الحالية</th>
              <th className="px-6 py-4 font-medium">مستوى المخزون</th>
              <th className="px-6 py-4 font-medium">الحد الأدنى</th>
              <th className="px-6 py-4 font-medium">الحالة</th>
              <th className="px-6 py-4 font-medium">آخر تحديث</th>
              <th className="px-6 py-4 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => {
              const isLowStock = item.quantity <= item.minThreshold;
              // Calculate percentage relative to a 'healthy' stock (e.g., 2.5x min threshold or at least quantity)
              const maxRef = Math.max(item.quantity, item.minThreshold * 2.5);
              const percentage = Math.min(100, Math.round((item.quantity / maxRef) * 100));
              
              return (
                <tr key={item.id} className="hover:bg-orange-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {item.quantity} <span className="text-gray-400 font-normal text-xs">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 w-32">
                       <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full transition-all duration-500 ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`}
                           style={{ width: `${percentage}%` }}
                         />
                       </div>
                       <span className="text-xs text-gray-400 font-medium">{percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.minThreshold}</td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${isLowStock ? 'text-red-500' : 'text-green-500'}`}>
                      {isLowStock ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                      <span className="text-sm font-medium">{isLowStock ? 'منخفض' : 'متوفر'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{item.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      title="حذف الصنف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};