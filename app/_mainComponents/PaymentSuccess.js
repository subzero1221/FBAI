"use client"
import Link from "next/link";
import React from "react";
import { useUserStore } from '../store/userStore';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useHydrated } from "../utils/useHydrated";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function PaymentSuccess() {
  const language = useUserStore((state) => state.language);
  
  const hydrated = useHydrated();
  if (!hydrated) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-green-100 rounded-full p-6 mb-6">
        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">{t('payment_success_title', language)}</h2>
      <p className="text-gray-600 mb-4">{t('payment_success_message', language)}</p>
      <Link href="/" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
        <p className="text-white text-bold">{t('payment_success_button', language)}</p>
      </Link>
    </div>
  );
} 