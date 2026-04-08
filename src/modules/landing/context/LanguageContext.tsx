"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en" | "fr" | "zh";

type Translations = {
  [key in Language]: {
    // Navbar
    navNosotros: string;
    navServicios: string;
    navEmpleos: string;
    navTrabaja: string;
    navAcceso: string;
    // Hero
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroSubtitle: string;
    heroBtnVacantes: string;
    heroBtnServicios: string;
  };
};

const translations: Translations = {
  es: {
    navNosotros: "Nosotros",
    navServicios: "Servicios",
    navEmpleos: "Empleos",
    navTrabaja: "Trabaja con nosotros",
    navAcceso: "Acceso Staff",
    heroBadge: "Conecta con el #TalentoEstelar",
    heroTitle1: "Te ayudamos a contratar los",
    heroTitle2: "\"A-Players\"",
    heroTitle3: "que tu empresa necesita.",
    heroSubtitle: "Dominamos Ecuador con procesos ágiles y precisos. Conectamos talento estelar con oportunidades excepcionales usando tecnología avanzada.",
    heroBtnVacantes: "Mirar Vacantes",
    heroBtnServicios: "Nuestros Servicios",
  },
  en: {
    navNosotros: "About Us",
    navServicios: "Services",
    navEmpleos: "Jobs",
    navTrabaja: "Work with us",
    navAcceso: "Staff Access",
    heroBadge: "Connect with #StellarTalent",
    heroTitle1: "We help you hire the",
    heroTitle2: "\"A-Players\"",
    heroTitle3: "your company needs.",
    heroSubtitle: "We dominate Ecuador with agile and precise processes. We connect stellar talent with exceptional opportunities using advanced technology.",
    heroBtnVacantes: "View Jobs",
    heroBtnServicios: "Our Services",
  },
  fr: {
    navNosotros: "À propos",
    navServicios: "Services",
    navEmpleos: "Emplois",
    navTrabaja: "Travaillez avec nous",
    navAcceso: "Accès Personnel",
    heroBadge: "Connectez-vous avec #TalentStellaire",
    heroTitle1: "Nous vous aidons à recruter les",
    heroTitle2: "\"A-Players\"",
    heroTitle3: "dont votre entreprise a besoin.",
    heroSubtitle: "Nous dominons l'Équateur avec des processus agiles et précis. Nous connectons des talents stellaires avec des opportunités exceptionnelles en utilisant une technologie avancée.",
    heroBtnVacantes: "Voir les Emplois",
    heroBtnServicios: "Nos Services",
  },
  zh: {
    navNosotros: "关于我们",
    navServicios: "服务",
    navEmpleos: "工作职位",
    navTrabaja: "与我们合作",
    navAcceso: "员工入口",
    heroBadge: "连接 #明星人才",
    heroTitle1: "我们帮助您聘请",
    heroTitle2: "“A级人才”",
    heroTitle3: "满足您公司的需求。",
    heroSubtitle: "我们在厄瓜多尔拥有敏捷且精确的流程。利用先进技术，将明星人才与卓越机会联系起来。",
    heroBtnVacantes: "查看职位",
    heroBtnServicios: "我们的服务",
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations["es"]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    // Try to load language preference conditionally
    const stored = localStorage.getItem("landing_lang") as Language;
    if (stored && ["es", "en", "fr", "zh"].includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("landing_lang", lang);
  };

  const t = (key: keyof Translations["es"]) => {
    return translations[language][key] || translations["es"][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
