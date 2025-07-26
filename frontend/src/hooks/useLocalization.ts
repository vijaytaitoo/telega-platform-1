import { useState, useEffect } from 'react';

export type Language = 'ru' | 'uz' | 'en';
export type Currency = 'RUB' | 'UZS' | 'USD' | 'EUR';

interface LocalizationContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (amount: number) => string;
}

const translations = {
  ru: require('../locales/ru.json'),
  uz: require('../locales/uz.json'),
  en: require('../locales/en.json'),
};

const currencySymbols = {
  RUB: '₽',
  UZS: 'UZS',
  USD: '$',
  EUR: '€',
};

const exchangeRates = {
  RUB: 1,
  UZS: 150, // Примерный курс
  USD: 0.011, // Примерный курс
  EUR: 0.01, // Примерный курс
};

export const useLocalization = (): LocalizationContextType => {
  const [language, setLanguageState] = useState<Language>('ru');
  const [currency, setCurrencyState] = useState<Currency>('RUB');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedCurrency = localStorage.getItem('currency') as Currency;

    if (savedLanguage) setLanguageState(savedLanguage);
    if (savedCurrency) setCurrencyState(savedCurrency);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('currency', curr);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    return (value as string) || key;
  };

  const formatPrice = (amount: number): string => {
    const convertedAmount = amount * exchangeRates[currency];
    const symbol = currencySymbols[currency];

    if (currency === 'UZS') {
      return `${convertedAmount.toLocaleString('uz-UZ')} ${symbol}`;
    }

    return `${symbol}${convertedAmount.toFixed(2)}`;
  };

  return {
    language,
    currency,
    setLanguage,
    setCurrency,
    t,
    formatPrice,
  };
};
