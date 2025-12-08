
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { ChartsSection } from './components/ChartsSection';
import { InventoryTable } from './components/InventoryTable';
import { SalesTable } from './components/SalesTable';
import { ExpensesTable } from './components/ExpensesTable';
import { AIAnalysis } from './components/AIAnalysis';
import { ConfirmationModal } from './components/ConfirmationModal';
import { SettingsModal } from './components/SettingsModal';
import { CashierView } from './components/CashierView';
import { AccountsView } from './components/AccountsView';
import { LoginScreen } from './components/LoginScreen';
import { WaiterView } from './components/WaiterView';
import { ViewState, SaleRecord, ExpenseRecord, InventoryItem, CartItem, MenuItem, UserRole } from './types';
import { MOCK_SALES, MOCK_EXPENSES, MOCK_INVENTORY } from './constants';
import { Menu, Settings, SlidersHorizontal, LogOut } from 'lucide-react';

export default function App() {
  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Auth State with Persistence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hamba_auth') === 'true';
  });
  
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('hamba_role') as UserRole) || 'admin';
  });

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    // If we are restoring a waiter session, default to waiter view
    const savedRole = localStorage.getItem('hamba_role');
    if (savedRole === 'waiter') return 'waiter';
    return 'dashboard';
  });
  
  // Initialize sidebar based on screen width (Open on desktop, closed on mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  
  // Data State
  const [sales, setSales] = useState<SaleRecord[]>(MOCK_SALES);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(MOCK_EXPENSES);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Settings State
  const [appDate, setAppDate] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState({
    showStats: true,
    showCharts: true,
    showRecentInventory: true,
    showAIHelp: true,
  });
  
  // Logo & Persistence
  const [logoUrl, setLogoUrl] = useState(() => {
    return localStorage.getItem('hamba_logo_url') || ''; 
  });

  // Save settings to local storage
  useEffect(() => {
    localStorage.setItem('hamba_logo_url', logoUrl);
  }, [logoUrl]);

  // Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'sale' | 'expense' | 'inventory' | null;
    id: string | null;
  }>({ isOpen: false, type: null, id: null });

  // Derived State (Real-time calculations)
  const kpiData = useMemo(() => {
    const totalRevenue = sales.reduce((sum, item) => sum + item.total, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      ordersCount: sales.length
    };
  }, [sales, expenses]);

  const lowStockCount = useMemo(() => {
    return inventory.filter(item => item.quantity <= item.minThreshold).length;
  }, [inventory]);

  // Formatting Date/Time for display
  const formattedDate = appDate.toLocaleDateString('ar-OM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = appDate.toLocaleTimeString('ar-OM', { hour: '2-digit', minute: '2-digit' });

  // Actions
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    
    // Persist session
    localStorage.setItem('hamba_auth', 'true');
    localStorage.setItem('hamba_role', role);

    // Route based on role
    if (role === 'waiter') {
      setCurrentView('waiter');
    } else {
      setCurrentView('pos'); // Default to POS for admin too for quick access
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setUserRole('admin');
    
    // Clear session
    localStorage.removeItem('hamba_auth');
    localStorage.removeItem('hamba_role');
  };

  const initiateDelete = (type: 'sale' | 'expense' | 'inventory', id: string) => {
    setDeleteModal({ isOpen: true, type, id });
  };

  const confirmDelete = () => {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    if (type === 'sale') {
      setSales(prev => prev.filter(item => item.id !== id));
    } else if (type === 'expense') {
      setExpenses(prev => prev.filter(item => item.id !== id));
    } else if (type === 'inventory') {
      setInventory(prev => prev.filter(item => item.id !== id));
    }

    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  const handleInventoryImport = (importedItems: InventoryItem[]) => {
    setInventory(prev => {
      const itemMap = new Map(prev.map(i => [i.id, i]));
      importedItems.forEach(newItem => {
        itemMap.set(newItem.id, newItem);
      });
      return Array.from(itemMap.values());
    });
  };

  const handleStartNewDay = () => {
    setSales([]);
    setExpenses([]);
    setCart([]);
    alert('تم إغلاق اليوم بنجاح وتصفير البيانات لبدء يوم جديد.');
  };

  // Export Complete Project Data
  const handleExportData = () => {
    const projectData = {
      timestamp: new Date().toISOString(),
      sales,
      expenses,
      inventory,
      settings: {
        logoUrl,
        widgetConfig
      }
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `HambaJuice_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cart Actions
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const updateCartItemNote = (itemId: string, note: string) => {
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, note } : item
    ));
  };

  const handleCheckout = (paymentMethod: 'Cash' | 'Card' | 'Online') => {
    if (cart.length === 0) return;

    const newSales: SaleRecord[] = cart.map(item => ({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      productName: item.name + (item.note ? ` (${item.note})` : ''),
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      paymentMethod,
      note: item.note // Save note to record
    }));

    setSales(prev => [...newSales, ...prev]);
    setCart([]);
    alert('تمت عملية البيع بنجاح!');
  };

  const renderContent = () => {
    // If user is Waiter, force WaiterView or block access
    if (userRole === 'waiter') {
      return (
        <WaiterView 
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onUpdateItemNote={updateCartItemNote}
          onCheckout={handleCheckout}
          onLogout={handleLogout}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 hidden lg:block">نظرة عامة على النشاط</h2>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <SlidersHorizontal size={16} />
                تخصيص الواجهة
              </button>
            </div>

            {widgetConfig.showStats && (
              <DashboardStats data={kpiData} lowStockCount={lowStockCount} />
            )}
            
            {widgetConfig.showCharts && (
              <ChartsSection sales={sales} expenses={expenses} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {widgetConfig.showRecentInventory && (
                <div className={`${widgetConfig.showAIHelp ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                  <InventoryTable 
                    inventory={inventory.slice(0, 3)} 
                    onDelete={(id) => initiateDelete('inventory', id)} 
                  /> 
                </div>
              )}
              
              {widgetConfig.showAIHelp && (
                <div className={`${widgetConfig.showRecentInventory ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
                  <div className="bg-orange-500 rounded-2xl p-6 text-white h-full flex flex-col justify-center items-center text-center shadow-lg shadow-orange-500/20">
                      <h3 className="text-xl font-bold mb-2">هل تحتاج مساعدة؟</h3>
                      <p className="opacity-90 mb-4">استخدم المحلل الذكي للحصول على نصائح لزيادة مبيعاتك.</p>
                      <button 
                        onClick={() => setCurrentView('ai-insights')}
                        className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-50 transition"
                      >
                        اذهب للمحلل الذكي
                      </button>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 'pos':
        return (
          <CashierView 
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onUpdateItemNote={updateCartItemNote}
            onCheckout={handleCheckout}
            onClearCart={() => setCart([])}
          />
        );
      case 'inventory':
        return (
          <InventoryTable 
            inventory={inventory} 
            onDelete={(id) => initiateDelete('inventory', id)} 
            onImport={handleInventoryImport}
          />
        );
      case 'ai-insights':
        return <AIAnalysis sales={sales} expenses={expenses} inventory={inventory} />;
      case 'sales':
        return <SalesTable sales={sales} onDelete={(id) => initiateDelete('sale', id)} />;
      case 'expenses':
         return <ExpensesTable expenses={expenses} onDelete={(id) => initiateDelete('expense', id)} />;
      case 'accounts':
         return <AccountsView sales={sales} expenses={expenses} onStartNewDay={handleStartNewDay} />;
      default:
        // Default fallback
        return <div>جاري العمل عليها...</div>;
    }
  };

  // Auth Gate
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} logoUrl={logoUrl} />;
  }

  // If role is waiter, bypass admin layout completely
  if (userRole === 'waiter') {
    return renderContent();
  }

  // Admin Layout
  return (
    <div className="min-h-screen bg-orange-50/30 flex text-gray-800 font-sans">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        logoUrl={logoUrl}
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:mr-64' : ''}`}>
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {currentView === 'dashboard' && 'همبا جوس صلالة - الرئيسية'}
                {currentView === 'pos' && 'نقطة بيع (كاشير)'}
                {currentView === 'sales' && 'المبيعات'}
                {currentView === 'inventory' && 'إدارة المخازن'}
                {currentView === 'expenses' && 'المصروفات'}
                {currentView === 'accounts' && 'الحسابات والتقارير'}
                {currentView === 'ai-insights' && 'تحليل الذكاء الاصطناعي'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="hidden sm:block text-left hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
            >
              <p className="text-xs text-gray-400">{formattedDate}</p>
              <p className="text-sm font-medium text-gray-700" dir="ltr">{formattedTime}</p>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center text-orange-600 transition-colors"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا السجل؟"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        widgetConfig={widgetConfig}
        setWidgetConfig={setWidgetConfig}
        customDate={appDate}
        setCustomDate={setAppDate}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        onExportData={handleExportData}
        deferredPrompt={deferredPrompt}
        setDeferredPrompt={setDeferredPrompt}
      />
    </div>
  );
}
