import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, CheckCircle, Building2, Handshake, HelpCircle, Mic } from 'lucide-react';
import { useI18n } from '../../i18n';

const inquiryTypeData = [
  { value: 'general', labelKey: 'inquiry_general', icon: HelpCircle },
  { value: 'partnership', labelKey: 'inquiry_partnership', icon: Handshake },
  { value: 'export', labelKey: 'inquiry_export', icon: Building2 },
  { value: 'investor', labelKey: 'inquiry_investor', icon: Building2 },
  { value: 'media', labelKey: 'inquiry_media', icon: Mic },
];

export default function ContactPage() {
  const { t } = useI18n();
  const inquiryTypes = inquiryTypeData.map((item) => ({ ...item, label: t(item.labelKey) }));
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    type: 'general',
    message: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!form.consent) {
      setError('Please agree to the data processing terms to proceed.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-900 py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="section-label text-forest-400 mb-4">{t('contact_label')}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-4">
            {t('contact_headline')}
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl">
            {t('contact_sub')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <p className="section-label mb-4">{t('contact_info_label')}</p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail size={17} className="text-forest-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-forest-800 text-sm mb-1">{t('email')}</p>
                      <a href="mailto:jambo@maratable.com" className="text-forest-600 text-sm hover:text-forest-800 transition-colors block">
                        jambo@maratable.com
                      </a>
                      <a href="mailto:maratablegroup@gmail.com" className="text-earth-500 text-sm hover:text-forest-700 transition-colors block">
                        maratablegroup@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={17} className="text-amber-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-forest-800 text-sm mb-1">{t('contact_headquarters')}</p>
                      <p className="text-earth-600 text-sm leading-relaxed">
                        Nairobi, Kenya<br />
                        East Africa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Type Cards */}
              <div>
                <p className="section-label mb-4">{t('contact_help_label')}</p>
                <div className="space-y-3">
                  {inquiryTypes.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: value }))}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-150 ${
                        form.type === value
                          ? 'bg-forest-700 border-forest-700 text-white'
                          : 'bg-white border-earth-200 text-forest-700 hover:border-forest-300 hover:bg-forest-50'
                      }`}
                    >
                      <Icon size={18} className={form.type === value ? 'text-forest-200' : 'text-forest-500'} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Export quick contact */}
              <div className="bg-forest-50 rounded-3xl p-6 border border-forest-100">
                <p className="font-bold text-forest-800 text-sm mb-3">{t('contact_export_title')}</p>
                <p className="text-earth-600 text-xs leading-relaxed mb-4">
                  {t('contact_export_desc')}
                </p>
                <a href="mailto:jambo@maratable.com?subject=Export Enquiry" className="flex items-center gap-2 text-forest-600 text-sm font-semibold hover:gap-3 transition-all">
                  {t('contact_export_cta')} <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-4xl p-12 shadow-soft flex flex-col items-center justify-center text-center min-h-[500px]">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-forest-600" />
                  </div>
                  <h2 className="font-bold text-forest-900 text-xl mb-3">{t('contact_success_title')}</h2>
                  <p className="text-earth-600 text-sm max-w-sm leading-relaxed mb-6">
                    {t('contact_success_body')}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', country: '', type: 'general', message: '', consent: false }); }}
                    className="btn-primary"
                  >
                    {t('contact_send_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-8 lg:p-10 shadow-soft space-y-6">
                  <h2 className="font-bold text-forest-900 text-xl mb-2">Send an Inquiry</h2>
                  <p className="text-earth-500 text-sm mb-6">Complete the form below and our team will respond within 2 business days.</p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-forest-700 mb-2">{t('contact_name')} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="input-field"
                        placeholder={t('contact_name_placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest-700 mb-2">{t('contact_email')} *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="input-field"
                        placeholder={t('contact_email_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-forest-700 mb-2">{t('contact_company')}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="input-field"
                        placeholder={t('contact_company_placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest-700 mb-2">Country *</label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                        className="input-field"
                        placeholder="Your country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest-700 mb-2">{t('contact_enquiry_type')}</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      className="input-field"
                    >
                      {inquiryTypes.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest-700 mb-2">{t('contact_message')} *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="input-field resize-none"
                      placeholder={t('contact_message_placeholder')}
                    />
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-3 bg-earth-50 rounded-2xl p-4 border border-earth-100">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded accent-forest-700 flex-shrink-0 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs text-earth-600 leading-relaxed cursor-pointer">
                      I agree that this data may be stored and processed for the purpose of contacting me. I understand that I can revoke my consent at any time by emailing <a href="mailto:jambo@maratable.com" className="text-forest-600 hover:underline">jambo@maratable.com</a>.
                    </label>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  )}

                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Inquiry <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
