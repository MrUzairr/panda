import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import homeEn from '@context/LanguageProvider/translations/english/home_en.json';
import faqEn from '@context/LanguageProvider/translations/english/faq_en.json';
import signInEn from '@context/LanguageProvider/translations/english/signIn_en.json';
import feedbackEn from '@context/LanguageProvider/translations/english/feedback_en.json';
import UpdatesEn from '@context/LanguageProvider/translations/english/updates_en.json';
import ServicesItemsEn from '@context/LanguageProvider/translations/english/services_en.json';
import SidebarItemsEn from '@context/LanguageProvider/translations/english/sidebar_en.json';
import DashboardHeaderEn from '@context/LanguageProvider/translations/english/dashboard_header_en.json';
import AdvancedSearchEn from '@context/LanguageProvider/translations/english/advancedSearch_en.json';
import AdvancedSearchAr from '@context/LanguageProvider/translations/arabic/advancedSearch_ar.json';
import DashboardHeaderAr from '@context/LanguageProvider/translations/arabic/dashboard_header_ar.json';
import SidebarItemsAr from '@context/LanguageProvider/translations/arabic/sidebar_ar.json';
import ServicesItemsAr from '@context/LanguageProvider/translations/arabic/services_ar.json';
import UpdatesAr from '@context/LanguageProvider/translations/arabic/updates_ar.json';
import signInAr from '@context/LanguageProvider/translations/arabic/signIn_ar.json';
import feedbackAr from '@context/LanguageProvider/translations/arabic/feedback_ar.json';
import homeAr from '@context/LanguageProvider/translations/arabic/home_ar.json';
import faqAr from '@context/LanguageProvider/translations/arabic/faq_ar.json';

const fallbackLanguages = {
  en: {
    home: homeEn,
    faq: faqEn,
    signIn: signInEn,
    feedback: feedbackEn,
    updates: UpdatesEn,
    services: ServicesItemsEn,
    sidebar: SidebarItemsEn,
    dashboardHeader: DashboardHeaderEn,
    advancedSearch: AdvancedSearchEn,
  },
  ar: {
    home: homeAr,
    faq: faqAr,
    signIn: signInAr,
    feedback: feedbackAr,
    updates: UpdatesAr,
    services: ServicesItemsAr,
    sidebar: SidebarItemsAr,
    dashboardHeader: DashboardHeaderAr,
    advancedSearch: AdvancedSearchAr,
  },
};

const getInitialLanguage = () => {
  const languageFromCookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith('language='))
    ?.split('=')[1];

  if (languageFromCookies) {
    document.documentElement.lang = languageFromCookies;
    document.documentElement.dir = languageFromCookies === 'ar' ? 'rtl' : 'ltr';
    return languageFromCookies;
  }

  const languageFromSystem = navigator.language || navigator.languages[0];
  const defaultLanguage = ['en', 'ar'].includes(
    languageFromSystem.split('-')[0],
  )
    ? languageFromSystem.split('-')[0]
    : 'en';

  document.documentElement.lang = defaultLanguage;
  document.documentElement.dir = defaultLanguage === 'ar' ? 'rtl' : 'ltr';

  return defaultLanguage;
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    supportedLngs: ['en', 'ar'],
    lng: getInitialLanguage(),
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/api/translations?lang={{lng}}',
    },

    resources: {
      en: {
        translation: fallbackLanguages.en,
      },
      ar: {
        translation: fallbackLanguages.ar,
      },
    },
  })
  .then(() => {
    console.log('Loaded translations:', i18n.store.data); // Check the loaded translations
  });

export default i18n;
