import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, Globe, ShoppingBag, ExternalLink } from 'lucide-react';
import { Link, useRouter } from '../../router';
import { useI18n, languages } from '../../i18n';

const navItems = [
  { key: 'nav_research', path: '/research' },
  { key: 'nav_news', path: '/news' },
  { key: 'nav_responsibility', path: '/responsibility' },
  {
    key: 'nav_export',
    path: '/export',
    children: [
      { label: 'Global Distribution', path: '/export#distribution' },
      { label: 'Wholesale Partnerships', path: '/export#wholesale' },
      { label: 'International Markets', path: '/export#markets' },
      { label: 'Export Standards', path: '/export#standards' },
      { label: 'Food Safety', path: '/export#safety' },
      { label: 'Contact Export Team', path: '/contact' },
    ],
  },
  {
    key: 'nav_about',
    path: '/about',
    children: [
      { label: 'Our Vision', path: '/about/vision' },
      { label: 'Our Mission', path: '/about/mission' },
      { label: 'About MaraTable Group', path: '/about' },
      { label: 'Leadership Team', path: '/about/team' },
      { label: 'Careers', path: '/about/careers' },
    ],
  },
  { key: 'nav_funders', path: '/funders' },
  { key: 'nav_contact', path: '/contact' },
];

export default function CorporateNav() {
  const { t } = useI18n();
  const { lang, setLang } = useI18n();
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [path]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const isHeroPage = path === '/';
  const isLight = scrolled || mobileOpen || searchOpen || !isHeroPage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? 'bg-white/97 backdrop-blur-md shadow-soft border-b border-earth-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <img
                src="/MTG_LOGO.png"
                alt="MaraTable Group"
                className="h-11 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col -space-y-0.5">
                <span
                  className={`font-bold text-base tracking-tight leading-tight transition-colors duration-300 ${
                    !isLight ? 'text-white' : 'text-forest-900'
                  }`}
                >
                  MaraTable Group
                </span>
                <span
                  className={`text-2xs uppercase tracking-widest transition-colors duration-300 ${
                    !isLight ? 'text-amber-300/80' : 'text-amber-700'
                  }`}
                >
                  Frozen Foods
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      !isLight
                        ? 'text-white/85 hover:text-white hover:bg-white/10'
                        : 'text-forest-800 hover:text-forest-600 hover:bg-forest-50'
                    } ${path.startsWith(item.path) && item.path !== '/'
                        ? (!isLight ? 'text-amber-300 font-semibold' : 'text-forest-600 font-semibold')
                        : ''
                    }`}
                  >
                    {t(item.key)}
                    {item.children && <ChevronDown size={12} className="opacity-60 mt-0.5" />}
                  </Link>

                  {item.children && activeDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-1 w-58 bg-white rounded-2xl shadow-strong border border-earth-100 py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-forest-700 hover:bg-forest-50 hover:text-forest-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-all duration-150 ${
                  !isLight
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-forest-700 hover:bg-forest-50'
                }`}
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    !isLight
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-forest-700 hover:bg-forest-50'
                  }`}
                >
                  <Globe size={14} />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown size={11} className="opacity-60" />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-2xl shadow-strong border border-earth-100 py-2 z-50">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-forest-50 ${
                            lang === l.code ? 'text-forest-600 font-semibold' : 'text-forest-700'
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Shop Button */}
              <Link
                to="/shop"
                className="hidden md:flex items-center gap-1.5 bg-forest-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-forest-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-forest"
              >
                <ShoppingBag size={14} />
                <span>{t('nav_shop')}</span>
                <ExternalLink size={11} className="opacity-70" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-full transition-all duration-150 ${
                  !isLight && !mobileOpen
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-forest-700 hover:bg-forest-50'
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 pt-1 border-t border-earth-100">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full pl-10 pr-4 py-3 bg-earth-50 rounded-2xl text-sm text-forest-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-forest-300"
                />
                <button onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-earth-400 hover:text-forest-700">
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-earth-100 shadow-strong">
            <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link to="/" className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-forest-700 hover:bg-forest-50 transition-colors">
                {t('nav_home')}
              </Link>
              {navItems.map((item) => (
                <div key={item.key}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-forest-700 hover:bg-forest-50 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="flex items-center pl-8 pr-4 py-2.5 rounded-xl text-sm text-forest-500 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-2 border-t border-earth-100">
                <Link
                  to="/shop"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-forest-700 hover:bg-forest-600 transition-colors"
                >
                  <ShoppingBag size={16} />
                  {t('nav_shop')}
                  <ExternalLink size={13} className="ml-auto opacity-70" />
                </Link>
              </div>
              <div className="pt-2 border-t border-earth-100 flex flex-wrap gap-2 px-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      lang === l.code ? 'bg-forest-100 text-forest-700' : 'text-earth-600 hover:bg-earth-100'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      {!isHeroPage && <div className="h-18" />}
    </>
  );
}
