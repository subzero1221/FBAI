"use client"

import { useState } from "react";
import FixtureCenter from "./FixtureCenter";
import FixtureLineups from "./FixtureLineups";
import Head2Head from "./Head2Head";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import { useHydrated } from "../utils/useHydrated";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function Fixture({fixtureId}){
    const [activeTab, setActiveTab] = useState("center");
    const language = useUserStore((state) => state.language);
    const hydrated = useHydrated();
    if (!hydrated) return null;

    return (
        <div className="max-w-4xl mx-auto mt-32">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("center")}
                    className={`scale-105 cursor-pointer px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === "center"
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                    {t('fixture_tab_stats', language)}
                </button>
                <button
                    onClick={() => setActiveTab("lineups")}
                    className={`cursor-pointer px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === "lineups"
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                    {t('fixture_tab_lineups', language)}
                </button>
                <button
                    onClick={() => setActiveTab("h2h")}
                    className={`cursor-pointer px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === "h2h"
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                    {t('fixture_tab_h2h', language)}
                </button>
            </div>
            
            {activeTab === "center" ? (
                <FixtureCenter fixtureId={fixtureId} />
            ) : activeTab === "lineups" ? (
                <FixtureLineups fixtureId={fixtureId} />
            ) : activeTab === "h2h" ? (
                <Head2Head fixtureId={fixtureId}/>
            ) : null}
        </div>
    );
}