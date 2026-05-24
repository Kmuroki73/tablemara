import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Shield, Truck, Package, Leaf, BarChart3, CheckCircle, Mail } from 'lucide-react';
import { Link } from '../../router';

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const capabilities = [
  {
    icon: Truck,
    title: 'Cold Chain Logistics',
    desc: 'End-to-end temperature-controlled supply chain from farm to international port. Our IQF technology locks in nutrition and freshness for global transit.',
  },
  {
    icon: Package,
    title: 'Premium Packaging',
    desc: 'Retail-ready international packaging compliant with EU, US, and Middle Eastern labelling regulations. Available in multiple SKU configurations.',
  },
  {
    icon: Globe,
    title: 'International Distribution',
    desc: 'Established relationships with freight forwarders, customs brokers, and last-mile distributors across Europe, North America, and the Middle East.',
  },
  {
    icon: Shield,
    title: 'Food Safety Standards',
    desc: 'KEBS-certified, HACCP-compliant manufacturing facility. All products meet or exceed Codex Alimentarius and destination country import standards.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    desc: 'Full traceability from 200+ certified farmer partners across Kenya. Transparent supply chain documentation available for all export partners.',
  },
  {
    icon: BarChart3,
    title: 'Reliable Supply Chain',
    desc: 'Consistent production volumes, minimum lead time commitments, and dedicated export account management for wholesale and retail partners.',
  },
];

const markets = [
  {
    region: 'Europe',
    desc: 'UK, Germany, Netherlands, France, and Scandinavian countries. Growing demand for African wellness foods from health-conscious consumers and diaspora communities.',
    flag: '🇪🇺',
  },
  {
    region: 'North America',
    desc: 'United States and Canada. Premium natural food retail channels, specialty African food stores, and multicultural grocery chains.',
    flag: '🌎',
  },
  {
    region: 'Middle East',
    desc: 'UAE, Saudi Arabia, Qatar, and Kuwait. Serving East African diaspora communities, premium wellness retailers, and hotel & hospitality sectors.',
    flag: '🌍',
  },
  {
    region: 'Africa',
    desc: 'Pan-African expansion across Kenya, Uganda, Tanzania, Rwanda, South Africa, and Nigeria through modern trade and e-commerce channels.',
    flag: '🌍',
  },
  {
    region: 'Asia',
    desc: 'Singapore, Japan, and Australia as premium wellness food destinations. Natural food retail and international hospitality channels.',
    flag: '🌏',
  },
];

const targetCustomers = [
  'Retailers & Supermarkets',
  'Wholesalers & Distributors',
  'Hotels & Resorts',
  'Restaurants & Catering',
  'International Grocery Chains',
  'Wellness & Health Stores',
  'Food Service Companies',
  'Online Food Platforms',
];

export default function ExportPage() {
  const capSection = useIntersection();
  const marketsSection = useIntersection();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-end pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Global export"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/75 via-forest-950/55 to-forest-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Global Export Division</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Premium African Wellness Foods for Global Markets
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              MaraTable Group is building a globally trusted African wellness food brand focused on premium frozen vegetables, healthy ready meals, and nutrition-driven products for modern international consumers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-amber gap-2">
                Become a Distributor <ArrowRight size={16} />
              </Link>
              <a href="mailto:jambo@maratable.com?subject=Export Inquiry" className="btn-white gap-2">
                Export Inquiry <Mail size={15} />
              </a>
              <Link to="/funders" className="flex items-center gap-2 text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200">
                Partner With Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-forest-800 py-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '8+', label: 'Active Export Markets' },
              { value: '12+', label: 'Premium Product SKUs' },
              { value: '200+', label: 'Certified Farm Partners' },
              { value: 'KEBS', label: 'Food Safety Certified' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-forest-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Capabilities */}
      <section ref={capSection.ref} className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-4">Export Capabilities</p>
            <h2 className="section-heading max-w-2xl mx-auto">
              Built for International Trade
            </h2>
            <p className="text-earth-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              MaraTable Group has invested in the infrastructure, certifications, and partnerships required to serve retailers, wholesalers, hotels, restaurants, and distributors at an international level.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={`bg-earth-50 rounded-3xl p-8 border border-earth-100 hover:shadow-medium hover:bg-white transition-all duration-300 group ${
                    capSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms`, transition: 'all 0.6s ease' }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center mb-5 group-hover:bg-forest-700 transition-colors duration-300">
                    <Icon size={22} className="text-forest-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-forest-900 text-lg mb-3">{cap.title}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-label text-forest-400 mb-4">Who We Serve</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                Partners Across the Global Food Value Chain
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                MaraTable Group supplies premium African wellness food products to a diverse range of international trade and retail partners. We offer flexible MOQs, co-branding options, and dedicated account management for qualified partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-amber">
                  Start a Partnership <ArrowRight size={15} />
                </Link>
                <a href="mailto:jambo@maratable.com?subject=Wholesale Inquiry" className="btn-white">
                  Wholesale Inquiry
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {targetCustomers.map((customer) => (
                <div key={customer} className="flex items-center gap-3 bg-white/8 rounded-2xl px-4 py-3.5 border border-white/10">
                  <CheckCircle size={15} className="text-forest-400 flex-shrink-0" />
                  <span className="text-white/75 text-sm font-medium">{customer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Markets We Aim to Serve */}
      <section ref={marketsSection.ref} className="py-24 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-4">International Reach</p>
            <h2 className="section-heading">Markets We Aim to Serve</h2>
            <p className="text-earth-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              MaraTable products are designed to meet the growing global demand for healthy, convenient, African-inspired wellness foods.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, i) => (
              <div
                key={market.region}
                className={`bg-white rounded-3xl p-8 shadow-soft border border-earth-100 hover:shadow-medium transition-all duration-300 group ${
                  marketsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms`, transition: 'all 0.6s ease' }}
              >
                <div className="text-4xl mb-4">{market.flag}</div>
                <h3 className="font-bold text-forest-900 text-xl mb-3 group-hover:text-forest-600 transition-colors">{market.region}</h3>
                <p className="text-earth-600 text-sm leading-relaxed">{market.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div className="bg-forest-800 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-forest-300 text-xs font-bold uppercase tracking-widest mb-4">Expand Together</p>
                <h3 className="font-bold text-white text-xl mb-3">Don't See Your Market?</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  We are actively seeking distribution partners in new markets. Reach out to discuss opportunities in your region.
                </p>
              </div>
              <Link to="/contact" className="btn-amber mt-6 self-start">
                Get in Touch <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Export Standards */}
      <section className="py-20 bg-white" id="standards">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-medium">
              <img
                src="https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Food safety standards"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
            </div>
            <div>
              <p className="section-label mb-4">Export Standards</p>
              <h2 className="section-heading mb-6">Compliance You Can Trust</h2>
              <p className="text-earth-600 leading-relaxed mb-8">
                Every MaraTable Group product exported internationally is manufactured under rigorous food safety management systems, ensuring full compliance with destination country import regulations and retail listing requirements.
              </p>
              <div className="space-y-4">
                {[
                  { cert: 'KEBS Certification', detail: 'Kenya Bureau of Standards — full product certification' },
                  { cert: 'HACCP Compliant', detail: 'Hazard Analysis Critical Control Points manufacturing' },
                  { cert: 'ISO 22000', detail: 'Food safety management system standard' },
                  { cert: 'EU Import Ready', detail: 'Labelling and traceability compliant with EU regulations' },
                  { cert: 'Halal Eligible', detail: 'Products suitable for Halal certification upon request' },
                ].map(({ cert, detail }) => (
                  <div key={cert} className="flex items-start gap-4 bg-earth-50 rounded-2xl px-5 py-4">
                    <div className="w-5 h-5 rounded-full bg-forest-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-white"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <p className="font-bold text-forest-900 text-sm">{cert}</p>
                      <p className="text-earth-500 text-xs mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3021120/pexels-photo-3021120.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Export partnership"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-950/85" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label text-forest-400 mb-4">Ready to Partner</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto">
            Bring Premium African Wellness Foods to Your Market
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base mb-10 leading-relaxed">
            Whether you are a distributor, retailer, or food service buyer, we invite you to explore a partnership with MaraTable Group. Our export team is ready to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-amber">
              Become a Distributor <ArrowRight size={15} />
            </Link>
            <a href="mailto:jambo@maratable.com?subject=Export Inquiry" className="btn-white">
              Send Export Inquiry <Mail size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
