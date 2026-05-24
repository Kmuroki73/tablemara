import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, ArrowRight, Tag, Shield, Truck } from 'lucide-react';
import { useRouter } from '../../router';
import type { CartItem, Currency } from '../../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  currency: Currency;
}

const currencySymbols: Record<Currency, string> = { KES: 'KES', USD: '$', EUR: '€' };
function formatPrice(price: number, currency: Currency) {
  return `${currencySymbols[currency]} ${price.toFixed(2)}`;
}

const paymentMethods = [
  { name: 'M-Pesa', color: 'bg-green-100 text-green-800' },
  { name: 'Visa', color: 'bg-blue-100 text-blue-800' },
  { name: 'Mastercard', color: 'bg-red-100 text-red-800' },
  { name: 'PayPal', color: 'bg-sky-100 text-sky-800' },
  { name: 'Google Pay', color: 'bg-gray-100 text-gray-800' },
  { name: 'Apple Pay', color: 'bg-gray-900 text-white' },
];

export default function CartPage({ cart, onUpdateQty, onRemove, currency }: CartPageProps) {
  const { navigate } = useRouter();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center">
          <ShoppingCart size={30} className="text-earth-400" />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-forest-900 text-xl mb-2">Your cart is empty</h2>
          <p className="text-earth-500 text-sm">Explore our premium East African wellness products.</p>
        </div>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          Continue Shopping <ArrowRight size={16} />
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
            Continue Shopping
          </button>
          <span className="text-earth-300">/</span>
          <h1 className="font-bold text-forest-900 text-xl">Shopping Cart ({cart.length})</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white rounded-3xl p-5 shadow-soft flex gap-4">
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden bg-earth-50 flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/shop/product/${item.product.slug}`)}
                >
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-forest-500 mb-0.5 capitalize">{item.product.category.replace(/-/g, ' ')}</p>
                      <h3
                        className="font-bold text-forest-900 text-sm leading-tight cursor-pointer hover:text-forest-600 transition-colors"
                        onClick={() => navigate(`/shop/product/${item.product.slug}`)}
                      >
                        {item.product.name}
                      </h3>
                    </div>
                    <button onClick={() => onRemove(item.product.id)} className="text-earth-300 hover:text-red-400 transition-colors flex-shrink-0 p-1">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="text-earth-500 text-xs mt-1 line-clamp-1">{item.product.shortDescription}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-earth-50 rounded-full px-2 py-1 border border-earth-200">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors text-forest-700"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-forest-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors text-forest-700"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-forest-900">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="bg-white rounded-3xl p-5 shadow-soft">
              <p className="text-sm font-semibold text-forest-800 mb-3 flex items-center gap-2">
                <Tag size={15} /> Apply Promo Code
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="input-field flex-1"
                />
                <button className="btn-secondary whitespace-nowrap">Apply</button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h2 className="font-bold text-forest-900 text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-earth-600">
                  <span>Subtotal ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                  <span className="font-medium text-forest-800">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-earth-600">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-forest-600' : 'text-forest-800'}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping, currency)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-xl border border-amber-100">
                    Add {formatPrice(2000 - subtotal, currency)} more for free delivery!
                  </p>
                )}
                <div className="divider" />
                <div className="flex justify-between font-bold text-forest-900">
                  <span>Total</span>
                  <span className="text-xl">{formatPrice(total, currency)}</span>
                </div>
              </div>
              <button className="w-full btn-primary justify-center text-base py-4">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <div className="mt-4 flex items-center gap-2 text-xs text-earth-400 justify-center">
                <Shield size={13} />
                <span>Secure checkout. Your data is protected.</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-forest-50 rounded-3xl p-5 border border-forest-100">
              <div className="flex items-center gap-3 mb-2">
                <Truck size={16} className="text-forest-600" />
                <p className="font-semibold text-forest-800 text-sm">Cold-Chain Delivery</p>
              </div>
              <p className="text-earth-600 text-xs leading-relaxed">
                All products are shipped in temperature-controlled packaging to maintain freshness and quality.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl p-5 shadow-soft">
              <p className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-3">Accepted Payments</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map(({ name, color }) => (
                  <span key={name} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${color}`}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
