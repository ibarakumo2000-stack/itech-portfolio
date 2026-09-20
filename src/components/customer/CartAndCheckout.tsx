import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, Address } from '../../types';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Wallet,
  Tag,
  CheckCircle2,
  MapPin,
  Building,
  KeyRound,
  FileText,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const CartAndCheckout: React.FC<{ isCheckoutMode?: boolean }> = ({ isCheckoutMode = false }) => {
  const {
    cart,
    setSelectedProductId,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addresses,
    addAddress,
    currentUser,
    createOrder,
    setCustomerPage,
    addToast,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || 'addr-1');
  const [deliveryType, setDeliveryType] = useState<'express' | 'same_day' | 'standard' | 'pickup'>('express');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    title: 'New Location',
    street: '',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
  });

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (subtotal * appliedCoupon.discountValue) / 100
      : appliedCoupon.discountValue
    : 0;

  const deliveryFee = deliveryType === 'pickup' ? 0 : deliveryType === 'express' ? 15 : deliveryType === 'same_day' ? 10 : 5;
  const tax = subtotal * 0.0825;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  const handleCreateNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.street) return;
    addAddress({
      userId: currentUser?.id || 'user-demo-1',
      title: newAddressForm.title,
      street: newAddressForm.street,
      city: newAddressForm.city,
      state: newAddressForm.state,
      zipCode: newAddressForm.zipCode,
      country: newAddressForm.country,
      isDefault: false,
      lat: 37.785,
      lng: -122.408,
    });
    setIsAddingNewAddress(false);
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      addToast('warning', 'Empty Cart', 'Please add hardware items before placing an order.');
      return;
    }

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const order = createOrder({
      shippingAddress: selectedAddress,
      deliveryOption: deliveryType,
      deliveryInstructions: deliveryNotes,
      paymentMethod,
    });

    // Navigate directly to the Live Tracking screen!
    setCustomerPage('cust-live-tracking');
  };

  if (cart.length === 0 && !isCheckoutMode) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our enterprise hardware lineup and flagship 5G devices for 30-minute rapid courier delivery.
        </p>
        <button
          onClick={() => setCustomerPage('cust-products')}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 inline-flex items-center gap-2"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Secure Procurement</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isCheckoutMode ? 'Enterprise Checkout' : 'Shopping Cart & Hardware Review'}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setCustomerPage('cust-cart')}
            className={`px-3 py-1 rounded-full font-bold transition ${
              !isCheckoutMode ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            1. Review Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setCustomerPage('cust-checkout')}
            className={`px-3 py-1 rounded-full font-bold transition ${
              isCheckoutMode ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            2. Shipping & Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List OR Full Checkout Forms */}
        <div className="lg:col-span-8 space-y-6">
          {!isCheckoutMode ? (
            /* CART REVIEW VIEW */
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Hardware Items in Bag
                </span>
                <button onClick={clearCart} className="text-xs text-rose-600 hover:underline font-bold">
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-center gap-4">
                    <div
                      onClick={() => {
                        setSelectedProductId(item.product.id);
                        setCustomerPage('cust-product-details');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer group shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.product.brand}</span>
                      <h4
                        onClick={() => {
                          setSelectedProductId(item.product.id);
                          setCustomerPage('cust-product-details');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-mono text-slate-500 mt-0.5">SKU: {item.product.sku}</div>
                      <div className="text-xs font-extrabold text-indigo-600 mt-1">${(item.product.price ?? 0).toFixed(2)} each</div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded text-slate-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded text-slate-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Item total */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm font-black text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => setCustomerPage('cust-products')}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <span>Continue Hardware Shopping</span>
                </button>
                <button
                  onClick={() => setCustomerPage('cust-checkout')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT MULTI-STEP FORMS */
            <div className="space-y-6">
              {/* 1. Delivery & Address Selection */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> 1. Delivery Destination Address
                  </span>
                  <button
                    onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    {isAddingNewAddress ? 'Cancel' : '+ Add New Address'}
                  </button>
                </div>

                {isAddingNewAddress ? (
                  <form onSubmit={handleCreateNewAddress} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Address Label</label>
                        <input
                          type="text"
                          value={newAddressForm.title}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. Branch Office"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.street}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="100 Market St, Floor 5"
                        />
                      </div>
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
                      Save & Select Address
                    </button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition ${
                          selectedAddressId === addr.id
                            ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{addr.title}</span>
                          {selectedAddressId === addr.id && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">{addr.street}</div>
                        <div className="text-[11px] text-slate-400">{addr.city}, {addr.state} {addr.zipCode}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Delivery & Pickup Speed Options */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> 2. Delivery & Fulfillment Option
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'express', title: 'Express Courier', time: '30 - 45 Mins', fee: '$15.00', icon: '🚀', tag: 'Fastest' },
                    { id: 'same_day', title: 'Same-Day Dispatch', time: 'Today by 8 PM', fee: '$10.00', icon: '⚡' },
                    { id: 'standard', title: 'Standard Ground', time: 'Tomorrow 2 PM', fee: '$5.00', icon: '📦' },
                    { id: 'pickup', title: 'Hub Self-Pickup', time: 'Ready in 15m', fee: 'FREE', icon: '🏬' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setDeliveryType(opt.id as any)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition text-left flex flex-col justify-between ${
                        deliveryType === opt.id
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-base">
                          <span>{opt.icon}</span>
                          {opt.tag && <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded">{opt.tag}</span>}
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-2">{opt.title}</div>
                        <div className="text-[11px] text-slate-500">{opt.time}</div>
                      </div>
                      <div className="text-xs font-black text-indigo-600 mt-3 font-mono">{opt.fee}</div>
                    </div>
                  ))}
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Handover & Gate Instructions:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring Apt 4B doorbell. Safe to leave in secure lobby box."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> 3. Select Payment Gateway
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'CREDIT_CARD', title: 'Credit / Debit Card', desc: 'Visa ending 4092 (Instant 3D Secure)', icon: CreditCard },
                    { id: 'WALLET', title: 'I-Tech Digital Wallet', desc: `Current Balance: $${(currentUser?.walletBalance ?? 250).toFixed(2)}`, icon: Wallet },
                    { id: 'APPLE_PAY', title: 'Apple Pay / Google Pay', desc: '1-Touch Biometric Authorization', icon: Sparkles },
                    { id: 'CASH_ON_DELIVERY', title: 'Cash on Delivery', desc: 'Pay courier on verified handover', icon: Truck },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                          paymentMethod === pm.id
                            ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900">{pm.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{pm.desc}</div>
                        </div>
                        {paymentMethod === pm.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Coupon Promo */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Order Financial Summary
            </h3>

            {/* Coupon Promo Box */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. ITECH50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center justify-between text-emerald-800">
                  <span className="font-bold">Promo {appliedCoupon.code} Applied</span>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline font-bold">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Hardware Subtotal</span>
                <span className="font-mono text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery & Courier Logistics</span>
                <span className="font-mono text-slate-900">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>State & Local Sales Tax (8.25%)</span>
                <span className="font-mono text-slate-900">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                <span className="text-sm font-extrabold">Final Grand Total</span>
                <span className="text-2xl font-black text-indigo-600 font-mono">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Actions */}
            {isCheckoutMode ? (
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-4 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Order & Dispatch Courier</span>
              </button>
            ) : (
              <button
                onClick={() => setCustomerPage('cust-checkout')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-4 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Proceed to Shipping & Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
