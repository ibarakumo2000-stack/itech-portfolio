import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  ShoppingBag,
  Heart,
  Scale,
  Sparkles,
  Zap,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductId,
    setCustomerPage,
    addToCart,
    toggleWishlist,
    wishlist,
    toggleCompare,
    compareList,
  } = useApp();

  const highestPriceInCatalog = Math.max(3000, ...products.map((p) => p.price || 0));
  const [priceMax, setPriceMax] = useState<number>(highestPriceInCatalog);
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allBrands = ['ALL', ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))];

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
      const matchesPrice = (p.price || 0) <= priceMax;
      const matchesBrand = selectedBrand === 'ALL' || p.brand === selectedBrand;
      const matchesStock = !inStockOnly || p.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Title Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl mb-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Enterprise Catalog</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Enterprise Hardware & Flagships</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Certified direct stock with 30-minute live courier dispatch, verified OTP delivery handover, and full enterprise warranty.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              !selectedCategory ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Tech
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition hidden sm:inline-block ${
                selectedCategory === c.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Store
              </span>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand('ALL');
                  setPriceMax(3000);
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="text-[11px] text-indigo-600 hover:underline font-bold"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition ${
                    !selectedCategory ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                        selectedCategory === c.id
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Max Budget:</span>
                <span className="font-mono text-indigo-600">${priceMax}</span>
              </div>
              <input
                type="range"
                min="50"
                max={highestPriceInCatalog}
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>$50</span>
                <span>${highestPriceInCatalog.toLocaleString()}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Manufacturer Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
              >
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'ALL' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Search + Sort + Products Grid */}
        <div className="lg:col-span-9 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-slate-900">{filteredProducts.length}</strong> verified devices
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated (★)</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products List or Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing filters to see all available hardware inventory.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setCustomerPage('cust-product-details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative bg-slate-100 rounded-xl overflow-hidden h-52 mb-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {prod.isFlashSale && (
                      <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                        Flash
                      </div>
                    )}
                    {prod.images.length > 1 && (
                      <div className="absolute bottom-2.5 left-2.5 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {prod.images.length} photos
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition ${
                        wishlist.includes(prod.id)
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 text-slate-700 hover:text-rose-500'
                      }`}
                      title={wishlist.includes(prod.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>{prod.brand}</span>
                        <span className="text-amber-500 font-normal">★ {prod.rating}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-black text-slate-900 font-mono">${(prod.price ?? 0).toFixed(2)}</div>
                        {Boolean(prod.originalPrice && prod.originalPrice > prod.price) && (
                          <div className="text-[10px] text-slate-400 line-through font-mono">
                            ${(prod.originalPrice ?? 0).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleCompare(prod)}
                          className={`p-2 rounded-lg border text-xs transition ${
                            compareList.some((c) => c.id === prod.id)
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                          title="Compare"
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addToCart(prod)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View Mode
            <div className="space-y-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setCustomerPage('cust-product-details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-lg transition flex flex-col sm:flex-row items-center gap-5 group cursor-pointer"
                >
                  <div className="w-full sm:w-44 h-36 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    {prod.images.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {prod.images.length} photos
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.brand}</span>
                      <span className="text-xs text-amber-500 font-bold">★ {prod.rating} ({prod.reviewCount})</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{prod.description}</p>
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Stock: {prod.stock} units available for 30-min courier
                    </div>
                  </div>

                  <div
                    className="sm:border-l sm:border-slate-100 sm:pl-6 text-center sm:text-right space-y-2 shrink-0 w-full sm:w-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-2xl font-black text-slate-900 font-mono">${(prod.price ?? 0).toFixed(2)}</div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
