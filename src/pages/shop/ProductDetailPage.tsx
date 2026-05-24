import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Share2, ChevronRight, ChevronDown, ChevronUp, Plus, Minus, Leaf, Zap, Thermometer, ChefHat } from 'lucide-react';
import { useRouter } from '../../router';
import { getProductBySlug, products } from '../../data/products';
import type { CartItem, Currency } from '../../types';

interface ProductDetailProps {
  slug: string;
  cart: CartItem[];
  onAddToCart: (productId: string, qty?: number) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  currency: Currency;
}

const currencySymbols: Record<Currency, string> = { KES: 'KES', USD: '$', EUR: '€' };
function formatPrice(price: number, currency: Currency) {
  return `${currencySymbols[currency]} ${price.toFixed(2)}`;
}

export default function ProductDetailPage({ slug, cart, onAddToCart, wishlist, onToggleWishlist, currency }: ProductDetailProps) {
  const { navigate, back } = useRouter();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition' | 'preparation'>('description');
  const [shared, setShared] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="text-earth-600">Product not found.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const isInCart = cart.some((i) => i.product.id === product.id);
  const inWishlist = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = async () => {
    try {
      await navigator.share({ title: product.name, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-earth-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 text-xs text-earth-400">
            <button onClick={() => navigate('/shop')} className="hover:text-forest-600 transition-colors">Shop</button>
            <ChevronRight size={12} />
            <button onClick={() => navigate(`/shop?category=${product.category}`)} className="hover:text-forest-600 transition-colors capitalize">
              {product.category.replace(/-/g, ' ')}
            </button>
            <ChevronRight size={12} />
            <span className="text-forest-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Main */}
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <button onClick={back} className="flex items-center gap-2 text-earth-500 hover:text-forest-700 text-sm mb-6 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <div className="relative rounded-4xl overflow-hidden aspect-square bg-forest-50 shadow-medium mb-4 group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.badge && (
                  <span className="absolute top-5 left-5 tag-amber">{product.badge}</span>
                )}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-all"
                >
                  <Heart size={18} className={inWishlist ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                </button>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                        selectedImage === i ? 'border-forest-500 shadow-forest' : 'border-transparent hover:border-forest-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-sm text-forest-500 font-medium capitalize mb-2">
                {product.category.replace(/-/g, ' ')}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-forest-900 leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="text-sm text-earth-500">4.9 (124 reviews)</span>
              </div>
              <p className="text-earth-600 leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Health Benefits Quick View */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.healthBenefits.slice(0, 3).map((b) => (
                  <span key={b} className="flex items-center gap-1.5 bg-forest-50 border border-forest-100 text-forest-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    <Leaf size={11} /> {b}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-forest-900">{formatPrice(product.price, currency)}</span>
                <span className="text-earth-400 text-sm line-through">{formatPrice(product.price + 50, currency)}</span>
                <span className="tag-forest">Coming Soon</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-semibold text-forest-700">Quantity:</label>
                <div className="flex items-center gap-2 bg-earth-50 rounded-full px-2 py-1 border border-earth-200">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors text-forest-700">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-forest-900">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors text-forest-700">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => onAddToCart(product.id, qty)}
                  className="flex-1 flex items-center justify-center gap-2 bg-forest-700 text-white py-4 rounded-full font-semibold hover:bg-forest-600 transition-all hover:-translate-y-0.5 hover:shadow-forest"
                >
                  <ShoppingCart size={18} />
                  {isInCart ? 'Update Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all hover:-translate-y-0.5 ${
                    inWishlist ? 'border-red-200 bg-red-50' : 'border-earth-200 hover:border-forest-300'
                  }`}
                >
                  <Heart size={20} className={inWishlist ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-earth-200 hover:border-forest-300 transition-all hover:-translate-y-0.5"
                >
                  <Share2 size={18} className="text-earth-400" />
                </button>
              </div>
              {shared && <p className="text-xs text-forest-500 -mt-4 mb-4">Link copied to clipboard!</p>}

              {/* Info icons */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-forest-50 rounded-2xl border border-forest-100">
                {[
                  { icon: Thermometer, text: 'Store at -18°C' },
                  { icon: Zap, text: 'Ready in 5–10 min' },
                  { icon: ChefHat, text: 'Zero additives' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                    <Icon size={16} className="text-forest-600" />
                    <span className="text-2xs text-forest-700 font-medium leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {/* Tab Nav */}
          <div className="flex gap-1 border-b border-earth-200 mb-8 overflow-x-auto">
            {(['description', 'ingredients', 'nutrition', 'preparation'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'border-forest-700 text-forest-700'
                    : 'border-transparent text-earth-500 hover:text-forest-600'
                }`}
              >
                {tab === 'preparation' ? 'How to Prepare' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div>
                <p className="text-earth-700 leading-relaxed mb-6">{product.description}</p>
                <div>
                  <h3 className="font-bold text-forest-900 mb-3">Health Benefits</h3>
                  <ul className="space-y-2">
                    {product.healthBenefits.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-earth-700 text-sm">
                        <div className="w-5 h-5 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#156344" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="font-bold text-forest-900 mb-3">Ingredients</h3>
                <p className="text-earth-700 leading-relaxed bg-earth-50 rounded-2xl p-4 border border-earth-100">
                  {product.ingredients.join(', ')}
                </p>
                <p className="text-xs text-earth-400 mt-3">
                  All Mara Table products contain zero artificial preservatives, colours, or flavours.
                </p>
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div>
                <h3 className="font-bold text-forest-900 mb-4">Nutrition Highlights per 100g</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.nutritionHighlights.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between bg-earth-50 rounded-2xl px-5 py-4 border border-earth-100">
                      <span className="text-sm text-earth-600 font-medium">{label}</span>
                      <span className="text-sm font-bold text-forest-800">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-earth-400 mt-4">*Percentage Daily Values based on a 2,000 calorie diet.</p>
              </div>
            )}
            {activeTab === 'preparation' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-forest-900 mb-2 flex items-center gap-2">
                    <ChefHat size={16} className="text-forest-600" /> How to Prepare
                  </h3>
                  <p className="text-earth-700 leading-relaxed">{product.preparationInstructions}</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                  <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <Thermometer size={16} /> Storage Instructions
                  </h3>
                  <p className="text-amber-700 text-sm leading-relaxed">{product.storageInstructions}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 bg-earth-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <h2 className="text-xl font-bold text-forest-900 mb-6">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rp) => (
                <div
                  key={rp.id}
                  className="card cursor-pointer group"
                  onClick={() => navigate(`/shop/product/${rp.slug}`)}
                >
                  <div className="relative h-44 overflow-hidden bg-forest-50">
                    {rp.badge && <span className="absolute top-2.5 left-2.5 z-10 tag-amber text-2xs">{rp.badge}</span>}
                    <button
                      className="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/85 rounded-full flex items-center justify-center hover:bg-white transition-all"
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(rp.id); }}
                    >
                      <Heart size={12} className={wishlist.includes(rp.id) ? 'text-red-500 fill-red-500' : 'text-earth-400'} />
                    </button>
                    <img src={rp.images[0]} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-forest-900 text-xs leading-tight mb-2 group-hover:text-forest-600 transition-colors">{rp.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-forest-700">{formatPrice(rp.price, currency)}</span>
                      <button
                        className="text-xs bg-forest-100 text-forest-700 px-3 py-1.5 rounded-full font-semibold hover:bg-forest-700 hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); onAddToCart(rp.id); }}
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
      )}
    </div>
  );
}
