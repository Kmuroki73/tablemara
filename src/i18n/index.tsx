import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../types';
import { allTranslations } from './translations';

interface I18nContext {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const I18nCtx = createContext<I18nContext>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return allTranslations[lang][key] ?? allTranslations['en'][key] ?? key;
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];
