import React, { useState } from 'react';
import { ArrowRight, Clock, BookOpen, BarChart2, Lightbulb, FileText } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';
import { researchPosts } from '../../data/research';

const typeIcons: Record<string, React.ElementType> = {
  publication: BookOpen,
  report: BarChart2,
  insight: Lightbulb,
  study: FileText,
};

const typeColors: Record<string, string> = {
  publication: 'tag-forest',
  report: 'tag-amber',
  insight: 'tag-earth',
  study: 'tag-forest',
};

const categories = [
  { value: 'all', label: 'All Topics' },
  { value: 'nutrition-innovation', label: 'Nutrition Innovation' },
  { value: 'african-wellness', label: 'African Wellness' },
  { value: 'food-sustainability', label: 'Food Sustainability' },
  { value: 'export-markets', label: 'Export Markets' },
  { value: 'consumer-health', label: 'Consumer Health' },
  { value: 'food-science', label: 'Food Science' },
];

export default function ResearchPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');

  const filtered = researchPosts.filter((r) => {
    const catMatch = activeCategory === 'all' || r.category === activeCategory;
    const typeMatch = activeType === 'all' || r.type === activeType;
    return catMatch && typeMatch;
  });

  const featured = researchPosts.filter((r) => r.featured)[0];

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Hero */}
      <section className="bg-forest-900 py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-forest-400 mb-4">{t('research_label')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-4">
                {t('research_headline')}
              </h1>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                {t('research_sub')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-72">
              {[
                { val: '6+', label: t('research_areas') },
                { val: '24', label: t('publications') },
                { val: '12', label: t('industry_reports') },
                { val: '8', label: t('expert_authors') },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/8 rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-white/45 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      {featured && (
        <section className="py-12 bg-earth-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-6">{t('research_featured_label')}</p>
            <Link to={`/research/${featured.slug}`} className="group grid lg:grid-cols-2 gap-0 bg-white rounded-4xl overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                <span className={`absolute top-5 left-5 ${typeColors[featured.type]}`}>{featured.type}</span>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-earth-500">{featured.date}</span>
                  <span className="text-earth-300">·</span>
                  <Clock size={13} className="text-earth-400" />
                  <span className="text-xs text-earth-500">{featured.readTime} min read</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-forest-900 leading-snug mb-4 group-hover:text-forest-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-forest-50 text-forest-600 text-xs rounded-full border border-forest-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-forest-600 text-sm font-semibold group-hover:gap-3 transition-all">
                  {t('research_read_report')} <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 bg-cream sticky top-[4.5rem] z-30 border-b border-earth-200 shadow-soft">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveCategory(c.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                    activeCategory === c.value
                      ? 'bg-forest-700 text-white shadow-forest'
                      : 'bg-white text-forest-600 hover:bg-forest-50 border border-earth-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {['all', 'publication', 'report', 'insight', 'study'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-150 ${
                    activeType === type
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'text-earth-500 hover:bg-earth-100'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Grid */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => {
              const TypeIcon = typeIcons[r.type];
              return (
                <Link key={r.id} to={`/research/${r.slug}`} className="group card card-hover block">
                  <div className="relative h-48 overflow-hidden">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
                    <span className={`absolute top-3 left-3 ${typeColors[r.type]}`}>{r.type}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TypeIcon size={13} className="text-earth-400" />
                      <span className="text-xs text-earth-400">{r.date}</span>
                      <span className="text-earth-300">·</span>
                      <Clock size={11} className="text-earth-400" />
                      <span className="text-xs text-earth-400">{r.readTime} min</span>
                    </div>
                    <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-earth-600 text-xs leading-relaxed line-clamp-3 mb-4">{r.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-earth-50 text-earth-500 text-2xs rounded-full border border-earth-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-earth-400">
              {t('research_no_results')}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">{t('research_collaborate_headline')}</h2>
          <p className="text-white/55 max-w-xl mx-auto text-sm mb-8">
            {t('research_collaborate_sub')}
          </p>
          <Link to="/contact" className="btn-amber">
            {t('get_in_touch')} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
