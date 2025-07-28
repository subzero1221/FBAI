"use client";
import { useQuery } from "@tanstack/react-query";
import { getEliteLeagues } from "../actions/footballActions";
import PulseSpinner from "./PulseSpinner";
import { useRouter } from "next/navigation";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import Link from "next/link";
import { useHydrated } from "../utils/useHydrated";
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function PredictWithAiElite() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["eliteLeagues"],
        queryFn: getEliteLeagues,
      });

      console.log(data);
      const language = useUserStore((state) => state.language);

    const hydrated = useHydrated();
    if (!hydrated) return null;

    if (isLoading) {
        return <PulseSpinner text={t('leaguefixtures_loading', useUserStore.getState().language)} />;
    }
    if (error) {
        return <div className="text-red-500 text-center mt-8">{t('leaguefixtures_error', useUserStore.getState().language) || 'Error loading leagues.'}</div>;
    }
    
    return (
        <div className="max-w-2xl mx-auto mt-20 p-4">
            <h1 className="text-2xl font-bold text-center mb-6"> {t('eliteleagues_title', language)}</h1>
            <div className="grid gap-4">
                {data?.data?.eliteLeagues?.map((league, i) => (
                    <Link
                        key={league.league.id || i}
                        href={`/league/${league.league.id}`}
                        className="flex items-center justify-between bg-slate-800/70 hover:bg-blue-900/40 rounded-lg shadow-lg p-4 border border-slate-700/40 hover:border-blue-400/40 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            {league.league.logo && (
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image 
                                        src={league.league.logo} 
                                        alt={league.league.name} 
                                        fill
                                        sizes="48px"
                                        className="object-contain rounded-full" 
                                    />
                                    {league.country?.flag && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-700 flex items-center justify-center shadow-sm">
                                            <Image
                                                src={league.country.flag}
                                                alt={league.country.name}
                                                width={16}
                                                height={16}
                                                className="rounded-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                <div className="font-semibold text-blue-200 group-hover:text-blue-100 transition-colors">{league.league.name}</div>
                                <div className="text-sm text-slate-400">{league.country.name}</div>
                            </div>
                        </div>
                        <div className="px-4 py-2 rounded bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-600/30 transition-all">
                            <span className="text-blue-300 font-semibold text-sm">{t('predict_result_with_ai', language) || 'Predict results'}</span>   
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}