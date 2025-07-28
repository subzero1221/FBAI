import HomePage from './_mainComponents/HomePage';
import en from './locales/en.json';
  import ru from './locales/ru.json';
import ka from './locales/ka.json';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

const language = (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en';

export const metadata = {
  title: t('home_title', language),
  description: t('home_description', language),
};

export default function Home() {
  return <HomePage />;
}
