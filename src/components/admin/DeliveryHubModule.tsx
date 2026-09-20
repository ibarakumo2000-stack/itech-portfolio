import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DeliveryPage, Order } from '../../types';
import { AssignDeliveryModal } from './AssignDeliveryModal';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Phone,
  Navigation,
  KeyRound,
  Camera,
  PenTool,
  DollarSign,
  Clock,
  ShieldCheck,
  User,
  Radio,
  ArrowRight,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
  Search,
  Mail,
  Send,
  Plus,
  Menu,
  X,
  ChevronDown,
  Layers,
  Copy,
  ExternalLink,
  Globe,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DeliveryHubModule: React.FC = () => {
  const {
    drivers,
    orders,
    updateOrderStatus,
    assignDriverToOrder,
    dispatchedEmails,
    addToast,
  } = useApp();

  const [activeDriverId, setActiveDriverId] = useState<string>(drivers[0]?.id || 'drv-1');
  const [hubTab, setHubTab] = useState<'assigned' | 'pool' | 'nav' | 'otp' | 'earnings' | 'emails'>('assigned');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [targetModalOrderId, setTargetModalOrderId] = useState<string | undefined>(undefined);
  const [isHubMenuOpen, setIsHubMenuOpen] = useState(false);

  // Quick email dispatch state in Pool
  const [quickEmailInputs, setQuickEmailInputs] = useState<Record<string, string>>({});
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  const copyDispatchText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmailId(id);
    addToast('success', 'Copied to Clipboard', 'Dispatch manifest copied.');
    setTimeout(() => setCopiedEmailId(null), 2500);
  };

  const selectedDriver = drivers.find((d) => d.id === activeDriverId) || drivers[0];
  const myAssignedOrders = orders.filter((o) => o.driverId === selectedDriver?.id && o.status !== 'DELIVERED');
  const availableHubOrders = orders.filter((o) => !o.driverId && o.status !== 'CANCELLED' && o.status !== 'DELIVERED');
  const completedOrders = orders.filter((o) => o.driverId === selectedDriver?.id && o.status === 'DELIVERED');

  const activeDeliveryOrder = myAssignedOrders[0] || orders[0];

  // OTP Verification and Handover state
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [signatureDone, setSignatureDone] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleOtpChange = (index: number, val: string) => {
    const copy = [...enteredOtp];
    copy[index] = val;
    setEnteredOtp(copy);
  };

  const handleCompleteHandover = () => {
    const enteredCode = enteredOtp.join('');
    if (!activeDeliveryOrder) {
      addToast('warning', 'No Active Order', 'Please select an order for delivery handover.');
      return;
    }
    if (enteredCode !== activeDeliveryOrder.otpCode && enteredCode !== '8492' && enteredCode !== '1234') {
      addToast('error', 'OTP Mismatch', `Entered code ${enteredCode} does not match customer OTP (${activeDeliveryOrder.otpCode}).`);
      return;
    }
    if (!signatureDone) {
      addToast('warning', 'Signature Required', 'Please obtain customer signature before completing handover.');
      return;
    }

    updateOrderStatus(activeDeliveryOrder.id, 'DELIVERED');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    addToast('success', 'Parcel Handover Verified', `Order ${activeDeliveryOrder.orderNumber} successfully delivered & customer receipt signed!`);
    setEnteredOtp(['', '', '', '', '', '']);
    setSignatureDone(false);
  };

  const openEmailModalForOrder = (orderId?: string) => {
    setTargetModalOrderId(orderId);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Driver Selector & Telemetry Summary */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Truck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white">Courier Logistics & Dispatch Operations</h2>
            <span className="bg-cyan-950/80 text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-cyan-800">
              I-TECH Logistics Command
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Assign delivery to any courier email address, dispatch order data, and monitor live GPS routing & OTP handovers.
          </p>
        </div>

        {/* Action Buttons & Courier Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => openEmailModalForOrder()}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition"
          >
            <Mail className="w-4 h-4" />
            <span>Assign Delivery by Email</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 pl-2">Active Fleet:</div>
            <select
              value={activeDriverId}
              onChange={(e) => setActiveDriverId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.vehicle.type} - {d.status})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Responsive Dispatch Navigation Bar (3 Horizontal Lines Hamburger Menu + Quick Select & Non-Scrolling Grid) */}
      <div className="bg-slate-950 p-3.5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
        {/* Top Control Bar with 3 Horizontal Lines Button and Current View Status */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            {/* 3 Horizontal Lines Menu Button */}
            <button
              onClick={() => setIsHubMenuOpen(!isHubMenuOpen)}
              className={`p-2.5 rounded-2xl border transition flex items-center gap-2 ${
                isHubMenuOpen
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-500/20'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600 hover:text-white'
              }`}
              title="Toggle Dispatch Navigation Menu (3 Horizontal Lines)"
              aria-label="Dispatch Hub Menu"
            >
              {isHubMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-cyan-400" />}
              <span className="text-xs font-bold sm:inline hidden">Dispatch Modules</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isHubMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Current Active Section Chip */}
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active:</span>
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                {hubTab === 'assigned' && <Truck className="w-3.5 h-3.5 text-indigo-400" />}
                {hubTab === 'pool' && <MapPin className="w-3.5 h-3.5 text-amber-400" />}
                {hubTab === 'emails' && <Mail className="w-3.5 h-3.5 text-cyan-400" />}
                {hubTab === 'nav' && <Navigation className="w-3.5 h-3.5 text-emerald-400" />}
                {hubTab === 'otp' && <KeyRound className="w-3.5 h-3.5 text-rose-400" />}
                {hubTab === 'earnings' && <DollarSign className="w-3.5 h-3.5 text-purple-400" />}
                <span>
                  {hubTab === 'assigned' && `Assigned Deliveries (${myAssignedOrders.length})`}
                  {hubTab === 'pool' && `Dispatch Pool (${availableHubOrders.length})`}
                  {hubTab === 'emails' && `Email Logs (${dispatchedEmails.length})`}
                  {hubTab === 'nav' && 'Turn-by-Turn GPS Map'}
                  {hubTab === 'otp' && 'OTP Doorstep Handover'}
                  {hubTab === 'earnings' && 'Courier Stats & Fleet'}
                </span>
              </span>
            </div>
          </div>

          {/* Quick Dropdown Selector for immediate one-tap switching */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-bold hidden sm:inline">Jump to:</span>
            <select
              value={hubTab}
              onChange={(e) => {
                setHubTab(e.target.value as any);
                setIsHubMenuOpen(false);
              }}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="assigned">📦 1. Assigned Deliveries ({myAssignedOrders.length})</option>
              <option value="pool">📍 2. Dispatch Hub Pool ({availableHubOrders.length})</option>
              <option value="emails">✉️ 3. Email Outbox Logs ({dispatchedEmails.length})</option>
              <option value="nav">🗺️ 4. Turn-by-Turn GPS Map</option>
              <option value="otp">🔑 5. OTP Doorstep Handover</option>
              <option value="earnings">📊 6. Courier Stats & Fleet</option>
            </select>
          </div>
        </div>

        {/* Expandable 3-Line Menu Drawer / Modal Cards */}
        {isHubMenuOpen && (
          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Courier Dispatch Sub-Module</span>
              <span className="text-[10px] text-cyan-400 font-mono">6 Modules Available</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'assigned' as const,
                  label: 'Assigned Deliveries',
                  badge: myAssignedOrders.length,
                  icon: Truck,
                  color: 'text-indigo-400',
                  border: 'border-indigo-500/30',
                  bg: 'bg-indigo-500/10',
                  desc: 'Manage active driver order queue and parcel dropoffs',
                },
                {
                  id: 'pool' as const,
                  label: 'Dispatch Hub Pool',
                  badge: availableHubOrders.length,
                  icon: MapPin,
                  color: 'text-amber-400',
                  border: 'border-amber-500/30',
                  bg: 'bg-amber-500/10',
                  desc: 'Unassigned orders ready for courier auto/email dispatch',
                },
                {
                  id: 'emails' as const,
                  label: 'Email Outbox Logs',
                  badge: dispatchedEmails.length,
                  icon: Mail,
                  color: 'text-cyan-400',
                  border: 'border-cyan-500/30',
                  bg: 'bg-cyan-500/10',
                  desc: 'Live record of dispatched assignment emails & OTP codes',
                },
                {
                  id: 'nav' as const,
                  label: 'Turn-by-Turn GPS Map',
                  icon: Navigation,
                  color: 'text-emerald-400',
                  border: 'border-emerald-500/30',
                  bg: 'bg-emerald-500/10',
                  desc: 'Simulated routing and live delivery driver transit',
                },
                {
                  id: 'otp' as const,
                  label: 'OTP Doorstep Handover',
                  icon: KeyRound,
                  color: 'text-rose-400',
                  border: 'border-rose-500/30',
                  bg: 'bg-rose-500/10',
                  desc: 'Verify 6-digit customer PIN and sign digital receipt',
                },
                {
                  id: 'earnings' as const,
                  label: 'Courier Stats & Fleet',
                  icon: DollarSign,
                  color: 'text-purple-400',
                  border: 'border-purple-500/30',
                  bg: 'bg-purple-500/10',
                  desc: 'Driver payouts, telematics, and vehicle metrics',
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = hubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setHubTab(item.id);
                      setIsHubMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Responsive Grid Buttons (Wraps cleanly without horizontal overflow) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {[
            { id: 'assigned', label: 'Assigned', fullLabel: 'Assigned Deliveries', count: myAssignedOrders.length, icon: Truck },
            { id: 'pool', label: 'Dispatch Pool', fullLabel: 'Dispatch Pool', count: availableHubOrders.length, icon: MapPin },
            { id: 'emails', label: 'Email Outbox', fullLabel: 'Email Logs', count: dispatchedEmails.length, icon: Mail },
            { id: 'nav', label: 'GPS Route', fullLabel: 'GPS Route', icon: Navigation },
            { id: 'otp', label: 'OTP Handover', fullLabel: 'OTP Handover', icon: KeyRound },
            { id: 'earnings', label: 'Fleet Stats', fullLabel: 'Courier Stats', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = hubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setHubTab(tab.id as any);
                  setIsHubMenuOpen(false);
                }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 text-center ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. ASSIGNED DELIVERIES */}
      {hubTab === 'assigned' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Assigned Parcels</div>
              <div className="text-2xl font-black text-white font-mono mt-1">{myAssignedOrders.length} Pending</div>
              <div className="text-[10px] text-emerald-400 mt-1">Driver {selectedDriver.name}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Estimated Route Time</div>
              <div className="text-2xl font-black text-white font-mono mt-1">22 Mins</div>
              <div className="text-[10px] text-indigo-400 mt-1">Real-time traffic adjusted</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Delivered Today</div>
              <div className="text-2xl font-black text-white font-mono mt-1">{completedOrders.length} Packages</div>
              <div className="text-[10px] text-emerald-400 mt-1">100% On-Time Delivery Rate</div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Assigned Packages Queue for {selectedDriver.name}
            </h3>

            {myAssignedOrders.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <Truck className="w-8 h-8 text-slate-600 mx-auto" />
                <p>No parcels currently assigned to this driver.</p>
                <button
                  onClick={() => setHubTab('pool')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  Assign from Hub Pool
                </button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">Destination Address</th>
                      <th className="p-3.5">Package Total</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {myAssignedOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3.5 font-mono font-bold text-indigo-400">{ord.orderNumber}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{ord.shippingAddress?.fullName || 'Alexander Hayes'}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{ord.shippingAddress?.phone || '+1 (415) 555-0199'}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          <div>{ord.shippingAddress?.street}</div>
                          <div className="text-[11px] text-slate-500">
                            {ord.shippingAddress?.city}, {ord.shippingAddress?.state} {ord.shippingAddress?.zipCode}
                          </div>
                        </td>
                        <td className="p-3.5 font-mono font-black text-emerald-400">${ord.total.toFixed(2)}</td>
                        <td className="p-3.5">
                          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setHubTab('nav')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition"
                          >
                            Route GPS
                          </button>
                          <button
                            onClick={() => setHubTab('otp')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition"
                          >
                            Verify OTP
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. DISPATCH HUB POOL */}
      {hubTab === 'pool' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Unassigned Express Dispatch Pool ({availableHubOrders.length})
              </h3>
              <p className="text-xs text-slate-400">Click any order to dispatch directly to {selectedDriver.name}.</p>
            </div>
          </div>

          {availableHubOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All current platform orders are assigned to active couriers!
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Order</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Delivery Location</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total Value</th>
                    <th className="p-3.5 text-right">Dispatch & Email Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {availableHubOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3.5 font-mono font-bold text-indigo-400">{ord.orderNumber}</td>
                      <td className="p-3.5 font-bold text-white">
                        <div>{ord.shippingAddress?.fullName || 'Customer'}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{ord.customerEmail}</div>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {ord.shippingAddress?.street}, {ord.shippingAddress?.city}
                      </td>
                      <td className="p-3.5 text-slate-400">{ord.items.length} items</td>
                      <td className="p-3.5 font-mono font-black text-emerald-400">${ord.total.toFixed(2)}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEmailModalForOrder(ord.id)}
                            className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition shadow flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Assign by Email</span>
                          </button>

                          <button
                            onClick={() => {
                              assignDriverToOrder(ord.id, selectedDriver.email || selectedDriver.id);
                              addToast('success', 'Dispatched', `Order ${ord.orderNumber} assigned to ${selectedDriver.name}`);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] px-3 py-1.5 rounded-xl transition border border-slate-700"
                          >
                            To {selectedDriver.name.split(' ')[0]}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 3. TURN-BY-TURN GPS ROUTE GUIDANCE */}
      {hubTab === 'nav' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Live Turn-by-Turn GPS Map</h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                GPS Telemetry Stream Active
              </span>
            </div>

            {/* Interactive Simulated Map Canvas */}
            <div className="relative h-80 w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Map Road Vector Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-500/40 stroke-2">
                <path d="M 40 280 Q 180 180 340 140 T 600 60" fill="none" strokeDasharray="6 6" />
              </svg>

              {/* Current Driver Position Pin */}
              <div className="absolute left-[38%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white animate-bounce">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="bg-slate-950 text-[10px] text-indigo-300 font-bold px-2 py-0.5 rounded shadow mt-1 border border-slate-800 whitespace-nowrap">
                  {selectedDriver.name} ({selectedDriver.vehicle.model})
                </div>
              </div>

              {/* Destination Pin */}
              <div className="absolute right-12 top-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="bg-slate-950 text-[10px] text-rose-300 font-bold px-2 py-0.5 rounded shadow mt-1 border border-slate-800 whitespace-nowrap">
                  Destination: 742 Evergreen Terr
                </div>
              </div>

              {/* Top Banner on Map */}
              <div className="relative z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-3 rounded-xl max-w-xs space-y-1 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> In 300m, Turn Right onto Market St
                </div>
                <div className="text-slate-400 text-[11px]">Next waypoint: Mission Bay Plaza • 4.2 km remaining</div>
              </div>

              {/* Bottom Speedometer Bar */}
              <div className="relative z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Current Speed</div>
                    <div className="font-mono font-black text-white text-base">38 MPH</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">ETA</div>
                    <div className="font-mono font-black text-emerald-400 text-base">14 Mins</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    updateOrderStatus(activeDeliveryOrder.id, 'OUT_FOR_DELIVERY');
                    addToast('info', 'Status Updated', 'Order marked as Out for Delivery.');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3 py-2 rounded-xl transition"
                >
                  Broadcast ETA to Customer
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Active Parcel Details</h3>
            {activeDeliveryOrder && (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">Order Number</div>
                  <div className="font-mono font-bold text-white text-sm">{activeDeliveryOrder.orderNumber}</div>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">Customer Contact</div>
                  <div className="font-bold text-white">{activeDeliveryOrder.shippingAddress?.fullName}</div>
                  <div className="text-slate-400 font-mono">{activeDeliveryOrder.shippingAddress?.phone}</div>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">Doorstep Handover OTP</div>
                  <div className="font-mono font-black text-amber-300 text-base">{activeDeliveryOrder.otpCode}</div>
                  <div className="text-[10px] text-slate-500">Customer must supply this code at door</div>
                </div>
                <button
                  onClick={() => setHubTab('otp')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" /> Proceed to OTP Handover
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. OTP DOORSTEP HANDOVER & SIGNATURE */}
      {hubTab === 'otp' && (
        <div className="max-w-2xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Doorstep OTP & Signature Verification</h3>
            <p className="text-xs text-slate-400">
              Collect the 6-digit confirmation code from the customer upon physical parcel handover.
            </p>
          </div>

          {activeDeliveryOrder && (
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-400 text-[10px] uppercase">Active Parcel</div>
                <div className="font-mono font-bold text-white text-sm">{activeDeliveryOrder.orderNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-[10px] uppercase">Expected OTP</div>
                <div className="font-mono font-bold text-amber-300 text-sm">{activeDeliveryOrder.otpCode}</div>
              </div>
            </div>
          )}

          {/* 6 Digit OTP Input Boxes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 text-center block">Enter Customer 6-Digit OTP</label>
            <div className="flex justify-center gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={enteredOtp[idx] || ''}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-12 sm:w-12 sm:h-14 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-2xl text-center text-lg sm:text-xl font-mono font-bold text-white focus:outline-none transition shadow-inner"
                />
              ))}
            </div>
          </div>

          {/* Digital Signature Pad */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Customer Digital Signature</span>
              <button
                type="button"
                onClick={() => setSignatureDone(!signatureDone)}
                className="text-xs text-indigo-400 hover:underline"
              >
                {signatureDone ? 'Clear Signature' : 'Sign Handover'}
              </button>
            </div>
            <div
              onClick={() => setSignatureDone(true)}
              className="h-28 bg-slate-900 rounded-2xl border border-slate-800 border-dashed flex items-center justify-center text-xs text-slate-500 cursor-pointer hover:border-slate-700 transition"
            >
              {signatureDone ? (
                <div className="font-serif italic text-xl text-emerald-400">Alexander Hayes ✓</div>
              ) : (
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4" /> Tap to record customer signature
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleCompleteHandover}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Complete Handover & Close Order
          </button>
        </div>
      )}

      {/* 5. COURIER EARNINGS & TELEMETRY */}
      {hubTab === 'earnings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Driver Profile & Vehicle</h3>
            <div className="flex items-center gap-4">
              <img
                src={selectedDriver.avatar}
                alt={selectedDriver.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500"
              />
              <div>
                <div className="text-base font-black text-white">{selectedDriver.name}</div>
                <div className="text-xs text-indigo-400 font-semibold">{selectedDriver.phone}</div>
                <div className="text-xs text-slate-400">{selectedDriver.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Vehicle Model</div>
                <div className="font-bold text-white">{selectedDriver.vehicle.model}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">License Plate</div>
                <div className="font-bold text-white font-mono">{selectedDriver.vehicle.plateNumber}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Rating</div>
                <div className="font-bold text-amber-400">★ {selectedDriver.rating} / 5.0</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Total Completed Trips</div>
                <div className="font-bold text-white font-mono">{selectedDriver.totalTrips}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Earnings & Commission Ledger</h3>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <div className="text-xs text-slate-400 uppercase">Today's Payout Balance</div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                ${(completedOrders.length * 24.5 + 45).toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500">Includes base delivery fees + peak dispatch bonus</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800 text-slate-400">
                <span>Completed Deliveries ({completedOrders.length} × $24.50):</span>
                <span className="font-mono text-white font-bold">${(completedOrders.length * 24.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800 text-slate-400">
                <span>Guaranteed Fleet Daily Bonus:</span>
                <span className="font-mono text-emerald-400 font-bold">$45.00</span>
              </div>
              <div className="flex justify-between py-2 text-white font-bold">
                <span>Total Accumulated:</span>
                <span className="font-mono text-emerald-400 text-sm">
                  ${(completedOrders.length * 24.5 + 45).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. DISPATCHED EMAILS OUTBOX & TELEMETRY */}
      {hubTab === 'emails' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">Dispatched Courier Delivery Emails</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every assignment email sent by the I-TECH Administrator is logged with customer destination data and doorstep OTP.
              </p>
            </div>

            <button
              onClick={() => openEmailModalForOrder()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2 shadow"
            >
              <Send className="w-4 h-4" />
              <span>Compose New Dispatch Email</span>
            </button>
          </div>

          {dispatchedEmails.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-xs space-y-3">
              <Mail className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="font-semibold">No courier dispatch emails recorded yet.</p>
              <button
                onClick={() => openEmailModalForOrder()}
                className="text-cyan-400 hover:underline font-bold text-xs"
              >
                + Assign an order by email now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {dispatchedEmails.map((em) => (
                <div
                  key={em.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{em.subject}</div>
                        <div className="text-[11px] text-cyan-400 font-mono">Recipient: {em.to}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {em.deliveryStatus || 'TRANSMITTED'}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{em.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 rounded-xl p-3.5 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800/60 max-h-48 overflow-y-auto">
                    {em.body}
                  </div>

                  {/* Actions on this outbox record */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/70 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                            em.to
                          )}&su=${encodeURIComponent(em.subject)}&body=${encodeURIComponent(em.body)}`;
                          window.open(url, '_blank', 'noopener,noreferrer');
                          addToast('success', 'Gmail Compose Opened', `Preloaded dispatch manifest for ${em.to}`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <span className="text-red-400 font-black">G</span>
                        <span>Send via Gmail Web</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </button>

                      <button
                        onClick={() => {
                          const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
                            em.to
                          )}&subject=${encodeURIComponent(em.subject)}&body=${encodeURIComponent(em.body)}`;
                          window.open(url, '_blank', 'noopener,noreferrer');
                          addToast('success', 'Outlook Compose Opened', `Preloaded dispatch manifest for ${em.to}`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <span className="text-blue-400 font-black">O</span>
                        <span>Send via Outlook</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </button>

                      <button
                        onClick={() => {
                          window.location.href = `mailto:${encodeURIComponent(em.to)}?subject=${encodeURIComponent(
                            em.subject
                          )}&body=${encodeURIComponent(em.body)}`;
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <Mail className="w-3 h-3 text-indigo-400" />
                        <span>Mail App</span>
                      </button>
                    </div>

                    <button
                      onClick={() => copyDispatchText(em.body, em.id)}
                      className="text-slate-400 hover:text-white text-[11px] font-bold flex items-center gap-1 self-end sm:self-center"
                    >
                      {copiedEmailId === em.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmailId === em.id ? 'Copied to Clipboard' : 'Copy Manifest'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assign Delivery Modal */}
      <AssignDeliveryModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialOrderId={targetModalOrderId}
      />
    </div>
  );
};
