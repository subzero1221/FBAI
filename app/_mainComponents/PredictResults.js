"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSingleFixture } from "../actions/predictionActions";
import PredictionResultRenderer from "./PredictionResultRenderer";
import { useUserStore } from '../store/userStore';
import LoginSignupModal from './LoginSignupModal';
import PulseSpinner from "./PulseSpinner";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useHydrated } from '../utils/useHydrated';
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
    return translations[lang]?.[key] || translations['en'][key] || key;
}

function FixturePredictionButtons({ fixture, onPredict, language }) {
    const predictionTypes = [
        { key: 'result', label: t('predict_result', language), color: 'bg-blue-600', icon: '🏆' },
        { key: 'corners', label: t('predict_corners', language), color: 'bg-green-600', icon: '🚩' },
        { key: 'totalShots', label: t('predict_total_shots', language), color: 'bg-yellow-500', icon: '🎯' },
        { key: 'shotsOnGoal', label: t('predict_shots_on_goal', language), color: 'bg-orange-500', icon: '🥅' },
        { key: 'offsides', label: t('predict_offsides', language), color: 'bg-pink-500', icon: '🚫' },
        { key: 'goalkeeperSaves', label: t('predict_goalkeeper_saves', language), color: 'bg-purple-600', icon: '🧤' },
        { key: 'ballPossession', label: t('predict_ball_possession', language), color: 'bg-cyan-600', icon: '⚽' },
        { key: 'yellowCards', label: t('predict_yellow_cards', language), color: 'bg-yellow-400 text-gray-900', icon: '🟨' },
        { key: 'redCards', label: t('predict_red_cards', language), color: 'bg-red-600', icon: '🟥' },
    ];
    return (
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {predictionTypes.map((type) => (
                <button
                    key={type.key}
                    className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-semibold shadow transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${type.color} text-white`}
                    onClick={() => onPredict(type.key)}
                >
                    <span className="text-lg">{type.icon}</span> {t('predict_button', language)} {type.label}
                </button>
            ))}
        </div>
    );
}

export default function PredictResults({ fixtureId }) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["fixture", fixtureId],
        queryFn: () => getSingleFixture(fixtureId),
    });
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const user = useUserStore((state) => state.user);
    const language = useUserStore((state) => state.language);
    const hydrated = useHydrated();

    const handlePredict = (type) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        setSelectedPrediction(type);
    };
    console.log(selectedPrediction)

    if (!hydrated) return null;

    if (isLoading) {
        return <div className="text-center mt-10 text-gray-500"><PulseSpinner text={t('loading_fixture', language)} /></div>;
    }
    if (error) {
        return <div className="text-center mt-10 text-red-500">{t('error_loading_fixture', language)}</div>;
    }
    if (!data) {
        return <div className="text-center mt-10 text-gray-500">{t('no_fixture_data', language)}</div>;
    }

   

    return (
        <div className="max-w-2xl mx-auto mt-24 p-6">
            {data.data.map((fixture, idx) => {
                const league = fixture.league;
                const teams = fixture.teams;
                const status = fixture.fixture.status;
                return (
                    <div key={fixture.id || idx} className="mb-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
                        {/* League Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <Image src={league.logo} alt={league.name} width={20} height={20} className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-gray-50" />
                            <div>
                                <div className="font-bold text-lg text-gray-900">{league.name}</div>
                                <div className="text-gray-500 text-sm">{league.country} • {t('season', language)} {league.season}</div>
                            </div>
                            <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                {status.long}
                            </span>
                        </div>
                        {/* Teams Row */}
                        <div className="flex flex-row items-stretch justify-center gap-0 py-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-6 border border-gray-200 shadow-sm">
                            {/* Home Team */}
                            <div className="flex flex-col items-center flex-1 px-4 border-r border-gray-200 justify-center">
                                <Image src={teams.home.logo} alt={teams.home.name} width={20} height={20} className="w-20 h-20 object-contain rounded-xl shadow border border-gray-200 bg-white" />
                                <span className="mt-3 font-semibold text-gray-800 text-lg text-center whitespace-normal break-words">{teams.home.name}</span>
                            </div>
                            {/* VS and Info */}
                            <div className="flex flex-col items-center justify-center px-6 min-w-[120px]">
                                <span className="text-3xl font-bold text-gray-700 mb-2">{t('vs', language)}</span>
                                <div className="text-gray-500 text-sm text-center">
                                    {new Date(fixture.fixture.date).toLocaleString()}<br/>
                                    {fixture.fixture.venue?.name}
                                </div>
                            </div>
                            {/* Away Team */}
                            <div className="flex flex-col items-center flex-1 px-4 border-l border-gray-200 justify-center">
                                <Image src={teams.away.logo} alt={teams.away.name} width={20} height={20} className="w-20 h-20 object-contain rounded-xl shadow border border-gray-200 bg-white" />
                                <span className="mt-3 font-semibold text-gray-800 text-lg text-center whitespace-normal break-words">{teams.away.name}</span>
                            </div>
                        </div>
                        {/* Prediction Buttons */}
                        <FixturePredictionButtons fixture={fixture} onPredict={handlePredict} language={language} />
                        {/* Prediction Result Renderer */}
                        {selectedPrediction && (
                            <PredictionResultRenderer
                                predict={selectedPrediction}
                                fixtureId={fixture.fixture.id}
                                team1Id={teams.home.id}
                                team2Id={teams.away.id}
                                leagueId={league.id}
                            />
                        )}
                        <LoginSignupModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
                    </div>
                );
            })}
        </div>
    );
}