// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* ========= EN ========= */
import aboutEn from "./en/about.json";
import contactEn from "./en/contact.json";
import workEn from "./en/work.json";
import cookieEn from "./en/cookie.json";
import privacyEn from "./en/privacy.json";
import termsEn from "./en/terms.json";
import homeEn from "./en/home.json";
import notFoundEn from "./en/notFound.json";

/* ========= ES ========= */
import aboutEs from "./es/about.json";
import contactEs from "./es/contact.json";
import workEs from "./es/work.json";
import cookieEs from "./es/cookie.json";
import privacyEs from "./es/privacy.json";
import termsEs from "./es/terms.json";
import homeEs from "./es/home.json";
import notFoundEs from "./es/notFound.json";

/* ========= NL ========= */
import aboutNl from "./nl/about.json";
import contactNl from "./nl/contact.json";
import workNl from "./nl/work.json";
import cookieNl from "./nl/cookie.json";
import privacyNl from "./nl/privacy.json";
import termsNl from "./nl/terms.json";
import homeNl from "./nl/home.json";
import notFoundNl from "./nl/notFound.json";

/* ========= FR ========= */
import aboutFr from "./fr/about.json";
import contactFr from "./fr/contact.json";
import workFr from "./fr/work.json";
import cookieFr from "./fr/cookie.json";
import privacyFr from "./fr/privacy.json";
import termsFr from "./fr/terms.json";
import homeFr from "./fr/home.json";
import notFoundFr from "./fr/notFound.json";

/* ========= helper para idioma inicial ========= */
const getInitialLang = () => {
  const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  if (stored) return stored;

  const browser = typeof navigator !== "undefined" ? navigator.language?.slice(0, 2) : "en";
  if (["en", "es", "nl", "fr"].includes(browser)) return browser;
  return "en";
};

i18n
  .use(initReactI18next)
  .init({
    lng: getInitialLang(),
    fallbackLng: "en",
    ns: ["about", "contact", "work", "cookie", "privacy", "terms", "home", "notFound"],
    defaultNS: "home",
    resources: {
      en: {
        about: aboutEn,
        contact: contactEn,
        work: workEn,
        cookie: cookieEn,
        privacy: privacyEn,
        terms: termsEn,
        home: homeEn,
        notFound: notFoundEn,
      },
      es: {
        about: aboutEs,
        contact: contactEs,
        work: workEs,
        cookie: cookieEs,
        privacy: privacyEs,
        terms: termsEs,
        home: homeEs,
        notFound: notFoundEs,
      },
      nl: {
        about: aboutNl,
        contact: contactNl,
        work: workNl,
        cookie: cookieNl,
        privacy: privacyNl,
        terms: termsNl,
        home: homeNl,
        notFound: notFoundNl,
      },
      fr: {
        about: aboutFr,
        contact: contactFr,
        work: workFr,
        cookie: cookieFr,
        privacy: privacyFr,
        terms: termsFr,
        home: homeFr,
        notFound: notFoundFr,
      },
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
