"use client";

import { useQuery } from "@tanstack/react-query";
import { getFixtureCenter } from "../actions/footballActions";
import Image from "next/image";
import PulseSpinner from "./PulseSpinner";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function FixtureCenter({ fixtureId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fixture", fixtureId],
    queryFn: () => getFixtureCenter(fixtureId),
  });
  const language = useUserStore((state) => state.language);

  console.log(data)

  if (isLoading) return <div className="text-white text-center py-8"><PulseSpinner text={t('fixturecenter_loading', language)} /></div>;
  if (error || !data?.fixtureCenter) return <div className="text-red-500 text-center py-8">{t('fixturecenter_error', language)}</div>;

  const [home, away] = data.fixtureCenter;
  if (!home || !away) return <div className="text-gray-400 text-center py-8">{t('fixturecenter_not_available', language)}</div>;

  // Build a list of all stat types (union of both teams)
  const statTypes = Array.from(
    new Set([
      ...home.statistics.map((s) => s.type),
      ...away.statistics.map((s) => s.type),
    ])
  );

  // Helper to get stat value by type
  const getStat = (stats, type) => {
    const found = stats.find((s) => s.type === type);
    return found && found.value !== null ? found.value : "-";
  };

  // Helper to render a bar for numeric stats
  const renderBar = (homeVal, awayVal) => {
    if (typeof homeVal !== "number" || typeof awayVal !== "number") return null;
    const total = homeVal + awayVal;
    const homePct = total === 0 ? 50 : (homeVal / total) * 100;
    const awayPct = total === 0 ? 50 : (awayVal / total) * 100;
    return (
      <div className="flex items-center w-full gap-2">
        <div className="h-2 rounded bg-blue-600" style={{ width: `${homePct}%` }} />
        <div className="h-2 rounded bg-pink-600" style={{ width: `${awayPct}%` }} />
      </div>
    );
  };

  // Helper to get translation key for stat type
  const getStatLabel = (type) => {
    const key = 'fixturecenter_stat_' + type.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const translated = t(key, language);
    if (translated !== key) return translated;
    // fallback: humanize
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-center w-1/3">
          <Image src={home.team.logo} alt={home.team.name} width={56} height={56} className="rounded-full bg-white mb-2" />
          <span className="text-white font-bold text-lg text-center">{home.team.name}</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-400 font-semibold text-xl">{t('fixturecenter_statistics', language)}</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <Image src={away.team.logo} alt={away.team.name} width={56} height={56} className="rounded-full bg-white mb-2" />
          <span className="text-white font-bold text-lg text-center">{away.team.name}</span>
        </div>
      </div>
      <div className="divide-y divide-gray-800">
        {statTypes.map((type) => {
          const homeVal = getStat(home.statistics, type);
          const awayVal = getStat(away.statistics, type);
          const isNumeric = !isNaN(Number(homeVal)) && !isNaN(Number(awayVal));
          return (
            <div key={type} className="flex items-center py-3">
              <div className="w-1/4 text-right pr-2 text-white text-base font-semibold">{homeVal}</div>
              <div className="flex-1 px-2 flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-1">{getStatLabel(type)}</span>
                {isNumeric && renderBar(Number(homeVal), Number(awayVal))}
              </div>
              <div className="w-1/4 text-left pl-2 text-white text-base font-semibold">{awayVal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}