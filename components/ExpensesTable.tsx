import React from 'react';
import { ExpenseRecord } from '../types';
import { Trash2 } from 'lucide-react';

interface ExpensesTableProps {
  expenses: ExpenseRecord[];
  onDelete: (id: string) => void;
}

export const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">سجل المصروفات</h3>
        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
          تصدير التقرير
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4">القسم</th>
              <th className="px-6 py-4">الوصف</th>
              <th className="px-6 py-4">المبلغ</th>
              <th className="px-6 py-4">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-600">{exp.date}</td>
                <td className="px-6 py-4">
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium">{exp.category}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{exp.description}</td>
                <td className="px-6 py-4 font-bold text-red-600">{exp.amount.toFixed(3)} ر.ع.</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onDelete(exp.id)}
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