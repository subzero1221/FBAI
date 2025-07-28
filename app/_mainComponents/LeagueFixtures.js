import { useState } from "react";
import { getLeagueFixtures } from "../actions/footballActions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import PulseSpinner from "./PulseSpinner";
import Link from "next/link";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import { useHydrated } from "../utils/useHydrated"; 

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function LeagueFixtures({leagueId}){

    const [amount, setAmount] = useState(10);
    const [type, setType] = useState(`next=${amount}`);
    const language = useUserStore((state) => state.language);

    const { data: fixtures, isLoading } = useQuery({
        queryKey: [`leagueFixtures${leagueId}/${type}`, leagueId],
        queryFn: () => getLeagueFixtures(leagueId, type),
    });

    
    const hydrated = useHydrated();
    if (!hydrated) return null;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'NS': return 'text-gray-500';
            case '1H': return 'text-green-500';
            case 'HT': return 'text-yellow-500';
            case '2H': return 'text-green-500';
            case 'FT': return 'text-blue-500';
            case 'AET': return 'text-purple-500';
            case 'PEN': return 'text-purple-500';
            default: return 'text-gray-500';
        }
    };

    // Helper to change tab and reset amount
    const handleTabChange = (tabKey) => {
        setAmount(10);
        setType(`${tabKey}=10`);
    };

    // Helper to show more
    const handleShowMore = () => {
        const newAmount = amount + 10;
        setAmount(newAmount);
        setType(type.startsWith('next') ? `next=${newAmount}` : `last=${newAmount}`);
    };

    // Determine if we should show the Show More button
    const fixtureList = fixtures?.data.leagueFixtures || [];
    const canShowMore = fixtureList.length >= amount;

  

    if (isLoading) {
        return (
            <PulseSpinner text={t('leaguefixtures_loading', language)}/>
        );
    }

    if (!fixtures?.data.leagueFixtures || fixtures.data.leagueFixtures.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-gray-500 text-xl mb-2">{t('leaguefixtures_no_fixtures', language)}</div>
                </div>
            </div>
        );
    }

  

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    {fixtures.data.leagueFixtures[0]?.league?.logo && (
                        <Image
                            src={fixtures.data.leagueFixtures[0].league.logo}
                            alt={fixtures.data.leagueFixtures[0].league.name}
                            width={48}
                            height={48}
                            className="rounded-lg"
                        />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {fixtures.data.leagueFixtures[0]?.league?.name}
                        </h1>
                        <p className="text-gray-600">
                            {fixtures.data.leagueFixtures[0]?.league?.country} • Season {fixtures.data.leagueFixtures[0]?.league?.season}
                        </p>
                    </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: "next", label: t('leaguefixtures_upcoming', language) },
                        { key: "last", label: t('leaguefixtures_previous', language) },
                    ].map((tab) => {
                        const tabType = `${tab.key}=${amount}`;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => handleTabChange(tab.key)}
                                className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors ${
                                    type.startsWith(tab.key)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Fixtures Grid */}
            <div className="grid gap-4">
                {fixtureList.map((fixture) => (
                    <div
                        key={fixture.fixture.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        {/* Predict Result with AI Button */}
                        <div className="flex justify-center mb-4">
                            <Link
                                href={`/predict/${fixture.fixture.id}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-100 text-white font-semibold shadow hover:bg-blue-200 transition-all"
                                title="Predict result with AI"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1V8h-1m-4 8h1v-4h1m-4 0h1V8h1" /></svg>
                                {t('predict_result_with_ai', language)}
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">
                            {/* Match Info */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-500 mb-1">
                                            {formatDate(fixture.fixture.date)}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {formatTime(fixture.fixture.date)}
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className={`text-sm font-medium ${getStatusColor(fixture.fixture.status.short)}`}>
                                            {fixture.fixture.status.long}
                                        </div>
                                        {fixture.fixture.venue?.name && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {fixture.fixture.venue.name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Teams */}
                                <div className="flex items-center justify-between">
                                    {/* Home Team */}
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={fixture.teams.home.logo}
                                                alt={fixture.teams.home.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Link href={`/league/${leagueId}/${fixture.teams.home.id}`} className="font-semibold text-gray-900">
                                                {fixture.teams.home.name}
                                            </Link>
                                            <div className="text-sm text-gray-500">
                                                {t('leaguefixtures_home', language)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="flex items-center gap-4 mx-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {fixture.goals.home !== null ? fixture.goals.home : '-'}
                                            </div>
                                        </div>
                                        <div className="text-gray-400 font-medium">{t('leaguefixtures_vs', language)}</div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {fixture.goals.away !== null ? fixture.goals.away : '-'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex items-center gap-3 flex-1 justify-end">
                                        <div className="flex-1 text-right">
                                                <Link href={`/league/${leagueId}/${fixture.teams.away.id}`} className="font-semibold text-gray-900">
                                                {fixture.teams.away.name}
                                            </Link>
                                            <div className="text-sm text-gray-500">
                                                {t('leaguefixtures_away', language)}
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={fixture.teams.away.logo}
                                                alt={fixture.teams.away.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Match Details Button */}
                                <div className="flex justify-center mt-4">
                                    <Link
                                            href={`/fixture/${fixture.fixture.id}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold shadow-sm transition-all group"
                                        title="View match details"
                                    >
                                        <svg className="w-4 h-4 text-blue-500 group-hover:text-blue-700 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" /></svg>
                                        {t('leaguefixtures_match_details', language)}
                                    </Link>
                                </div>

                                {/* Round Info */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="text-sm text-gray-500 text-center">
                                      {fixture.league.round}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Show More Button */}
            {canShowMore && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleShowMore}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all"
                    >
                        {t('leaguefixtures_show_more', language)}
                    </button>
                </div>
            )}
        </div>
    );
}