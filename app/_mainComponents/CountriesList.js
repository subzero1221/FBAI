import { getCountries } from '../actions/footballActions';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/userStore';
import { useRouter } from 'next/navigation';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import ruLocale from 'i18n-iso-countries/langs/ru.json';
import kaLocale from 'i18n-iso-countries/langs/ka.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import Image from 'next/image';


countries.registerLocale(enLocale);
countries.registerLocale(ruLocale);
countries.registerLocale(kaLocale);

const getCountryName = (code, lang) => {
  return countries.getName(code, lang) || countries.getName(code, 'en') || code;
};

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function CountriesList() {
  const { language } = useUserStore();
  const router = useRouter();
 
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  if (isLoading) {
    return (
      <div className="space-y-1 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-md border border-slate-600/30"></div>
        ))}
        <div className="text-[10px] text-slate-400/80 text-center mt-2 font-medium">
          Loading countries...
        </div>
      </div>
    );
  }



  if (error) {
    return (
      <div className="p-2 rounded-md bg-gradient-to-r from-red-950/50 to-red-900/50 border border-red-500/30">
        <div className="flex items-center space-x-1.5">
          <span className="text-red-400 text-xs">⚠️</span>
          <span className="text-[10px] text-red-300 font-medium">
            {error.message || 'Error loading countries'}
          </span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className="mb-1.5">
      {/* Section Header */}
      <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
        <span className="w-5 h-5 rounded-md bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow border border-green-400/30 text-sm">🌍</span>
        <h2 className="text-sm font-bold bg-gradient-to-r from-green-200 via-emerald-200 to-green-300 bg-clip-text text-transparent tracking-wide">
          {t('countriesleagues_title', language)}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400/20 via-emerald-400/10 to-transparent ml-1"></div>
      </div>
      
      {/* Countries List */}
      <div className="flex flex-col gap-0.5">
        {data.map((country) => (
          <button
            key={country.name}
            onClick={() => router.push(`/country/${country.name}`)}
            title={getCountryName(country.code, language)}
            className="group flex items-center gap-1.5 w-full px-1.5 py-1 rounded-md bg-slate-800/70 hover:bg-green-900/40 border border-slate-700/40 hover:border-green-400/40 transition-all cursor-pointer"
          >
            <span className="w-4 h-4 flex-shrink-0 rounded-sm overflow-hidden border border-slate-600/30 group-hover:border-green-400/50">
              <Image
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={4}
                height={4}
                className="w-4 h-4 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </span>
            <span 
              className="text-[10px] font-medium text-slate-200 group-hover:text-green-200 group-hover:underline truncate flex-1 text-left"
              title={getCountryName(country.code, language)}
            >
              {getCountryName(country.code, language)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}