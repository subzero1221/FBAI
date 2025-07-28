"use client";

import { useState } from "react";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function TeamStatsCard({ teamStats, onSeasonChange }) {
  const { league, team, form, fixtures, goals, biggest, clean_sheet, failed_to_score, penalty, lineups, cards } = teamStats;
  const language = useUserStore((state) => state.language);

  console.log(league.image)

  // Helper classes
  const numberClass = "text-blue-400 font-bold";
  const labelClass = "text-gray-200 font-semibold";
  const sectionTitle = "text-lg font-bold text-blue-200 mb-2 mt-6";
  const tableHeader = "py-2 px-3 text-center text-blue-300 font-semibold bg-gray-800";
  const tableCell = "py-2 px-3 text-center text-gray-100";

  // Season selector logic
  const [season, setSeason] = useState(league.season);
  const seasonOptions = [2025, 2024, 2023, 2022, 2021, 2020];

  const handleSeasonChange = (e) => {
    const newSeason = Number(e.target.value);
    setSeason(newSeason);
    if (onSeasonChange) onSeasonChange(newSeason);
  };

  // Table row helper
  const renderTableRow = (label, home, away, total) => (
    <tr className="border-b border-gray-700">
      <td className={`py-2 px-3 text-left ${labelClass}`}>{label}</td>
      <td className={tableCell}><span className={numberClass}>{home ?? "—"}</span></td>
      <td className={tableCell}><span className={numberClass}>{away ?? "—"}</span></td>
      <td className={tableCell}><span className={numberClass}>{total ?? "—"}</span></td>
    </tr>
  );

  return (
    <div className="flex flex-col items-center mt-20 justify-center min-h-screen bg-gray-900 py-8 pb-24" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
      <div className="shadow-lg bg-gradient-to-br from-gray-900/80 to-blue-900/60 border-2 border-blue-700/40 rounded-lg p-8 w-full max-w-4xl flex flex-col gap-8">
        {/* Header: League & Team */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* League Info */}
          <div className="flex-1 flex flex-col items-center">
            <Image src={league.logo? league.logo : "/image"} alt={league.name} width={20} height={20} className="w-20 h-20 object-contain rounded-full border mb-2 shadow" />
            <div className="text-xl text-blue-200 font-bold mb-1">{league.name}</div>
            <div className="text-gray-300 flex items-center gap-2 mb-1">
              <Image src={league.flag? league.flag:"/image"} alt={league.country} width={5} height={5} className="w-5 h-5 inline-block" />
              {league.country}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-400 text-sm">{t('teamstats_season', language)}:</span>
              <select
                className="border border-blue-700 bg-gray-900 text-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={season}
                onChange={handleSeasonChange}
                aria-label="Select season"
              >
                {seasonOptions.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Team Info */}
          <div className="flex-1 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-8">
            <Image src={team.logo} alt={team.name} width={20} height={20} className="w-20 h-20 object-contain rounded-full border mb-2 shadow" />
            <div className="text-xl text-blue-200 font-bold mb-1">{team.name}</div>
            <div className="text-gray-400 text-sm">{t('teamstats_form', language)}: <span className="font-mono text-blue-300">{form}</span></div>
          </div>
        </div>

        {/* Fixtures Summary */}
        <div>
          <div className={sectionTitle}>{t('teamstats_fixtures_summary', language)}</div>
          <table className="w-full text-sm border rounded overflow-hidden bg-gray-800 mb-4">
            <thead>
              <tr>
                <th className={tableHeader}></th>
                <th className={tableHeader}>{t('teamstats_home', language)}</th>
                <th className={tableHeader}>{t('teamstats_away', language)}</th>
                <th className={tableHeader}>{t('teamstats_total', language)}</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow(t('teamstats_played', language), fixtures.played.home, fixtures.played.away, fixtures.played.total)}
              {renderTableRow(t('teamstats_wins', language), fixtures.wins.home, fixtures.wins.away, fixtures.wins.total)}
              {renderTableRow(t('teamstats_draws', language), fixtures.draws.home, fixtures.draws.away, fixtures.draws.total)}
              {renderTableRow(t('teamstats_losses', language), fixtures.loses.home, fixtures.loses.away, fixtures.loses.total)}
            </tbody>
          </table>
        </div>

        {/* Goals */}
        <div>
          <div className={sectionTitle}>{t('teamstats_goals', language)}</div>
          <table className="w-full text-sm border rounded overflow-hidden bg-gray-800 mb-2">
            <thead>
              <tr>
                <th className={tableHeader}></th>
                <th className={tableHeader}>{t('teamstats_home', language)}</th>
                <th className={tableHeader}>{t('teamstats_away', language)}</th>
                <th className={tableHeader}>{t('teamstats_total', language)}</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow(t('teamstats_goals_for', language), goals.for.total.home, goals.for.total.away, goals.for.total.total)}
              {renderTableRow(t('teamstats_goals_against', language), goals.against.total.home, goals.against.total.away, goals.against.total.total)}
              {renderTableRow(t('teamstats_avg_for', language), goals.for.average.home, goals.for.average.away, goals.for.average.total)}
              {renderTableRow(t('teamstats_avg_against', language), goals.against.average.home, goals.against.average.away, goals.against.average.total)}
            </tbody>
          </table>
        </div>

        {/* Streaks & Clean Sheets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded p-3 flex flex-col items-center">
            <div className={labelClass + " mb-1"}>{t('teamstats_biggest_streaks', language)}</div>
            <div className="text-sm text-gray-300">{t('teamstats_wins', language)}: <span className={numberClass}>{biggest.streak.wins}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_draws', language)}: <span className={numberClass}>{biggest.streak.draws}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_losses', language)}: <span className={numberClass}>{biggest.streak.loses}</span></div>
          </div>
          <div className="bg-gray-800 rounded p-3 flex flex-col items-center">
            <div className={labelClass + " mb-1"}>{t('teamstats_clean_sheets', language)}</div>
            <div className="text-sm text-gray-300">{t('teamstats_home', language)}: <span className={numberClass}>{clean_sheet.home}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_away', language)}: <span className={numberClass}>{clean_sheet.away}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_total', language)}: <span className={numberClass}>{clean_sheet.total}</span></div>
          </div>
          <div className="bg-gray-800 rounded p-3 flex flex-col items-center">
            <div className={labelClass + " mb-1"}>{t('teamstats_failed_to_score', language)}</div>
            <div className="text-sm text-gray-300">{t('teamstats_home', language)}: <span className={numberClass}>{failed_to_score.home}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_away', language)}: <span className={numberClass}>{failed_to_score.away}</span></div>
            <div className="text-sm text-gray-300">{t('teamstats_total', language)}: <span className={numberClass}>{failed_to_score.total}</span></div>
          </div>
        </div>

        {/* Most Used Lineups */}
        <div>
            <div className={sectionTitle}>{t('teamstats_most_used_lineups', language)}</div>
          <table className="w-full text-sm border rounded overflow-hidden bg-gray-800">
            <thead>
              <tr>
                <th className={tableHeader + " text-left"}>{t('teamstats_formation', language)}</th>
                <th className={tableHeader}>{t('teamstats_played', language)}</th>
              </tr>
            </thead>
            <tbody>
              {lineups.map((l, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className={"py-2 px-3 text-left text-gray-200"}>{l.formation}</td>
                  <td className={tableCell}><span className={numberClass}>{l.played}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards by Minute */}
        <div>
          <div className={sectionTitle}>{t('teamstats_cards_by_minute', language)}</div>
          <table className="w-full text-sm border rounded overflow-hidden bg-gray-800">
            <thead>
              <tr>
                <th className={tableHeader + " text-left"}>{t('teamstats_minute', language)}</th>
                <th className={tableHeader}>{t('teamstats_yellow', language)}</th>
                <th className={tableHeader}>{t('teamstats_red', language)}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cards.yellow).map((minute) => (
                <tr key={minute} className="border-b border-gray-700">
                  <td className={"py-2 px-3 text-left text-gray-200"}>{minute.replace('-', '–')}</td>
                  <td className={tableCell}><span className={numberClass}>{cards.yellow[minute].total ?? "—"}</span></td>
                  <td className={tableCell}><span className={numberClass}>{cards.red[minute].total ?? "—"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Penalties */}
        <div>
          <div className={sectionTitle}>{t('teamstats_penalties', language)}</div>
          <table className="w-full text-sm border rounded overflow-hidden bg-gray-800">
            <thead>
              <tr>
                <th className={tableHeader + " text-left"}>{t('teamstats_type', language)}</th>
                <th className={tableHeader}>{t('teamstats_total', language)}</th>
                <th className={tableHeader}>{t('teamstats_percent_scored_missed', language)}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className={"py-2 px-3 text-left text-gray-200"}>{t('teamstats_scored', language)}</td>
                <td className={tableCell}><span className={numberClass}>{penalty.scored.total}</span></td>
                <td className={tableCell}><span className={numberClass}>{penalty.scored.percentage}</span></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className={"py-2 px-3 text-left text-gray-200"}>{t('teamstats_missed', language)}</td>
                <td className={tableCell}><span className={numberClass}>{penalty.missed.total}</span></td>
                <td className={tableCell}><span className={numberClass}>{penalty.missed.percentage}</span></td>
              </tr>
              <tr>
                <td className={"py-2 px-3 text-left text-gray-200"}>{t('teamstats_total', language)}</td>
                <td className={tableCell}><span className={numberClass}>{penalty.total}</span></td>
                <td className={tableCell}>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 