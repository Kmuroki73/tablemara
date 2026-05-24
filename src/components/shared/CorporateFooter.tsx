import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from '../../router';
import { useI18n } from '../../i18n';

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
    </svg>
  );
}

const footerLinks = {
  company: [
    { label: 'Our Vision', path: '/about/vision' },
    { label: 'Our Mission', path: '/about/mission' },
    { label: 'Leadership Team', path: '/about/team' },
    { label: 'Investor Relations', path: '/funders' },
    { label: 'Careers', path: '/about/careers' },
    { label: 'Contact Us', path: '/contact' },
  ],
  explore: [
    { label: 'Research', path: '/research' },
    { label: 'News Room', path: '/news' },
    { label: 'CSR Responsibility', path: '/responsibility' },
    { label: 'Export', path: '/export' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
  ],
  products: [
    { label: 'Frozen Meals', path: '/shop?category=frozen-meals' },
    { label: 'Ready Meals', path: '/shop?category=ready-meals' },
    { label: 'Healthy Kids', path: '/shop?category=healthy-kids' },
    { label: 'Organic Foods', path: '/shop?category=organic-foods' },
    { label: 'Sun Dried Fruits', path: '/shop?category=sun-dried-fruits' },
    { label: 'Shop All Products', path: '/shop' },
  ],
};

const social = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: null, label: 'TikTok', href: 'https://tiktok.com' },
  { icon: Twitter, label: 'X / Twitter', href: 'https://x.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

export default function CorporateFooter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest-950 text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl mb-1">{t('newsletter_headline')}</h3>
              <p className="text-white/60 text-sm">{t('newsletter_sub')}</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-forest-700/50 text-forest-200 px-6 py-3 rounded-full text-sm font-medium">
                <span>You're in! Welcome to the community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter_placeholder')}
                  required
                  className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
                >
                  {t('newsletter_btn')} <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/MTG_LOGO.png"
                alt="MaraTable Group"
                className="h-14 w-auto object-contain"
              />
              <div>
                <span className="text-white font-bold text-lg tracking-tight block">MaraTable Group</span>
                <span className="text-amber-400/70 text-xs uppercase tracking-widest">Frozen Foods</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              {t('footer_tagline')} Premium wellness food inspired by East African nutrition traditions, crafted for global markets.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Mail size={14} className="text-amber-500/70 flex-shrink-0" />
              <a href="mailto:jambo@maratable.com" className="text-white/60 hover:text-white text-sm transition-colors">
                jambo@maratable.com
              </a>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Mail size={14} className="text-amber-500/70 flex-shrink-0" />
              <a href="mailto:maratablegroup@gmail.com" className="text-white/60 hover:text-white text-sm transition-colors">
                maratablegroup@gmail.com
              </a>
            </div>
            <p className="text-white/35 text-xs">Nairobi, Kenya · East Africa</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500/80 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500/80 mb-5">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500/80 mb-5">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/shop"
                className="flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 w-fit"
              >
                Visit Shop <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} MaraTable Group. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-amber-500/20 flex items-center justify-center text-white/50 hover:text-amber-300 transition-all duration-200"
              >
                {label === 'TikTok' ? <TikTokIcon size={15} /> : Icon ? <Icon size={15} /> : null}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-white/35 hover:text-white/70 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/35 hover:text-white/70 text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
