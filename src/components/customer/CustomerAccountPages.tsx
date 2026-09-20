import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerPage } from '../../types';
import {
  Heart,
  Scale,
  User,
  Wallet,
  MapPin,
  Bell,
  HelpCircle,
  ShoppingBag,
  Trash2,
  Plus,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Mail,
  ChevronRight,
  MessageCircle,
  FileQuestion,
  ExternalLink,
  Lock,
} from 'lucide-react';

export const CustomerAccountPages: React.FC<{ activeAccountPage: CustomerPage }> = ({
  activeAccountPage,
}) => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    addToCart,
    currentUser,
    setCurrentUser,
    walletTransactions,
    topUpWallet,
    addresses,
    addAddress,
    deleteAddress,
    notifications,
    markNotificationAsRead,
    setCustomerPage,
    addToast,
  } = useApp();

  // Wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Wallet top up state
  const [topUpAmount, setTopUpAmount] = useState('100');

  // Address modal/state
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrTitle, setNewAddrTitle] = useState('Home');
  const [newAddrCity, setNewAddrCity] = useState('San Francisco');
  const [isAddAddrOpen, setIsAddAddrOpen] = useState(false);

  // Support ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const accountNavigationTabs: { id: CustomerPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'cust-profile', label: 'Profile & Security', icon: User },
    { id: 'cust-wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
    { id: 'cust-compare', label: `Compare Specs (${compareList.length})`, icon: Scale },
    { id: 'cust-wallet', label: `I-Tech Wallet ($${(currentUser?.walletBalance ?? 0).toFixed(2)})`, icon: Wallet },
    { id: 'cust-addresses', label: `Addresses (${addresses.length})`, icon: MapPin },
    { id: 'cust-notifications', label: `Alerts (${notifications.filter((n) => !n.isRead).length})`, icon: Bell },
    { id: 'cust-support', label: '24/7 Support Desk', icon: HelpCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Account Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl shadow-xs border border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {accountNavigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAccountPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCustomerPage(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. WISHLIST VIEW */}
      {activeAccountPage === 'cust-wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Saved Wishlist Devices</h2>
            <span className="text-xs text-slate-500">{wishlistProducts.length} items saved</span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500">Tap the heart icon on any device to save it for later procurement.</p>
              <button
                onClick={() => setCustomerPage('cust-products')}
                className="mt-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Explore Hardware Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setCustomerPage('cust-product-details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-lg transition space-y-3 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.brand}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{prod.name}</h4>
                    <div className="text-sm font-black text-slate-900 mt-1 font-mono">${(prod.price ?? 0).toFixed(2)}</div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => addToCart(prod)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 border border-slate-200 text-rose-600 rounded-xl hover:bg-rose-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. COMPARE HARDWARE SPECS VIEW */}
      {activeAccountPage === 'cust-compare' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Side-by-Side Hardware Comparison Matrix</h2>
              <p className="text-xs text-slate-500">Compare chipsets, battery life, memory, and courier availability.</p>
            </div>
            {compareList.length > 0 && (
              <button
                onClick={() => compareList.forEach((p) => toggleCompare(p))}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Clear Matrix
              </button>
            )}
          </div>

          {compareList.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
              <Scale className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Devices Selected for Comparison</h3>
              <p className="text-xs text-slate-500">Click the compare icon on product cards to view technical differences side-by-side.</p>
              <button
                onClick={() => setCustomerPage('cust-products')}
                className="mt-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto p-6 shadow-sm">
              <div className="grid grid-cols-4 gap-6 min-w-[700px]">
                <div className="space-y-6 pt-36">
                  <div className="text-xs font-bold text-slate-400 uppercase">Manufacturer</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Price (MSRP)</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Processor</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">RAM & Storage</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Stock Status</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Procurement Action</div>
                </div>

                {compareList.map((prod) => (
                  <div key={prod.id} className="space-y-6 text-center border-l border-slate-100 pl-6">
                    <div
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setCustomerPage('cust-product-details');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer group"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-28 h-28 mx-auto object-cover rounded-xl mb-2 group-hover:scale-105 transition" />
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{prod.name}</h4>
                    </div>

                    <div className="text-xs font-bold text-slate-800">{prod.brand}</div>
                    <div className="text-sm font-black text-indigo-600 font-mono">${(prod.price ?? 0).toFixed(2)}</div>
                    <div className="text-xs text-slate-600">{prod.specifications['Processor'] || 'M3 Ultra / Snapdragon 8 Gen 3'}</div>
                    <div className="text-xs text-slate-600">{prod.specifications['RAM'] || '16GB Unified'}</div>
                    <div className="text-xs font-bold text-emerald-600">✓ In Stock ({prod.stock})</div>

                    <div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl transition"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. PROFILE & SECURITY VIEW */}
      {activeAccountPage === 'cust-profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-sm space-y-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-100 shadow"
              />
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{currentUser?.name}</h3>
                <div className="text-xs text-slate-500">{currentUser?.email}</div>
                <span className="mt-2 inline-block bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase">
                  {currentUser?.role || 'CUSTOMER'}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 text-left text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Referral Code:</span>
                  <span className="font-mono font-bold text-indigo-600">{currentUser?.referralCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Two-Factor (2FA):</span>
                  <span className="text-emerald-600 font-bold">Enabled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Personal Information & Security</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  defaultValue={currentUser?.name}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={currentUser?.email}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone (SMS OTP)</label>
                <input
                  type="tel"
                  defaultValue={currentUser?.phone}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                <input
                  type="text"
                  disabled
                  defaultValue={currentUser?.role}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => addToast('success', 'Profile Updated', 'Your profile details have been saved.')}
                className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. WALLET & TRANSACTIONS */}
      {activeAccountPage === 'cust-wallet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex justify-between items-center text-xs text-indigo-300">
                <span>I-Tech Stored Value</span>
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase">Available Digital Balance</div>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  ${(currentUser?.walletBalance ?? 0).toFixed(2)}
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant 1-click checkout enabled
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Up Balance</h3>
              <div className="flex flex-wrap gap-2">
                {['50', '100', '250', '500', '1000'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                      topUpAmount === amt
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    +${amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  placeholder="Custom $"
                />
                <button
                  onClick={() => {
                    topUpWallet(+topUpAmount || 50);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2 rounded-xl shadow transition"
                >
                  Load Funds Instantly
                </button>
              </div>
            </div>
          </div>

          {/* Ledger History */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Wallet Transaction History</h3>
            <div className="divide-y divide-slate-100">
              {walletTransactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{tx.description}</div>
                    <div className="text-[10px] text-slate-400">{tx.date}</div>
                  </div>
                  <div className={`font-mono font-bold ${tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'CREDIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ADDRESSES MANAGEMENT */}
      {activeAccountPage === 'cust-addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Saved Delivery Locations</h2>
            <button
              onClick={() => setIsAddAddrOpen(!isAddAddrOpen)}
              className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
            >
              + Add New Location
            </button>
          </div>

          {isAddAddrOpen && (
            <div className="bg-white p-6 rounded-3xl border border-indigo-200 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Create New Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Headquarters)"
                  value={newAddrTitle}
                  onChange={(e) => setNewAddrTitle(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <button
                onClick={() => {
                  if (!newAddrStreet) return;
                  addAddress({
                    userId: currentUser?.id || 'usr-1',
                    title: newAddrTitle,
                    street: newAddrStreet,
                    city: 'San Francisco',
                    state: 'CA',
                    zipCode: '94105',
                    country: 'United States',
                    isDefault: false,
                    lat: 37.78,
                    lng: -122.41,
                  });
                  setNewAddrStreet('');
                  setIsAddAddrOpen(false);
                }}
                className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
              >
                Save Destination
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>{addr.title}</span>
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600">{addr.street}</div>
                <div className="text-xs text-slate-400">{addr.city}, {addr.state} {addr.zipCode}</div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-xs text-rose-600 hover:underline font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. NOTIFICATIONS ALERT CENTER */}
      {activeAccountPage === 'cust-notifications' && (
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-extrabold text-slate-900">Notifications & Dispatch Alerts</h2>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  notif.isRead ? 'bg-white border-slate-200' : 'bg-indigo-50/50 border-indigo-200 shadow-2xs'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUPPORT DESK */}
      {activeAccountPage === 'cust-support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900">24/7 Priority Support Desk</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions regarding 30-minute delivery routing, enterprise billing, or device diagnostics?
            </p>

            <div className="p-4 bg-slate-900 text-white rounded-3xl space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <MessageCircle className="w-4 h-4" />
                <span>Enterprise Concierge Hotline</span>
              </div>
              <div className="text-xl font-black font-mono">+1 (800) 555-ITECH</div>
              <div className="text-[11px] text-slate-400">Average response time: &lt; 45 seconds</div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Submit Priority Support Ticket</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Courier routing clarification for Order #ORD-9821"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
              <textarea
                rows={4}
                placeholder="Explain the inquiry or logistics issue..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <button
              onClick={() => {
                if (!ticketSubject) return;
                addToast('success', 'Ticket Dispatched', 'Support ticket #TKT-8291 created. An agent will respond shortly.');
                setTicketSubject('');
                setTicketMessage('');
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl shadow"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
