import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerPage } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Zap,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Building2,
  Cpu,
  Globe,
  Award,
  Radio,
  ShoppingBag,
  Heart,
  ChevronDown,
} from 'lucide-react';

export const LandingPages: React.FC<{ activeLandingPage?: CustomerPage; activeSubPage?: CustomerPage }> = ({
  activeLandingPage,
  activeSubPage,
}) => {
  const currentSubPage = activeLandingPage || activeSubPage || 'landing-full';

  const {
    products,
    categories,
    setSelectedProductId,
    setSelectedCategory,
    setCustomerPage,
    addToCart,
    toggleWishlist,
    wishlist,
    addToast,
  } = useApp();

  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const featuredList = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashSaleList = products.filter((p) => p.isFlashSale).slice(0, 4);
  const recommendedList = products.slice(0, 4);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      addToast('warning', 'Missing Fields', 'Please provide your email and message.');
      return;
    }
    setContactSubmitted(true);
    addToast('success', 'Message Received', 'Our enterprise team will reply within 2 hours.');
  };

  // Section 1: Hero Section View
  const HeroSectionView = () => (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white py-14 sm:py-20 px-4 sm:px-6 rounded-3xl my-4 mx-2 sm:mx-6 shadow-2xl border border-slate-800">
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 px-3 py-1.5 rounded-full text-indigo-300 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Next-Gen Tech • 30-Min Express Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Next-Generation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
              Enterprise Tech & Fast Logistics
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
            Order flagship laptops, 5G smartphones, studio acoustics, and AI hardware with rapid delivery and secure OTP verification.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setCustomerPage('cust-products')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-xs sm:text-sm transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Tech Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCustomerPage('cust-orders')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm transition"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>My Orders & Status</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div>
              <div className="text-xl font-black text-white">30 Min</div>
              <div className="text-[11px] text-slate-400">Avg. Express ETA</div>
            </div>
            <div>
              <div className="text-xl font-black text-indigo-400">99.98%</div>
              <div className="text-[11px] text-slate-400">On-Time Accuracy</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400">Verified</div>
              <div className="text-[11px] text-slate-400">Doorstep OTP</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Card Preview */}
        <div className="lg:col-span-5">
          <div
            onClick={() => {
              const targetProd = featuredList[0] || products[0];
              if (targetProd) {
                setSelectedProductId(targetProd.id);
                setCustomerPage('cust-product-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-xl hover:border-indigo-500 transition duration-300 cursor-pointer group"
          >
            <div className="relative rounded-xl overflow-hidden border border-slate-700 mb-4 bg-slate-900">
              <img
                src={featuredList[0]?.images[0] || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80"}
                alt={featuredList[0]?.name || "Quantum Pro Max"}
                className="w-full h-44 object-cover object-center group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Featured Flagship</span>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {featuredList[0]?.name || "I-Tech Quantum Pro Max 5G"}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  ${(featuredList[0]?.price ?? 1199).toFixed(2)} • In Stock
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const targetProd = featuredList[0] || products[0];
                if (targetProd) {
                  setSelectedProductId(targetProd.id);
                  setCustomerPage('cust-product-details');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <span>View Product Specs & Images</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Section 2: Categories Showcase
  const CategoriesSectionView = () => (
    <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Browse Tech Categories</h2>
          <p className="text-xs text-slate-500 mt-0.5">Direct from certified manufacturers with express delivery guarantees.</p>
        </div>
        <button
          onClick={() => setCustomerPage('cust-categories')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <span>All Categories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCustomerPage('cust-products');
            }}
            className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition text-center cursor-pointer space-y-2"
          >
            <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-xl object-cover mx-auto" />
            <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition truncate">
              {cat.name}
            </div>
            <div className="text-[10px] text-slate-400">{cat.productCount || 12} items</div>
          </div>
        ))}
      </div>
    </section>
  );

  // Section 3: Featured Products
  const FeaturedProductsSectionView = () => (
    <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Featured Flagships</h2>
          <p className="text-xs text-slate-500 mt-0.5">Top-rated enterprise hardware ready for 30-minute dispatch.</p>
        </div>
        <button
          onClick={() => setCustomerPage('cust-products')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <span>View All ({products.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredList.map((prod) => (
          <div
            key={prod.id}
            onClick={() => {
              setSelectedProductId(prod.id);
              setCustomerPage('cust-product-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative p-4">
              <div className="rounded-xl overflow-hidden bg-slate-100 h-44">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(prod.id);
                }}
                className={`absolute top-6 right-6 p-2 rounded-full backdrop-blur-xs transition ${
                  wishlist.includes(prod.id)
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/80 text-slate-700 hover:text-rose-500'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 pt-0 space-y-3">
              <div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase">{prod.brand}</div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mt-0.5">
                  {prod.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono font-bold text-slate-900">${(prod.price ?? 0).toFixed(2)}</span>
                  {Boolean(prod.originalPrice && prod.originalPrice > prod.price) && (
                    <span className="font-mono text-slate-400 line-through text-[11px]">
                      ${(prod.originalPrice ?? 0).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(prod, 1);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Section 4: Flash Deals
  const FlashSalesSectionView = () => (
    <section className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 py-12 px-4 sm:px-6 my-6 border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500 text-white rounded-xl">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Flash Deals & Discounts</h2>
              <p className="text-xs text-slate-600 mt-0.5">Limited inventory discounted up to 35%.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleList.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProductId(prod.id);
                setCustomerPage('cust-product-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="rounded-xl overflow-hidden bg-slate-100 h-40">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-rose-600 uppercase">Flash Discount</div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {prod.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono font-bold text-emerald-600">${(prod.price ?? 0).toFixed(2)}</span>
                  {Boolean(prod.originalPrice) && (
                    <span className="font-mono text-slate-400 line-through text-[11px]">${(prod.originalPrice ?? 0).toFixed(2)}</span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(prod, 1);
                }}
                className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Claim Deal
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Section 5: FAQs
  const FaqsSectionView = () => (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        <p className="text-xs text-slate-500 mt-1">Clear answers on dispatch, OTP verification, and warranty.</p>
      </div>

      <div className="space-y-3">
        {[
          {
            q: 'How does doorstep OTP verification work?',
            a: 'When you place an order, a unique 6-digit security OTP is issued. On arrival, present this OTP to your courier for verification and instant parcel handover.',
          },
          {
            q: 'What is the average delivery speed?',
            a: 'Metro areas receive deliveries within 30 minutes via our active courier fleet.',
          },
          {
            q: 'Are all hardware products genuine with warranty?',
            a: 'Yes, 100% of devices on I-Tech are direct tier-one certified with full official manufacturer warranties.',
          },
        ].map((faq, index) => (
          <div
            key={index}
            onClick={() => setFaqOpen(faqOpen === index ? null : index)}
            className="bg-white rounded-2xl border border-slate-200 p-4 cursor-pointer transition shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-xs text-slate-900">
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`} />
            </div>
            {faqOpen === index && <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-100">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {currentSubPage === 'landing-hero' && <HeroSectionView />}
      {currentSubPage === 'landing-categories' && <CategoriesSectionView />}
      {currentSubPage === 'landing-featured' && <FeaturedProductsSectionView />}
      {currentSubPage === 'landing-flash-sales' && <FlashSalesSectionView />}
      {currentSubPage === 'landing-faqs' && <FaqsSectionView />}
      {(currentSubPage === 'landing-full' || currentSubPage === 'landing-why-us' || currentSubPage === 'landing-recommended' || currentSubPage === 'landing-testimonials' || currentSubPage === 'landing-partners' || currentSubPage === 'landing-contact' || currentSubPage === 'landing-newsletter') && (
        <>
          <HeroSectionView />
          <CategoriesSectionView />
          <FeaturedProductsSectionView />
          <FlashSalesSectionView />
          <FaqsSectionView />
        </>
      )}
    </div>
  );
};
