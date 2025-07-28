import LoginForm from '../_mainComponents/LoginForm';
import en from '../locales/en.json';
import ru    from '../locales/ru.json';
import ka from '../locales/ka.json';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

const language = (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en';

export const metadata = {
  title: t('login', language),
  description: t('login_description', language),
};

export default function LoginPage() {
  return <LoginForm />;
} 