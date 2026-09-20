import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DeliveryPage, Order } from '../../types';
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
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DeliveryApp: React.FC = () => {
  const {
    deliveryPage,
    setDeliveryPage,
    drivers,
    orders,
    updateOrderStatus,
    assignDriverToOrder,
    setPortalMode,
    addToast,
  } = useApp();

  const driver = drivers[0]; // Marcus Vance demo driver
  const myAssignedOrders = orders.filter((o) => o.driverId === driver.id && o.status !== 'DELIVERED');
  const availableHubOrders = orders.filter((o) => !o.driverId && o.status !== 'CANCELLED' && o.status !== 'DELIVERED');
  const completedOrders = orders.filter((o) => o.driverId === driver.id && o.status === 'DELIVERED');

  const activeDeliveryOrder = myAssignedOrders[0] || orders[0];

  // OTP Verification and Handover state
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [photoProofTaken, setPhotoProofTaken] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const deliveryNavItems: { id: DeliveryPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'del-todays-deliveries', label: `Today's Deliveries (${myAssignedOrders.length})`, icon: Truck },
    { id: 'del-assign-deliveries', label: `Available Hub Pool (${availableHubOrders.length})`, icon: MapPin },
    { id: 'del-live-tracking', label: 'Turn-by-Turn GPS Map', icon: Navigation },
    { id: 'del-verify-otp', label: 'OTP Handover & Signature', icon: KeyRound },
    { id: 'del-earnings', label: `Earnings ($${(completedOrders.length * 24.5).toFixed(2)})`, icon: DollarSign },
    { id: 'del-profile', label: 'Driver Profile & Vehicle', icon: User },
  ];

  const handleOtpChange = (index: number, val: string) => {
    const copy = [...enteredOtp];
    copy[index] = val;
    setEnteredOtp(copy);
  };

  const handleCompleteHandover = () => {
    const enteredCode = enteredOtp.join('');
    if (enteredCode !== activeDeliveryOrder.otpCode) {
      addToast('error', 'OTP Mismatch', `Entered code ${enteredCode} does not match customer OTP (${activeDeliveryOrder.otpCode}).`);
      return;
    }
    if (!signatureDone) {
      addToast('warning', 'Signature Required', 'Please obtain customer signature before completing handover.');
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    updateOrderStatus(activeDeliveryOrder.id, 'DELIVERED');
    addToast('success', 'Delivery Completed!', `Order ${activeDeliveryOrder.orderNumber} successfully handed over. +$24.50 credited.`);
    setDeliveryPage('del-earnings');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Driver Mobile Status Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-2xl object-cover border-2 border-emerald-500" />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${isOnline ? 'bg-emerald-500' : 'bg-slate-500'}`} />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-2">
              <span>{driver.name}</span>
              <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded-md font-mono border border-emerald-800">
                ★ {driver.rating}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Vehicle: {driver.vehicle.model} • {driver.vehicle.plateNumber}
            </div>
          </div>
        </div>

        {/* Quick Shift Toggle & Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isOnline ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>

          <button
            onClick={() => setPortalMode('customer')}
            className="text-xs bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 font-semibold"
          >
            Storefront
          </button>
        </div>
      </header>

      {/* Driver App Navigation Subtabs (Simulating mobile app tab bar) */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max max-w-4xl mx-auto">
          {deliveryNavItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = deliveryPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDeliveryPage(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Delivery Screen Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* ================= 1. TODAY'S DELIVERIES ================= */}
        {deliveryPage === 'del-todays-deliveries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white">Active Assigned Deliveries</h2>
                <p className="text-xs text-slate-400">Parcels assigned for immediate express handover.</p>
              </div>
              <span className="bg-indigo-950 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-800">
                {myAssignedOrders.length} Parcels In Shift
              </span>
            </div>

            {myAssignedOrders.length === 0 ? (
              <div className="bg-slate-800/60 p-12 text-center rounded-3xl border border-slate-700 space-y-3">
                <Truck className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Pending Orders in Bag</h3>
                <p className="text-xs text-slate-400">Check the Central Hub pool to claim new nearby orders.</p>
                <button
                  onClick={() => setDeliveryPage('del-assign-deliveries')}
                  className="mt-2 bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow"
                >
                  View Hub Orders Pool
                </button>
              </div>
            ) : (
              myAssignedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-800/90 rounded-3xl border border-slate-700 p-5 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">Express Dispatch</span>
                      <h3 className="text-base font-extrabold text-white font-mono">{order.orderNumber}</h3>
                    </div>
                    <span className="bg-amber-950 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-700">
                      Status: {order.status}
                    </span>
                  </div>

                  {/* Pickup -> Dropoff Locations */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        A
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Pickup Location (Depot)</div>
                        <div className="font-semibold text-slate-200">I-Tech Central Logistics Center, Bay 4</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        B
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Customer Drop-off Destination</div>
                        <div className="font-semibold text-slate-200">{order.shippingAddress.street}</div>
                        <div className="text-[11px] text-slate-400">{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls for courier */}
                  <div className="pt-3 border-t border-slate-700 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'ON_ROUTE');
                        setDeliveryPage('del-live-tracking');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Start Route</span>
                    </button>

                    <button
                      onClick={() => setDeliveryPage('del-verify-otp')}
                      className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Verify OTP</span>
                    </button>

                    <button
                      onClick={() => addToast('info', 'Customer Dialed', `Dialing recipient for Order ${order.orderNumber}...`)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= 2. AVAILABLE HUB ORDERS POOL ================= */}
        {deliveryPage === 'del-assign-deliveries' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-white">Central Hub Available Deliveries</h2>
              <p className="text-xs text-slate-400">Claim pending express orders for immediate courier dispatch.</p>
            </div>

            {availableHubOrders.length === 0 ? (
              <div className="bg-slate-800/60 p-12 text-center rounded-3xl border border-slate-700 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-white">All Metro Orders Currently Assigned</h3>
                <p className="text-xs text-slate-400">New orders will pop up in real time as customers check out.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableHubOrders.map((order) => (
                  <div key={order.id} className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-3 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-indigo-400">{order.orderNumber}</span>
                        <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                          +$24.50 Payout
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-2 font-bold">{order.items.length} High-Tech Parcel(s)</div>
                      <div className="text-xs text-slate-400 mt-1">{order.shippingAddress.street}, {order.shippingAddress.city}</div>
                    </div>

                    <button
                      onClick={() => {
                        assignDriverToOrder(order.id, driver.id);
                        setDeliveryPage('del-todays-deliveries');
                        addToast('success', 'Order Claimed', `Order ${order.orderNumber} added to your shift route.`);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
                    >
                      Accept & Claim Dispatch
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= 3. TURN-BY-TURN GPS NAVIGATION ================= */}
        {deliveryPage === 'del-live-tracking' && (
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl space-y-4">
            {/* Top Navigation Banner */}
            <div className="p-4 bg-emerald-900/90 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Navigation className="w-8 h-8 text-emerald-300 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Turn Left on Market St</div>
                  <div className="text-lg font-black text-white">In 250 meters • Destination on Right</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-emerald-200">Remaining:</div>
                <div className="text-lg font-black font-mono">1.4 mi • 6 mins</div>
              </div>
            </div>

            {/* Visual Simulated Route Simulation Screen */}
            <div className="relative h-80 bg-slate-950 p-4">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Roads */}
                <path d="M 50 150 L 550 150" stroke="#334155" strokeWidth="24" />
                <path d="M 280 20 L 280 300" stroke="#334155" strokeWidth="24" />
                {/* Yellow road lane markers */}
                <path d="M 50 150 L 550 150" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 6" />
                <path d="M 280 20 L 280 300" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 6" />

                {/* Turn Guidance Indicator */}
                <path d="M 120 150 L 280 150 L 280 260" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />

                {/* Moving Courier Icon */}
                <circle cx="180" cy="150" r="14" fill="#6366f1" stroke="#ffffff" strokeWidth="3" />
                <circle cx="280" cy="260" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-xs">
                <div className="text-slate-400">Current Speed:</div>
                <div className="text-xl font-black text-emerald-400 font-mono">31 MPH</div>
              </div>

              <button
                onClick={() => setDeliveryPage('del-verify-otp')}
                className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <span>Arrived at Customer Doorstep</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. OTP VERIFICATION & HANDOVER ================= */}
        {deliveryPage === 'del-verify-otp' && (
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Customer OTP Handover Verification</h2>
              <p className="text-xs text-slate-400">
                Ask the customer for their 6-digit confirmation security code for Order <strong className="text-white font-mono">{activeDeliveryOrder.orderNumber}</strong>.
              </p>
            </div>

            {/* Quick Demo OTP Autofill */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700 text-center text-xs text-slate-400">
              <span>Customer's Registered OTP: </span>
              <strong className="font-mono text-amber-400 text-sm">{activeDeliveryOrder.otpCode}</strong>
              <button
                onClick={() => setEnteredOtp(activeDeliveryOrder.otpCode.split(''))}
                className="ml-2 text-indigo-400 hover:underline font-bold"
              >
                (Auto-Fill Code)
              </button>
            </div>

            {/* 6-box OTP Input */}
            <div className="flex justify-center gap-2">
              {enteredOtp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-14 bg-slate-900 border border-slate-600 rounded-xl text-center text-xl font-black text-white font-mono focus:border-indigo-500 outline-none"
                />
              ))}
            </div>

            {/* Photo Proof of Delivery */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-indigo-400" /> Photo Proof of Delivery
                </span>
                {photoProofTaken && <span className="text-emerald-400 font-bold">✓ Captured</span>}
              </div>
              <button
                onClick={() => {
                  setPhotoProofTaken(true);
                  addToast('info', 'Photo Captured', 'Doorstep parcel photo attached to delivery log.');
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-600"
              >
                {photoProofTaken ? 'Retake Photo' : 'Capture Doorstep Parcel Photo'}
              </button>
            </div>

            {/* Digital Signature */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-emerald-400" /> Customer Digital Signature
                </span>
                {signatureDone && <span className="text-emerald-400 font-bold">✓ Signed</span>}
              </div>
              <div
                onClick={() => setSignatureDone(true)}
                className="h-20 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition"
              >
                {signatureDone ? (
                  <span className="font-mono text-emerald-400 font-bold italic text-lg">Alex Hayes (Verified Handover)</span>
                ) : (
                  <span className="text-xs text-slate-500">Tap here to sign on screen</span>
                )}
              </div>
            </div>

            <button
              onClick={handleCompleteHandover}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Handover & Collect Payout</span>
            </button>
          </div>
        )}

        {/* ================= 5. DRIVER EARNINGS ================= */}
        {deliveryPage === 'del-earnings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Today's Shift Payout</div>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  ${(completedOrders.length * 24.5 + 45).toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400">{completedOrders.length + 2} drops completed</div>
              </div>

              <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Customer Tips Total</div>
                <div className="text-3xl font-black text-indigo-400 font-mono">$32.00</div>
                <div className="text-[10px] text-emerald-400 font-bold">100% tips kept by driver</div>
              </div>

              <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Speed Rating</div>
                <div className="text-3xl font-black text-amber-400 font-mono">4.97 ★</div>
                <div className="text-[10px] text-slate-400">99.2% on-time guarantee</div>
              </div>
            </div>

            {/* Drop History */}
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-white">Completed Drop Payout Ledger</h3>
              <div className="divide-y divide-slate-700 text-xs">
                {completedOrders.map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white font-mono">{ord.orderNumber}</div>
                      <div className="text-[10px] text-slate-400">{ord.shippingAddress.street}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400 font-mono">+$24.50</div>
                      <div className="text-[10px] text-slate-500">OTP Verified Handover</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. DRIVER PROFILE & VEHICLE ================= */}
        {deliveryPage === 'del-profile' && (
          <div className="bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 max-w-xl mx-auto">
            <div className="flex items-center gap-4">
              <img src={driver.avatar} alt={driver.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500" />
              <div>
                <h3 className="text-lg font-extrabold text-white">{driver.name}</h3>
                <div className="text-xs text-slate-400">{driver.phone}</div>
                <div className="text-xs text-amber-400 font-bold mt-1">★ {driver.rating} • {driver.totalDeliveries} Completed Drops</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2 text-xs">
              <div className="font-bold text-indigo-400 uppercase text-[10px]">Registered Vehicle Profile</div>
              <div className="flex justify-between text-slate-300">
                <span>Vehicle Type:</span>
                <span className="font-bold text-white">{driver.vehicle.type}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Make & Model:</span>
                <span className="font-bold text-white">{driver.vehicle.model}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>License Plate:</span>
                <span className="font-mono font-bold text-emerald-400">{driver.vehicle.plateNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => addToast('info', 'Support Desk Connected', 'Driver dispatch supervisor is on standby.')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Contact Fleet Dispatch Supervision
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
