import React from 'react';
import { ArrowRight, TrendingUp, Globe, Package, Users, Building2, Handshake, ShoppingCart, Truck } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';

const statsData = [
  { value: 'USD 2M+', labelKey: 'total_funding', icon: TrendingUp },
  { value: '8', labelKey: 'export_markets', icon: Globe },
  { value: '200+', labelKey: 'retail_partners', icon: ShoppingCart },
  { value: '12+', labelKey: 'distribution_partners', icon: Truck },
];

const investors = [
  { name: 'AfricInvest', type: 'Lead Investor', description: 'Pan-African growth equity investor focused on SMEs.', region: 'Pan-African' },
  { name: 'Vegpro Group', type: 'Strategic Co-investor', description: 'East Africa\'s leading fresh produce export group.', region: 'East Africa' },
  { name: 'TLcom Capital', type: 'Angel Round', description: 'Technology and innovation-focused African VC.', region: 'Pan-African' },
  { name: 'Nairobi Angels', type: 'Seed Investor', description: 'Kenya\'s premier angel investment network.', region: 'Kenya' },
];

const partnerTypes = [
  {
    icon: Building2,
    title: 'Retail Partners',
    desc: 'Premium supermarkets, specialty health stores, and online grocery platforms seeking authentic African wellness products.',
    cta: 'Become a Retail Partner',
  },
  {
    icon: Truck,
    title: 'Distribution Partners',
    desc: 'Cold-chain logistics providers and regional distributors to extend MaraTable Group\'s reach into new markets.',
    cta: 'Explore Distribution',
  },
  {
    icon: Globe,
    title: 'Export Partners',
    desc: 'Import agents and wholesalers in Europe, Middle East, and North America seeking premium African frozen foods.',
    cta: 'Export Enquiries',
  },
  {
    icon: Handshake,
    title: 'Strategic Partners',
    desc: 'NGOs, nutrition programs, and institutional buyers aligned with our wellness and food security mission.',
    cta: 'Strategic Collaboration',
  },
];

const markets = [
  { name: 'Kenya', status: 'Primary Market', flag: '🇰🇪' },
  { name: 'Uganda', status: 'Active', flag: '🇺🇬' },
  { name: 'Tanzania', status: 'Active', flag: '🇹🇿' },
  { name: 'United Kingdom', status: 'Export Market', flag: '🇬🇧' },
  { name: 'Germany', status: 'Export Market', flag: '🇩🇪' },
  { name: 'Italy', status: 'Export Market', flag: '🇮🇹' },
  { name: 'UAE', status: 'Export Market', flag: '🇦🇪' },
  { name: 'Canada', status: 'Expanding', flag: '🇨🇦' },
];

export default function FundersPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-forest-900 py-24 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-forest-400 mb-4">{t('funders_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-5 max-w-3xl">
            {t('funders_headline')}
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl mb-8">
            {t('funders_sub')}
          </p>
          <Link to="/contact" className="btn-amber">
            {t('funders_partner_cta')} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-forest-800">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map(({ value, labelKey, icon: Icon }) => (
              <div key={labelKey} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-forest-200" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-forest-300 text-xs mt-0.5">{t(labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="section-label mb-3">{t('funders_investors_label')}</p>
            <h2 className="section-heading max-w-xl">{t('funders_investors_headline')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {investors.map((inv) => (
              <div key={inv.name} className="card p-8 flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-forest-700 text-sm">{inv.name.slice(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-forest-900 text-lg">{inv.name}</h3>
                    <span className="tag-forest">{inv.type}</span>
                  </div>
                  <p className="text-earth-600 text-sm mb-2">{inv.description}</p>
                  <span className="text-xs text-forest-500 font-medium bg-forest-50 px-3 py-1 rounded-full border border-forest-100">
                    {inv.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label mb-3">{t('funders_partners_label')}</p>
            <h2 className="section-heading mb-3">{t('funders_partners_headline')}</h2>
            <p className="section-subheading max-w-xl mx-auto">
              {t('funders_partners_sub')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map(({ icon: Icon, title, desc, cta }) => (
              <div key={title} className="card p-6 text-center group hover:border-forest-200">
                <div className="w-14 h-14 rounded-3xl bg-forest-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-forest-700 transition-colors duration-300">
                  <Icon size={24} className="text-forest-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-forest-900 mb-3">{title}</h3>
                <p className="text-earth-600 text-xs leading-relaxed mb-5">{desc}</p>
                <Link to="/contact" className="text-xs font-semibold text-forest-600 hover:text-forest-800 flex items-center gap-1 justify-center group-hover:gap-2 transition-all">
                  {cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Map */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">{t('funders_markets_label')}</p>
              <h2 className="section-heading mb-4">{t('funders_markets_headline')}</h2>
              <p className="text-earth-600 text-base font-light leading-relaxed mb-8">
                {t('funders_markets_body')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {markets.map(({ name, status, flag }) => (
                  <div key={name} className="flex items-center gap-3 bg-earth-50 rounded-2xl p-4 border border-earth-100">
                    <span className="text-xl">{flag}</span>
                    <div>
                      <p className="font-semibold text-forest-800 text-sm">{name}</p>
                      <p className={`text-xs ${status === 'Primary Market' ? 'text-forest-600 font-medium' : 'text-earth-500'}`}>
                        {status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-4xl overflow-hidden aspect-square shadow-strong">
              <img
                src="https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Markets"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4">
                  <p className="font-bold text-forest-800 text-sm mb-1">{t('funders_export_ready')}</p>
                  <p className="text-forest-700 text-xs">
                    {t('funders_export_ready_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor CTA */}
      <section className="py-16 gradient-forest">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {t('funders_invest_headline')}
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            {t('funders_invest_sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-amber">
              {t('funders_invest_cta')} <ArrowRight size={15} />
            </Link>
            <a href="mailto:jambo@maratable.com" className="btn-white">
              {t('funders_contact_team')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
