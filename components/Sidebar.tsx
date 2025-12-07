import React from 'react';
import { LayoutDashboard, ShoppingCart, Truck, Wallet, BrainCircuit, Citrus, Menu, X, Calculator } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'pos', label: 'نقطة بيع (كاشير)', icon: Calculator },
    { id: 'sales', label: 'المبيعات', icon: ShoppingCart },
    { id: 'inventory', label: 'المخازن', icon: Truck },
    { id: 'expenses', label: 'المصروفات', icon: Wallet },
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
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-orange-100 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg text-white shadow-md shadow-orange-500/20">
              <Citrus size={24} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-800 leading-tight">همبا جوس</h1>
              <p className="text-xs text-orange-600 font-bold">صلالة</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500">
            <X size={24} />
          </button>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
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