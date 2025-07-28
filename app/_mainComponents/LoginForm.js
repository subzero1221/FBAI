'use client';

import { useState, useEffect } from 'react';
import { colors } from './theme';
import { login } from '../actions/authActions';
import { useUserStore } from '@/app/store/userStore';
import { useRouter } from 'next/navigation';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useHydrated } from '../utils/useHydrated';
import Link from 'next/link';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { language } = useUserStore();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) {
      useUserStore.getState().setUser(res.user);
      router.push('/'); 
    } else {
      console.error(res.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold" style={{ color: colors.text.light }}>
            {t('sign_in_title', language)}
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: colors.text.main }}>
            {t('or', language)}{' '}
            <a href="/register" className="font-medium hover:underline" style={{ color: colors.primary.main }}>
              {t('create_new_account', language)}
            </a>
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
                value={formData.email}
                onChange={handleChange}
                style={{
                  backgroundColor: colors.background.main,
                  borderColor: colors.accent.dark,
                  color: colors.text.light
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t('password', language)}</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder={t('password', language)}
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: colors.background.main,
                  borderColor: colors.accent.dark,
                  color: colors.text.light
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                style={{ backgroundColor: colors.background.main, borderColor: colors.accent.dark }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: colors.text.main }}>
                {t('remember_me', language)}
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium hover:underline" style={{ color: colors.primary.main }}>
                {t('forgot_password', language)}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
              style={{ background: 'linear-gradient(to right, #1E3A8A, #3B82F6)' }}
            >
              {t('sign_in', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 