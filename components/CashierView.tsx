import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { 
  Plus, Minus, Trash2, Printer, ShoppingBag, 
  Coffee, UtensilsCrossed, Zap, Salad, Cookie, 
  IceCream, GlassWater, Martini, Citrus, Search
} from 'lucide-react';
import { MOCK_MENU_ITEMS, GOOGLE_SHEET_URL } from '../constants';

interface CashierViewProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onCheckout: (paymentMethod: 'Cash' | 'Card' | 'Online') => void;
  onClearCart: () => void;
}

export const CashierView: React.FC<CashierViewProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
  onClearCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Map categories to visual icons
  const categories = [
    { id: 'الكل', label: 'الكل', icon: ShoppingBag, color: 'bg-gray-800 text-white' },
    { id: 'عصائر', label: 'عصائر', icon: GlassWater, color: 'bg-orange-500 text-white' },
    { id: 'كوكتيل', label: 'كوكتيل', icon: Martini, color: 'bg-rose-500 text-white' },
    { id: 'ميلك شيك', label: 'ميلك شيك', icon: Coffee, color: 'bg-brown-500 text-white' },
    { id: 'ايس كريم', label: 'ايس كريم', icon: IceCream, color: 'bg-pink-500 text-white' },
    { id: 'وافل وكريب', label: 'وافل وكريب', icon: Cookie, color: 'bg-amber-500 text-white' },
    { id: 'مشروبات طاقة', label: 'مشروبات طاقة', icon: Zap, color: 'bg-blue-500 text-white' },
    { id: 'سلطة فواكه', label: 'سلطة فواكه', icon: Salad, color: 'bg-green-500 text-white' },
  ];

  // Helper to determine icon for a specific item based on its category
  const getItemIcon = (category: string) => {
    switch (category) {
      case 'عصائر': return Citrus;
      case 'كوكتيل': return Martini;
      case 'ميلك شيك': return Coffee;
      case 'ايس كريم': return IceCream;
      case 'وافل وكريب': return Cookie;
      case 'مشروبات طاقة': return Zap;
      case 'سلطة فواكه': return Salad;
      default: return UtensilsCrossed;
    }
  };

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to format OMR currency
  const formatCurrency = (val: number) => {
    return val.toFixed(3) + ' ر.ع.';
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleItemClick = (item: MenuItem) => {
    onAddToCart(item);
    // Trigger visual feedback
    setClickedItem(item.id);
    setTimeout(() => setClickedItem(null), 200);
  };

  const handlePrintAndSave = () => {
    // 1. Prepare Data
    const invoiceId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const date = new Date().toLocaleDateString('en-GB');
    const time = new Date().toLocaleTimeString('en-GB');
    const itemsStr = cart.map(i => `${i.name} (${i.quantity})`).join(' + ');
    const total = totalAmount.toFixed(3);
    
    // 2. CSV Content with BOM for Arabic support
    const csvContent = `\uFEFFInvoice ID,Date,Time,Items,Total,Payment Method\n${invoiceId},${date},${time},"${itemsStr}",${total},Cash/Print`;
    
    // 3. Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Invoice_${date.replace(/\//g, '-')}_${invoiceId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 4. Open Google Sheet
    window.open(GOOGLE_SHEET_URL, "_blank");
    
    // 5. Native Print
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Menu Section (Left Side) */}
      <div className="lg:w-2/3 flex flex-col gap-6">
        {/* Search & Categories */}
        <div className="space-y-4">
           {/* Search Bar */}
           <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="ابحث عن منتج..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
              />
           </div>

           {/* Category Chips */}
           <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all shadow-sm ${
                    isActive 
                      ? `${cat.color} shadow-lg scale-105` 
                      : 'bg-white text-gray-600 border border-gray-100 hover:bg-orange-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const ItemIcon = getItemIcon(item.category);
              const isClicked = clickedItem === item.id;
              
              // Parse background color to create gradient
              // Assuming item.color is something like 'bg-orange-100 text-orange-900 border-orange-200'
              // We want a richer look
              const baseColorClass = item.color.split(' ')[0]; // e.g., bg-orange-100
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`
                    relative overflow-hidden border rounded-2xl flex flex-col transition-all duration-200 group text-right
                    hover:shadow-lg hover:-translate-y-1 active:scale-95
                    ${item.color.replace('100', '50')} ${item.color.includes('border') ? '' : 'border-gray-100'}
                    ${isClicked ? 'ring-4 ring-orange-400 ring-opacity-50' : ''}
                  `}
                >
                  {/* Decorative Background Icon */}
                  <ItemIcon 
                    className="absolute -left-4 -bottom-4 opacity-10 transform rotate-12 transition-transform group-hover:scale-125" 
                    size={100} 
                  />

                  {/* Icon Header */}
                  <div className={`p-4 pb-0 flex justify-between items-start`}>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-white/80 backdrop-blur-sm`}>
                       <ItemIcon size={20} className="opacity-80" />
                     </div>
                     <span className="font-bold text-lg text-gray-800">{formatCurrency(item.price)}</span>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-2 relative z-10">
                    <h4 className="font-bold text-gray-800 line-clamp-2 text-sm h-10 leading-tight flex items-center">
                      {item.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider font-semibold opacity-60 mt-2">
                      {item.category}
                    </p>
                  </div>

                  {/* Hover Add Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-gray-900 p-2 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Plus size={24} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Section (Right Side) */}
      <div className="lg:w-1/3 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-3">
             <div className="bg-orange-500 p-2 rounded-lg text-white">
               <ShoppingBag size={20} />
             </div>
             <div>
                <h3 className="font-bold text-lg">سلة المشتريات</h3>
                <p className="text-xs text-gray-400">رقم الفاتورة: #{Math.floor(Math.random()*10000)}</p>
             </div>
          </div>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-500/20">
            {cart.length}
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 opacity-60">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                 <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <p className="font-medium">السلة فارغة</p>
            </div>
          ) : (
            cart.map((item) => {
              const ItemIcon = getItemIcon(item.category);
              return (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm group hover:border-orange-200 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold ${item.color.replace('text-', 'bg-').replace('100', '50 text-gray-700')}`}>
                    <ItemIcon size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                    <p className="text-orange-600 text-xs font-bold mt-0.5">{formatCurrency(item.price * item.quantity)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-green-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">الإجمالي النهائي</span>
            <span className="font-extrabold text-2xl text-gray-900">{formatCurrency(totalAmount)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={onClearCart}
               disabled={cart.length === 0}
               className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               <Trash2 size={18} />
               <span>إلغاء</span>
             </button>
             <button 
               disabled={cart.length === 0}
               onClick={handlePrintAndSave}
               className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200"
             >
               <Printer size={18} />
               <span>طباعة وحفظ</span>
             </button>
          </div>

          <button 
            onClick={() => onCheckout('Cash')}
            disabled={cart.length === 0}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            <span>إتمام البيع (كاش)</span>
          </button>
        </div>
      </div>
    </div>
  );
};