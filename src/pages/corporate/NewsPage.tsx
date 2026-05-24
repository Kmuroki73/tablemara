import React, { useState } from 'react';
import { Play, Headphones, Users, Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';
import { newsItems, getFeaturedNews } from '../../data/news';

const typeConfig: Record<string, { label: string; icon: React.ElementType; tagClass: string }> = {
  news: { label: 'News', icon: Newspaper, tagClass: 'tag-forest' },
  event: { label: 'Event', icon: Calendar, tagClass: 'tag-amber' },
  podcast: { label: 'Podcast', icon: Headphones, tagClass: 'tag-earth' },
  influencer: { label: 'Influencer', icon: Users, tagClass: 'tag-earth' },
  video: { label: 'Video', icon: Play, tagClass: 'tag-forest' },
};

const filterTypes = [
  { value: 'all', label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'event', label: 'Events' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'video', label: 'Video' },
];

export default function NewsPage() {
  const { t } = useI18n();
  const [activeType, setActiveType] = useState('all');
  const featured = getFeaturedNews().slice(0, 1)[0];
  const filtered = activeType === 'all' ? newsItems : newsItems.filter((n) => n.type === activeType);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-900 py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-forest-400 mb-4">{t('news_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-4">
            {t('news_headline')}
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl">
            {t('news_sub')}
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-12 bg-earth-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <Link to={`/news/${featured.slug}`} className="group grid lg:grid-cols-5 gap-0 bg-white rounded-4xl overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="lg:col-span-3 relative h-72 lg:h-auto overflow-hidden">
                {featured.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                <span className={`absolute top-5 left-5 ${typeConfig[featured.type].tagClass}`}>
                  {typeConfig[featured.type].label}
                </span>
              </div>
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-xs text-earth-400 mb-3">{featured.date}</p>
                <h2 className="font-serif text-2xl md:text-3xl text-forest-900 leading-snug mb-4 group-hover:text-forest-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-forest-600 text-sm font-semibold group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="sticky top-[4.5rem] z-30 bg-cream border-b border-earth-200 py-4 shadow-soft">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex gap-2 overflow-x-auto">
          {filterTypes.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeType === f.value
                  ? 'bg-forest-700 text-white'
                  : 'bg-white text-forest-600 hover:bg-forest-50 border border-earth-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const config = typeConfig[item.type];
              const TypeIcon = config.icon;
              return (
                <Link key={item.id} to={`/news/${item.slug}`} className="group card card-hover block">
                  <div className="relative h-52 overflow-hidden bg-forest-100">
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                          <Play size={16} className="text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    {item.type === 'podcast' && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                          <Headphones size={16} className="text-white" />
                        </div>
                      </div>
                    )}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
                    <span className={`absolute top-3 left-3 ${config.tagClass}`}>{config.label}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon size={13} className="text-earth-400" />
                      <span className="text-xs text-earth-400">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-earth-600 text-xs leading-relaxed line-clamp-3">{item.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-white mb-4">{t('news_social_headline')}</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {t('news_social_sub')}
              </p>
              <div className="flex flex-wrap gap-3">
                {['@MaraTableKE on Instagram', '@MaraTable on TikTok', 'Mara Table on YouTube'].map((handle) => (
                  <span key={handle} className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70 border border-white/15">
                    {handle}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=300',
                'https://images.pexels.com/photos/1640777/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300',
                'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=300',
                'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=300',
                'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300',
                'https://images.pexels.com/photos/1640770/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=300',
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
