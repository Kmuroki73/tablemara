import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, ArrowRight, MessageCircle, Mail, Package } from 'lucide-react';
import { Link, useRouter } from '../../router';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  category: string;
  icon: React.ElementType;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    category: 'Orders & Shopping',
    icon: Package,
    items: [
      {
        q: 'How do I place an order?',
        a: 'Browse our product catalogue, select the items you want, choose your quantity, and click "Add to Cart". When you\'re ready, proceed to checkout and select your preferred payment method.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placement, provided they have not yet been dispatched. Please contact us immediately at jambo@maratable.com with your order number.',
      },
      {
        q: 'Is there a minimum order value?',
        a: 'There is no minimum order requirement. However, orders above KES 2,000 qualify for free delivery within Nairobi.',
      },
      {
        q: 'Do you offer bulk or wholesale pricing?',
        a: 'Yes! We offer special pricing for bulk orders, restaurants, hotels, and wholesale buyers. Please contact our team at jambo@maratable.com for a custom quote.',
      },
      {
        q: 'Can I schedule a recurring delivery?',
        a: 'Scheduled and recurring deliveries are currently being rolled out. Sign up for our newsletter to be notified when this feature launches.',
      },
    ],
  },
  {
    category: 'Delivery & Shipping',
    icon: Package,
    items: [
      {
        q: 'What areas do you deliver to?',
        a: 'We currently deliver across Nairobi and its environs, including Westlands, Karen, Kilimani, Lavington, Kileleshwa, Upperhill, Parklands, Runda, and Muthaiga. We are expanding our delivery zones regularly.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery within Nairobi takes 1–2 business days. Express same-day delivery is available for orders placed before 10:00 AM (subject to availability and surcharge).',
      },
      {
        q: 'Is my frozen food safe during delivery?',
        a: 'Absolutely. All frozen orders are shipped in temperature-controlled, insulated packaging with dry ice or gel ice packs to maintain -18°C throughout transit. Our cold-chain delivery process meets international food safety standards.',
      },
      {
        q: 'How much does delivery cost?',
        a: 'Standard delivery is KES 200. Delivery is FREE on all orders above KES 2,000. Express same-day delivery is available at KES 350.',
      },
      {
        q: 'Do you deliver internationally or outside Nairobi?',
        a: 'For international orders or deliveries to other Kenyan cities, please contact us directly at jambo@maratable.com. We partner with export agents for international fulfillment.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    icon: Package,
    items: [
      {
        q: 'How are your products frozen?',
        a: 'We use Individual Quick Freezing (IQF) technology—the gold standard in frozen food processing. IQF freezes each piece individually at ultra-low temperatures, preserving cell structure, colour, and nutrients far better than conventional freezing.',
      },
      {
        q: 'Are your products organic?',
        a: 'Our Wellness Greens Mix and other products in the Organic Foods category are certified organic. All other products are grown using sustainable, low-input farming practices. Look for the "Organic" badge on product pages.',
      },
      {
        q: 'Do your products contain preservatives or additives?',
        a: 'No. Every Mara Table product contains zero artificial preservatives, colours, or flavours. Our single-ingredient frozen vegetable products are 100% the named vegetable—nothing added.',
      },
      {
        q: 'What certifications do your products hold?',
        a: 'All Mara Table products are KEBS (Kenya Bureau of Standards) certified. Our manufacturing facility is HACCP compliant. Products intended for export also meet EU and UK food safety labelling requirements.',
      },
      {
        q: 'How long can I store your frozen products?',
        a: 'When stored continuously at -18°C or below, our products remain safe and nutritious for 12–18 months from the production date. Check the "best before" date on individual packs. Never refreeze a product that has been fully thawed.',
      },
      {
        q: 'What is the best way to cook frozen African greens?',
        a: 'Cook from frozen—no need to thaw. For sautéed dishes, heat a pan with a little oil on medium-high, add the frozen greens, and cook for 5–8 minutes, stirring occasionally. Season to taste. For stews, add directly to the pot. Check individual product pages for specific preparation guides.',
      },
    ],
  },
  {
    category: 'Payments',
    icon: Package,
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept M-Pesa, Visa, Mastercard, PayPal, Google Pay, and Apple Pay. All payments are processed through secure, encrypted payment gateways.',
      },
      {
        q: 'Is M-Pesa payment available?',
        a: 'Yes. M-Pesa is our most popular payment method for Kenyan customers. At checkout, select M-Pesa and follow the prompt to complete the STK push on your phone.',
      },
      {
        q: 'Are my payment details safe?',
        a: 'Yes. We do not store your card details. All transactions are processed through PCI-DSS compliant payment processors with 256-bit SSL encryption.',
      },
      {
        q: 'Can I pay on delivery?',
        a: 'Cash on delivery (COD) is available for orders within Nairobi. Please select this option at checkout. COD is subject to a KES 50 handling fee.',
      },
      {
        q: 'What currencies can I pay in?',
        a: 'You can browse prices in KES, USD, or EUR using the currency selector. All local transactions are processed in KES. International cards are charged in your card\'s home currency at the prevailing exchange rate.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: Package,
    items: [
      {
        q: 'What is your return policy?',
        a: 'Due to the perishable nature of frozen food, we do not accept returns of opened products. For quality issues, damaged items, or incorrect orders, please contact us within 24 hours of delivery with photos and your order number.',
      },
      {
        q: 'What if my order arrives damaged or incorrect?',
        a: 'We sincerely apologise for any errors. Please photograph the item(s) immediately and email jambo@maratable.com with your order number and photos. We will arrange a replacement or full refund within 2 business days.',
      },
      {
        q: 'My product arrived partially thawed—what should I do?',
        a: 'If a product arrives in a compromised state, do not consume it. Contact us immediately with photos. We will issue a replacement or refund. Our cold-chain packaging is designed to maintain temperatures for up to 8 hours from dispatch.',
      },
      {
        q: 'How long do refunds take to process?',
        a: 'M-Pesa refunds are typically processed within 24 hours. Card refunds take 3–5 business days depending on your bank. PayPal refunds take 1–3 business days.',
      },
    ],
  },
  {
    category: 'Account & Loyalty',
    icon: Package,
    items: [
      {
        q: 'Do I need an account to order?',
        a: 'You can currently browse and order without creating an account. Account registration with order tracking, wishlist saving, and loyalty rewards is coming soon.',
      },
      {
        q: 'Do you have a loyalty programme?',
        a: 'Our Mara Rewards programme is in development. Subscribers to our newsletter will be the first to hear when it launches. Sign up at the bottom of any page.',
      },
      {
        q: 'How do I subscribe to the newsletter?',
        a: 'Enter your email address in the newsletter signup section at the bottom of any page on our website. You\'ll receive wellness inspiration, new product alerts, and exclusive offers.',
      },
    ],
  },
];

export default function FAQPage() {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState('all');

  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const filteredData = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          (activeCategory === 'all' || section.category === activeCategory) &&
          (query === '' ||
            item.q.toLowerCase().includes(query.toLowerCase()) ||
            item.a.toLowerCase().includes(query.toLowerCase()))
      ),
    }))
    .filter((s) => s.items.length > 0);

  const totalResults = filteredData.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label text-forest-400 mb-4">Help Centre</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/55 text-base font-light mb-8">
            Everything you need to know about ordering, delivery, products, and more.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-forest-300 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-earth-100 sticky top-[calc(2.25rem+4rem)] z-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'all' ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-600 hover:bg-forest-50 border border-earth-200'
              }`}
            >
              All Topics
            </button>
            {faqData.map((s) => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === s.category ? 'bg-forest-700 text-white' : 'bg-earth-50 text-forest-600 hover:bg-forest-50 border border-earth-200'
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {query && (
            <p className="text-sm text-earth-500 mb-6">
              {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
            </p>
          )}

          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-earth-500 mb-4">No results found for "{query}"</p>
              <button onClick={() => setQuery('')} className="btn-secondary">Clear search</button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: category index */}
              <aside className="hidden lg:block">
                <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-[calc(2.25rem+4rem+3.5rem)]">
                  <p className="text-xs font-bold uppercase tracking-widest text-earth-400 mb-4">Jump to Topic</p>
                  <nav className="space-y-1">
                    {faqData.map((s) => (
                      <a
                        key={s.category}
                        href={`#${s.category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-forest-700 hover:bg-forest-50 hover:text-forest-600 transition-colors group"
                      >
                        <span>{s.category}</span>
                        <span className="text-xs text-earth-400 group-hover:text-forest-400">{s.items.length}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Right: FAQ items */}
              <div className="lg:col-span-2 space-y-10">
                {filteredData.map((section) => (
                  <div key={section.category} id={section.category.toLowerCase().replace(/\s+/g, '-')}>
                    <h2 className="font-bold text-forest-900 text-lg mb-4 pb-3 border-b border-earth-200">
                      {section.category}
                    </h2>
                    <div className="space-y-3">
                      {section.items.map((item, i) => {
                        const key = `${section.category}-${i}`;
                        const isOpen = openItems[key];
                        return (
                          <div
                            key={key}
                            className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                              isOpen ? 'border-forest-200 shadow-soft' : 'border-earth-100 hover:border-forest-200'
                            }`}
                          >
                            <button
                              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                              onClick={() => toggle(key)}
                            >
                              <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-forest-700' : 'text-forest-900'}`}>
                                {item.q}
                              </span>
                              <span className="flex-shrink-0">
                                {isOpen
                                  ? <ChevronUp size={16} className="text-forest-500" />
                                  : <ChevronDown size={16} className="text-earth-400" />}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-5">
                                <p className="text-earth-600 text-sm leading-relaxed border-t border-earth-100 pt-4">
                                  {item.a}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still need help? */}
      <section className="py-14 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/8 rounded-3xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-forest-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Email Support</h3>
              <p className="text-white/50 text-sm mb-4">We respond within 24 hours on business days.</p>
              <a href="mailto:jambo@maratable.com" className="text-forest-300 text-sm font-semibold hover:text-white transition-colors">
                jambo@maratable.com
              </a>
            </div>
            <div className="bg-white/8 rounded-3xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">WhatsApp Chat</h3>
              <p className="text-white/50 text-sm mb-4">Chat with our team Monday–Saturday, 8 AM–6 PM EAT.</p>
              <span className="text-forest-300 text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="bg-white/8 rounded-3xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-forest-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Order Issues</h3>
              <p className="text-white/50 text-sm mb-4">Problems with a specific order? We'll resolve it fast.</p>
              <a href="mailto:jambo@maratable.com?subject=Order Issue" className="text-forest-300 text-sm font-semibold hover:text-white transition-colors">
                Report an Issue <ArrowRight size={13} className="inline" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
