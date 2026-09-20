import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  User,
  Send,
  X,
  FileText,
  HelpCircle,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const CustomerOrdersAndTracking: React.FC<{ isLiveTrackingMode?: boolean }> = () => {
  const {
    orders,
    activeOrder,
    setActiveOrderId,
    drivers,
    setCustomerPage,
    setPortalMode,
    setAdminPage,
    addToast,
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(activeOrder?.id || orders[0]?.id || '');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || activeOrder || orders[0];
  const assignedDriver = currentOrder ? drivers.find((d) => d.id === currentOrder.driverId) || drivers[0] : null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'ON_ROUTE':
        return (
          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
            <Truck className="w-3.5 h-3.5" /> Courier En Route
          </span>
        );
      case 'PICKED_UP':
      case 'ASSIGNED':
        return (
          <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Courier Dispatched
          </span>
        );
      case 'READY':
      case 'PACKING':
        return (
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Packing & Preparing
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full">
            {status}
          </span>
        );
    }
  };

  const steps = [
    { label: 'Order Confirmed', completed: true },
    {
      label: 'Packaging & Quality Check',
      completed:
        currentOrder?.status === 'PACKING' ||
        currentOrder?.status === 'READY' ||
        currentOrder?.status === 'ASSIGNED' ||
        currentOrder?.status === 'PICKED_UP' ||
        currentOrder?.status === 'ON_ROUTE' ||
        currentOrder?.status === 'DELIVERED',
    },
    {
      label: 'Courier Dispatched',
      completed:
        currentOrder?.status === 'ASSIGNED' ||
        currentOrder?.status === 'PICKED_UP' ||
        currentOrder?.status === 'ON_ROUTE' ||
        currentOrder?.status === 'DELIVERED',
    },
    { label: 'Delivered to Doorstep', completed: currentOrder?.status === 'DELIVERED' },
  ];

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Orders Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You have not placed any orders yet. Discover our next-gen devices in the catalog.
        </p>
        <button
          onClick={() => setCustomerPage('cust-products')}
          className="bg-indigo-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Customer Account</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Orders & Delivery Status</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCustomerPage('cust-products')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Orders Selector List */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Order History ({orders.length})
          </h3>

          <div className="space-y-3">
            {orders.map((ord) => {
              const isSelected = ord.id === currentOrder.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => {
                    setSelectedOrderId(ord.id);
                    setActiveOrderId(ord.id);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-xs space-y-2 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-indigo-600">{ord.orderNumber}</span>
                    <span className="font-mono font-bold text-slate-900">${(ord.total ?? 0).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>{ord.createdAt.split('T')[0]}</span>
                    <span>{ord.items.length} item(s)</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    {getStatusBadge(ord.status)}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Order Details & Status Steps */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Order Title & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-xl text-slate-900">{currentOrder.orderNumber}</span>
                  {getStatusBadge(currentOrder.status)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Placed on {new Date(currentOrder.createdAt).toLocaleDateString()} • Payment via {currentOrder.paymentMethod}
                </div>
              </div>

              {/* OTP Security Passcode */}
              <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-[10px] font-bold text-amber-800 uppercase">Doorstep Verification OTP</div>
                  <div className="text-lg font-black font-mono text-amber-900 tracking-wider">
                    {currentOrder.otpCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                Fulfillment Progress
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        step.completed
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className={`text-[11px] font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Courier Card */}
            {assignedDriver && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={assignedDriver.avatar}
                    alt={assignedDriver.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{assignedDriver.name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {assignedDriver.vehicle.model} • {assignedDriver.vehicle.plateNumber}
                    </div>
                    <div className="text-amber-600 font-bold text-[11px] mt-0.5">
                      ★ {assignedDriver.rating} ({assignedDriver.totalDeliveries} successful deliveries)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${assignedDriver.phone}`}
                    className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-700 flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Driver</span>
                  </a>

                  <button
                    onClick={() => setIsSupportModalOpen(true)}
                    className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-700 flex items-center gap-1.5 transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Need Help</span>
                  </button>
                </div>
              </div>
            )}

            {/* Items Breakdown Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Order Items ({currentOrder.items.length})
              </h4>
              <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage || (item as any).image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80'}
                        alt={item.productName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-slate-500 text-[11px]">Qty: {item.quantity} × ${(item.price ?? 0).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-900">
                      ${((item.quantity || 1) * (item.price ?? 0)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" /> Delivery Address
                  </div>
                  <div className="text-slate-600">{currentOrder.shippingAddress?.street}</div>
                  <div className="text-slate-500 text-[11px]">
                    {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state} {currentOrder.shippingAddress?.zipCode}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>${(currentOrder.subtotal ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Express Delivery:</span>
                    <span>${(currentOrder.deliveryFee ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total Paid:</span>
                    <span className="text-emerald-700 font-mono font-black">${(currentOrder.total ?? 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Help Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Order Support & Inquiries</h3>
              <button onClick={() => setIsSupportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              For order #{currentOrder.orderNumber}, our priority customer team is on standby 24/7.
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:support@itech-platform.com"
                className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <span>Email Support Ticket</span>
              </a>
              <a
                href="tel:+18005554832"
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <span>Direct Toll-Free Line (+1 800 555-ITECH)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
