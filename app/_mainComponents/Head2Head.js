import { useQuery } from "@tanstack/react-query";
import { getFixtureH2H } from "../actions/footballActions";
import dayjs from 'dayjs';
import Image from "next/image";
import Link from "next/link";
import PulseSpinner from "./PulseSpinner";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function Head2Head({fixtureId}){
    const { data: head2head, isLoading} = useQuery({
        queryKey: [`head2head${fixtureId}`, fixtureId],
        queryFn: () => getFixtureH2H(fixtureId),
    });
    const language = useUserStore((state) => state.language);

    console.log(head2head)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <PulseSpinner text={t('h2h_loading', language)} />
            </div>
        );
    }

    if (!head2head.success) {
        return (
            
            <div className="text-gray-400 text-center py-8">{t('h2h_not_available', language)}</div>
                 
        );
    }

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm overflow-hidden mb-6">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 via-slate-500/5 to-slate-400/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-slate-500/20 rounded-lg">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 bg-clip-text text-transparent">
                                {t('h2h_title', language)}
                            </h2>
                            <p className="text-sm text-slate-400">{t('h2h_subtitle', language)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {head2head.data.fixtureHead2Head.length} {t('h2h_matches_found', language)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Matches List */}
            {head2head.data.fixtureHead2Head.map((item, index) => (
                <div
                    key={item.fixture.id}
                    className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-xl p-5 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm overflow-hidden transform hover:-translate-y-1"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                >
                    {/* Enhanced Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600/3 via-slate-500/3 to-slate-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-500/5 to-transparent rounded-full blur-xl group-hover:from-slate-500/10 transition-all duration-500"></div>

                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                        {/* Enhanced League Info Section */}
                        <div className="flex items-center gap-3 min-w-[150px]">
                            <Link href={`/league/${item.league.id}`} className="group/league flex items-center gap-3 hover:bg-slate-800/30 rounded-lg p-2 transition-all">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-slate-500/20 rounded-full blur group-hover/league:blur-md transition-all"></div>
                                    <Image 
                                        src={item.league.logo} 
                                        alt={item.league.name} 
                                        width={32} 
                                        height={32} 
                                        className="relative rounded-full border border-slate-600/50 group-hover/league:scale-110 group-hover/league:border-blue-400/50 transition-all duration-300 flex-shrink-0 shadow-lg" 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-blue-400 font-bold group-hover/league:text-blue-300 group-hover/league:underline leading-tight transition-colors">
                                        {item.league.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500 leading-tight">
                                        {item.league.season} • {item.league.round}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Enhanced Fixture Info Section - Center */}
                        <div className="flex-1 flex flex-col items-center">
                            {/* Enhanced Date and Venue */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-600/30">
                                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs text-slate-200 font-semibold">
                                        {dayjs(item.fixture.date).format('ddd, DD MMM YYYY')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-600/30">
                                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[10px] text-slate-300">
                                        {item.fixture.venue.name}, {item.fixture.venue.city}
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Teams and Score */}
                            <div className="flex items-center gap-4">
                                {/* Enhanced Home Team */}
                                <Link href={`/team/${item.teams.home.id}`} className="group/team flex items-center gap-2 min-w-[110px] hover:bg-slate-800/30 rounded-lg p-2 transition-all">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur opacity-0 group-hover/team:opacity-100 transition-opacity"></div>
                                        <Image 
                                            src={item.teams.home.logo} 
                                            alt={item.teams.home.name} 
                                            width={28} 
                                            height={28} 
                                            className="relative rounded-full border border-slate-600/50 group-hover/team:border-blue-400/50 group-hover/team:scale-110 transition-all duration-300 shadow-lg flex-shrink-0" 
                                        />
                                    </div>
                                    <span className="text-xs text-slate-100 font-semibold group-hover/team:text-blue-300 group-hover/team:underline transition-colors truncate">
                                        {item.teams.home.name}
                                    </span>
                                </Link>

                                {/* Enhanced Score */}
                                <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/30 shadow-lg group-hover:shadow-xl group-hover:border-blue-500/30 transition-all backdrop-blur-sm">
                                    <span className="text-xl font-extrabold bg-gradient-to-r from-slate-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                                        {item.goals.home} 
                                        <span className="text-slate-500 mx-1">:</span> 
                                        {item.goals.away}
                                    </span>
                                    <span className="text-[9px] text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-700/50">
                                        {item.fixture.status.long}
                                    </span>
                                </div>

                                {/* Enhanced Away Team */}
                                <Link href={`/team/${item.teams.away.id}`} className="group/team flex items-center gap-2 min-w-[110px] flex-row-reverse hover:bg-slate-800/30 rounded-lg p-2 transition-all">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur opacity-0 group-hover/team:opacity-100 transition-opacity"></div>
                                        <Image 
                                            src={item.teams.away.logo} 
                                            alt={item.teams.away.name} 
                                            width={28} 
                                            height={28} 
                                            className="relative rounded-full border border-slate-600/50 group-hover/team:border-blue-400/50 group-hover/team:scale-110 transition-all duration-300 shadow-lg flex-shrink-0" 
                                        />
                                    </div>
                                    <span className="text-xs text-slate-100 font-semibold group-hover/team:text-blue-300 group-hover/team:underline transition-colors truncate text-right">
                                        {item.teams.away.name}
                                    </span>
                                </Link>
                            </div>

                            {/* Enhanced Additional Match Info */}
                            <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500 flex-wrap justify-center">
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/40">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span>{t('h2h_ref', language)} <span className="text-slate-300">{item.fixture.referee || t('h2h_na', language)}</span></span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/40">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>{t('h2h_status', language)} <span className="text-slate-300">{item.fixture.status.short}</span></span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/40">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span>{t('h2h_elapsed', language)} <span className="text-slate-300">{item.fixture.status.elapsed ? `${item.fixture.status.elapsed} min` : t('h2h_na', language)}</span></span>
                                </div>
                            </div>

                            {/* Enhanced Score Breakdown */}
                            <div className="flex items-center gap-3 mt-2 text-[10px]">
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-400 font-medium">{t('h2h_ht', language)}</span>
                                    <span className="text-slate-300">{item.score.halftime.home ?? '-'}:{item.score.halftime.away ?? '-'}</span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-500/10 border border-slate-500/20">
                                    <span className="text-slate-400 font-medium">{t('h2h_ft', language)}</span>
                                    <span className="text-slate-300">{item.score.fulltime.home ?? '-'}:{item.score.fulltime.away ?? '-'}</span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-400/10 border border-slate-400/20">
                                    <span className="text-slate-400 font-medium">{t('h2h_et', language)}</span>
                                    <span className="text-slate-300">{item.score.extratime.home ?? '-'}:{item.score.extratime.away ?? '-'}</span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-300/10 border border-slate-300/20">
                                    <span className="text-slate-300 font-medium">{t('h2h_pen', language)}</span>
                                    <span className="text-slate-300">{item.score.penalty.home ?? '-'}:{item.score.penalty.away ?? '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Action Button Section */}
                        <div className="flex items-center min-w-[110px] justify-end">
                            <Link 
                                href={`/fixture/${item.fixture.id}`} 
                                className="relative bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 text-xs flex items-center gap-2 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 group/btn overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                                <span className="relative z-10">{t('h2h_details', language)}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}