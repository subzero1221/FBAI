"use client"

import { useState } from "react";
import LeagueFixtures from "./LeagueFixtures";
import Standings from "./Standings";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import { useHydrated } from "../utils/useHydrated";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function League({leagueId}){
  const [activeTab, setActiveTab] = useState("fixtures")
  const language = useUserStore((state) => state.language);
  const hydrated = useHydrated();
  if (!hydrated) return null; 
  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6 mt-32 justify-center">
        <button
          onClick={() => setActiveTab("fixtures")}
          className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-colors text-sm shadow-sm border
            ${activeTab === "fixtures"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}
          `}
        >
          {t('fixtures', language)}
        </button>
        <button
          onClick={() => setActiveTab("standings")}
          className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-colors text-sm shadow-sm border
            ${activeTab === "standings"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}
          `}
        >
          {t('standings', language)}
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === "fixtures" && <LeagueFixtures leagueId={leagueId} />}
      {activeTab === "standings" && <Standings leagueId={leagueId} />}
    </div>
  );
}