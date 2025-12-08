import React, { useState } from 'react';
import { X, Layout, Clock, Settings, Image, Download, Save, Smartphone, Copy, Check, AppWindow } from 'lucide-react';

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
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  onExportData: () => void;
  deferredPrompt?: any;
  setDeferredPrompt?: (prompt: any) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, onClose, widgetConfig, setWidgetConfig, customDate, setCustomDate, logoUrl, setLogoUrl, onExportData, deferredPrompt, setDeferredPrompt
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const timeStr = customDate.toTimeString().slice(0, 5);
    const newDate = new Date(`${e.target.value}T${timeStr}`);
    setCustomDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const dateStr = customDate.toISOString().split('T')[0];
    const newDate = new Date(`${dateStr}T${e.target.value}`);
    setCustomDate(newDate);
  };

  const getDateInputValue = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const getTimeInputValue = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    if (setDeferredPrompt) setDeferredPrompt(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-800">
            <Settings className="text-orange-500" size={24} />
            <h3 className="text-xl font-bold">إعدادات النظام</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          
          {/* Logo Settings */}
          <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-4 text-orange-700">
              <Image size={20} />
              <h4 className="font-bold">شعار المحل (Logo)</h4>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">رابط الصورة (URL)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="flex-1 bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-left"
                  dir="ltr"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">ضع رابط مباشر لصورة الشعار (png, jpg) ليظهر في القائمة وشاشة الدخول.</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* System Access & PWA */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-800">
              <Smartphone size={20} className="text-orange-500" />
              <h4 className="font-bold">تثبيت ورابط النظام</h4>
            </div>
            
            <div className="space-y-3">
              {deferredPrompt && (
                <button 
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <AppWindow size={20} />
                  تثبيت التطبيق على الجهاز
                </button>
              )}

              <button 
                onClick={copyLink}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-right">
                  <span className="block font-bold text-gray-700 text-sm">نسخ رابط النظام</span>
                  <span className="block text-xs text-gray-400 mt-0.5" dir="ltr">{window.location.host}</span>
                </div>
                <div className={`p-2 rounded-lg ${copied ? 'bg-green-100 text-green-600' : 'bg-white text-gray-500 shadow-sm'}`}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </div>
              </button>

              <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 leading-relaxed border border-blue-100">
                <strong>💡 نصيحة للتثبيت:</strong>
                <br />
                {deferredPrompt ? (
                  "اضغط على زر التثبيت أعلاه لتحميل النظام كبرنامج مستقل على جهازك."
                ) : (
                  <>
                  للوصول للتطبيق في أي وقت، اضغط على إعدادات المتصفح واختر 
                  <span className="font-bold mx-1">"تثبيت التطبيق"</span> أو <span className="font-bold mx-1">"إضافة إلى الشاشة الرئيسية"</span>.
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Date & Time Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-800">
              <Clock size={20} className="text-orange-500" />
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
              {[
                { key: 'showStats', label: 'إحصائيات سريعة (KPIs)' },
                { key: 'showCharts', label: 'الرسوم البيانية' },
                { key: 'showRecentInventory', label: 'جدول المخزون المصغر' },
                { key: 'showAIHelp', label: 'بطاقة المساعدة (AI)' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 transition-all shadow-sm">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input 
                      type="checkbox" 
                      checked={widgetConfig[item.key as keyof WidgetConfig]}
                      onChange={(e) => setWidgetConfig({...widgetConfig, [item.key as keyof WidgetConfig]: e.target.checked})}
                      className="peer absolute opacity-0 w-0 h-0"
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${widgetConfig[item.key as keyof WidgetConfig] ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${widgetConfig[item.key as keyof WidgetConfig] ? 'translate-x-6' : 'translate-x-0'}`}></span>
                  </div>
                </label>
              ))}
            </div>
          </div>

           <hr className="border-gray-100" />

           {/* Backup Section */}
           <div>
              <div className="flex items-center gap-2 mb-4 text-gray-800">
                <Save size={20} className="text-orange-500" />
                <h4 className="font-bold">نسخ احتياطي للبيانات</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">قم بتحميل نسخة كاملة من بيانات المشروع (المبيعات، المخزون، المصروفات) لحفظها على جهازك.</p>
              <button 
                onClick={onExportData}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200"
              >
                <Download size={20} />
                تحميل بيانات المشروع كاملة (Backup)
              </button>
           </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            إغلاق وحفظ
          </button>
        </div>
      </div>
    </div>
  );
};