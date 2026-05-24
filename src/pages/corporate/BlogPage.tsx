import React, { useState } from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';
import { blogPosts, getFeaturedBlogPosts } from '../../data/blog';

const categoryLabels: Record<string, string> = {
  'healthy-living': 'Healthy Living',
  'african-nutrition': 'African Nutrition',
  'frozen-foods': 'Frozen Foods',
  'meal-prep': 'Meal Prep',
  'family-wellness': 'Family Wellness',
  'food-innovation': 'Food Innovation',
  'nutrition-education': 'Nutrition Education',
};

const allCategories = [
  { value: 'all', label: 'All Topics' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
];

const tagColors: Record<string, string> = {
  'healthy-living': 'tag-forest',
  'african-nutrition': 'tag-amber',
  'frozen-foods': 'tag-earth',
  'meal-prep': 'tag-forest',
  'family-wellness': 'tag-amber',
  'food-innovation': 'tag-earth',
  'nutrition-education': 'tag-forest',
};

export default function BlogPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const featured = getFeaturedBlogPosts();

  const filtered = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-800 to-forest-950 py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-forest-400 mb-4">{t('blog_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-4">
            {t('blog_headline')}
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl">
            {t('blog_sub')}
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="py-12 bg-earth-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-6">{t('blog_featured_label')}</p>
            <div className="grid lg:grid-cols-2 gap-6">
              {featured.slice(0, 2).map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group card card-hover block ${i === 0 ? '' : ''}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
                    <span className={`absolute top-4 left-4 ${tagColors[post.category] ?? 'tag-forest'}`}>
                      {categoryLabels[post.category]}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs font-medium text-earth-600">{post.author.name}</span>
                      <span className="text-earth-200">·</span>
                      <span className="text-xs text-earth-400">{post.date}</span>
                      <span className="text-earth-200">·</span>
                      <Clock size={12} className="text-earth-400" />
                      <span className="text-xs text-earth-400">{post.readTime} min</span>
                    </div>
                    <h2 className="font-bold text-forest-900 text-lg leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-earth-600 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-forest-600 text-sm font-semibold group-hover:gap-3 transition-all">
                      {t('blog_read_article')} <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <div className="sticky top-[4.5rem] z-30 bg-cream border-b border-earth-200 shadow-soft py-4">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allCategories.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveCategory(c.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                  activeCategory === c.value
                    ? 'bg-forest-700 text-white shadow-forest'
                    : 'bg-white text-forest-600 hover:bg-forest-50 border border-earth-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group card card-hover block">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 ${tagColors[post.category] ?? 'tag-forest'}`}>
                    {categoryLabels[post.category]}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <User size={12} className="text-earth-400" />
                    <span className="text-xs text-earth-500">{post.author.name}</span>
                    <span className="text-earth-200">·</span>
                    <Clock size={11} className="text-earth-400" />
                    <span className="text-xs text-earth-400">{post.readTime} min</span>
                  </div>
                  <h3 className="font-bold text-forest-900 text-sm leading-snug mb-2 group-hover:text-forest-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-earth-600 text-xs leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-2xs text-earth-500 bg-earth-50 px-2 py-0.5 rounded-full border border-earth-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-earth-400">{t('blog_no_posts')}</div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="font-serif text-3xl text-white mb-3">{t('blog_newsletter_headline')}</h2>
          <p className="text-white/50 text-sm mb-7">{t('blog_newsletter_sub')}</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('newsletter_placeholder')} className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-forest-300 text-sm" />
            <button type="submit" className="btn-amber whitespace-nowrap">{t('subscribe')}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
