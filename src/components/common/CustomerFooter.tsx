import React from 'react';
import { useApp } from '../../context/AppContext';
import { ItechLogo } from './ItechLogo';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';

export const CustomerFooter: React.FC = () => {
  const { setCustomerPage, setPortalMode, setAdminPage } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => {
                setCustomerPage('landing-full');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left"
            >
              <ItechLogo variant="dark" size="md" />
            </button>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Enterprise electronics logistics and flagship hardware delivery architecture. Certified factory direct devices with real-time 30-minute courier dispatch and OTP secured doorstep handovers.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>+1 (800) 555-ITECH</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>orders@itech.com</span>
              </div>
            </div>
          </div>

          {/* Quick Individual Landing Pages */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Landing Sections</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCustomerPage('landing-hero')} className="hover:text-white transition">
                  Hero Showcase
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('landing-categories')} className="hover:text-white transition">
                  Categories Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('landing-featured')} className="hover:text-white transition">
                  Featured Hardware
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('landing-flash-deals')} className="hover:text-white transition">
                  Flash Deals (Live Timer)
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('landing-why-us')} className="hover:text-white transition">
                  Enterprise Guarantees
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('landing-testimonials')} className="hover:text-white transition">
                  Client Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Solutions */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Customer Portal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCustomerPage('cust-products')} className="hover:text-white transition">
                  Product Store Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('cust-orders')} className="hover:text-white transition">
                  Order History & Invoices
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('cust-live-tracking')} className="hover:text-white transition">
                  Live Courier Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('cust-wallet')} className="hover:text-white transition">
                  Digital Wallet
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('cust-support')} className="hover:text-white transition">
                  24/7 Support Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Delivery Hub Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Admin Console</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setPortalMode('admin');
                    setAdminPage('admin-overview');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1"
                >
                  <span>Admin Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPortalMode('admin');
                    setAdminPage('admin-delivery-hub');
                  }}
                  className="hover:text-white transition"
                >
                  Delivery Hub & Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPortalMode('admin');
                    setAdminPage('admin-prisma-arch');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition"
                >
                  Prisma DB & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setCustomerPage('auth-login')} className="hover:text-white transition">
                  Customer Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© 2026 I-TECH Platform. Enterprise Multi-Portal Architecture.</div>
          <div className="flex gap-6">
            <span>SOC2 Type II Certified</span>
            <span>256-bit SSL</span>
            <span>REST API + Socket.IO Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
