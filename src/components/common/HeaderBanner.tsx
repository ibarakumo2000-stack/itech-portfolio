import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ShoppingBag, Lock, UserCheck } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  const {
    portalMode,
    setPortalMode,
    currentUser,
    loginAsCustomer,
    setCustomerPage,
    setAdminPage,
  } = useApp();

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 text-xs px-3 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Brand Identity & Session State */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider text-slate-200 uppercase text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              I-TECH Enterprise Platform
            </span>
          </div>
          <span className="hidden sm:inline text-slate-500">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Current Session:</span>
            <span className="font-semibold text-indigo-300">
              {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Guest Visitor'}
            </span>
          </div>
        </div>

        {/* Center/Right: Portal Switchers */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setPortalMode('customer');
                setCustomerPage('landing-full');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                portalMode === 'customer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </button>

            <button
              onClick={() => {
                setPortalMode('admin');
                setAdminPage('admin-overview');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                portalMode === 'admin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isAdmin ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isAdmin ? 'Admin Console' : 'Admin Portal (Auth Required)'}</span>
            </button>
          </div>

          {/* Quick Customer Switcher */}
          <div className="flex items-center gap-1.5 pl-1">
            <button
              onClick={loginAsCustomer}
              title="Switch to customer session"
              className="flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded text-[11px] font-medium transition"
            >
              <UserCheck className="w-3 h-3 text-indigo-400" />
              <span>Customer Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
