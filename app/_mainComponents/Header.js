
'use client';

import Link from 'next/link';
import { colors } from './theme';
import { useUserStore } from '@/app/store/userStore';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { logout } from '../actions/authActions';
import { useHydrated } from '../utils/useHydrated';
import Image from 'next/image';
import AvatarModal from './AvatarModal';
import { MdOutlineLanguage } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import { useState } from 'react';
import SearchBar from './SearchBar';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'ka', label: 'ქართული' },
];

const translations = { en, ru, ka };

function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function Header() {
  const { user, loading, language, setLanguage, setUser } = useUserStore();
  const hydrated = useHydrated();
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  if (!hydrated) return null;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      useUserStore.getState().clearUser();
    } else {
      console.error(res.message);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-blue-950/90 to-slate-900/95 border-b border-blue-500/30 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 py-2">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm scale-110"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 hover:scale-110 transition-transform duration-300 shadow-xl border border-blue-400/50">
                <Link href="/" className="text-2xl font-bold text-white">
                  <Image src="/logo.jpg" alt="logo" width={50} height={50} className="rounded-full" />
                </Link>
              </div>
            </div>
            <div className="space-y-0.5">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {t('brand', language)}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300/80">{t('tagline', language)}</p>
            </div>
          </div>

          {/* Search Bar and Predict AI Button */}
          <div className="flex items-center justify-center flex-1 space-x-4 mx-4">
            <div className="w-full max-w-xs sm:max-w-sm">
              <SearchBar placeholder={t('search_placeholder', language)} />
            </div>
            <Link
              href="/predict"
              className="inline-flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 border border-blue-400/40 backdrop-blur-md group focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}
              title="Predict AI"
            >
              <FaRobot className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-100 transition-colors" />
              <span className="font-medium text-sm sm:text-base text-white">{t('predict_header', language)}</span>
            </Link>
          </div>

          {/* User Section + Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Language Switcher */}
            <div className="relative group">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-200">
                <MdOutlineLanguage style={{ color: '#fff' }} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="appearance-none pl-9 pr-7 py-2 rounded-lg text-xs sm:text-sm bg-slate-800/60 text-slate-200 border border-slate-600/40 focus:border-blue-400/60 focus:bg-slate-800/80 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:border-slate-500/60"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-800 text-slate-200">
                    {lang.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-300 transition-colors duration-300">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-600/50 to-slate-500/50 animate-pulse" />
                <div className="h-4 w-16 sm:w-20 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded animate-pulse" />
                <div className="h-8 w-12 sm:w-16 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded-lg animate-pulse" />
              </div>
            ) : user && user.name ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500/60 hover:border-blue-400/80 transition-all duration-300 group"
                  onClick={() => setAvatarModalOpen(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300"></div>
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm sm:text-lg">{user.name?.[0] || '?'}</span>
                    </div>
                  )}
                </button>
                <span className="font-medium text-slate-200 hover:text-slate-100 transition-colors duration-300 text-xs sm:text-sm">
                  {user.name}
                </span>
                {typeof user.tokens !== 'undefined' && (
                  <span className="px-2 py-1 rounded-full bg-blue-900/80 text-cyan-200 font-semibold text-xs sm:text-sm shadow border border-blue-400/30 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="2" d="M12 8v4l2 2" />
                    </svg>
                    {user.tokens}
                  </span>
                )}
                <button
                  className="px-2 py-2 rounded-lg cursor-pointer text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 shadow-lg hover:shadow-xl"
                  onClick={handleLogout}
                >
                  {t('logout', language)}
                </button>
                <Link
                  href="/pricing"
                  className="px-2 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 transition-all duration-300 border border-pink-400/30 hover:border-pink-300/50 shadow-lg hover:shadow-xl"
                >
                  {t('price', language)}
                </Link>
                <AvatarModal
                  isOpen={avatarModalOpen}
                  onClose={() => setAvatarModalOpen(false)}
                  currentAvatar={user.avatar}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  href="/login"
                  className="px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300 backdrop-blur-sm"
                >
                <p className='text-white'>{t('login', language)}</p>  
                </Link>
                <Link
                  href="/register"
                  className="px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 shadow-lg hover:shadow-xl"
                >
                 <p className='text-white'>{t('register', language)}</p>  
                </Link>
                <Link
                  href="/pricing"
                  className="px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 transition-all duration-300 border border-pink-400/30 hover:border-pink-300/50 shadow-lg hover:shadow-xl"
                >
                <p className='text-white'>{t('price', language)}</p>  
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


