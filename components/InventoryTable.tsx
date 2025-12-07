import React, { useRef } from 'react';
import { InventoryItem } from '../types';
import { AlertCircle, CheckCircle, Trash2, Download, Upload, FileDown } from 'lucide-react';

interface InventoryTableProps {
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
  onImport?: (items: InventoryItem[]) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onDelete, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    // Add BOM for Arabic Excel support
    const BOM = "\uFEFF";
    const headers = "id,name,category,quantity,unit,minThreshold,lastUpdated";
    const rows = inventory.map(item => {
      // Escape quotes in names if present
      const name = item.name.replace(/"/g, '""');
      return `${item.id},"${name}",${item.category},${item.quantity},${item.unit},${item.minThreshold},${item.lastUpdated}`;
    }).join("\n");
    
    const csvContent = BOM + headers + "\n" + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImport) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split(/\r\n|\n/);
        const parsedItems: InventoryItem[] = [];

        // Start from index 1 to skip header
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Split by comma, respecting quotes
          const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          
          if (cols) {
            // Remove quotes if present
            const clean = (s: string) => s ? s.replace(/^"|"$/g, '').replace(/""/g, '"') : '';
            
            // Map columns to InventoryItem, assuming export order: id, name, category, quantity, unit, minThreshold, lastUpdated
            // Fallback for simple split if regex fails or simple CSV
            const values = cols.length < 5 ? line.split(',') : cols.map(clean);

            if (values.length >= 6) {
               parsedItems.push({
                 id: values[0] || Math.random().toString(36).substr(2, 9),
                 name: values[1] || 'Unknown',
                 category: (values[2] as any) || 'فواكه',
                 quantity: Number(values[3]) || 0,
                 unit: values[4] || 'قطعة',
                 minThreshold: Number(values[5]) || 0,
                 lastUpdated: values[6] || new Date().toISOString().split('T')[0]
               });
            }
          }
        }

        if (parsedItems.length > 0) {
          onImport(parsedItems);
          alert(`تم استيراد ${parsedItems.length} صنف بنجاح`);
        } else {
          alert('لم يتم العثور على بيانات صالحة في الملف.');
        }
      } catch (error) {
        console.error("Import Error:", error);
        alert('حدث خطأ أثناء قراءة الملف. تأكد من أن الملف بصيغة CSV صحيحة.');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-gray-800">حالة المخزون</h3>
        
        <div className="flex gap-2">
          {onImport && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".csv" 
                className="hidden" 
              />
              <button 
                onClick={handleImportClick}
                className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <Upload size={16} />
                استيراد
              </button>
            </>
          )}
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-100 transition-colors"
          >
            <Download size={16} />
            تصدير
          </button>
        </div>
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
            {inventory.length === 0 ? (
               <tr>
                 <td colSpan={8} className="text-center py-8 text-gray-400">لا توجد أصناف في المخزون</td>
               </tr>
            ) : (
              inventory.map((item) => {
                const isLowStock = item.quantity <= item.minThreshold;
                // Calculate percentage relative to a 'healthy' stock (e.g., 2.5x min threshold or at least quantity)
                const maxRef = Math.max(item.quantity, item.minThreshold * 2.5) || 100;
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
