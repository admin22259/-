export interface SaleRecord {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  paymentMethod: 'Cash' | 'Card' | 'Online';
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: 'فواكه' | 'أجور' | 'إيجار' | 'كهرباء' | 'صيانة' | 'مواد تغليف';
  amount: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'فواكه' | 'خضروات' | 'جاف' | 'تغليف';
  quantity: number;
  unit: string;
  minThreshold: number;
  lastUpdated: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'عصائر' | 'كوكتيل' | 'حلوى' | 'ميلك شيك' | 'ايس كريم' | 'وافل وكريب' | 'مشروبات طاقة' | 'سلطة فواكه';
  color: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface KPIData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  ordersCount: number;
}

export type ViewState = 'dashboard' | 'sales' | 'inventory' | 'expenses' | 'ai-insights' | 'pos';