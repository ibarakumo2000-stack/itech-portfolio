import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Scale,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Plus,
  Minus,
  MessageSquare,
  Play,
  Copy,
  Check,
  X,
  Maximize2,
  ChevronLeft,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    addToCart,
    toggleWishlist,
    wishlist,
    toggleCompare,
    compareList,
    reviews,
    addReview,
    setCustomerPage,
    addToast,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'video' | 'reviews'>('specs');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Frequently bought together bundle items
  const bundleItems = products.filter((p) => p.id !== product.id).slice(0, 2);
  const [selectedBundleIds, setSelectedBundleIds] = useState<string[]>([bundleItems[0]?.id || '']);

  // Related products
  const relatedProducts = products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4);

  // Recently viewed
  const recentlyViewed = products.filter((p) => p.id !== product.id).slice(0, 3);

  const isSavedInWishlist = wishlist.includes(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const bundleTotal =
    product.price +
    bundleItems
      .filter((item) => selectedBundleIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

  const handleAddBundleToCart = () => {
    addToCart(product, 1);
    bundleItems
      .filter((item) => selectedBundleIds.includes(item.id))
      .forEach((item) => addToCart(item, 1));
    addToast('success', 'Bundle Added!', 'Hardware bundle added to your shopping bag.');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCustomerPage('cust-checkout');
  };

  const handleShareCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    addToast('info', 'Link Copied', 'Direct product URL copied to clipboard.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(product.id, reviewRating, reviewComment);
    setReviewComment('');
    setIsReviewModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Navigation Top Bar with Prominent Back Buttons & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50/80 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setCustomerPage('cust-products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </button>

          <button
            onClick={() => {
              setCustomerPage('landing-full');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition"
          >
            <span>Home</span>
          </button>
        </div>

        {/* Breadcrumb path */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto py-1">
          <button onClick={() => setCustomerPage('landing-full')} className="hover:text-indigo-600 shrink-0">Home</button>
          <span>/</span>
          <button onClick={() => setCustomerPage('cust-products')} className="hover:text-indigo-600 shrink-0">Catalog</button>
          <span>/</span>
          <span className="text-slate-400 shrink-0">{product.categoryName}</span>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Grid: Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white p-4 sm:p-7 rounded-3xl border border-slate-200 shadow-xs">
        {/* Left Column: Gallery & Interactive Responsively-Scaled Photo Preview */}
        <div className="lg:col-span-5 space-y-3">
          {/* Scaled Responsive Main Image Box */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative bg-slate-50/80 rounded-2xl border border-slate-200 h-56 sm:h-64 md:h-72 lg:h-76 flex items-center justify-center p-3 sm:p-4 overflow-hidden group cursor-pointer hover:border-indigo-300 transition"
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="max-h-48 sm:max-h-56 md:max-h-64 max-w-full object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-all duration-300"
            />
            {product.isFlashSale && (
              <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                Flash Deal
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="absolute bottom-2.5 right-2.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-lg font-mono flex items-center gap-1 backdrop-blur-xs transition"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Tap to Enlarge</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition shrink-0 bg-slate-50 flex items-center justify-center p-1 ${
                  activeImageIdx === idx ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specs & Purchasing Actions */}
        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5">
                {/* Share Button */}
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  title="Share Product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-xl border transition ${
                    isSavedInWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSavedInWishlist ? 'fill-current' : ''}`} />
                </button>
                {/* Compare Button */}
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-2 rounded-xl border transition ${
                    isCompared
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Compare Device"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & SKU */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-slate-500 font-mono">SKU: {product.sku}</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="font-mono text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>

            {/* Price section */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${(product.price ?? 0).toFixed(2)}</span>
              {Boolean(product.originalPrice) && (
                <span className="text-sm text-slate-400 line-through font-mono">${(product.originalPrice ?? 0).toFixed(2)}</span>
              )}
              {Boolean(product.originalPrice && product.originalPrice > product.price) && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Save ${((product.originalPrice ?? 0) - (product.price ?? 0)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Variants selector if available */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hardware Configuration:</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition ${
                        selectedVariantId === v.id
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900">{v.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">${v.price} • Stock: {v.stock}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <div className="text-xs font-bold text-slate-700">Quantity:</div>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-slate-900 font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({quantity})</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>

            {/* Value Guarantees Banner */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">30-min Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">2-Yr Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">30-Day Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle Module */}
      {bundleItems.length > 0 && (
        <div className="my-10 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Frequently Bought Together (Save 15%)</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Products in bundle */}
            <div className="lg:col-span-8 flex flex-wrap items-center gap-4">
              {/* Main Product */}
              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold text-white line-clamp-1">{product.name}</div>
                  <div className="text-xs text-indigo-300 font-mono">${product.price}</div>
                </div>
              </div>

              <Plus className="w-5 h-5 text-slate-500" />

              {/* Add-on items */}
              {bundleItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedBundleIds((prev) =>
                      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    );
                  }}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                    selectedBundleIds.includes(item.id)
                      ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-800/40 border-slate-700 opacity-60'
                  }`}
                >
                  <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
                    <div className="text-xs text-indigo-300 font-mono">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Total and Checkout */}
            <div className="lg:col-span-4 bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center space-y-3">
              <div className="text-xs text-slate-400">Combined Bundle Price:</div>
              <div className="text-2xl font-black text-white font-mono">${(bundleTotal ?? 0).toFixed(2)}</div>
              <button
                onClick={handleAddBundleToCart}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg transition"
              >
                Add All Selected to Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs: Specifications, Description, Videos, Reviews */}
      <div className="my-10 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/50 px-4">
          {[
            { id: 'specs', label: 'Specifications & Tech Details' },
            { id: 'desc', label: 'Full Product Overview' },
            { id: 'video', label: 'Video Demo & 3D Walkthrough' },
            { id: 'reviews', label: `Customer Reviews (${productReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-6 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* 1. Specifications */}
          {activeTab === 'specs' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900">Technical Specifications Matrix</h3>
                <button
                  onClick={() => {
                    setCustomerPage('cust-products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Product List</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs odd:bg-slate-50">
                    <span className="font-bold text-slate-700">{key}</span>
                    <span className="sm:col-span-2 text-slate-600">{val}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Back Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setCustomerPage('cust-products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Catalog</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Description */}
          {activeTab === 'desc' && (
            <div className="max-w-3xl space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900">Engineering & Architecture Overview</h3>
                <button
                  onClick={() => {
                    setCustomerPage('cust-products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Product List</span>
                </button>
              </div>

              <p className="text-slate-800 font-medium">{product.description}</p>
              <p>
                Each device undergoes rigorous 48-point diagnostic testing in our certified cleanroom facility. Packaged in tamper-evident aerospace seals and assigned directly to our verified logistics dispatch network.
              </p>
              <p>
                Equipped with intelligent power management, ultra-low latency data buses, and enterprise-grade cryptographic validation for secure cloud connectivity.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Prominent Back Buttons at Bottom of Description */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setCustomerPage('cust-products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Product Catalog</span>
                </button>
                <button
                  onClick={() => {
                    setCustomerPage('landing-full');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  <span>Return to Home</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. Video Demo */}
          {activeTab === 'video' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="text-base font-bold text-slate-900">Hands-on Hardware Demonstration</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group">
                <img
                  src={product.images[0]}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => addToast('info', 'Video Demo', 'Interactive 4K demonstration video player activated.')}
                  className="absolute w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 hover:scale-110 transition"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* 4. Reviews & Review Modal */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Verified Customer Reviews</h3>
                  <p className="text-xs text-slate-500">Real feedback from verified enterprise purchases.</p>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Write a Review
                </button>
              </div>

              <div className="space-y-4">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{rev.userName}</div>
                          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">{rev.comment}</p>
                    <div className="text-[10px] text-slate-400 mt-2">{rev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="my-12">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6">Related Enterprise Hardware</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedProductId(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-lg transition cursor-pointer group"
              >
                <div className="h-40 rounded-xl overflow-hidden bg-slate-50 mb-3">
                  <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600">{rel.name}</h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900">${rel.price}</span>
                  <span className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                    <span>View</span> <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Share Product</h4>
              <button onClick={() => setIsShareModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">Share {product.name} with your team or network.</p>

            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="bg-transparent text-xs text-slate-600 w-full outline-none"
              />
              <button
                onClick={handleShareCopy}
                className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Rate & Review Product</h4>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating Score</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-2 rounded-lg text-amber-500 hover:bg-amber-50"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-current' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Feedback & Experience</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about performance, build quality, or delivery speed..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* High-Resolution HD 4K Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto"
          >
            {/* Header with Back Button */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-white gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 text-indigo-400" />
                  <span>Back to Product</span>
                </button>
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-bold truncate">{product.name}</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Photo {activeImageIdx + 1} of {product.images.length}</p>
                </div>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
                title="Close Image Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reduced Responsive Image Container for User Responsiveness */}
            <div className="w-full h-56 sm:h-72 md:h-80 flex items-center justify-center p-2 sm:p-4 overflow-hidden my-2">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="max-h-52 sm:max-h-68 md:max-h-76 max-w-full object-contain rounded-2xl drop-shadow-2xl"
              />
            </div>

            {/* Lightbox Thumbnails */}
            <div className="flex gap-2 pt-2 border-t border-slate-800 overflow-x-auto max-w-full pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition shrink-0 bg-slate-950 p-1 flex items-center justify-center ${
                    activeImageIdx === idx ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="w-full pt-3 mt-1 flex items-center justify-between gap-3 border-t border-slate-800/80">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Specs</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setIsLightboxOpen(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart (${product.price})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
