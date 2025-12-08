import { SaleRecord, ExpenseRecord, InventoryItem, MenuItem } from './types';

export const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1rxVJnxCyZyRPIoyiMwhwdV6tfJOVCjIehgAkCrUUuEE/edit?usp=sharing';

export const MOCK_SALES: SaleRecord[] = [
  { id: '1', date: '2023-10-25', productName: 'عصير مانجو طازج', quantity: 15, price: 1.5, total: 22.5, paymentMethod: 'Cash' },
  { id: '2', date: '2023-10-25', productName: 'كوكتيل فواكه', quantity: 8, price: 2.0, total: 16.0, paymentMethod: 'Card' },
  { id: '3', date: '2023-10-25', productName: 'عصير فراولة', quantity: 12, price: 1.2, total: 14.4, paymentMethod: 'Cash' },
  { id: '4', date: '2023-10-26', productName: 'سموذي أفوكادو', quantity: 20, price: 2.5, total: 50.0, paymentMethod: 'Online' },
];

export const MOCK_EXPENSES: ExpenseRecord[] = [
  { id: '1', date: '2023-10-25', category: 'فواكه', amount: 50.0, description: 'شراء مانجو وفراولة' },
  { id: '2', date: '2023-10-26', category: 'مواد تغليف', amount: 15.0, description: 'أكواب بلاستيك وشفاطات' },
  { id: '3', date: '2023-10-26', category: 'كهرباء', amount: 20.0, description: 'فاتورة الأسبوع' },
  { id: '4', date: '2023-10-27', category: 'فواكه', amount: 35.0, description: 'شراء موز وبرتقال' },
  { id: '5', date: '2023-10-28', category: 'أجور', amount: 80.0, description: 'يوميات العمال' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'مانجو كيت', category: 'فواكه', quantity: 5, unit: 'صندوق', minThreshold: 3, lastUpdated: '2023-10-28', shelfLife: 7 },
  { id: '2', name: 'فراولة مجمدة', category: 'فواكه', quantity: 20, unit: 'كجم', minThreshold: 10, lastUpdated: '2023-10-27', shelfLife: 180 },
  { id: '3', name: 'سكر أبيض', category: 'جاف', quantity: 50, unit: 'كجم', minThreshold: 20, lastUpdated: '2023-10-25', shelfLife: 730 },
  { id: '4', name: 'أكواب 300مل', category: 'تغليف', quantity: 150, unit: 'قطعة', minThreshold: 500, lastUpdated: '2023-10-26', shelfLife: 9999 },
  { id: '5', name: 'موز بلدي', category: 'فواكه', quantity: 12, unit: 'كجم', minThreshold: 15, lastUpdated: '2023-10-28', shelfLife: 5 },
  { id: '6', name: 'حليب كامل الدسم', category: 'جاف', quantity: 8, unit: 'لتر', minThreshold: 10, lastUpdated: '2023-10-28', shelfLife: 14 },
];

// Colors based on category/type
const C_MANGO = 'bg-yellow-100 text-yellow-900 border-yellow-200';
const C_STRAW = 'bg-red-100 text-red-900 border-red-200';
const C_ORANGE = 'bg-orange-100 text-orange-900 border-orange-200';
const C_GREEN = 'bg-green-100 text-green-900 border-green-200'; // Lime, Mint, Kiwi
const C_AVO = 'bg-lime-200 text-lime-900 border-lime-300';
const C_PURPLE = 'bg-purple-100 text-purple-900 border-purple-200'; // Grape, Beetroot
const C_COCKTAIL = 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200';
const C_ICE = 'bg-pink-100 text-pink-900 border-pink-200';
const C_DESSERT = 'bg-amber-100 text-amber-900 border-amber-200'; // Waffle, Crepe
const C_ENERGY = 'bg-blue-100 text-blue-900 border-blue-200';
const C_SHAKE = 'bg-stone-100 text-stone-900 border-stone-200';
const C_SALAD = 'bg-emerald-100 text-emerald-900 border-emerald-200';

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // Juices (Mango)
  { id: 'item-345', name: 'مانجو صغير', price: 0.9, category: 'عصائر', color: C_MANGO },
  { id: 'item-567', name: 'مانجو وسط', price: 1.2, category: 'عصائر', color: C_MANGO },
  { id: 'item-568', name: 'مانجو كبير', price: 1.5, category: 'عصائر', color: C_MANGO },
  
  // Juices (Strawberry)
  { id: 'item-569', name: 'فراوله صغير', price: 0.8, category: 'عصائر', color: C_STRAW },
  { id: 'item-570', name: 'فراوله وسط', price: 1.1, category: 'عصائر', color: C_STRAW },
  { id: 'item-571', name: 'فراوله كبير', price: 1.4, category: 'عصائر', color: C_STRAW },

  // Juices (Orange)
  { id: 'item-572', name: 'برتقال صغير', price: 0.8, category: 'عصائر', color: C_ORANGE },
  { id: 'item-573', name: 'برتقال وسط', price: 1.1, category: 'عصائر', color: C_ORANGE },
  { id: 'item-574', name: 'برتقال كبير', price: 1.4, category: 'عصائر', color: C_ORANGE },

  // Juices (Pineapple)
  { id: 'item-575', name: 'اناناس صغير', price: 0.8, category: 'عصائر', color: C_MANGO },
  { id: 'item-576', name: 'اناناس وسط', price: 1.1, category: 'عصائر', color: C_MANGO },
  { id: 'item-577', name: 'اناناس كبير', price: 1.4, category: 'عصائر', color: C_MANGO },

  // Juices (Watermelon)
  { id: 'item-578', name: 'بطيخ صغير', price: 0.7, category: 'عصائر', color: C_STRAW },
  { id: 'item-579', name: 'بطيخ وسط', price: 1.0, category: 'عصائر', color: C_STRAW },
  { id: 'item-580', name: 'بطيخ كبير', price: 1.3, category: 'عصائر', color: C_STRAW },

  // Juices (Lemon/Mint)
  { id: 'item-581', name: 'ليمون نعناع صغير', price: 0.7, category: 'عصائر', color: C_GREEN },
  { id: 'item-582', name: 'ليمون نعناع وسط', price: 1.0, category: 'عصائر', color: C_GREEN },
  { id: 'item-583', name: 'ليمون نعناع كبير', price: 1.3, category: 'عصائر', color: C_GREEN },

  // Juices (Passion Fruit)
  { id: 'item-584', name: 'باشون فروت صغير', price: 0.9, category: 'عصائر', color: C_MANGO },
  { id: 'item-585', name: 'باشون فروت وسط', price: 1.2, category: 'عصائر', color: C_MANGO },
  { id: 'item-586', name: 'باشون فروت كبير', price: 1.5, category: 'عصائر', color: C_MANGO },

  // Juices (Apple)
  { id: 'item-587', name: 'تفاح أحمر/أخضر صغير', price: 0.8, category: 'عصائر', color: C_GREEN },
  { id: 'item-588', name: 'تفاح أحمر/أخضر وسط', price: 1.1, category: 'عصائر', color: C_GREEN },
  { id: 'item-589', name: 'تفاح أحمر/أخضر كبير', price: 1.4, category: 'عصائر', color: C_GREEN },

  // Cocktails (Avocado Honey Nuts)
  { id: 'item-590', name: 'أفوكادو عسل ومكسرات صغير', price: 1.3, category: 'كوكتيل', color: C_AVO },
  { id: 'item-591', name: 'أفوكادو عسل ومكسرات وسط', price: 1.6, category: 'كوكتيل', color: C_AVO },
  { id: 'item-592', name: 'أفوكادو عسل ومكسرات كبير', price: 2.0, category: 'كوكتيل', color: C_AVO },

  // Cocktails (Avocado Honey)
  { id: 'item-593', name: 'أفوكادو عسل صغير', price: 1.2, category: 'كوكتيل', color: C_AVO },
  { id: 'item-594', name: 'أفوكادو عسل وسط', price: 1.4, category: 'كوكتيل', color: C_AVO },
  { id: 'item-595', name: 'أفوكادو عسل كبير', price: 1.8, category: 'كوكتيل', color: C_AVO },

  // Cocktails (Avocado Plain)
  { id: 'item-596', name: 'أفوكادو سادة صغير', price: 1.0, category: 'كوكتيل', color: C_AVO },
  { id: 'item-597', name: 'أفوكادو سادة وسط', price: 1.2, category: 'كوكتيل', color: C_AVO },
  { id: 'item-598', name: 'أفوكادو سادة كبير', price: 1.5, category: 'كوكتيل', color: C_AVO },

  // Juices (Grape)
  { id: 'item-599', name: 'عنب صغير', price: 0.8, category: 'عصائر', color: C_PURPLE },
  { id: 'item-600', name: 'عنب وسط', price: 1.1, category: 'عصائر', color: C_PURPLE },
  { id: 'item-601', name: 'عنب كبير', price: 1.4, category: 'عصائر', color: C_PURPLE },

  // Juices (Peach)
  { id: 'item-602', name: 'خوخ صغير', price: 0.9, category: 'عصائر', color: C_ORANGE },
  { id: 'item-603', name: 'خوخ وسط', price: 1.2, category: 'عصائر', color: C_ORANGE },
  { id: 'item-604', name: 'خوخ كبير', price: 1.5, category: 'عصائر', color: C_ORANGE },

  // Juices (Beetroot)
  { id: 'item-605', name: 'شمندر صغير', price: 0.8, category: 'عصائر', color: C_PURPLE },
  { id: 'item-606', name: 'شمندر وسط', price: 1.1, category: 'عصائر', color: C_PURPLE },
  { id: 'item-607', name: 'شمندر كبير', price: 1.4, category: 'عصائر', color: C_PURPLE },

  // Juices (Grapefruit)
  { id: 'item-608', name: 'جريب فروت صغير', price: 0.7, category: 'عصائر', color: C_ORANGE },
  { id: 'item-609', name: 'جريب فروت وسط', price: 1.1, category: 'عصائر', color: C_ORANGE },
  { id: 'item-610', name: 'جريب فروت كبير', price: 1.3, category: 'عصائر', color: C_ORANGE },

  // Milkshakes (Banana Milk)
  { id: 'item-611', name: 'موز حليب صغير', price: 0.6, category: 'ميلك شيك', color: C_MANGO },
  { id: 'item-612', name: 'موز حليب وسط', price: 0.9, category: 'ميلك شيك', color: C_MANGO },
  { id: 'item-613', name: 'موز حليب كبير', price: 1.0, category: 'ميلك شيك', color: C_MANGO },

  // Juices (Hibiscus)
  { id: 'item-614', name: 'كركديه صغير', price: 0.5, category: 'عصائر', color: C_PURPLE },
  { id: 'item-615', name: 'كركديه وسط', price: 0.8, category: 'عصائر', color: C_PURPLE },
  { id: 'item-616', name: 'كركديه كبير', price: 1.0, category: 'عصائر', color: C_PURPLE },

  // Juices (Kiwi)
  { id: 'item-617', name: 'كيوي صغير', price: 0.8, category: 'عصائر', color: C_GREEN },
  { id: 'item-618', name: 'كيوي وسط', price: 1.1, category: 'عصائر', color: C_GREEN },
  { id: 'item-619', name: 'كيوي كبير', price: 1.4, category: 'عصائر', color: C_GREEN },

  // Juices (Pomegranate)
  { id: 'item-620', name: 'رمان صغير', price: 0.8, category: 'عصائر', color: C_STRAW },
  { id: 'item-621', name: 'رمان وسط', price: 1.1, category: 'عصائر', color: C_STRAW },
  { id: 'item-622', name: 'رمان كبير', price: 1.4, category: 'عصائر', color: C_STRAW },

  // Juices (Melon)
  { id: 'item-623', name: 'شمام صغير', price: 0.7, category: 'عصائر', color: C_ORANGE },
  { id: 'item-624', name: 'شمام وسط', price: 0.9, category: 'عصائر', color: C_ORANGE },
  { id: 'item-625', name: 'شمام كبير', price: 1.2, category: 'عصائر', color: C_ORANGE },

  // Juices (Carrot)
  { id: 'item-626', name: 'جزر صغير', price: 0.8, category: 'عصائر', color: C_ORANGE },
  { id: 'item-627', name: 'جزر وسط', price: 1.1, category: 'عصائر', color: C_ORANGE },
  { id: 'item-628', name: 'جزر كبير', price: 1.4, category: 'عصائر', color: C_ORANGE },

  // Special Cocktails
  { id: 'item-629', name: 'الامبراطور صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-630', name: 'الامبراطور وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-631', name: 'الامبراطور كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-632', name: 'عوار قلب صغير', price: 0.8, category: 'كوكتيل', color: C_STRAW },
  { id: 'item-633', name: 'عوار قلب وسط', price: 1.1, category: 'كوكتيل', color: C_STRAW },
  { id: 'item-634', name: 'عوار قلب كبير', price: 1.5, category: 'كوكتيل', color: C_STRAW },

  { id: 'item-635', name: 'فيروز صغير', price: 0.8, category: 'كوكتيل', color: C_ENERGY },
  { id: 'item-636', name: 'فيروز وسط', price: 1.1, category: 'كوكتيل', color: C_ENERGY },
  { id: 'item-637', name: 'فيروز كبير', price: 1.5, category: 'كوكتيل', color: C_ENERGY },

  { id: 'item-638', name: 'شروق صغير', price: 0.8, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-639', name: 'شروق وسط', price: 1.1, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-640', name: 'شروق كبير', price: 1.5, category: 'كوكتيل', color: C_ORANGE },

  { id: 'item-641', name: 'ريلاكس صغير', price: 0.8, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-642', name: 'ريلاكس وسط', price: 1.1, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-643', name: 'ريلاكس كبير', price: 1.5, category: 'كوكتيل', color: C_GREEN },

  { id: 'item-644', name: 'روتانا صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-645', name: 'روتانا وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-646', name: 'روتانا كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-647', name: 'فرحه صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-648', name: 'فرحه وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-649', name: 'فرحه كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-650', name: 'جنه صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-651', name: 'جنه وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-652', name: 'جنه كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-653', name: 'بهجه صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-654', name: 'بهجه وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-655', name: 'بهجه كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-656', name: 'كيان صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-657', name: 'كيان وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-658', name: 'كيان كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-659', name: 'مكس باشون صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-660', name: 'مكس باشون وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-661', name: 'مكس باشون كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-662', name: 'زوزو صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-663', name: 'زوزو وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-664', name: 'زوزو كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-665', name: 'فيتامين جرين صغير', price: 0.8, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-666', name: 'فيتامين جرين وسط', price: 1.1, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-667', name: 'فيتامين جرين كبير', price: 1.5, category: 'كوكتيل', color: C_GREEN },

  { id: 'item-668', name: 'جرين ميلون صغير', price: 0.8, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-669', name: 'جرين ميلون وسط', price: 1.1, category: 'كوكتيل', color: C_GREEN },
  { id: 'item-670', name: 'جرين ميلون كبير', price: 1.5, category: 'كوكتيل', color: C_GREEN },

  { id: 'item-671', name: 'بينك ليمونادا صغير', price: 0.8, category: 'كوكتيل', color: C_STRAW },
  { id: 'item-672', name: 'بينك ليمونادا وسط', price: 1.1, category: 'كوكتيل', color: C_STRAW },
  { id: 'item-673', name: 'بينك ليمونادا كبير', price: 1.5, category: 'كوكتيل', color: C_STRAW },

  // Avocado Mixes
  { id: 'item-674', name: 'أفوكادو مانجو صغير', price: 0.8, category: 'كوكتيل', color: C_AVO },
  { id: 'item-675', name: 'أفوكادو مانجو وسط', price: 1.1, category: 'كوكتيل', color: C_AVO },
  { id: 'item-676', name: 'أفوكادو مانجو كبير', price: 1.5, category: 'كوكتيل', color: C_AVO },

  { id: 'item-677', name: 'بلاك بيري صغير', price: 0.8, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-678', name: 'بلاك بيري وسط', price: 1.1, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-679', name: 'بلاك بيري كبير', price: 1.5, category: 'كوكتيل', color: C_PURPLE },

  { id: 'item-680', name: 'عمدة صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-681', name: 'عمدة وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-682', name: 'عمدة كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-683', name: 'غاليا صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-684', name: 'غاليا وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-685', name: 'غاليا كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-686', name: 'صاروخ صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-687', name: 'صاروخ وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-688', name: 'صاروخ كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-689', name: 'تايجر صغير', price: 0.8, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-690', name: 'تايجر وسط', price: 1.1, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-691', name: 'تايجر كبير', price: 1.5, category: 'كوكتيل', color: C_ORANGE },

  { id: 'item-692', name: 'أفوكادو فراولة صغير', price: 0.8, category: 'كوكتيل', color: C_AVO },
  { id: 'item-693', name: 'أفوكادو فراولة وسط', price: 1.1, category: 'كوكتيل', color: C_AVO },
  { id: 'item-694', name: 'أفوكادو فراولة كبير', price: 1.5, category: 'كوكتيل', color: C_AVO },

  // Mixes
  { id: 'item-695', name: 'أفوكادو برتقال أناناس صغير', price: 0.8, category: 'كوكتيل', color: C_AVO },
  { id: 'item-696', name: 'أفوكادو برتقال أناناس وسط', price: 1.1, category: 'كوكتيل', color: C_AVO },
  { id: 'item-697', name: 'أفوكادو برتقال أناناس كبير', price: 1.5, category: 'كوكتيل', color: C_AVO },

  { id: 'item-698', name: 'برتقال أناناس صغير', price: 0.8, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-699', name: 'برتقال أناناس وسط', price: 1.1, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-700', name: 'برتقال أناناس كبير', price: 1.5, category: 'كوكتيل', color: C_ORANGE },

  { id: 'item-701', name: 'برتقال مانجو صغير', price: 0.8, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-702', name: 'برتقال مانجو وسط', price: 1.1, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-703', name: 'برتقال مانجو كبير', price: 1.5, category: 'كوكتيل', color: C_ORANGE },

  { id: 'item-704', name: 'مانجو أناناس صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-705', name: 'مانجو أناناس وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-706', name: 'مانجو أناناس كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-707', name: 'أناناس باشون صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-708', name: 'أناناس باشون وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-709', name: 'أناناس باشون كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-710', name: 'باشون برتقال صغير', price: 0.8, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-711', name: 'باشون برتقال وسط', price: 1.1, category: 'كوكتيل', color: C_ORANGE },
  { id: 'item-712', name: 'باشون برتقال كبير', price: 1.5, category: 'كوكتيل', color: C_ORANGE },

  { id: 'item-713', name: 'باشون مانجو صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-714', name: 'باشون مانجو وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-715', name: 'باشون مانجو كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-716', name: 'باشون أناناس صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-717', name: 'باشون أناناس وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-718', name: 'باشون أناناس كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-719', name: 'مانجو فراولة صغير', price: 0.8, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-720', name: 'مانجو فراولة وسط', price: 1.1, category: 'كوكتيل', color: C_MANGO },
  { id: 'item-721', name: 'مانجو فراولة كبير', price: 1.5, category: 'كوكتيل', color: C_MANGO },

  { id: 'item-722', name: 'كوكتيل طبقات صغير', price: 0.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-723', name: 'كوكتيل طبقات وسط', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-724', name: 'كوكتيل طبقات كبير', price: 1.5, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-725', name: 'أفوكادو طبقات صغير', price: 0.8, category: 'كوكتيل', color: C_AVO },
  { id: 'item-726', name: 'أفوكادو طبقات وسط', price: 1.1, category: 'كوكتيل', color: C_AVO },
  { id: 'item-727', name: 'أفوكادو طبقات كبير', price: 1.5, category: 'كوكتيل', color: C_AVO },

  { id: 'item-728', name: 'شمندر برتقال صغير', price: 0.8, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-729', name: 'شمندر برتقال وسط', price: 1.1, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-730', name: 'شمندر برتقال كبير', price: 1.5, category: 'كوكتيل', color: C_PURPLE },

  { id: 'item-731', name: 'شمندر جزر صغير', price: 0.8, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-732', name: 'شمندر جزر وسط', price: 1.1, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-733', name: 'شمندر جزر كبير', price: 1.5, category: 'كوكتيل', color: C_PURPLE },

  { id: 'item-734', name: 'شمندر رمان صغير', price: 0.8, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-735', name: 'شمندر رمان وسط', price: 1.1, category: 'كوكتيل', color: C_PURPLE },
  { id: 'item-736', name: 'شمندر رمان كبير', price: 1.5, category: 'كوكتيل', color: C_PURPLE },

  // Special Items
  { id: 'item-737', name: 'Fakfakena صغير', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-738', name: 'Fakfakena وسط', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-739', name: 'Fakfakena كبير', price: 1.6, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-740', name: 'Samdy صغير', price: 1.1, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-741', name: 'Samdy وسط', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-742', name: 'Samdy كبير', price: 1.6, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-743', name: 'Maloka صغير', price: 1.9, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-744', name: 'Maloka وسط', price: 2.4, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-745', name: 'Hamode صغير', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-746', name: 'Hamode وسط', price: 1.9, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-747', name: 'Hamode كبير', price: 2.4, category: 'كوكتيل', color: C_COCKTAIL },

  { id: 'item-748', name: 'Crestaal صغير', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-749', name: 'Crestaal وسط', price: 1.9, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-750', name: 'Crestaal كبير', price: 2.4, category: 'كوكتيل', color: C_COCKTAIL },

  // Waffles & Crepes
  { id: 'item-751', name: 'وافل', price: 2.3, category: 'وافل وكريب', color: C_DESSERT },
  { id: 'item-752', name: 'كريب', price: 1.9, category: 'وافل وكريب', color: C_DESSERT },
  { id: 'item-753', name: 'كريب فوتشيني', price: 1.9, category: 'وافل وكريب', color: C_DESSERT },
  { id: 'item-754', name: 'كريب رول', price: 2.2, category: 'وافل وكريب', color: C_DESSERT },
  { id: 'item-755', name: 'ميني بان كيك 8', price: 1.05, category: 'وافل وكريب', color: C_DESSERT },
  { id: 'item-756', name: 'ميني بان كيك 18', price: 1.9, category: 'وافل وكريب', color: C_DESSERT },

  // Greek Yogurt
  { id: 'item-757', name: 'Banana Greek', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-758', name: 'Pomegranate Greek', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-759', name: 'Mango Greek', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-760', name: 'Greek Granola', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-761', name: 'Strawberry Greek', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-762', name: 'Avocado Honey Greek', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },

  // Super Items
  { id: 'item-763', name: 'سوبر امبراطور صغير', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-764', name: 'سوبر امبراطور كبير', price: 1.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-765', name: 'سوبر عوار قلب صغير', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-766', name: 'سوبر عوار قلب كبير', price: 1.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-767', name: 'الكينج صغير', price: 1.4, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-768', name: 'الكينج كبير', price: 1.8, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-769', name: 'برج السعادة صغير', price: 1.6, category: 'كوكتيل', color: C_COCKTAIL },
  { id: 'item-770', name: 'برج السعادة كبير', price: 2.2, category: 'كوكتيل', color: C_COCKTAIL },

  // Ice Cream
  { id: 'item-771', name: 'Nutella Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },
  { id: 'item-772', name: 'Lotus Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },
  { id: 'item-773', name: 'Kinder Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },
  { id: 'item-774', name: 'Pistachio Ice Cream', price: 1.6, category: 'ايس كريم', color: C_ICE },
  { id: 'item-775', name: 'Marble Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },
  { id: 'item-776', name: 'Maltesers Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },
  { id: 'item-777', name: 'Mango Ice Cream', price: 1.4, category: 'ايس كريم', color: C_ICE },

  // Energy Drinks
  { id: 'item-778', name: 'ريد بول نكهات صغير', price: 1.8, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-779', name: 'ريد بول نكهات كبير', price: 2.2, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-780', name: 'ريد بول سلاش صغير', price: 1.8, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-781', name: 'ريد بول سلاش كبير', price: 2.2, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-782', name: 'نكهات 7UP صغير', price: 1.0, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-783', name: 'نكهات 7UP كبير', price: 1.2, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-784', name: '7UP سلاش صغير', price: 1.0, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-785', name: '7UP سلاش كبير', price: 1.2, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-786', name: 'نكهات V.C صغير', price: 1.8, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-787', name: 'نكهات V.C كبير', price: 2.2, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-788', name: 'سلاش V.C صغير', price: 2.0, category: 'مشروبات طاقة', color: C_ENERGY },
  { id: 'item-789', name: 'سلاش V.C كبير', price: 2.4, category: 'مشروبات طاقة', color: C_ENERGY },

  // Milkshakes
  { id: 'item-790', name: 'Shake Vanilla S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-791', name: 'Shake Vanilla M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-792', name: 'Shake Vanilla L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-793', name: 'Shake Maltesers S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-794', name: 'Shake Maltesers M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-795', name: 'Shake Maltesers L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-796', name: 'KitKat S', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-797', name: 'KitKat M', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-798', name: 'KitKat L', price: 1.6, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-799', name: 'Shake Kinder S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-800', name: 'Shake Kinder M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-801', name: 'Shake Kinder L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-802', name: 'Flake S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-803', name: 'Flake M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-804', name: 'Flake L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-805', name: 'Galaxy S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-806', name: 'Galaxy M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-807', name: 'Galaxy L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-808', name: 'Shake Lotus S', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-809', name: 'Shake Lotus M', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-810', name: 'Shake Lotus L', price: 1.6, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-811', name: 'Shake Nutella S', price: 0.9, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-812', name: 'Shake Nutella M', price: 1.2, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-813', name: 'Shake Nutella L', price: 1.5, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-814', name: 'Oreo S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-815', name: 'Oreo M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-816', name: 'Oreo L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-817', name: 'Shake Pistachio S', price: 1.2, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-818', name: 'Shake Pistachio M', price: 1.6, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-819', name: 'Shake Pistachio L', price: 1.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-820', name: 'Shake Mix S', price: 1.0, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-821', name: 'Shake Mix M', price: 1.2, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-822', name: 'Shake Mix L', price: 1.5, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-823', name: 'Cerelac S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-824', name: 'Cerelac M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-825', name: 'Cerelac L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-826', name: 'Shake Mango S', price: 0.9, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-827', name: 'Shake Mango M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-828', name: 'Shake Mango L', price: 1.5, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-829', name: 'Shake Banana S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-830', name: 'Shake Banana M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-831', name: 'Shake Banana L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-832', name: 'Shake Mars S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-833', name: 'Shake Mars M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-834', name: 'Shake Mars L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-835', name: 'Shake Strawberry S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-836', name: 'Shake Strawberry M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-837', name: 'Shake Strawberry L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-838', name: 'Shake Blueberry S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-839', name: 'Shake Blueberry M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-840', name: 'Shake Blueberry L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-841', name: 'Shake Redberry S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-842', name: 'Shake Redberry M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-843', name: 'Shake Redberry L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-844', name: 'Slush Shake S', price: 0.8, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-845', name: 'Slush Shake M', price: 1.1, category: 'ميلك شيك', color: C_SHAKE },
  { id: 'item-846', name: 'Slush Shake L', price: 1.4, category: 'ميلك شيك', color: C_SHAKE },

  // Fruit Salads & Dishes
  { id: 'item-847', name: 'Amazon', price: 2.0, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-848', name: 'Hampa Dish', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-849', name: 'Mango Dish', price: 1.4, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-850', name: 'Slalah Dish', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-851', name: 'Flamingo', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-852', name: 'Super Hampa', price: 3.4, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-853', name: 'Omani Dish', price: 2.0, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-854', name: 'Platinum Dish', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-855', name: 'Kiwi Dish', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-856', name: 'Strawberry Dish', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-857', name: 'Pomegranate Dish', price: 1.5, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-858', name: 'Pineapple Dish', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-859', name: 'Watermelon Dish', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-860', name: 'Mix Salad Dish', price: 1.2, category: 'سلطة فواكه', color: C_SALAD },
  
  { id: 'item-861', name: 'Kiwi Dish L', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-862', name: 'Strawberry Dish L', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-863', name: 'Pomegranate Dish L', price: 2.1, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-864', name: 'Pineapple Dish L', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-865', name: 'Watermelon Dish L', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
  { id: 'item-866', name: 'Mix Salad Dish L', price: 1.8, category: 'سلطة فواكه', color: C_SALAD },
];