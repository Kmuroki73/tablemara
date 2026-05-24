import React from 'react';
import { RotateCcw, AlertCircle, CheckCircle, Clock, ArrowRight, Camera, Mail, ShieldCheck } from 'lucide-react';

const eligibleScenarios = [
  { eligible: true, scenario: 'Products arrived damaged or visibly compromised' },
  { eligible: true, scenario: 'Incorrect products delivered (not what you ordered)' },
  { eligible: true, scenario: 'Products arrived fully thawed or at unsafe temperature' },
  { eligible: true, scenario: 'Packaging seal broken or tampered with on arrival' },
  { eligible: true, scenario: 'Missing items from a confirmed order' },
  { eligible: false, scenario: 'Opened products where quality is as described' },
  { eligible: false, scenario: 'Change of mind after product has been opened' },
  { eligible: false, scenario: 'Products stored incorrectly after delivery' },
  { eligible: false, scenario: 'Flavour or texture preferences (subjective)' },
];

const refundTimelines = [
  { method: 'M-Pesa', time: 'Within 24 hours', note: 'After approval confirmation' },
  { method: 'Visa / Mastercard', time: '3–5 business days', note: 'Depending on your bank' },
  { method: 'PayPal', time: '1–3 business days', note: 'To your PayPal balance' },
  { method: 'Google Pay / Apple Pay', time: '3–7 business days', note: 'Depending on linked card' },
  { method: 'Store Credit', time: 'Immediate', note: 'Applied to your next order' },
];

const steps = [
  {
    num: '01',
    icon: Camera,
    title: 'Document the Issue',
    desc: 'Photograph the product, packaging, and any visible damage immediately upon receipt. Clear photos are essential for a swift resolution.',
  },
  {
    num: '02',
    icon: Mail,
    title: 'Contact Us Within 24 Hours',
    desc: 'Email jambo@maratable.com with your order number, a description of the issue, and your photos. The 24-hour window is important for frozen food safety reasons.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'We Review Your Claim',
    desc: 'Our quality team reviews your submission within one business day. We may ask follow-up questions to ensure a fair and accurate assessment.',
  },
  {
    num: '04',
    icon: RotateCcw,
    title: 'Resolution',
    desc: 'Once approved, we arrange a replacement delivery or process your refund. You choose your preferred resolution method.',
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label text-forest-400 mb-3">Help Centre</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Returns &amp; Refund Policy</h1>
          <p className="text-white/55 text-base font-light">
            We stand behind every product we ship. If something isn't right, we make it right—quickly and without hassle.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 space-y-16">

          {/* Key Policy Statement */}
          <div className="bg-forest-50 border border-forest-100 rounded-4xl p-8">
            <h2 className="font-bold text-forest-900 text-xl mb-3">Our Policy in Plain Language</h2>
            <p className="text-forest-800 leading-relaxed mb-4">
              Because our products are frozen, perishable foods, we operate a <strong>quality-guarantee policy</strong> rather than a standard returns policy. We cannot accept the physical return of opened or used food products for hygiene and safety reasons.
            </p>
            <p className="text-forest-800 leading-relaxed">
              However, if your order arrives damaged, incorrect, or in a compromised state, <strong>we will replace it or refund you in full</strong>—no questions asked—provided you contact us within 24 hours of delivery with photographic evidence.
            </p>
          </div>

          {/* Process Steps */}
          <div>
            <h2 className="font-bold text-forest-900 text-2xl mb-2">How to Make a Claim</h2>
            <p className="text-earth-600 text-sm mb-8">Follow these four steps for the fastest possible resolution.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="bg-white rounded-3xl p-6 shadow-soft relative">
                  <span className="absolute top-5 right-5 text-4xl font-bold text-earth-100 select-none">{num}</span>
                  <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-forest-700" />
                  </div>
                  <h3 className="font-bold text-forest-900 mb-2 relative z-10">{title}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed relative z-10">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligible / Not Eligible */}
          <div>
            <h2 className="font-bold text-forest-900 text-2xl mb-6">What Qualifies for a Refund or Replacement</h2>
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-earth-100">
              <div className="grid grid-cols-12 bg-forest-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-4">
                <span className="col-span-9">Scenario</span>
                <span className="col-span-3 text-center">Eligible?</span>
              </div>
              {eligibleScenarios.map(({ eligible, scenario }, i) => (
                <div
                  key={scenario}
                  className={`grid grid-cols-12 items-center px-6 py-4 border-b border-earth-100 last:border-0 text-sm ${i % 2 === 1 ? 'bg-earth-50/50' : ''}`}
                >
                  <span className="col-span-9 text-earth-700">{scenario}</span>
                  <div className="col-span-3 flex justify-center">
                    {eligible
                      ? <CheckCircle size={18} className="text-forest-600" />
                      : <AlertCircle size={18} className="text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Timelines */}
          <div>
            <h2 className="font-bold text-forest-900 text-2xl mb-2">Refund Processing Times</h2>
            <p className="text-earth-600 text-sm mb-6">Once your claim is approved, refunds are processed within the following timelines:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {refundTimelines.map(({ method, time, note }) => (
                <div key={method} className="bg-white rounded-2xl p-5 shadow-soft border border-earth-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-forest-700" />
                  </div>
                  <div>
                    <p className="font-bold text-forest-900 text-sm">{method}</p>
                    <p className="text-forest-600 text-sm font-medium">{time}</p>
                    <p className="text-earth-400 text-xs mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 rounded-4xl p-8 border border-amber-100">
            <div className="flex items-start gap-3 mb-5">
              <AlertCircle size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <h2 className="font-bold text-amber-800 text-xl">Important Notes</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: '24-Hour Window', desc: 'All quality claims must be submitted within 24 hours of delivery. Due to the perishable nature of frozen food, we cannot accept claims made after this window.' },
                { title: 'Photographic Evidence Required', desc: 'Clear photos of the affected product, the outer packaging, and any visible damage are required to process your claim. Photos should be taken immediately on receipt.' },
                { title: 'Proper Storage Responsibility', desc: 'Once you have received and signed for your order, proper storage is your responsibility. We cannot process claims for products that were thawed due to improper storage after delivery.' },
                { title: 'Replacement vs. Refund', desc: 'We offer replacement delivery as our default resolution. If a replacement is not possible (e.g., product out of stock), a full refund will be issued.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-800 text-sm">{title}: </span>
                    <span className="text-amber-700 text-sm">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-forest-900 rounded-4xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-white text-xl mb-2">Have an issue with your order?</h3>
                <p className="text-white/55 text-sm">Contact our team immediately and we'll get it sorted.</p>
              </div>
              <div className="flex gap-3">
                <a href="mailto:jambo@maratable.com?subject=Returns%20and%20Refunds" className="btn-amber">
                  Email Us Now <ArrowRight size={14} />
                </a>
                <a href="/shop/faq" className="btn-white">View FAQ</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
