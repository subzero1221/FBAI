import RegisterForm from '../_mainComponents/RegisterForm';
import en from '../locales/en.json';
  import ru from '../locales/ru.json';
import ka from '../locales/ka.json';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

const language = (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en';

export const metadata = {
  title: t('register', language),
  description: t('register_description', language),
};

export default function RegisterPage() {
  return <RegisterForm />;
} 