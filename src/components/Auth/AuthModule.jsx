import React, { useState } from "react";
import { Layout, Mail, Lock, User, Loader2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

const AuthModule = () => {
  const { login, register } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Email and password are required";
    }
    if (!isLogin && !formData.name) {
      return "Full name is required";
    }
    if (formData.password.length < 3) {
      return "Password must be at least 3 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const success = login(formData.email, formData.password);
        if (!success) setError("Invalid credentials");
      } else {
        register(formData.name, formData.email, formData.password);
      }
      setLoading(false);
    }, 600); // smooth UX delay
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center p-6">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="bg-slate-900/40 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/10 relative z-10 transition-all">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 shadow-lg shadow-indigo-500/30">
            <Layout size={28} />
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight">
            ConfManager
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Conference Management Platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          {!isLogin && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-4 text-slate-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder-slate-500"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-4 text-slate-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder-slate-500"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-4 text-slate-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder-slate-500"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm text-center py-3 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-slate-400 hover:text-white text-sm transition"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          <p className="mb-3 uppercase tracking-wide text-slate-400">
            Demo Accounts
          </p>
          <div className="flex flex-col gap-2">
            <span>Organizer → alice@test.com / 123</span>
            <span>Reviewer → bob@test.com / 123</span>
            <span>Presenter → charlie@test.com / 123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
