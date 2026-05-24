import React from 'react';
import { Link, useRouter } from '../../router';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';

const social = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Twitter, label: 'X', href: 'https://x.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

const trust = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Cold-chain delivery across Kenya' },
  { icon: Shield, title: 'Food Safe', desc: 'KEBS certified quality standards' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free quality guarantee' },
  { icon: Headphones, title: 'Support', desc: 'Dedicated customer care team' },
];

const paymentMethods = ['M-Pesa', 'Visa', 'Mastercard', 'PayPal', 'Google Pay', 'Apple Pay'];

export default function ShopFooter() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-forest-950 text-white mt-16">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trust.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest-800/60 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-forest-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/45 leading-snug mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs">MT<span className="text-2xs font-medium opacity-75">g</span></span>
              </div>
              <div>
                <span className="font-bold text-sm block">MaraTable Group</span>
                <span className="text-white/35 text-2xs uppercase tracking-widest">Wellness Shop</span>
              </div>
            </div>
            <p className="text-white/45 text-xs leading-relaxed mb-5">
              Premium East African wellness foods for the modern household.
            </p>
            <div className="flex gap-2">
              {social.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigate('/shop')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=frozen-meals')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Frozen Meals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=ready-meals')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Ready Meals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=healthy-kids')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Healthy Kids
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=sun-dried-fruits')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Sun Dried Fruits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=frozen-fruits')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Frozen Fruits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=organic-foods')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Organic Foods
                </button>
              </li>
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">Help</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigate('/shop/orders')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  My Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop/wishlist')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop/shipping')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop/returns')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop/faq')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigate('/')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  maratable.com
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/research')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Research
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/responsibility')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Responsibility
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="text-white/45 hover:text-white text-xs transition-colors text-left">
                  Contact
                </button>
              </li>
              <li>
                <a href="mailto:jambo@maratable.com" className="text-white/45 hover:text-white text-xs transition-colors block">
                  jambo@maratable.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} MaraTable Group. All rights reserved.</p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white/30 text-xs mr-2">We accept:</span>
              {paymentMethods.map((pm) => (
                <span key={pm} className="px-2.5 py-1 bg-white/8 rounded-md text-xs text-white/50 font-medium border border-white/10">
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
