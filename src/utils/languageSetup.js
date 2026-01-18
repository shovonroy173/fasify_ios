// src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import en from '../../assets/locales/en.js';
// import es from '../../assets/locales/es.js';
// import fr from '../../assets/locales/fr.js';
// import ar from '../../assets/locales/ar.js';


// i18n
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en', // default
//     resources: {
//       en: { translation: en },
//       fr: { translation: fr },
//       es: { translation: es },
//       ar: { translation: ar },
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


// utils/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';

// import en from '../../assets/locales/en.js';
// import es from '../../assets/locales/es.js';
// import fr from '../../assets/locales/fr.js';
// import ar from '../../assets/locales/ar.js';

// // const fallback = { languageTag: 'en', isRTL: false };
// // const bestLang = RNLocalize.findBestAvailableLanguage(['en', 'es', 'fr', 'ar']) || fallback;

// i18n
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     resources: {
//       en: { translation: en },
//       es: { translation: es },
//       fr: { translation: fr },
//       ar: { translation: ar },
//     },
//     // lng: bestLang.languageTag,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../../assets/locales/en';
import es from '../../assets/locales/es';
import fr from '../../assets/locales/fr';
import ar from '../../assets/locales/ar';
import pt from '../../assets/locales/pt';

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        callback(storedLang);
      } else {
        callback(getDeviceLanguage());
      }
    } catch (e) {
      callback(getDeviceLanguage());
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
      pt: { translation: pt },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
