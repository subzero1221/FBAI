import { useQuery } from "@tanstack/react-query";
import { predictResults } from "../actions/predictionActions";
import { useUserStore } from "../store/userStore";
import { useEffect, useState } from "react";
import NoTokensModal from "./NoTokensModal";

export default function PredictionResultRenderer({ predict, fixtureId, team1Id, team2Id, leagueId }) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`Predicted${predict}:for${fixtureId}`, fixtureId, team1Id, team2Id, leagueId],
        queryFn: () => predictResults(leagueId, 2025, fixtureId, team1Id, team2Id, predict),
        enabled: !!(predict && fixtureId && team1Id && team2Id && leagueId),
    });
    const [showNoTokensModal, setShowNoTokensModal] = useState(false);

    useEffect(() => {
        if (data?.noTokens) {
            setShowNoTokensModal(true);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <span className="animate-pulse text-blue-600 font-semibold text-lg mb-2">AI is predicting {predict}...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-6">Error fetching prediction.</div>
        );
    }
    if (!data || !data.data) {
        return (
            <NoTokensModal isOpen={showNoTokensModal} onClose={() => setShowNoTokensModal(false)} />
        );
    }

    console.log(data.data)

    const { homeTeam, awayTeam, homePrediction, awayPrediction, reason } = data.data;
    return (
        <>
            <NoTokensModal isOpen={showNoTokensModal} onClose={() => setShowNoTokensModal(false)} />
            <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-blue-500 transition-all duration-200 hover:shadow-blue-200">
                {/* Prediction Type Badge */}
                <div className="flex justify-center mb-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs tracking-wider uppercase shadow border border-blue-200">
                        AI Prediction: {predict.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                    </span>
                </div>
                {/* Teams and Prediction */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800 mb-1">{homeTeam}</span>
                        <span className="text-3xl font-extrabold text-blue-600 drop-shadow">{homePrediction}</span>
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <span className="text-gray-400 font-bold text-lg mb-1">vs</span>
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1V8h-1m-4 8h1v-4h1m-4 0h1V8h1" /></svg>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800 mb-1">{awayTeam}</span>
                        <span className="text-3xl font-extrabold text-blue-600 drop-shadow">{awayPrediction}</span>
                    </div>
                </div>
                {/* Reason */}
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-4 mt-2 border border-blue-100">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1V8h-1m-4 8h1v-4h1m-4 0h1V8h1" /></svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{reason}</span>
                </div>
            </div>
        </>
    );
} 