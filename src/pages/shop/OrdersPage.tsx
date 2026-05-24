import React from 'react';
import { Package, Clock, CheckCircle, Truck, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { useRouter } from '../../router';

const orderStatuses = [
  { id: 'ORD-20260001', date: '22 May 2026', status: 'delivered', items: ['Frozen Sukuma Wiki × 2', 'Coconut Greens Blend × 1'], total: 'KES 0.00', statusLabel: 'Delivered' },
  { id: 'ORD-20260002', date: '18 May 2026', status: 'in-transit', items: ['Wellness Greens Mix × 1', 'Garlic Sukuma Steam Packs × 3'], total: 'KES 0.00', statusLabel: 'In Transit' },
  { id: 'ORD-20260003', date: '10 May 2026', status: 'processing', items: ['Frozen Terere × 2', 'Frozen Mixed African Greens × 1'], total: 'KES 0.00', statusLabel: 'Processing' },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  delivered: { icon: CheckCircle, color: 'text-forest-700', bg: 'bg-forest-100' },
  'in-transit': { icon: Truck, color: 'text-amber-700', bg: 'bg-amber-100' },
  processing: { icon: Clock, color: 'text-earth-600', bg: 'bg-earth-100' },
};

const trackingSteps = [
  { label: 'Order Placed', done: true },
  { label: 'Payment Confirmed', done: true },
  { label: 'Processing', done: true },
  { label: 'Dispatched', done: false },
  { label: 'Out for Delivery', done: false },
  { label: 'Delivered', done: false },
];

export default function OrdersPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <p className="section-label mb-2">Account</p>
          <h1 className="font-serif text-3xl text-forest-900">My Orders</h1>
        </div>

        {/* Notice Banner */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 mb-8 flex items-start gap-3">
          <Package size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Account Registration Coming Soon</p>
            <p className="text-amber-700 text-xs mt-0.5">
              Full order tracking, order history, and account management are currently in development. The orders shown below are sample data. Sign up for our newsletter to be notified when accounts go live.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-5">
            {orderStatuses.map((order) => {
              const cfg = statusConfig[order.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={order.id} className="bg-white rounded-3xl p-6 shadow-soft border border-earth-100">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-forest-900 text-sm">{order.id}</p>
                      <p className="text-earth-400 text-xs mt-0.5">Placed on {order.date}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon size={13} />
                      {order.statusLabel}
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    {order.items.map((item) => (
                      <p key={item} className="text-earth-600 text-sm flex items-center gap-2">
                        <ChevronRight size={13} className="text-earth-300" />
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-earth-100">
                    <span className="font-bold text-forest-900">{order.total}</span>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors">
                      View Details <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            {/* Order Tracking Sample */}
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h3 className="font-bold text-forest-900 mb-4 flex items-center gap-2">
                <Truck size={16} className="text-forest-600" />
                Track Order ORD-20260002
              </h3>
              <div className="space-y-0">
                {trackingSteps.map(({ label, done }, i) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        done ? 'bg-forest-600 border-forest-600' : 'border-earth-300 bg-white'
                      }`}>
                        {done && <svg viewBox="0 0 10 10" className="w-2.5 h-2.5"><path d="M1.5 5l2.5 2.5L8.5 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-6 mt-0.5 ${done ? 'bg-forest-400' : 'bg-earth-200'}`} />
                      )}
                    </div>
                    <p className={`text-sm pb-4 pt-0.5 ${done ? 'font-semibold text-forest-800' : 'text-earth-400'}`}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help? */}
            <div className="bg-forest-50 rounded-3xl p-5 border border-forest-100">
              <h3 className="font-bold text-forest-800 text-sm mb-2">Order Support</h3>
              <p className="text-earth-600 text-xs leading-relaxed mb-4">
                Issues with an order? Our team responds within 24 hours.
              </p>
              <div className="space-y-2">
                <a href="mailto:jambo@maratable.com" className="flex items-center gap-2 text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors">
                  <ArrowRight size={13} /> Email Support
                </a>
                <button onClick={() => navigate('/shop/faq')} className="flex items-center gap-2 text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors">
                  <ArrowRight size={13} /> FAQ & Help Centre
                </button>
                <button onClick={() => navigate('/shop/returns')} className="flex items-center gap-2 text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors">
                  <ArrowRight size={13} /> Returns & Refunds
                </button>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-earth-100">
              <h3 className="font-bold text-forest-900 text-sm mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'Continue Shopping', path: '/shop' },
                  { label: 'My Wishlist', path: '/shop/wishlist' },
                  { label: 'Shipping Policy', path: '/shop/shipping' },
                ].map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-forest-700 hover:bg-forest-50 transition-colors"
                  >
                    {label} <ChevronRight size={14} className="text-earth-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty state CTA if no orders */}
        <div className="mt-10 bg-forest-900 rounded-4xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-forest-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Ready to shop again?</h3>
                <p className="text-white/50 text-sm">Explore our latest products and seasonal specials.</p>
              </div>
            </div>
            <button onClick={() => navigate('/shop')} className="btn-amber whitespace-nowrap">
              Shop Now <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
