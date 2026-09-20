import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerPage } from '../../types';
import { ItechLogo } from '../common/ItechLogo';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Bell,
  Scale,
  LogOut,
  Package,
  ChevronDown,
  Layers,
  Sparkles,
  Ticket,
  Wallet,
  ShieldCheck,
  FileText,
  HelpCircle,
  Settings,
  CreditCard,
  Share2,
  Menu,
  X,
  Flame,
} from 'lucide-react';

export const CustomerNavbar: React.FC = () => {
  const {
    products,
    setSelectedProductId,
    customerPage,
    setCustomerPage,
    currentUser,
    logout,
    cart,
    wishlist,
    compareList,
    notifications,
    searchQuery,
    setSearchQuery,
    setPortalMode,
    setAdminPage,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLandingSectionsOpen, setIsLandingSectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const matchingProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const cartTotalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const landingSections: { id: CustomerPage; label: string; icon: string }[] = [
    { id: 'landing-full', label: 'All-In-One Landing', icon: '✨' },
    { id: 'landing-hero', label: 'Hero Showcase', icon: '🚀' },
    { id: 'landing-categories', label: 'Categories', icon: '🗂️' },
    { id: 'landing-featured', label: 'Featured Tech', icon: '⭐' },
    { id: 'landing-flash-sales', label: 'Flash Deals', icon: '⚡' },
    { id: 'landing-recommended', label: 'Recommended', icon: '🎯' },
    { id: 'landing-testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'landing-partners', label: 'Partners', icon: '🤝' },
    { id: 'landing-faqs', label: 'FAQs', icon: '❓' },
    { id: 'landing-contact', label: 'Contact', icon: '📬' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCustomerPage('landing-full')}
              className="flex items-center text-left group"
            >
              <ItechLogo variant="light" size="md" />
            </button>

            {/* Landing Sections Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLandingSectionsOpen(!isLandingSectionsOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  customerPage.startsWith('landing-')
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Showcase</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLandingSectionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLandingSectionsOpen && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsLandingSectionsOpen(false)}
                >
                  {landingSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setCustomerPage(sec.id);
                        setIsLandingSectionsOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition ${
                        customerPage === sec.id
                          ? 'bg-indigo-50 font-bold text-indigo-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{sec.icon}</span>
                        <span>{sec.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
              <button
                onClick={() => setCustomerPage('cust-products')}
                className={`px-3 py-1.5 rounded-md transition ${customerPage === 'cust-products' ? 'text-indigo-600 font-bold bg-indigo-50' : 'hover:text-indigo-600'}`}
              >
                Catalog
              </button>
              <button
                onClick={() => setCustomerPage('cust-categories')}
                className={`px-3 py-1.5 rounded-md transition ${customerPage === 'cust-categories' ? 'text-indigo-600 font-bold bg-indigo-50' : 'hover:text-indigo-600'}`}
              >
                Categories
              </button>
              <button
                onClick={() => setCustomerPage('cust-orders')}
                className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${customerPage === 'cust-orders' ? 'text-indigo-600 font-bold bg-indigo-50' : 'hover:text-indigo-600'}`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>My Orders</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search phones, laptops, audio..."
                value={searchQuery}
                onFocus={() => setIsSearchDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchDropdownOpen(false);
                    setCustomerPage('cust-products');
                  }
                }}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchDropdownOpen && matchingProducts.length > 0 && (
              <div
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1"
                onMouseLeave={() => setIsSearchDropdownOpen(false)}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1 flex items-center justify-between">
                  <span>Matching Hardware</span>
                  <span>{matchingProducts.length} items</span>
                </div>
                {matchingProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setCustomerPage('cust-product-details');
                      setIsSearchDropdownOpen(false);
                      setSearchQuery('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-indigo-50/60 rounded-xl cursor-pointer transition group"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate">
                        {prod.name}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>{prod.brand}</span>
                        <span>•</span>
                        <span className="font-mono font-bold text-indigo-600">${prod.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setIsSearchDropdownOpen(false);
                    setCustomerPage('cust-products');
                  }}
                  className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-700 py-1.5 border-t border-slate-100 mt-1 block"
                >
                  View all results for "{searchQuery}"
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Badge */}
            {compareList.length > 0 && (
              <button
                onClick={() => setCustomerPage('cust-compare')}
                className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition"
                title="Product Comparison"
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setCustomerPage('cust-wishlist')}
              className={`relative p-2 rounded-full transition ${
                customerPage === 'cust-wishlist' ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:text-rose-600 hover:bg-slate-100'
              }`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCustomerPage('cust-cart')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition text-xs font-semibold ${
                customerPage === 'cust-cart'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-indigo-500 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {cartTotalCount}
              </span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
                )}
              </button>

              {isNotifOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50"
                  onMouseLeave={() => setIsNotifOpen(false)}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Notifications</span>
                    <button
                      onClick={() => setCustomerPage('cust-notifications')}
                      className="text-[11px] text-indigo-600 hover:underline font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.actionUrl) setCustomerPage(n.actionUrl as CustomerPage);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition ${!n.isRead ? 'bg-indigo-50/50' : ''}`}
                      >
                        <div className="font-semibold text-slate-900">{n.title}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{n.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-indigo-300 transition bg-slate-50"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden xl:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={() => setCustomerPage('auth-login')}
                  className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-700 transition shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Customer Mega Menu */}
              {isUserMenuOpen && currentUser && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
                    <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                    <div className="mt-2 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" /> Wallet:
                      </span>
                      <span className="font-bold text-emerald-700">${(currentUser.walletBalance ?? 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="py-1 text-xs text-slate-700 max-h-72 overflow-y-auto">
                    <button
                      onClick={() => {
                        setCustomerPage('cust-home');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2.5 transition"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Account Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setCustomerPage('cust-orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2.5 transition font-semibold"
                    >
                      <Package className="w-3.5 h-3.5 text-blue-500" />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={() => {
                        setCustomerPage('cust-wallet');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2.5 transition"
                    >
                      <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                      <span>I-Tech Wallet</span>
                    </button>
                    <button
                      onClick={() => {
                        setCustomerPage('cust-coupons');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2.5 transition"
                    >
                      <Ticket className="w-3.5 h-3.5 text-amber-500" />
                      <span>Promo Coupons</span>
                    </button>
                    <button
                      onClick={() => {
                        setCustomerPage('cust-support');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2.5 transition"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
                      <span>Support Help</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-3 flex flex-col gap-1">
                    {currentUser.role === 'ADMIN' && (
                      <button
                        onClick={() => {
                          setPortalMode('admin');
                          setAdminPage('admin-overview');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold text-xs flex items-center justify-between transition"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Admin Console
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold text-xs flex items-center gap-1.5 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCustomerPage('cust-products');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 rounded-xl font-bold text-slate-800 text-left"
              >
                Store Products
              </button>
              <button
                onClick={() => {
                  setCustomerPage('cust-orders');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 rounded-xl font-bold text-slate-800 text-left"
              >
                My Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
