
import React, { useState } from 'react';
import { Citrus, Lock, User, ArrowRight, AlertCircle, Smartphone } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  logoUrl?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, logoUrl }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      if (username === 'root' && password === '22') {
        onLogin('admin');
      } else if (username === 'waiter' && password === 'waiter') {
        onLogin('waiter');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-700 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Header / Logo Area */}
        <div className="bg-orange-50 p-8 text-center border-b border-orange-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20 overflow-hidden border-4 border-white">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Citrus size={40} className="text-orange-500" />
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800">همبا جوس صلالة</h1>
          <p className="text-orange-600 font-medium text-sm mt-1">نظام إدارة المبيعات</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100 animate-pulse">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-1 block">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-left"
                  placeholder="Username"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-1 block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-left"
                  placeholder="••••"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                'جاري الدخول...'
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <div className="flex flex-col items-center gap-2 opacity-60">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Smartphone size={16} />
                    <span>للدخول كـ نادل (Waiter):</span>
                </div>
                <code className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-mono text-gray-600">user: waiter / pass: waiter</code>
            </div>
            <p className="text-xs text-gray-400 mt-4">© 2024 Hamba Juice POS System</p>
          </div>
        </div>
      </div>
    </div>
  );
};
