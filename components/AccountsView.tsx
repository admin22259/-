import React, { useState } from 'react';
import { SaleRecord, ExpenseRecord } from '../types';
import { Printer, Download, Calendar, ArrowDownToLine, RefreshCw, DollarSign, TrendingDown, TrendingUp, FileText } from 'lucide-react';

interface AccountsViewProps {
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  onStartNewDay: () => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({ sales, expenses, onStartNewDay }) => {
  const [showEndDayConfirm, setShowEndDayConfirm] = useState(false);

  // Get Today's Data
  const today = new Date().toISOString().split('T')[0];
  const todaysSales = sales.filter(s => s.date === today);
  const todaysExpenses = expenses.filter(e => e.date === today);

  const totalSales = todaysSales.reduce((sum, s) => sum + s.total, 0);
  const totalExpenses = todaysExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalSales - totalExpenses;
  const totalOrders = todaysSales.length;

  const paymentMethods = todaysSales.reduce((acc, curr) => {
    acc[curr.paymentMethod] = (acc[curr.paymentMethod] || 0) + curr.total;
    return acc;
  }, {} as Record<string, number>);

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportCSV = (type: 'sales' | 'products') => {
    const BOM = "\uFEFF";
    let content = "";
    let filename = "";

    if (type === 'sales') {
        const headers = "ID,Date,Product,Quantity,Price,Total,Payment";
        const rows = sales.map(s => `${s.id},${s.date},"${s.productName}",${s.quantity},${s.price},${s.total},${s.paymentMethod}`).join("\n");
        content = BOM + headers + "\n" + rows;
        filename = `Sales_Report_${today}.csv`;
    } else {
        // Group by product
        const productStats = sales.reduce<Record<string, { qty: number; total: number }>>((acc, curr) => {
            if (!acc[curr.productName]) acc[curr.productName] = { qty: 0, total: 0 };
            acc[curr.productName].qty += curr.quantity;
            acc[curr.productName].total += curr.total;
            return acc;
        }, {});

        const headers = "Product,Total Quantity,Total Revenue";
        const rows = Object.entries(productStats).map(([name, stats]) => `"${name}",${stats.qty},${stats.total}`).join("\n");
        content = BOM + headers + "\n" + rows;
        filename = `Products_Report_${today}.csv`;
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-orange-500" />
            الحسابات والتقارير
          </h2>
          <p className="text-gray-500 text-sm mt-1">إدارة التقارير اليومية وإغلاق الوردية</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleExportCSV('sales')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <Download size={18} />
            تصدير الكل (CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Report Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 printable-section">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-orange-500" />
              تقرير اليوم ({today})
            </h3>
            <button 
              onClick={handlePrintReport}
              className="text-orange-600 hover:bg-orange-50 p-2 rounded-lg transition-colors print:hidden"
              title="طباعة التقرير"
            >
              <Printer size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-xs text-green-600 font-bold mb-1">إجمالي المبيعات</p>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-600" />
                  <span className="text-xl font-bold text-gray-800">{totalSales.toFixed(3)} ر.ع.</span>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-xs text-red-600 font-bold mb-1">المصروفات</p>
                <div className="flex items-center gap-2">
                  <TrendingDown size={18} className="text-red-600" />
                  <span className="text-xl font-bold text-gray-800">{totalExpenses.toFixed(3)} ر.ع.</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">عدد الطلبات</span>
                <span className="font-bold">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">صافي النقدية (Net)</span>
                <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netProfit.toFixed(3)} ر.ع.
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-bold text-gray-500 mb-3">تفاصيل الدفع</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">Cash</p>
                  <p className="font-bold text-gray-800">{(paymentMethods['Cash'] || 0).toFixed(3)}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">Card</p>
                  <p className="font-bold text-gray-800">{(paymentMethods['Card'] || 0).toFixed(3)}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">Online</p>
                  <p className="font-bold text-gray-800">{(paymentMethods['Online'] || 0).toFixed(3)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions & End of Day */}
        <div className="space-y-6">
           
           {/* Detailed Exports */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowDownToLine size={20} className="text-blue-500" />
                تصدير تفصيلي
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleExportCSV('sales')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded-xl transition-all group"
                >
                  <div className="text-right">
                    <span className="font-bold text-gray-800 block">سجل المبيعات الكامل</span>
                    <span className="text-xs text-gray-500">كل عملية بيع بالتفصيل (الوقت، المنتج، السعر)</span>
                  </div>
                  <Download size={20} className="text-gray-400 group-hover:text-blue-500" />
                </button>

                <button 
                  onClick={() => handleExportCSV('products')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 hover:border-green-200 border border-transparent rounded-xl transition-all group"
                >
                  <div className="text-right">
                    <span className="font-bold text-gray-800 block">تقرير المنتجات المباعة</span>
                    <span className="text-xs text-gray-500">الكميات والإيرادات لكل صنف على حدة</span>
                  </div>
                  <Download size={20} className="text-gray-400 group-hover:text-green-500" />
                </button>
              </div>
           </div>

           {/* End of Day / Z-Report */}
           <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white">
              <div className="flex items-start gap-4">
                 <div className="bg-orange-500 p-3 rounded-xl shadow-lg shadow-orange-500/20">
                    <RefreshCw size={24} className="text-white" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold mb-1">إغلاق اليوم وبدء يوم جديد</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      تأكد من طباعة التقارير اليومية قبل الإغلاق. 
                      هذا الإجراء سيقوم بتصفير عدادات اليوم وبدء جلسة مبيعات جديدة.
                    </p>
                 </div>
              </div>

              {!showEndDayConfirm ? (
                <button 
                  onClick={() => setShowEndDayConfirm(true)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all mt-2"
                >
                  إغلاق الوردية / اليوم
                </button>
              ) : (
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm font-bold text-orange-400 mb-3 text-center">
                    ⚠️ هل أنت متأكد؟ سيتم حذف بيانات المبيعات الحالية لبدء يوم جديد.
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowEndDayConfirm(false)}
                      className="flex-1 py-2 bg-transparent border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800"
                    >
                      إلغاء
                    </button>
                    <button 
                      onClick={() => {
                        onStartNewDay();
                        setShowEndDayConfirm(false);
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg"
                    >
                      تأكيد وحذف البيانات
                    </button>
                  </div>
                </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};