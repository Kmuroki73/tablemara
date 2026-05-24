import React from 'react';
import { Truck, Clock, MapPin, Thermometer, Package, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const zones = [
  { area: 'Westlands, Parklands, Sarit Centre', time: 'Same Day / Next Day', rate: 'KES 200 (Free over KES 2,000)' },
  { area: 'Kilimani, Lavington, Kileleshwa', time: 'Same Day / Next Day', rate: 'KES 200 (Free over KES 2,000)' },
  { area: 'Karen, Langata, Rongai', time: '1–2 Business Days', rate: 'KES 250' },
  { area: 'Upperhill, CBD, South C, South B', time: 'Same Day / Next Day', rate: 'KES 200 (Free over KES 2,000)' },
  { area: 'Runda, Muthaiga, Gigiri, Ruaka', time: '1–2 Business Days', rate: 'KES 250' },
  { area: 'Kasarani, Ruiru, Juja', time: '2–3 Business Days', rate: 'KES 300' },
  { area: 'Ngong, Ongata Rongai', time: '2–3 Business Days', rate: 'KES 300' },
  { area: 'Rest of Kenya (Mombasa, Kisumu, etc.)', time: '3–5 Business Days', rate: 'KES 500–800 (contact us)' },
  { area: 'International Export', time: 'By arrangement', rate: 'Contact us' },
];

const coldChainSteps = [
  { step: '1', title: 'Harvest & Process', desc: 'Products are harvested fresh and IQF-frozen within hours at our certified facility.' },
  { step: '2', title: 'Pack & Seal', desc: 'Orders are packed in food-grade insulated boxes with dry ice or gel ice packs, maintaining -18°C.' },
  { step: '3', title: 'Dispatch', desc: 'Our temperature-controlled delivery vehicles maintain the cold chain from warehouse to your door.' },
  { step: '4', title: 'Delivery', desc: 'Products arrive at your door frozen and safe—ready to store or cook immediately.' },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label text-forest-400 mb-3">Help Centre</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Delivery &amp; Shipping Policy</h1>
          <p className="text-white/55 text-base font-light">
            Everything you need to know about how we deliver your Mara Table products, fresh and frozen, to your door.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 space-y-16">

          {/* Key Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: 'Standard Delivery', desc: 'KES 200 within Nairobi. Free on orders over KES 2,000.' },
              { icon: Clock, title: 'Delivery Times', desc: '1–2 business days for Nairobi. Same-day available before 10 AM.' },
              { icon: Thermometer, title: 'Cold-Chain Safe', desc: 'All frozen orders shipped in temperature-controlled packaging.' },
              { icon: MapPin, title: 'Coverage', desc: 'Nairobi + environs. Wider Kenya and international by arrangement.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-6 shadow-soft border border-earth-100">
                <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-forest-700" />
                </div>
                <h3 className="font-bold text-forest-900 mb-2">{title}</h3>
                <p className="text-earth-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Delivery Zones Table */}
          <div>
            <h2 className="font-bold text-forest-900 text-2xl mb-2">Delivery Zones &amp; Rates</h2>
            <p className="text-earth-600 text-sm mb-6">All prices are inclusive of VAT. Free delivery applies to a single transaction value above KES 2,000 within standard Nairobi zones.</p>
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-earth-100">
              <div className="grid grid-cols-3 bg-forest-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-4">
                <span>Delivery Area</span>
                <span>Estimated Time</span>
                <span>Rate</span>
              </div>
              {zones.map((zone, i) => (
                <div
                  key={zone.area}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 text-sm border-b border-earth-100 last:border-0 ${i % 2 === 1 ? 'bg-earth-50/50' : 'bg-white'}`}
                >
                  <span className="font-medium text-forest-800">{zone.area}</span>
                  <span className="text-earth-600">{zone.time}</span>
                  <span className="text-forest-700 font-semibold">{zone.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Chain Process */}
          <div>
            <h2 className="font-bold text-forest-900 text-2xl mb-2">Our Cold-Chain Delivery Process</h2>
            <p className="text-earth-600 text-sm mb-8">From farm to your freezer, every step is designed to keep your products at the correct temperature.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coldChainSteps.map(({ step, title, desc }) => (
                <div key={step} className="bg-white rounded-3xl p-6 shadow-soft relative">
                  <div className="w-10 h-10 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                    {step}
                  </div>
                  <h3 className="font-bold text-forest-900 mb-2">{title}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-bold text-forest-900 text-2xl mb-4">Sustainable Packaging</h2>
              <p className="text-earth-700 leading-relaxed mb-4">
                Our shipping boxes are made from recycled cardboard with food-grade insulation liners. We use dry ice or food-safe gel packs to maintain temperatures for up to 8 hours after dispatch, giving you ample time to receive and store your order.
              </p>
              <p className="text-earth-700 leading-relaxed mb-6">
                We are actively working toward fully compostable delivery packaging by 2027. Our current packaging is 100% recyclable at your local facility.
              </p>
              <div className="space-y-3">
                {[
                  'Recycled cardboard outer box',
                  'Food-grade insulation liner',
                  'Dry ice or gel ice packs',
                  'Maintains -18°C for 8+ hours',
                  'All materials 100% recyclable',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-earth-700">
                    <CheckCircle size={16} className="text-forest-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 rounded-4xl p-8 border border-amber-100">
              <div className="flex items-start gap-3 mb-5">
                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-800 mb-1">Important Handling Note</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    On receiving your order, please transfer frozen products to your freezer immediately. If a product appears fully thawed on arrival, do not consume it and contact us within 2 hours with photographic evidence. We will arrange a replacement or refund.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'Store at -18°C immediately on receipt',
                  'Do not refreeze thawed products',
                  'Check best-before date on each pack',
                  'Contact us within 2 hours of any delivery issue',
                ].map((rule) => (
                  <div key={rule} className="flex items-center gap-2 text-sm text-amber-700">
                    <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex-shrink-0" />
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ snippet */}
          <div className="bg-forest-900 rounded-4xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-white text-xl mb-2">Still have questions about delivery?</h3>
                <p className="text-white/55 text-sm">Browse our full FAQ or contact our delivery support team.</p>
              </div>
              <div className="flex gap-3">
                <a href="/shop/faq" className="btn-white text-sm">View Full FAQ</a>
                <a href="mailto:jambo@maratable.com" className="btn-amber text-sm">Contact Us <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
