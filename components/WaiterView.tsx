
import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { 
  Plus, Minus, ShoppingBag, X, Check,
  Coffee, UtensilsCrossed, Zap, Salad, Cookie, 
  IceCream, GlassWater, Martini, Citrus, Search, LogOut, Edit3
} from 'lucide-react';
import { MOCK_MENU_ITEMS } from '../constants';

interface WaiterViewProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onUpdateItemNote?: (itemId: string, note: string) => void;
  onCheckout: (paymentMethod: 'Cash' | 'Card' | 'Online') => void;
  onLogout: () => void;
}

export const WaiterView: React.FC<WaiterViewProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onUpdateItemNote,
  onCheckout,
  onLogout
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Categories with colors
  const categories = [
    { id: 'الكل', label: 'الكل', icon: ShoppingBag, color: 'bg-gray-800 text-white' },
    { id: 'عصائر', label: 'عصائر', icon: GlassWater, color: 'bg-orange-500 text-white' },
    { id: 'كوكتيل', label: 'كوكتيل', icon: Martini, color: 'bg-rose-500 text-white' },
    { id: 'ميلك شيك', label: 'ميلك شيك', icon: Coffee, color: 'bg-brown-500 text-white' },
    { id: 'ايس كريم', label: 'ايس كريم', icon: IceCream, color: 'bg-pink-500 text-white' },
    { id: 'وافل وكريب', label: 'وافل', icon: Cookie, color: 'bg-amber-500 text-white' },
    { id: 'مشروبات طاقة', label: 'طاقة', icon: Zap, color: 'bg-blue-500 text-white' },
    { id: 'سلطة فواكه', label: 'سلطات', icon: Salad, color: 'bg-green-500 text-white' },
  ];

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onCheckout('Cash');
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-20 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">همبا جوس</h1>
          <p className="text-xs text-orange-600 font-bold">واجهة النادل</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-red-50 text-red-600 p-2 rounded-lg"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="bg-white border-b border-gray-100 p-3 overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-[72px] z-10">
        <div className="flex gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isActive 
                    ? `${cat.color} shadow-md`
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن منتج..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onAddToCart(item)}
            className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform text-right flex flex-col justify-between h-32"
          >
            <div>
              <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.category}</p>
            </div>
            <div className="flex justify-between items-end mt-2">
              <div className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded-lg text-sm">
                {item.price.toFixed(3)}
              </div>
              <div className="bg-gray-900 text-white p-1.5 rounded-full shadow-lg">
                <Plus size={16} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {cart.length}
              </div>
              <span className="font-bold">عرض السلة</span>
            </div>
            <span className="font-bold text-lg">{totalAmount.toFixed(3)} ر.ع.</span>
          </button>
        </div>
      )}

      {/* Cart Modal (BottomSheet Style) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl h-[85vh] flex flex-col animate-in slide-in-from-bottom-full duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">مراجعة الطلب</h2>
              <button onClick={() => setIsCartOpen(false)} className="bg-gray-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <p className="text-orange-600 font-bold text-sm">{(item.price * item.quantity).toFixed(3)} ر.ع.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md text-gray-600 active:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-md active:bg-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Note Input */}
                  <div className="relative">
                    <Edit3 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="إضافة ملاحظة (مثلاً: بدون سكر)..."
                      className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-orange-500 transition-all"
                      value={item.note || ''}
                      onChange={(e) => onUpdateItemNote && onUpdateItemNote(item.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-white pb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 font-medium">الإجمالي</span>
                <span className="text-3xl font-extrabold text-gray-900">{totalAmount.toFixed(3)} ر.ع.</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                تأكيد وطباعة الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
