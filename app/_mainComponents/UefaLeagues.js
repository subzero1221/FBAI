"use client";
import { useQuery } from "@tanstack/react-query";
import { getUefaLeagues } from "../actions/footballActions";
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

export default function UefaLeagues() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["uefaLeagues"],
    queryFn: getUefaLeagues,
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
        {error?.message || data?.message || "Error loading UEFA leagues"}
      </div>
    );
  }

  const uefaLeagues = data?.data?.uefaLeagues || data?.uefaLeagues || data?.data || [];
  if (!uefaLeagues.length) return null;

  return (
    <section className="mb-1.5">
      {/* Compact Section Header */}
      <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
        <span className="w-5 h-5 rounded-md bg-gradient-to-br from-gray-700 to-slate-500 text-black flex items-center justify-center shadow border border-blue-400/30 text-sm">🌐</span>
        <h2 className="text-sm font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent tracking-wide">
          {t('uefa_title', language)}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/20 via-cyan-400/10 to-transparent ml-1"></div>
      </div>
      {/* Vertical List */}
      <div className="flex flex-col gap-0.5">
        {uefaLeagues.map((item) => (
          <button
            key={item.league.id}
            onClick={() => router.push(`/league/${item.league.id}`)}
            title={item.league.name}
            className="group flex items-center gap-1.5 w-full px-1.5 py-1 rounded-md bg-slate-800/70 hover:bg-blue-900/40 border border-slate-700/40 hover:border-blue-400/40 transition-all cursor-pointer"
          >
            <span className="relative w-5 h-5 flex-shrink-0">
              <Image
              width={5}
              height={5}
                src={item.league.logo}
                alt={item.league.name}
                className="w-5 h-5 rounded-full object-contain bg-white border border-blue-400/20 group-hover:border-blue-400/50 shadow-sm"
              />
              {item.country.flag && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white border border-slate-700 flex items-center justify-center">
                  <Image src={item.country.flag} alt={item.country.name} className="w-2 h-2 rounded-full object-contain" />
                </span>
              )}
            </span>
            <span className="flex flex-col items-start min-w-0">
              <span
                className="text-[10px] font-semibold text-blue-200 group-hover:underline truncate"
                style={{ maxWidth: '80px', overflow: 'hidden', whiteSpace: 'nowrap' }}
                title={item.league.name}
              >
                {item.league.name}
              </span>
              <span className="text-[9px] text-slate-400 truncate">{item.country.name}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}