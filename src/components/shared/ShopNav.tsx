import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '../../router';
import type { Currency } from '../../types';

interface ShopNavProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

const categories = [
  { label: 'Frozen Meals', value: 'frozen-meals' },
  { label: 'Ready Meals', value: 'ready-meals' },
  { label: 'Healthy Kids', value: 'healthy-kids' },
  { label: 'Sun Dried Fruits', value: 'sun-dried-fruits' },
  { label: 'Frozen Fruits', value: 'frozen-fruits' },
  { label: 'Organic Foods', value: 'organic-foods' },
];

const currencies: Currency[] = ['KES', 'USD', 'EUR'];

export default function ShopNav({ cartCount, wishlistCount, currency, onCurrencyChange }: ShopNavProps) {
  const { navigate, path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [path]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white shadow-medium' : 'bg-white border-b border-earth-100'
        }`}
      >
        {/* Top utility bar */}
        <div className="bg-forest-900 text-white/70 text-xs">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ArrowLeft size={12} />
              <span>Back to maratable.com</span>
            </Link>
            <div className="flex items-center gap-4">
              <span>Free delivery on orders over KES 2,000</span>
              <a href="mailto:jambo@maratable.com" className="hover:text-white transition-colors hidden sm:inline">
                jambo@maratable.com
              </a>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/shop" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-forest-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">MT<span className="text-2xs font-medium opacity-75">g</span></span>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="font-bold text-sm text-forest-900 tracking-tight">MaraTable Group</span>
                <span className="text-2xs text-earth-400 uppercase tracking-widest">Shop</span>
              </div>
            </Link>

            {/* Category Nav - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center px-4 max-w-xl">
              <div
                className="relative"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-forest-700 hover:bg-forest-50 transition-colors">
                  All Categories <ChevronDown size={14} className="opacity-60" />
                </button>
                {categoryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-strong border border-earth-100 py-2 z-50">
                    <button
                      onClick={() => navigate('/shop')}
                      className="w-full text-left px-4 py-2.5 text-sm text-forest-600 font-semibold hover:bg-forest-50 transition-colors"
                    >
                      All Products
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => navigate(`/shop?category=${c.value}`)}
                        className="w-full text-left px-4 py-2.5 text-sm text-forest-700 hover:bg-forest-50 hover:text-forest-600 transition-colors"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {categories.slice(0, 4).map((c) => (
                <button
                  key={c.value}
                  onClick={() => navigate(`/shop?category=${c.value}`)}
                  className="px-3 py-2 rounded-full text-sm text-forest-600 hover:bg-forest-50 transition-colors hidden xl:block whitespace-nowrap"
                >
                  {c.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-forest-600 hover:bg-forest-50 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-earth-200 text-xs font-semibold text-forest-700 hover:border-forest-300 transition-colors"
                >
                  {currency} <ChevronDown size={11} />
                </button>
                {currencyOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-strong border border-earth-100 py-1 z-50 w-20">
                      {currencies.map((c) => (
                        <button
                          key={c}
                          onClick={() => { onCurrencyChange(c); setCurrencyOpen(false); }}
                          className={`w-full px-3 py-2 text-sm text-left font-medium transition-colors ${
                            currency === c ? 'text-forest-600 bg-forest-50' : 'text-forest-700 hover:bg-earth-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/shop/wishlist')}
                className="relative p-2 text-forest-600 hover:bg-forest-50 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-2xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/shop/cart')}
                className="relative flex items-center gap-2 bg-forest-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-forest-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-amber-400 text-forest-900 text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-forest-600 hover:bg-forest-50 rounded-full transition-colors"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 border-t border-earth-100 pt-3">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-3 bg-earth-50 rounded-2xl text-sm text-forest-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-forest-300"
                />
                <button onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-forest-700 p-1">
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-earth-100 shadow-strong max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-1">
              <button
                onClick={() => navigate('/shop')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-forest-700 hover:bg-forest-50 transition-colors"
              >
                All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => navigate(`/shop?category=${c.value}`)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-forest-600 hover:bg-forest-50 transition-colors"
                >
                  {c.label}
                </button>
              ))}
              <div className="pt-2 border-t border-earth-100 flex gap-2">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => onCurrencyChange(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      currency === c ? 'bg-forest-700 text-white border-forest-700' : 'border-earth-200 text-forest-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[calc(2.25rem+4rem)]" />
    </>
  );
}
