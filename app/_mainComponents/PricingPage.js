"use client"
import { FaCheckCircle } from 'react-icons/fa';
import { handleCheckOut } from '../actions/paymentActions';
import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function PricingPage() {
  const language = useUserStore((state) => state.language);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const updateTokens = useUserStore((state) => state.updateTokens); 
  
  const plans = [
    {
      name: t('pricing_starter_name', language),
      identifier: "starter",
      credits: '1,000',
      price: '$5.99',
      description: t('pricing_starter_description', language),
      features: [
        `1,000 ${t('pricing_feature_credits', language)}`,
        t('pricing_feature_basic_analysis', language),
        t('pricing_feature_email_support', language),
        t('pricing_feature_standard_leagues', language),
      ],
      buttonText: t('pricing_starter_button', language),
      buttonLink: '/pricing/starter',
    },
    {
      name: t('pricing_advanced_name', language),
      identifier: "advanced",
      credits: '5,000',
      price: '$15.99',
      description: t('pricing_advanced_description', language),
      features: [
        `5,000 ${t('pricing_feature_credits', language)}`,
        t('pricing_feature_advanced_analysis', language),
        t('pricing_feature_priority_support', language),
        t('pricing_feature_all_leagues', language),
        t('pricing_feature_weekly_tips', language),
      ],
      buttonText: t('pricing_advanced_button', language),
      buttonLink: '/pricing/advanced',
    },
    {
      name: t('pricing_pro_name', language),
      identifier: "pro",
      credits: '15,000',
      price: '$29.99',
      description: t('pricing_pro_description', language),
      features: [
        `15,000 ${t('pricing_feature_credits', language)}`,
        t('pricing_feature_premium_analysis', language),
        t('pricing_feature_24_7_support', language),
        t('pricing_feature_all_leagues', language),
        t('pricing_feature_exclusive_strategies', language),
        t('pricing_feature_realtime_predictions', language),
      ],
      buttonText: t('pricing_pro_button', language),
      buttonLink: '/pricing/pro',
    },
  ];

  const handlePurchase = async (planName) => {
    setLoadingPlan(planName);
    const result = await handleCheckOut(planName);
    setLoadingPlan(null);
    if (result.success && result.url) {
      updateTokens(result.tokens)
      window.location.href = result.url;
    } else {
      alert(result.message || 'Failed to start checkout.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#374151] py-12 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pricing_title', language)}</h1>
          <p className="mt-4 text-lg text-gray-300">{t('pricing_subtitle', language)}</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-blue-700 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
                index === 1 ? 'border-4 border-cyan-400' : 'border border-blue-500/50'
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {t('pricing_most_popular', language)}
                </div>
              )}
              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-4 text-4xl font-bold text-white">{plan.credits} {t('pricing_credits', language)}</p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">{plan.price}</p>
              <p className="mt-2 text-blue-200">{plan.description}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-blue-100">
                    <FaCheckCircle className="w-5 h-5 text-cyan-300 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(plan.identifier)}
                disabled={loadingPlan === plan.identifier}
                className={`mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${loadingPlan === plan.identifier ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loadingPlan === plan.identifier ? t('pricing_processing', language) : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

