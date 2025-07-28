"use client";
import { useQuery } from "@tanstack/react-query";
import { getEliteLeagues } from "../actions/footballActions";
import PulseSpinner from "./PulseSpinner";
import { useRouter } from "next/navigation";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function EliteLeagues() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["eliteLeagues"],
    queryFn: getEliteLeagues,
  });
  const router = useRouter();
  const language = useUserStore((state) => state.language);

  if (isLoading) {
    return (
      <div className="py-2">
        <PulseSpinner text="" size="sm" className="!min-h-0" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-1.5 rounded-lg bg-gradient-to-r from-red-950/60 to-red-900/60 border border-red-500/20 text-[10px] text-red-300 text-center">
        {error?.message || data?.message || "Error loading elite leagues"}
      </div>
    );
  }

  const eliteLeagues = data?.data?.eliteLeagues || data?.data || [];
  if (!eliteLeagues.length) return null;

  return (
    <section className="mb-1.5">
      {/* Compact Section Header */}
      <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
        <span className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow border border-blue-400/30 text-sm">🏆</span>
        <h2 className="text-sm font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent tracking-wide">
          {t('eliteleagues_title', language)}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/20 via-cyan-400/10 to-transparent ml-1"></div>
      </div>
      {/* Vertical List */}
      <div className="flex flex-col gap-0.5">
        {eliteLeagues.map((item) => (
          <button
            key={item.league.id}
            onClick={() => router.push(`/league/${item.league.id}`)}
            title={item.league.name}
            className="group flex items-center gap-1.5 w-full px-1.5 py-1 rounded-md bg-slate-800/70 hover:bg-blue-900/40 border border-slate-700/40 hover:border-blue-400/40 transition-all cursor-pointer"
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={item.league.logo}
                alt={item.league.name}
                fill
                sizes="32px"
                quality={100}
                className="rounded-full object-contain"
                priority
              />
              {item.country?.flag && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border border-slate-700 flex items-center justify-center shadow-sm">
                  <Image
                    src={item.country.flag}
                    alt={item.country.name}
                    width={12}
                    height={12}
                    quality={100}
                    className="rounded-full object-contain"
                  />
                </div>
              )}
            </div>
            <span className="flex flex-col items-start min-w-0 flex-1">
              <span
                className="text-[10px] font-semibold text-blue-200 group-hover:underline truncate w-full"
                title={item.league.name}
              >
                {item.league.name}
              </span>
              <span className="text-[9px] text-slate-400 truncate w-full">{item.country.name}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}