'use client';

import { useState, useEffect } from 'react';
import { colors } from './theme';
import { signup } from '@/app/actions/authActions';
import { useUserStore } from '@/app/store/userStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import en from '../locales/en.json';
import  ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useHydrated } from '../utils/useHydrated';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { language } = useUserStore();
  const hydrated = useHydrated();
  if (!hydrated) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(formData);
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
            {t('register', language)}
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: colors.text.main }}>
            {t('already_have_account', language)}
            <a href="/login" className="font-medium hover:underline" style={{ color: colors.primary.main }}>
              {t('sign_in', language)}
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">{t('full_name', language)}</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder={t('full_name', language)}
                value={formData.name}
                onChange={handleChange}
                style={{
                  backgroundColor: colors.background.main,
                  borderColor: colors.accent.dark,
                  color: colors.text.light
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder="Email address"
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
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: colors.background.main,
                  borderColor: colors.accent.dark,
                  color: colors.text.light
                }}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">{t('confirm_password', language)}</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                placeholder={t('confirm_password', language)}
                value={formData.confirmPassword}
                onChange={handleChange}
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
            >
              {t('create_account', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

