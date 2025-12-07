import React from 'react';
import { X, Layout, Clock, Settings } from 'lucide-react';

interface WidgetConfig {
  showStats: boolean;
  showCharts: boolean;
  showRecentInventory: boolean;
  showAIHelp: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetConfig: WidgetConfig;
  setWidgetConfig: (config: WidgetConfig) => void;
  customDate: Date;
  setCustomDate: (date: Date) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, onClose, widgetConfig, setWidgetConfig, customDate, setCustomDate
}) => {
  if (!isOpen) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const timeStr = customDate.toTimeString().slice(0, 5);
    const newDate = new Date(`${e.target.value}T${timeStr}`);
    setCustomDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    // Need to handle timezone offsets carefully, but for simple UI logic:
    const dateStr = customDate.toISOString().split('T')[0];
    const newDate = new Date(`${dateStr}T${e.target.value}`);
    setCustomDate(newDate);
  };

  // Helper to get YYYY-MM-DD safely
  const getDateInputValue = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const getTimeInputValue = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2 text-gray-800">
            <Settings className="text-orange-500" size={24} />
            <h3 className="text-xl font-bold">إعدادات النظام</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Date & Time Section */}
          <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-4 text-orange-700">
              <Clock size={20} />
              <h4 className="font-bold">ضبط الوقت والتاريخ</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">التاريخ</label>
                <input 
                  type="date" 
                  value={getDateInputValue(customDate)}
                  onChange={handleDateChange}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">الوقت</label>
                <input 
                  type="time" 
                  value={getTimeInputValue(customDate)}
                  onChange={handleTimeChange}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Dashboard Widgets Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-800">
              <Layout size={20} className="text-orange-500" />
              <h4 className="font-bold">تخصيص لوحة التحكم</h4>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 transition-all shadow-sm">
                <span className="font-medium text-gray-700">إحصائيات سريعة (KPIs)</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    checked={widgetConfig.showStats}
                    onChange={(e) => setWidgetConfig({...widgetConfig, showStats: e.target.checked})}
                    className="peer absolute opacity-0 w-0 h-0"
                  />
                  <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${widgetConfig.showStats ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                  <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${widgetConfig.showStats ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </div>
              </label>

              <label className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 transition-all shadow-sm">
                <span className="font-medium text-gray-700">الرسوم البيانية</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    checked={widgetConfig.showCharts}
                    onChange={(e) => setWidgetConfig({...widgetConfig, showCharts: e.target.checked})}
                    className="peer absolute opacity-0 w-0 h-0"
                  />
                  <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${widgetConfig.showCharts ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                  <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${widgetConfig.showCharts ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </div>
              </label>

              <label className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 transition-all shadow-sm">
                <span className="font-medium text-gray-700">جدول المخزون المصغر</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    checked={widgetConfig.showRecentInventory}
                    onChange={(e) => setWidgetConfig({...widgetConfig, showRecentInventory: e.target.checked})}
                    className="peer absolute opacity-0 w-0 h-0"
                  />
                  <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${widgetConfig.showRecentInventory ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                  <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${widgetConfig.showRecentInventory ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </div>
              </label>

              <label className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 transition-all shadow-sm">
                <span className="font-medium text-gray-700">بطاقة المساعدة (AI)</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    checked={widgetConfig.showAIHelp}
                    onChange={(e) => setWidgetConfig({...widgetConfig, showAIHelp: e.target.checked})}
                    className="peer absolute opacity-0 w-0 h-0"
                  />
                  <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${widgetConfig.showAIHelp ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                  <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${widgetConfig.showAIHelp ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};