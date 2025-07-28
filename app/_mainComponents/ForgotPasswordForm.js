'use client';

import { useState } from 'react';
import { colors } from './theme';
import { forgotPassword } from '../actions/authActions';
import { useUserStore } from '@/app/store/userStore';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useHydrated } from '../utils/useHydrated';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { language } = useUserStore();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await forgotPassword({ email });
    setLoading(false);
    if (res.success) {
      setMessage(t('forgot_password_success', language));
    } else {
      setMessage(res.message || t('forgot_password_error', language));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold" style={{ color: colors.text.light }}>
            {t('forgot_password_title', language)}
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: colors.text.main }}>
            {t('forgot_password_subtitle', language)}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">{t('email', language)}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder={t('email', language)}
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  backgroundColor: colors.background.main,
                  borderColor: colors.accent.dark,
                  color: colors.text.light
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
              style={{ background: 'linear-gradient(to right, #1E3A8A, #3B82F6)' }}
              disabled={loading}
            >
              {loading ? t('loading', language) : t('send_reset_link', language)}
            </button>
          </div>
          {message && <div className="text-center text-sm mt-2" style={{ color: colors.primary.main }}>{message}</div>}
        </form>
      </div>
    </div>
  );
} 