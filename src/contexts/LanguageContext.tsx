
import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';

type SupportedLanguage = 'en' | 'lt' | 'de' | 'fr';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  languages: {
    code: SupportedLanguage;
    name: string;
    flag: string;
  }[];
}

export const supportedLanguages: {
  code: SupportedLanguage;
  name: string;
  flag: string;
}[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Get stored language from localStorage or detect browser language
    const storedLanguage = localStorage.getItem('preferredLanguage') as SupportedLanguage | null;
    
    if (storedLanguage && supportedLanguages.some(lang => lang.code === storedLanguage)) {
      setCurrentLanguage(storedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = supportedLanguages.find(lang => lang.code === browserLang);
      
      if (supportedLang) {
        setCurrentLanguage(supportedLang.code);
      } else {
        // Default to English if language not supported
        setCurrentLanguage('en');
      }
    }
  }, []);

  useEffect(() => {
    // Apply language change
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
      localStorage.setItem('preferredLanguage', currentLanguage);
      // Update html lang attribute for SEO
      document.documentElement.setAttribute('lang', currentLanguage);
    }
  }, [currentLanguage]);

  const changeLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        languages: supportedLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
