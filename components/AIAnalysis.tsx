import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';
import { SaleRecord, ExpenseRecord, InventoryItem } from '../types';

interface AIAnalysisProps {
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  inventory: InventoryItem[];
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ sales, expenses, inventory }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare data summary to send to AI
      const salesTotal = sales.reduce((sum, s) => sum + s.total, 0);
      const expensesTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
      const lowStockItems = inventory.filter(i => i.quantity <= i.minThreshold).map(i => i.name).join(', ');
      
      const prompt = `
        بصفتك مستشار أعمال خبير لمحلات العصائر، قم بتحليل البيانات التالية باللغة العربية:
        - إجمالي المبيعات: ${salesTotal} جنيه
        - إجمالي المصروفات: ${expensesTotal} جنيه
        - صافي الربح: ${salesTotal - expensesTotal} جنيه
        - نواقص المخزون الحالية: ${lowStockItems || 'لا يوجد'}
        
        أعطني 3 نصائح عملية ومباشرة لزيادة الأرباح وتقليل الهدر، واقتراح واحد لتسويق المنتجات بناءً على هذه الأرقام.
        استخدم تنسيق Markdown للنقاط. اجعل النبرة احترافية ومشجعة.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text);
    } catch (err) {
      console.error(err);
      setError("عذراً، حدث خطأ أثناء الاتصال بالمحلل الذكي. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl shadow-xl">
      <div className="bg-white rounded-xl p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">المحلل الذكي (Gemini AI)</h3>
              <p className="text-sm text-gray-500">احصل على رؤى فورية لتحسين أداء محلك</p>
            </div>
          </div>
          <button
            onClick={generateInsight}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'جاري التحليل...' : 'تحليل البيانات الآن'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-4">
            {error}
          </div>
        )}

        {analysis ? (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 prose prose-indigo max-w-none text-right" dir="rtl">
             <div className="flex items-start gap-3 mb-4">
                <MessageSquareQuote className="text-indigo-400 mt-1 flex-shrink-0" />
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700 font-medium">
                  {analysis}
                </div>
             </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Sparkles className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500 font-medium">اضغط على زر التحليل لطلب استشارة الذكاء الاصطناعي حول وضع محلك الحالي</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};