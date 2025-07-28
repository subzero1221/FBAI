'use client';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '@/app/store/userStore';
import { useHydrated } from '../utils/useHydrated';
import CountriesList from './CountriesList';
import EliteLeagues from './EliteLeagues';
import UefaLeagues from './UefaLeagues';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function Sidebar() {
  const { language } = useUserStore();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  return (
    <div className="w-48 h-screen fixed left-0 top-0 overflow-y-auto z-50 custom-scrollbar">
      {/* Main sidebar container with enhanced glassmorphism */}
      <div className="h-full bg-gradient-to-b from-slate-900/95 via-blue-950/90 to-slate-900/95 backdrop-blur-2xl border-r border-blue-500/30 shadow-2xl">
        {/* Animated border accent */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"></div>
        
        {/* Top spacer for header */}
        <div className="h-20"></div>
        
        <div className="p-6 space-y-8">
          {/* Enhanced sidebar header */}
          <div className="text-center space-y-4">
            {/* Logo container with improved styling */}
            <div className="relative mx-auto w-16 h-16 group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm scale-110"></div>
              
              {/* Main logo */}
              <div className="relative w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 shadow-xl border border-blue-400/50 group-hover:scale-105 transition-transform duration-300">
                <span className="text-3xl drop-shadow-lg filter">⚽</span>
              </div>
              
              {/* Subtle animated ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 group-hover:border-blue-300/50 transition-colors duration-300"></div>
            </div>
            
            {/* Title with enhanced typography */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-wide uppercase bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
                {t('leagues', language)}
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent mx-auto"></div>
            </div>
          </div>
          
          {/* Elite Leagues section */}
          <div>
            <EliteLeagues />
          </div>
          
          <div>
            <UefaLeagues />
          </div>

          <div className="space-y-3">
            {/* Section header */}
           
            {/* Countries list container */}
            <div className="pl-2">
              <CountriesList />
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}