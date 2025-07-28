"use client";
import { getTeamGeneral } from "@/app/actions/footballActions";
import { useQuery } from "@tanstack/react-query";
import PulseSpinner from "./PulseSpinner";
import Link from "next/link";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import { useHydrated } from "../utils/useHydrated";
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function TeamGeneral({ teamId, leagueId }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamGeneral", teamId],
    enabled: !!teamId,
    queryFn: () => getTeamGeneral(teamId),
  });
  const language = useUserStore((state) => state.language);
  const hydrated = useHydrated();
  if (!hydrated) return null;

  if (isError) {
    return <div className="text-red-500">{t('teamgeneral_error', language)}</div>;
  }

  if (isLoading) {
    return <div><PulseSpinner text={t('teamgeneral_loading', language)} /></div>;
  }

  if (!data?.data?.team || !data.data.team.length) {
    return <div className="text-gray-500">{t('teamgeneral_no_data', language)}</div>;
  }

  const { team, venue } = data.data.team[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 pb-24" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
      <div className="shadow-lg bg-gradient-to-br from-gray-900/80 to-blue-900/60 border-2 border-blue-700/40 rounded-lg p-8 w-full max-w-2xl flex flex-col md:flex-row gap-8"  >
        {/* Team Section */}
        <div className="flex-1 flex flex-col items-center">
          <Image
            src={team.logo}
            width={28}
            height={28}
            alt={team.name + ' logo'}
            className="w-28 h-28 object-contain rounded-full border mb-4 shadow"
          />
          <h1 className="text-2xl text-gray-900 font-bold mb-1">{team.name}</h1>
          <div className="text-gray-300 mb-2">({team.code})</div>
          <div className="text-gray-300 mb-1">{t('teamgeneral_country', language)}: <span className="font-semibold">{team.country}</span></div>
          <div className="text-gray-300 mb-1">{t('teamgeneral_founded', language)}: <span className="font-semibold">{team.founded}</span></div>
          <div className="text-gray-300 mb-1">{t('teamgeneral_type', language)}: <span className="font-semibold">{team.national ? t('teamgeneral_national_team', language) : t('teamgeneral_club', language)}</span></div>
        </div>
        {/* Venue Section */}
        <div className="flex-1 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
          <Image
            src={venue.image}
            width={28}
            height={28}
            alt={venue.name + ' image'}
            className="w-28 h-28 object-cover rounded-lg border mb-4 shadow"
          />
          <h3 className="text-xl font-semibold mb-1">{venue.name}</h3>
          <div className="text-gray-300 mb-1">{venue.address}, {venue.city}</div>
          <div className="text-gray-300 mb-1">{t('teamgeneral_capacity', language)}: <span className="font-semibold">{venue.capacity.toLocaleString()}</span></div>
          <div className="text-gray-300 mb-1">{t('teamgeneral_surface', language)}: <span className="font-semibold">{venue.surface}</span></div>
        </div>
      </div>
      {/* Show Team Stats Button and Season Selector */}
      <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
          <div
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          >
            {t('teamgeneral_see_stats', language)} <Link className="ml-2 hover:underline hover:text-white text-white" href={`/league/${leagueId}/${teamId}/statsistics`}>{t('teamgeneral_here', language)}</Link>
          </div>
      </div>
    </div>
  );
}