"use client";

import { useQuery } from "@tanstack/react-query";
import PulseSpinner from "./PulseSpinner";
import Link from "next/link";
// Assume this function exists and works as described
import { getLeagueStandings } from "../actions/footballActions";
import { useState } from "react";
import Image from "next/image";

export default function Standings({ leagueId }) {

  // Get current year for season
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear);

  const { data, isLoading, error } = useQuery({
    queryKey: ["leagueStandings", leagueId, season],
    queryFn: () => getLeagueStandings(leagueId, season),
  });

   console.log(season, data)

  if (isLoading) {
    return <PulseSpinner text="Loading standings..." />;
  }
  if (!data.success || data.data.standings.length === 0) {
    return <div className="text-center text-gray-400 py-12">No standings data available.</div>;
  }

  const league = data.data.standings[0].league;
  const standings = league.standings[0];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* League Header */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        {league.logo && (
          <Image src={league.logo} alt={league.name} width={12} height={12} className="w-12 h-12 rounded-lg bg-white border" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{league.name}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {league.flag && <Image src={league.flag} alt={league.country} width={5} height={5} className="w-5 h-5 rounded-full" />}
            <span>{league.country}</span>
            <span>•</span>
            <span>Season</span>
            {/* Season Selector */}
            <select
              value={season}
              onChange={e => setSeason(Number(e.target.value))}
              className="ml-1 px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: currentYear - 2005 + 1 }, (_, i) => currentYear - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
            <tr className="text-gray-700 text-xs uppercase">
              <th className="py-3 px-2 text-left">#</th>
              <th className="py-3 px-2 text-left">Team</th>
              <th className="py-3 px-2">P</th>
              <th className="py-3 px-2">W</th>
              <th className="py-3 px-2">D</th>
              <th className="py-3 px-2">L</th>
              <th className="py-3 px-2">GF</th>
              <th className="py-3 px-2">GA</th>
              <th className="py-3 px-2">GD</th>
              <th className="py-3 px-2 font-bold">Pts</th>
              <th className="py-3 px-2">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, idx) => {
              // Highlight top 4 and bottom 3
              let rowClass = "";
              if (row.rank <= 4) rowClass = "bg-blue-50/80";
              if (row.rank > standings.length - 3) rowClass = "bg-red-50/80";
              return (
                <tr key={row.team.id} className={`border-b border-gray-100 last:border-0 ${rowClass}`}>
                  <td className="py-2 px-2 font-bold text-slate-800 text-center">{row.rank}</td>
                  <td className="py-2 px-2 min-w-[120px]">
                    <Link href={`/league/${leagueId}/${row.team.id}`} className="flex items-center gap-2 group">
                      <Image src={row.team.logo} alt={row.team.name} width={7} height={7} className="w-7 h-7 rounded-full bg-white border group-hover:scale-110 transition-transform" />
                      <span className="truncate font-medium text-gray-900 group-hover:underline">{row.team.name}</span>
                    </Link>
                  </td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.played}</td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.win}</td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.draw}</td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.lose}</td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.goals.for}</td>
                  <td className="py-2 px-2 text-center text-slate-800">{row.all.goals.against}</td>
                  <td className="py-2 px-2 text-center font-semibold text-slate-800">{row.goalsDiff}</td>
                  <td className="py-2 px-2 text-center font-bold text-blue-700">{row.points}</td>
                  <td className="py-2 px-2 text-center">
                    <span className="inline-flex gap-0.5">
                      {row.form?.split("").map((f, i) => (
                        <span
                          key={i}
                          className={
                            f === "W"
                              ? "text-green-600 font-bold"
                              : f === "D"
                              ? "text-yellow-500 font-bold"
                              : f === "L"
                              ? "text-red-500 font-bold"
                              : "text-gray-400"
                          }
                        >
                          {f}
                        </span>
                      ))}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}