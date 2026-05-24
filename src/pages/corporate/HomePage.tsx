import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Leaf, Zap, Globe, Award, ChevronRight, ExternalLink, TrendingUp, Users, Package, Truck, Shield } from 'lucide-react';
import { Link, useRouter } from '../../router';
import { useI18n } from '../../i18n';
import { productCategories } from '../../data/products';
import { getFeaturedBlogPosts } from '../../data/blog';
import { getFeaturedResearch } from '../../data/research';
import { getFeaturedNews } from '../../data/news';

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

const stats = [
  { icon: Package, value: '12+', label: 'Premium Products' },
  { icon: Users, value: '200+', label: 'Partner Farmers' },
  { icon: Globe, value: '8', label: 'Export Markets' },
  { icon: TrendingUp, value: '40%', label: 'Year-on-Year Growth' },
];

const values = [
  { icon: Leaf, title: 'Authenticity', desc: 'Every product rooted in genuine East African nutrition traditions, not trend-chasing.' },
  { icon: Zap, title: 'Innovation', desc: 'Modern flash-freeze technology applied to ancient ingredients for maximum nutrition.' },
  { icon: Globe, title: 'Sustainability', desc: 'Climate-smart agriculture and ethical sourcing across our entire supply chain.' },
  { icon: Award, title: 'Excellence', desc: 'KEBS-certified quality standards and international food safety compliance.' },
];

export default function HomePage() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const blogPosts = getFeaturedBlogPosts();
  const research = getFeaturedResearch().slice(0, 3);
  const news = getFeaturedNews().slice(0, 3);

  const statsSection = useIntersection();
  const aboutSection = useIntersection();
  const productsSection = useIntersection();
  const blogSection = useIntersection();

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 pt-24 overflow-hidden">
        {/* Background — premium food/frozen food collage via CSS grid overlay */}
        <div className="absolute inset-0">
          {/* Main hero image — vibrant healthy food spread */}
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Premium African wellness foods"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/65 via-forest-950/40 to-forest-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-forest-950/30 to-transparent" />
          {/* Gold shimmer accent top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        {/* Floating food thumbnails — right side desktop only */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-10">
          {[
            { src: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Frozen Veg' },
            { src: 'https://images.pexels.com/photos/3807332/pexels-photo-3807332.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Ready Meals' },
            { src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Sauces' },
          ].map(({ src, label }, i) => (
            <div
              key={label}
              className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-strong backdrop-blur-sm"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <img src={src} alt={label} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Quality Frozen. Naturally Delicious.</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 animate-fade-up">
              {t('hero_headline')}
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light animate-fade-up">
              {t('hero_sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
              <Link to="/about" className="btn-white gap-2">
                {t('hero_cta1')} <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-amber border border-amber-400"
              >
                {t('hero_cta2')} <ExternalLink size={15} />
              </Link>
              <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                  <Play size={16} className="ml-0.5 fill-white" />
                </div>
                <span className="text-sm font-medium">Watch Our Story</span>
              </button>
            </div>

            {/* Quick trust badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {['KEBS Certified', 'HACCP Compliant', '8+ Export Markets', 'IQF Technology'].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium px-3.5 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-0 right-10 hidden lg:flex flex-col items-center gap-2 text-white/40">
            <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <section className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 py-10 border-t border-amber-500/20">
        <div ref={statsSection.ref} className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 transition-all duration-700 ${
                  statsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-forest-300 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutSection.ref} className="py-24 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${aboutSection.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="section-label mb-4">{t('about_label')}</p>
              <h2 className="section-heading mb-6">
                Rooted in Tradition.<br />
                <em className="not-italic text-gradient-forest">Crafted for the World.</em>
              </h2>
              <p className="text-base text-forest-700/80 leading-relaxed mb-6 font-light">
                MaraTable Group is a premium wellness food brand inspired by East African nutrition traditions. We create high-quality frozen vegetables, protein-rich meals, chapati, samosas, sauces, and convenient ready-to-heat foods crafted for modern living. Rooted in authentic flavor and wholesome ingredients, our mission is to bring elevated nourishment, convenience, and contemporary African-inspired cuisine to households around the world.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Our Vision', desc: 'To be the world\'s most trusted African wellness food brand.' },
                  { label: 'Our Mission', desc: 'Nourish modern families with the power of East African foods.' },
                  { label: 'Innovation', desc: 'IQF technology meets centuries of nutritional wisdom.' },
                  { label: 'Export Ready', desc: 'Meeting international food safety and labelling standards.' },
                ].map(({ label, desc }) => (
                  <div key={label} className="bg-white rounded-2xl p-4 shadow-soft">
                    <h4 className="text-sm font-bold text-forest-800 mb-1">{label}</h4>
                    <p className="text-xs text-forest-600/70 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Learn Our Story <ArrowRight size={16} />
              </Link>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${aboutSection.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative rounded-4xl overflow-hidden aspect-[4/5] shadow-strong">
                <img
                  src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="About Mara Table"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-2xl p-4">
                    <p className="text-xs font-bold text-forest-700 uppercase tracking-widest mb-1">Our Promise</p>
                    <p className="text-sm text-forest-800 font-medium leading-snug">
                      "Authentic African nutrition, modern convenience, zero compromise."
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full opacity-60 -z-10" />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-forest-100 rounded-full opacity-60 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label text-forest-400 mb-3">What We Stand For</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-forest-700 flex items-center justify-center mb-5 group-hover:bg-amber-600 transition-colors duration-300">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section ref={productsSection.ref} className="py-24 bg-earth-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label mb-3">Our Products</p>
              <h2 className="section-heading">
                Premium Food<br />Categories
              </h2>
            </div>
            <Link to="/shop" className="btn-secondary self-start md:self-auto">
              Browse All Products <ExternalLink size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => (
              <div
                key={cat.id}
                className={`group card card-hover cursor-pointer transition-all duration-700 ${
                  productsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => navigate(`/shop?category=${cat.id}`)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                      {cat.count} products
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-forest-900 text-lg mb-2">{cat.label}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center gap-2 text-forest-600 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>Explore Products</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT TEASER */}
      <section className="py-24 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <p className="section-label mb-4">Global Export Division</p>
              <h2 className="section-heading mb-6">
                Rooted in Tradition.<br />
                <em className="not-italic text-gradient-forest">Crafted for the World.</em>
              </h2>
              <p className="text-base text-forest-700/80 leading-relaxed mb-8 font-light">
                MaraTable Group is building a globally trusted African wellness food brand. Our premium frozen vegetables, healthy ready meals, and nutrition-driven products are designed for modern international consumers — with full cold-chain logistics, KEBS certification, and retail-ready packaging for global markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/export" className="btn-primary">
                  Explore Export <ArrowRight size={16} />
                </Link>
                <a href="mailto:jambo@maratable.com?subject=Export Inquiry" className="btn-secondary">
                  Export Inquiry
                </a>
              </div>
            </div>
            {/* Main export image */}
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-strong">
              <img
                src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Shipping container export"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4">
                  <p className="text-xs font-bold text-forest-700 uppercase tracking-widest mb-1">Export Ready</p>
                  <p className="text-sm text-forest-800 font-medium leading-snug">
                    Serving 8+ international markets across Europe, the Middle East & North America.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3-image export grid + capability cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Image 1 — container port */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-medium group">
              <img
                src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Container port logistics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-sm">Cold Chain Logistics</p>
                <p className="text-white/65 text-xs mt-0.5">End-to-end temperature-controlled supply chain</p>
              </div>
            </div>
            {/* Image 2 — packaging / produce */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-medium group">
              <img
                src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Premium export packaging"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-sm">Premium Packaging</p>
                <p className="text-white/65 text-xs mt-0.5">Retail-ready for EU, US & Middle East markets</p>
              </div>
            </div>
            {/* Image 3 — global freight */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-medium group">
              <img
                src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="International freight and distribution"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-sm">International Distribution</p>
                <p className="text-white/65 text-xs mt-0.5">Freight partners across 5 continents</p>
              </div>
            </div>
          </div>

          {/* 4 capability cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: 'Cold Chain Ready', desc: 'IQF frozen technology ensures nutritional integrity from farm to shelf.' },
              { icon: Shield, title: 'KEBS Certified', desc: 'HACCP-compliant manufacturing meeting international food safety standards.' },
              { icon: Globe, title: '8+ Export Markets', desc: 'Active distribution in Europe, Middle East, North America and Africa.' },
              { icon: Package, title: 'Flexible MOQs', desc: 'Wholesale and retail pack sizes available for all trade partner types.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-soft border border-earth-100 hover:shadow-medium transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center mb-4 group-hover:bg-forest-700 transition-colors duration-300">
                  <Icon size={18} className="text-forest-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-forest-900 text-sm mb-2">{title}</h4>
                <p className="text-earth-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY BANNER */}
      <section className="py-24 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Responsibility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-forest opacity-90" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-label text-forest-400 mb-4">Our Commitment</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Food That's Good for People<br />& the Planet.
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8 font-light">
              We believe nourishing people and protecting the planet are not competing goals. From climate-smart farming practices to zero-waste packaging goals, sustainability is built into every decision we make.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Carbon Footprint', value: '-30%', note: 'vs. industry avg.' },
                { label: 'Partner Farmers', value: '200+', note: 'Small-scale, ethical' },
                { label: 'Waste Reduction', value: '95%', note: 'Supply chain efficiency' },
              ].map(({ label, value, note }) => (
                <div key={label} className="bg-white/10 rounded-2xl p-5 border border-white/15">
                  <div className="text-3xl font-bold text-white mb-1">{value}</div>
                  <div className="text-forest-200 text-sm font-medium">{label}</div>
                  <div className="text-white/45 text-xs mt-1">{note}</div>
                </div>
              ))}
            </div>
            <Link to="/responsibility" className="btn-white">
              Our Responsibility Pledge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* RESEARCH SECTION */}
      <section className="py-24 bg-earth-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label mb-3">Research & Analysis</p>
              <h2 className="section-heading">Latest Research<br />& Insights</h2>
            </div>
            <Link to="/research" className="btn-secondary self-start md:self-auto">
              View All Research <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {research.map((r, i) => (
              <Link
                key={r.id}
                to={`/research/${r.slug}`}
                className={`group card card-hover block ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'h-72' : 'h-48'}`}>
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
                  <span className={`absolute top-3 left-3 ${
                    r.type === 'report' ? 'tag-amber' : r.type === 'study' ? 'tag-forest' : 'tag-earth'
                  }`}>
                    {r.type}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-earth-500 mb-2">{r.date} · {r.readTime} min read</p>
                  <h3 className={`font-bold text-forest-900 leading-snug mb-2 group-hover:text-forest-600 transition-colors ${i === 0 ? 'text-lg' : 'text-sm'}`}>
                    {r.title}
                  </h3>
                  <p className="text-earth-600 text-xs leading-relaxed line-clamp-2">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section ref={blogSection.ref} className="py-24 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label mb-3">Wellness Stories</p>
              <h2 className="section-heading">From Our Blog</h2>
            </div>
            <Link to="/blog" className="btn-secondary self-start md:self-auto">
              All Articles <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group card card-hover block transition-all duration-700 ${
                  blogSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
                  <span className="absolute top-3 left-3 tag-forest">{post.category.replace(/-/g, ' ')}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs text-earth-500">{post.author.name}</span>
                    <span className="text-earth-300 text-xs">·</span>
                    <span className="text-xs text-earth-400">{post.readTime} min</span>
                  </div>
                  <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-earth-600 text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="section-label mb-3">News & Stories</p>
              <h2 className="section-heading">Latest Updates</h2>
            </div>
            <Link to="/news" className="btn-secondary self-start md:self-auto">
              All News <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.slug}`} className="group card card-hover block">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 ${
                    item.type === 'news' ? 'tag-forest' :
                    item.type === 'event' ? 'tag-amber' :
                    item.type === 'podcast' ? 'tag-earth' : 'tag-forest'
                  }`}>{item.type}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-earth-400 mb-2">{item.date}</p>
                  <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-earth-600 text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS TEASER */}
      <section className="py-16 bg-cream border-t border-earth-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-3">Investor Relations</p>
          <h2 className="font-serif text-3xl text-forest-900 mb-4">Trusted by Leading Organisations</h2>
          <p className="text-earth-600 max-w-xl mx-auto text-sm mb-8">
            We work with global investors, distributors, and retail partners who share our vision for a healthier, more sustainable Africa.
          </p>
          <Link to="/funders" className="btn-primary">
            Explore Investor Relations <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
