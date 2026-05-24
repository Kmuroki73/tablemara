import React, { useState } from 'react';
import { ArrowRight, Target, Eye, Star, Linkedin, Mail, ChevronDown, ChevronUp, Briefcase, MapPin, Crown, Settings, Monitor } from 'lucide-react';
import { Link, useRouter } from '../../router';
import { useI18n } from '../../i18n';

const coreTeam = [
  {
    name: 'James Muriuki',
    role: 'Owner & Founder',
    department: 'Executive',
    location: 'Nairobi, Kenya',
    bio: 'James founded MaraTable Group with a vision to bring premium East African wellness foods to global markets. With deep roots in the Kenyan food industry and a passion for authentic nutrition, he leads the company\'s strategic direction, investor relations, and long-term growth agenda. His entrepreneurial journey is defined by the belief that Africa\'s finest ingredients deserve a seat at the world\'s table.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=500',
    linkedin: '#',
    icon: Crown,
    color: 'from-amber-600 to-amber-800',
    tagColor: 'bg-amber-100 text-amber-800',
  },
  {
    name: 'Sarah Njoroge',
    role: 'Chief Operations Officer',
    department: 'Operations',
    location: 'Nairobi, Kenya',
    bio: 'Sarah oversees all day-to-day operations at MaraTable Group — from cold-chain logistics and production scheduling to quality control and supplier management. With 12+ years in food manufacturing and supply chain, she is the operational backbone of the company, ensuring every product that leaves our facility meets the highest international standards.',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=500',
    linkedin: '#',
    icon: Settings,
    color: 'from-forest-600 to-forest-800',
    tagColor: 'bg-forest-100 text-forest-700',
  },
  {
    name: 'Kevin Omondi',
    role: 'Head of IT',
    department: 'Technology',
    location: 'Nairobi, Kenya',
    bio: 'Kevin leads MaraTable Group\'s digital infrastructure, e-commerce platform, data systems, and technology strategy. He ensures our operations are backed by robust, scalable technology — from inventory management systems to the global-facing digital presence that connects our brand with international buyers, distributors, and consumers worldwide.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500',
    linkedin: '#',
    icon: Monitor,
    color: 'from-forest-700 to-forest-900',
    tagColor: 'bg-earth-100 text-earth-700',
  },
];

const advisors = [
  {
    name: 'Prof. Wanjiku Kamau',
    role: 'Scientific Advisor — Nutrition',
    org: 'University of Nairobi',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Dr. Kofi Asante',
    role: 'Board Advisor — Pan-African Markets',
    org: 'AfricInvest',
    image: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Sarah Chen',
    role: 'Board Advisor — International Retail',
    org: 'Independent Advisor',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Tunde Adeleke',
    role: 'Board Advisor — Food Innovation',
    org: 'African Food & Beverage Forum',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const openRoles = [
  { title: 'Senior Sales Executive — East Africa', dept: 'Commercial', location: 'Nairobi, Kenya', type: 'Full-Time' },
  { title: 'Social Media & Content Creator', dept: 'Marketing', location: 'Nairobi, Kenya (Hybrid)', type: 'Full-Time' },
  { title: 'Quality Control Technician', dept: 'Quality', location: 'Nairobi, Kenya', type: 'Full-Time' },
  { title: 'Export & Logistics Coordinator', dept: 'Operations', location: 'Nairobi, Kenya', type: 'Full-Time' },
  { title: 'Nutrition Research Intern', dept: 'R&D', location: 'Nairobi, Kenya', type: 'Internship' },
];

const timeline = [
  { year: '2018', event: 'MaraTable Group founded in Nairobi, Kenya. First products: Frozen Sukuma Wiki and Frozen Terere.' },
  { year: '2020', event: 'Reached 5,000 households in Nairobi. Expanded production facility to 2,000 sq ft cold storage.' },
  { year: '2021', event: 'KEBS food safety certification achieved. First export pilot to UK diaspora market.' },
  { year: '2022', event: 'Seed funding closed. Product line expanded to 8 SKUs. 100+ retail distribution points.' },
  { year: '2023', event: 'Series A round led by AfricInvest. European distribution partnership signed. 200 farmer partners onboarded.' },
  { year: '2024', event: 'UAE market entry. Coconut Greens Blend and Steam Packs launched. 40% year-on-year revenue growth.' },
  { year: '2025', event: 'Expanded to 12 premium products. Carbon footprint reduced by 30%. Women farmers programme launched.' },
  { year: '2026', event: 'Active in 8 international markets. Series B exploration underway. 1.2M meals served.' },
];

const subPages = [
  { path: '/about', label: 'About Us' },
  { path: '/about/vision', label: 'Our Vision' },
  { path: '/about/mission', label: 'Our Mission' },
  { path: '/about/team', label: 'Leadership Team' },
  { path: '/about/careers', label: 'Careers' },
];

export default function AboutPage() {
  const { path } = useRouter();
  const { t } = useI18n();
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-forest-900 py-24 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-amber-400/80 mb-4">{t('about_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-5 max-w-3xl">
            {t('about_hero_headline')}
          </h1>
          <p className="text-white/55 text-lg font-light max-w-2xl">
            {t('about_hero_sub')}
          </p>
        </div>
      </section>

      {/* Sub-navigation */}
      <div className="bg-white border-b border-earth-100 sticky top-[4.5rem] z-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-3">
            {subPages.map(({ path: subPath, label }) => (
              <Link
                key={subPath}
                to={subPath}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  path === subPath
                    ? 'bg-forest-700 text-white'
                    : 'text-forest-600 hover:bg-forest-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <p className="section-label mb-4">{t('about_story_label')}</p>
              <h2 className="section-heading mb-6">{t('about_who_we_are')}</h2>
              <p className="text-earth-700 leading-relaxed mb-4 text-base">
                MaraTable Group is a premium wellness food brand inspired by East African nutrition traditions. We create high-quality frozen vegetables, protein-rich meals, chapati, samosas, sauces, and convenient ready-to-heat foods crafted for modern living.
              </p>
              <p className="text-earth-700 leading-relaxed mb-4 text-base">
                Rooted in authentic flavor and wholesome ingredients, our mission is to bring elevated nourishment, convenience, and contemporary African-inspired cuisine to households around the world.
              </p>
              <p className="text-earth-700 leading-relaxed text-base">
                We believe that East Africa's extraordinary culinary and nutritional traditions deserve a seat at the global wellness table — and we are building that seat, one premium product at a time.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { icon: Eye, color: 'bg-forest-100 text-forest-700', title: t('vision_title'), desc: t('vision_desc') },
                { icon: Target, color: 'bg-amber-100 text-amber-700', title: t('mission_title'), desc: t('mission_desc') },
                { icon: Star, color: 'bg-forest-100 text-forest-700', title: t('values_title'), desc: t('values_desc') },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex gap-4 bg-white rounded-3xl p-6 shadow-soft border border-earth-50 hover:shadow-medium transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest-900 mb-2">{title}</h3>
                    <p className="text-earth-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <p className="section-label mb-4">{t('about_journey_label')}</p>
            <h2 className="section-heading mb-10">{t('about_journey_title')}</h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-earth-200 md:-translate-x-0.5" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className={`flex gap-6 md:gap-0 relative ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className={`w-full md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:ml-[calc(50%+2.5rem)]'}`}>
                      <div className="bg-white rounded-2xl p-5 shadow-soft border border-earth-100 hover:shadow-medium transition-all duration-300">
                        <span className="tag-amber mb-2 inline-flex">{item.year}</span>
                        <p className="text-earth-700 text-sm leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-forest-500 rounded-full -translate-x-1/2 mt-5 border-2 border-white shadow-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team — Core 3 */}
      <section className="py-24 bg-gradient-to-b from-earth-50 to-cream" id="team">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="section-label mb-3">{t('team_label')}</p>
            <h2 className="section-heading mb-4">{t('team_title')}</h2>
            <p className="section-subheading max-w-xl mx-auto">{t('team_sub')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {coreTeam.map((member) => {
              const isExpanded = expandedMember === member.name;
              const MemberIcon = member.icon;
              return (
                <div
                  key={member.name}
                  className="group bg-white rounded-4xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Photo with gradient overlay */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-75`} />
                    {/* Role icon badge */}
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <MemberIcon size={16} className="text-white" />
                    </div>
                    {/* Name overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wider mb-2 ${member.tagColor}`}>
                        {member.department}
                      </span>
                      <p className="font-bold text-white text-xl leading-tight">{member.name}</p>
                      <p className="text-white/75 text-sm mt-0.5 font-medium">{member.role}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-earth-400 text-xs mb-4">
                      <MapPin size={12} />
                      <span>{member.location}</span>
                    </div>

                    <p className={`text-earth-600 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {member.bio}
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-earth-100">
                      <button
                        onClick={() => setExpandedMember(isExpanded ? null : member.name)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors"
                      >
                        {isExpanded ? (
                          <><ChevronUp size={13} /> Show less</>
                        ) : (
                          <><ChevronDown size={13} /> Read more</>
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${member.name.toLowerCase().split(' ')[0]}@maratable.com`}
                          className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center text-forest-600 hover:bg-amber-100 hover:text-amber-700 transition-all"
                          aria-label="Email"
                        >
                          <Mail size={13} />
                        </a>
                        <a
                          href={member.linkedin}
                          className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center text-forest-600 hover:bg-forest-700 hover:text-white transition-all"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Join CTA */}
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-secondary">
              {t('team_join_cta')} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Board Advisors */}
      <section className="py-16 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="mb-10">
            <p className="section-label mb-3">{t('advisors_label')}</p>
            <h2 className="font-serif text-3xl text-forest-900">{t('advisors_title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="bg-white rounded-3xl p-5 shadow-soft flex items-center gap-4 group hover:shadow-medium transition-all hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-forest-100 flex-shrink-0">
                  <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-bold text-forest-900 text-sm leading-tight">{advisor.name}</p>
                  <p className="text-earth-500 text-xs mt-0.5 leading-snug">{advisor.role}</p>
                  <p className="text-amber-600 text-2xs font-medium mt-1">{advisor.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles / Careers */}
      <section className="py-16 bg-forest-900" id="careers">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label text-amber-400/80 mb-3">{t('careers_label')}</p>
              <h2 className="font-serif text-4xl text-white mb-4">{t('careers_title')}</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6">{t('careers_sub')}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:jambo@maratable.com?subject=Career Application" className="btn-amber">
                  {t('careers_apply_cta')} <Mail size={14} />
                </a>
                <Link to="/contact" className="btn-white">
                  {t('careers_contact_cta')}
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400/80 mb-4">{t('careers_open_roles')}</p>
              {openRoles.map((role) => (
                <div key={role.title} className="bg-white/8 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 group hover:bg-white/12 transition-all">
                  <div>
                    <p className="font-semibold text-white text-sm">{role.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-white/45 text-xs">
                        <Briefcase size={11} /> {role.dept}
                      </span>
                      <span className="flex items-center gap-1 text-white/45 text-xs">
                        <MapPin size={11} /> {role.location}
                      </span>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wide ${
                    role.type === 'Internship' ? 'bg-amber-400/20 text-amber-300' : 'bg-forest-500/30 text-forest-200'
                  }`}>
                    {role.type}
                  </span>
                </div>
              ))}
              <p className="text-white/35 text-xs pt-2">{t('careers_more_roles')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
