import React from 'react';
import { Leaf, Wind, Droplets, Heart, Shield, Users, Recycle, Sun, Snowflake, Thermometer, ArrowRight } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';

const pillars = [
  {
    icon: Wind,
    color: 'bg-forest-100 text-forest-700',
    title: 'Climate & Environmental Protection',
    desc: 'We measure and reduce our carbon footprint across every stage of production. Our cold-chain operations increasingly use solar-powered refrigeration, and we are actively working toward net-zero targets by 2030.',
    stats: [{ val: '-30%', label: 'Carbon vs. industry avg.' }, { val: '40%', label: 'Solar energy use in operations' }],
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Leaf,
    color: 'bg-amber-100 text-amber-700',
    title: 'Sustainable Ingredients',
    desc: 'Every ingredient is traced back to its farm of origin. We work exclusively with farmers who follow sustainable agricultural practices, including no-burn cultivation, natural composting, and responsible water use.',
    stats: [{ val: '100%', label: 'Traceable supply chain' }, { val: '200+', label: 'Certified farmer partners' }],
    image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Users,
    color: 'bg-forest-100 text-forest-700',
    title: 'Social Commitment',
    desc: 'We believe in fair wages, safe working conditions, and community investment. Over 60% of our partner farmers are women-led enterprises. We fund nutrition education programs in partnership with community schools.',
    stats: [{ val: '60%', label: 'Women-led farm partners' }, { val: '1,200+', label: 'Families supported' }],
    image: 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Shield,
    color: 'bg-amber-100 text-amber-700',
    title: 'Food Safety Standards',
    desc: 'MaraTable Group operates under strict food safety management systems. All products are KEBS-certified and manufactured in HACCP-compliant facilities. We conduct third-party audits annually.',
    stats: [{ val: 'KEBS', label: 'Certified' }, { val: 'HACCP', label: 'Compliant Facility' }],
    image: 'https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Heart,
    color: 'bg-forest-100 text-forest-700',
    title: 'Nutrition Responsibility',
    desc: 'We are committed to clear, honest nutritional labelling. All products meet or exceed WHO dietary guidelines. We actively fight against ultra-processed food trends by offering clean, whole-food alternatives.',
    stats: [{ val: '0', label: 'Artificial preservatives' }, { val: '100%', label: 'Whole food ingredients' }],
    image: 'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Recycle,
    color: 'bg-amber-100 text-amber-700',
    title: 'Packaging & Waste Reduction',
    desc: 'Our packaging uses minimum-footprint materials sourced from certified-sustainable suppliers. We are currently piloting compostable packaging for select product lines ahead of a full transition by 2027.',
    stats: [{ val: '95%', label: 'Supply chain efficiency' }, { val: '2027', label: 'Full compostable packaging target' }],
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const supplierStandards = [
  'No child labour',
  'Fair wage guarantee',
  'Safe working conditions',
  'No restricted pesticides',
  'Environmental management plans',
  'Annual third-party audits',
  'Water conservation practices',
  'Traceability documentation',
];

const coldChainFacts = [
  {
    icon: Snowflake,
    value: '-18°C',
    label: 'Deep Freeze Standard',
    desc: 'All frozen products maintained at -18°C or below throughout the supply chain.',
  },
  {
    icon: Thermometer,
    value: '100%',
    label: 'Temperature Monitored',
    desc: 'Real-time IoT temperature monitoring from production to final delivery.',
  },
  {
    icon: Shield,
    value: 'HACCP',
    label: 'Compliant',
    desc: 'Full HACCP cold-chain protocols at every critical control point.',
  },
  {
    icon: Sun,
    value: '40%',
    label: 'Solar Powered',
    desc: 'Refrigeration infrastructure increasingly powered by clean solar energy.',
  },
];

export default function ResponsibilityPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-forest opacity-88" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-amber-400/80 mb-4">{t('responsibility_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5 max-w-3xl">
            {t('responsibility_headline')}
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl leading-relaxed mb-8">
            {t('responsibility_sub')}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Leaf, label: 'Sustainable Farming' },
              { icon: Wind, label: 'Climate Action' },
              { icon: Heart, label: 'Community Wellness' },
              { icon: Snowflake, label: 'Cold Chain Integrity' },
              { icon: Droplets, label: 'Water Stewardship' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/15">
                <Icon size={14} className="text-amber-300" />
                <span className="text-white/80 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLD CHAIN INFRASTRUCTURE — new section */}
      <section className="py-24 bg-gradient-to-b from-forest-950 to-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <Snowflake size={14} className="text-amber-400" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">{t('csr_cold_chain_label')}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                {t('csr_cold_chain_title')}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-base font-light">
                {t('csr_cold_chain_body')}
              </p>
              {/* 4 stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {coldChainFacts.map(({ icon: Icon, value, label, desc }) => (
                  <div key={label} className="bg-white/8 rounded-2xl p-5 border border-white/10 hover:bg-white/12 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <Icon size={15} className="text-amber-400" />
                      </div>
                      <span className="text-2xl font-bold text-white">{value}</span>
                    </div>
                    <p className="text-amber-300/80 text-xs font-bold uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — image */}
            <div className="space-y-4">
              <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-strong">
                <img
                  src="https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Cold chain infrastructure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/15">
                    <Snowflake size={20} className="text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm">IQF Technology</p>
                      <p className="text-white/60 text-xs">Individual Quick Freezing — nutritional integrity guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="Cold chain logistics"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-forest-950/40" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Export Logistics</p>
                  </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="Distribution network"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-forest-950/40" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Global Distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{t('responsibility_pillars_label')}</p>
            <h2 className="section-heading">{t('responsibility_pillars_headline')}</h2>
          </div>
          <div className="space-y-16">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isEven = i % 2 === 0;
              return (
                <div key={pillar.title} className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                    <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-5`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-forest-900 text-xl md:text-2xl mb-4">{pillar.title}</h3>
                    <p className="text-earth-600 leading-relaxed mb-6">{pillar.desc}</p>
                    <div className="flex gap-6">
                      {pillar.stats.map(({ val, label }) => (
                        <div key={label} className="bg-earth-50 rounded-2xl px-5 py-4 border border-earth-100">
                          <div className="text-2xl font-bold text-forest-800">{val}</div>
                          <div className="text-earth-500 text-xs mt-1">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${!isEven ? 'lg:order-1' : ''} relative rounded-4xl overflow-hidden aspect-[4/3] shadow-medium`}>
                    <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-900/10 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supplier Standards */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label text-amber-400/80 mb-4">{t('responsibility_supplier_label')}</p>
              <h2 className="font-serif text-4xl text-white leading-tight mb-4">
                {t('responsibility_supplier_headline')}
              </h2>
              <p className="text-white/55 leading-relaxed mb-8">
                {t('responsibility_supplier_body')}
              </p>
              <Link to="/contact" className="btn-amber">
                {t('responsibility_supplier_cta')} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {supplierStandards.map((std) => (
                <div key={std} className="flex items-center gap-3 bg-white/8 rounded-2xl px-4 py-3.5 border border-white/10 hover:bg-white/12 transition-all">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-white"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-white/70 text-xs font-medium">{std}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream border-t border-earth-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl text-forest-900 mb-4">{t('responsibility_report_headline')}</h2>
          <p className="text-earth-600 max-w-lg mx-auto text-sm mb-7">
            {t('responsibility_report_sub')}
          </p>
          <Link to="/contact" className="btn-primary">
            {t('responsibility_report_cta')} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
