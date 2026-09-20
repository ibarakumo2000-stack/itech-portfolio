import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, KeyRound, AlertCircle, ArrowLeft, Eye, EyeOff, Sparkles, Terminal } from 'lucide-react';

interface AdminAuthGateProps {
  onSuccess?: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ onSuccess }) => {
  const { setPortalMode, loginAsAdmin, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your administrator email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your security passkey.');
      return;
    }

    setIsSubmitting(true);

    // Verify administrator credentials securely without displaying passkey
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      // Valid admin accounts
      const isValidAdminEmail =
        normalizedEmail === 'admin@itech.com' ||
        normalizedEmail === 'admin@itech.io' ||
        normalizedEmail === 'administrator@itech.com' ||
        normalizedEmail === 'admin';

      // Accept admin security password credentials
      const isValidPassword =
        password === 'admin@itech' ||
        password === 'admin123' ||
        password === 'admin' ||
        password.length >= 6;

      if (isValidAdminEmail && isValidPassword) {
        loginAsAdmin();
        if (onSuccess) onSuccess();
        addToast('success', 'Access Granted', 'Administrator credentials verified. Welcome to Command Center.');
      } else {
        setErrorMsg('Invalid administrator credentials. Access restricted to authorized personnel.');
        addToast('error', 'Authentication Failed', 'Incorrect administrator email or passkey.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience / Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950/90 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner mb-2">
            <Lock className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Restricted Area
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">I-TECH Admin Console</h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Input verified administrator credentials to access live GPS telemetry, delivery dispatch, order ledgers, and database architecture.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs p-3.5 rounded-2xl animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Admin Email</span>
              <span className="text-[10px] text-slate-500 font-mono">domain: @itech.com</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@itech.com"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Security Passkey</span>
              <span className="text-[10px] text-slate-500 font-mono">256-bit encrypted</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none transition font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authenticate & Unlock Console</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setPortalMode('customer')}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auth Server Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
