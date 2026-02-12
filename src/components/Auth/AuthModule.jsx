import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AuthModule = () => {
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      if (!login(formData.email, formData.password)) {
        setError('Invalid credentials');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields required');
        return;
      }
      register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center p-6">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/10 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
            <Layout size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">ConfManager</h1>
          <p className="text-slate-400 mt-3 text-lg">Event management, reimagined.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="group">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:bg-black/40 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:bg-black/40 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-500"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:bg-black/40 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-500"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          
          {error && (
            <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transform transition active:scale-[0.98]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {isLogin ? "New here? Create an account" : "Have an account? Sign in"}
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex justify-center gap-4 text-xs text-slate-500 font-mono">
            <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
              alice@test.com
            </span>
            <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
              bob@test.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
