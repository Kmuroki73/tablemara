import React from 'react';
import { Heart, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from '../../router';
import { products } from '../../data/products';
import type { CartItem, Currency } from '../../types';

interface WishlistPageProps {
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  cart: CartItem[];
  onAddToCart: (productId: string) => void;
  currency: Currency;
}

const currencySymbols: Record<Currency, string> = { KES: 'KES', USD: '$', EUR: '€' };
function formatPrice(price: number, currency: Currency) {
  return `${currencySymbols[currency]} ${price.toFixed(2)}`;
}

export default function WishlistPage({ wishlist, onToggleWishlist, cart, onAddToCart, currency }: WishlistPageProps) {
  const { navigate } = useRouter();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center">
          <Heart size={30} className="text-earth-400" />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-forest-900 text-xl mb-2">Your wishlist is empty</h2>
          <p className="text-earth-500 text-sm">Save products you love to your wishlist.</p>
        </div>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          Explore Products <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-earth-500 hover:text-forest-700 text-sm transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Shop
          </button>
          <span className="text-earth-300">/</span>
          <h1 className="font-bold text-forest-900 text-xl flex items-center gap-2">
            <Heart size={18} className="text-red-400 fill-red-400" />
            Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => {
            const inCart = cart.some((i) => i.product.id === product.id);
            return (
              <div key={product.id} className="card group">
                <div className="relative h-52 overflow-hidden bg-forest-50 cursor-pointer" onClick={() => navigate(`/shop/product/${product.slug}`)}>
                  {product.badge && <span className="absolute top-3 left-3 z-10 tag-amber text-2xs">{product.badge}</span>}
                  <button
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  >
                    <Heart size={15} className="text-red-500 fill-red-500" />
                  </button>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-forest-500 mb-1 capitalize font-medium">{product.category.replace(/-/g, ' ')}</p>
                  <h3
                    className="font-bold text-forest-900 text-sm leading-tight mb-2 cursor-pointer hover:text-forest-600 transition-colors"
                    onClick={() => navigate(`/shop/product/${product.slug}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-earth-500 text-xs leading-relaxed mb-4 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-800">{formatPrice(product.price, currency)}</span>
                    <button
                      onClick={() => onAddToCart(product.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5 ${
                        inCart
                          ? 'bg-forest-100 text-forest-700'
                          : 'bg-forest-700 text-white hover:bg-forest-600'
                      }`}
                    >
                      <ShoppingCart size={13} />
                      {inCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
