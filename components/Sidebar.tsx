import React from 'react';
import { LayoutDashboard, ShoppingCart, Truck, Wallet, BrainCircuit, Citrus, Menu, X, Calculator, FileText } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  logoUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, toggleSidebar, logoUrl }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'pos', label: 'نقطة بيع (كاشير)', icon: Calculator },
    { id: 'sales', label: 'المبيعات', icon: ShoppingCart },
    { id: 'inventory', label: 'المخازن', icon: Truck },
    { id: 'expenses', label: 'المصروفات', icon: Wallet },
    { id: 'accounts', label: 'الحسابات والتقارير', icon: FileText },
    { id: 'ai-insights', label: 'المحلل الذكي', icon: BrainCircuit },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center p-6 border-b border-orange-100 bg-gradient-to-br from-orange-50 to-white text-center relative">
          <button onClick={toggleSidebar} className="md:hidden absolute top-4 left-4 text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
          
          <div className="w-24 h-24 mb-3 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="bg-green-600 w-full h-full flex items-center justify-center text-white">
                <Citrus size={40} />
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-xl font-extrabold text-gray-800 leading-tight">همبا جوس</h1>
            <p className="text-sm text-orange-600 font-bold mt-1">صلالة</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as ViewState);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 interactive-hover ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-orange-50">
          <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">حالة النظام</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-green-700">متصل بالإنترنت</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};