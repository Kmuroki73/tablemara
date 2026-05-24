import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Heart, Star, ChevronRight, Filter, SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from '../../router';
import { products, productCategories, getFeaturedProducts, getTrendingProducts } from '../../data/products';
import type { CartItem, Currency } from '../../types';

interface ShopHomeProps {
  cart: CartItem[];
  onAddToCart: (productId: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  currency: Currency;
}

const currencySymbols: Record<Currency, string> = { KES: 'KES', USD: '$', EUR: '€' };

function formatPrice(price: number, currency: Currency) {
  const sym = currencySymbols[currency];
  return `${sym} ${price.toFixed(2)}`;
}

const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1600',
    label: 'Premium African Greens',
    title: 'Farm-Fresh.\nFlash-Frozen.\nFull of Life.',
    sub: 'East Africa\'s finest leafy greens, preserved at peak nutrition for your modern kitchen.',
    cta: 'Shop Frozen Meals',
    category: 'frozen-meals',
  },
  {
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600',
    label: 'Ready in Minutes',
    title: 'Authentic Flavours.\nZero Compromise.',
    sub: 'Traditional East African recipes, ready to heat and serve in under 10 minutes.',
    cta: 'Shop Ready Meals',
    category: 'ready-meals',
  },
];

export default function ShopHomePage({ cart, onAddToCart, wishlist, onToggleWishlist, currency }: ShopHomeProps) {
  const { navigate, path } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') ?? 'all';
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Sync category from URL query string whenever the router path changes
  const prevPath = useRef(path);
  useEffect(() => {
    if (path === prevPath.current) return;
    prevPath.current = path;
    const search = path.includes('?') ? path.slice(path.indexOf('?')) : '';
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    if (cat) {
      setActiveCategory(cat);
      setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else if (!search) {
      setActiveCategory('all');
    }
  }, [path]);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/50 to-transparent" />
          </div>
        ))}
        <div className="relative h-full flex items-center">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-xl">
              <span className="tag-amber mb-4 inline-flex animate-fade-in">{slide.label}</span>
              <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4 whitespace-pre-line animate-fade-up">
                {slide.title}
              </h1>
              <p className="text-white/65 text-base font-light mb-8 leading-relaxed animate-fade-up">
                {slide.sub}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => { setActiveCategory(slide.category); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-amber"
                >
                  {slide.cta} <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-white"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="bg-white border-b border-earth-100 py-4 sticky top-[calc(2.25rem+4rem)] z-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex gap-3 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === 'all' ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-700 hover:bg-forest-50 border border-earth-200'
              }`}
            >
              All Products
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-700 hover:bg-forest-50 border border-earth-200'
                }`}
              >
                {cat.label}
                <span className={`text-xs ${activeCategory === cat.id ? 'text-forest-200' : 'text-earth-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-earth-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="section-label mb-1">Trending Now</p>
              <h2 className="text-2xl font-bold text-forest-900">Most Popular</h2>
            </div>
            <button onClick={() => setActiveCategory('all')} className="btn-ghost text-sm">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-none">
            {trending.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-52 card cursor-pointer group"
                onClick={() => navigate(`/shop/product/${product.slug}`)}
              >
                <div className="relative h-44 overflow-hidden bg-forest-50">
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 z-10 tag-amber">{product.badge}</span>
                  )}
                  <button
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  >
                    <Heart size={14} className={wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                  </button>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-earth-400 mb-1 capitalize">{product.category.replace(/-/g, ' ')}</p>
                  <h3 className="font-bold text-forest-900 text-xs leading-tight mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
                    <span className="text-2xs text-earth-400">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-forest-700">{formatPrice(product.price, currency)}</span>
                    <button
                      className="text-xs bg-forest-100 text-forest-700 px-3 py-1.5 rounded-full font-semibold hover:bg-forest-700 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <p className="section-label mb-2">Browse by Category</p>
            <h2 className="text-2xl font-bold text-forest-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="group relative rounded-3xl overflow-hidden aspect-square shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-forest-900/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center">
                  <p className="text-white font-bold text-xs leading-tight">{cat.label}</p>
                  <p className="text-white/60 text-2xs mt-0.5">{cat.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-12 bg-earth-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {/* Header with filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-forest-900">
                {activeCategory === 'all' ? 'All Products' : productCategories.find((c) => c.id === activeCategory)?.label ?? 'Products'}
              </h2>
              <p className="text-earth-500 text-sm">{sortedProducts.length} products found</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-earth-200 text-sm font-medium text-forest-700 hover:border-forest-300 transition-colors"
              >
                <Filter size={15} /> Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white rounded-full border border-earth-200 text-sm font-medium text-forest-700 focus:outline-none focus:border-forest-300"
              >
                <option value="featured">Featured</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-white rounded-3xl p-6 shadow-soft mb-8 border border-earth-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-forest-800 flex items-center gap-2">
                  <SlidersHorizontal size={16} /> Filter Products
                </h3>
                <button onClick={() => setFilterOpen(false)} className="p-1 text-earth-400 hover:text-forest-700">
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'all' ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-700 border border-earth-200 hover:bg-forest-50'}`}
                >
                  All
                </button>
                {productCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setFilterOpen(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-700 border border-earth-200 hover:bg-forest-50'}`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="card cursor-pointer group"
                onClick={() => navigate(`/shop/product/${product.slug}`)}
              >
                <div className="relative h-52 overflow-hidden bg-forest-50">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 tag-amber text-2xs">{product.badge}</span>
                  )}
                  <button
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/85 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                    aria-label="Wishlist"
                  >
                    <Heart size={14} className={wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                  </button>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-forest-500 font-medium mb-1.5 capitalize">{product.category.replace(/-/g, ' ')}</p>
                  <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-earth-500 text-xs leading-relaxed line-clamp-2 mb-4">{product.shortDescription}</p>
                  {/* Health benefit */}
                  {product.healthBenefits[0] && (
                    <p className="text-2xs text-forest-600 bg-forest-50 px-2.5 py-1 rounded-full inline-block mb-4 border border-forest-100">
                      {product.healthBenefits[0]}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                    <span className="text-2xs text-earth-400 ml-1">(18)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-800">{formatPrice(product.price, currency)}</span>
                    <button
                      className="flex items-center gap-1.5 bg-forest-700 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-forest-600 transition-all hover:-translate-y-0.5"
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16 text-earth-400">No products found.</div>
          )}
        </div>
      </section>

      {/* Featured / Recommended */}
      <section className="py-14 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <p className="section-label mb-2">Our Favourites</p>
            <h2 className="text-2xl font-bold text-forest-900">Staff Picks</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.slice(0, 4).map((product) => (
              <div key={product.id} className="card cursor-pointer group" onClick={() => navigate(`/shop/product/${product.slug}`)}>
                <div className="relative h-48 overflow-hidden bg-forest-50">
                  {product.badge && <span className="absolute top-2.5 left-2.5 z-10 tag-forest text-2xs">{product.badge}</span>}
                  <button
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/85 rounded-full flex items-center justify-center hover:bg-white transition-all"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  >
                    <Heart size={13} className={wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                  </button>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-forest-900 text-xs leading-tight mb-1.5 group-hover:text-forest-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-forest-700">{formatPrice(product.price, currency)}</span>
                    <button
                      className="text-xs bg-forest-100 text-forest-700 px-3 py-1.5 rounded-full font-semibold hover:bg-forest-700 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
