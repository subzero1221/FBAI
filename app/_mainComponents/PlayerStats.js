"use client"
import { useState } from "react";
import { getPlayerStats } from "../actions/footballActions";
import PulseSpinner from "./PulseSpinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export default function PlayerStats({ playerId = 1100 }) {
    const currentYear = new Date().getFullYear() - 1;
    const [season, setSeason] = useState(currentYear);
    const { data, isLoading, error } = useQuery({
        queryKey: [`${playerId}-playerStats`, playerId, season],
        queryFn: () => getPlayerStats(playerId, season),
    });
    console.log(data)
   
    
    if (isLoading) return <PulseSpinner text={"Loading Player Stats..."} />
    if (error || !data?.data?.playerProfile?.length) return <div className="text-red-500 py-8 text-center bg-red-50 rounded mx-4">Error loading player stats</div>;

    const player = data.data.playerProfile[0].player;
    const statsArr = data.data.playerProfile[0].statistics;

    // Season options from 2017 to current year
    const seasonOptions = [];
    for (let y = currentYear; y >= 2017; y--) {
        seasonOptions.push(y);
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20 py-8" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Player Profile Container */}
                <div className="shadow-lg bg-gradient-to-br from-gray-900/80 to-blue-900/60 border-2 border-blue-700/40 rounded-lg p-6 mb-8 mx-auto max-w-4xl">
                    <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                        <div className="flex-shrink-0">
                            <Image src={player.photo} alt={player.name} width={80} height={80} className="w-32 h-32 object-contain rounded-full border shadow bg-white" />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <div className="text-2xl text-blue-200 font-bold mb-2">{player.name}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                                <div className="text-gray-300">Full Name: <span className="font-semibold text-blue-300">{player.firstname} {player.lastname}</span></div>
                                <div className="text-gray-300">Nationality: <span className="font-semibold text-blue-300">{player.nationality}</span></div>
                                <div className="text-gray-300">Age: <span className="font-semibold text-blue-300">{player.age}</span></div>
                                <div className="text-gray-300">Height: <span className="font-semibold text-blue-300">{player.height}</span></div>
                                <div className="text-gray-300">Weight: <span className="font-semibold text-blue-300">{player.weight}</span></div>
                                <div className="text-gray-300">Injured: <span className={`font-semibold ${player.injured ? 'text-red-400' : 'text-green-400'}`}>{player.injured ? "Yes" : "No"}</span></div>
                            </div>
                            <div className="text-gray-300 mb-4">Birth: <span className="font-semibold text-blue-300">{player.birth.date} ({player.birth.place}, {player.birth.country})</span></div>
                        </div>
                        {/* Season Selector */}
                        <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-2">
                            <span className="text-gray-400 text-sm font-medium">Season:</span>
                            <select
                                className="border border-blue-700 bg-gray-900 text-blue-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-20"
                                value={season}
                                onChange={e => setSeason(Number(e.target.value))}
                                aria-label="Select season"
                            >
                                {seasonOptions.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Competitions Table Container */}
                <div className="shadow-lg bg-gradient-to-br from-gray-900/80 to-blue-900/60 border-2 border-blue-700/40 rounded-lg p-6">
                    <div className="text-xl font-bold text-blue-200 mb-6 text-center">Stats by Competition</div>
                    <div>
                        <table className="w-full text-[11px] border rounded overflow-hidden bg-gray-900 min-w-max">
                            <thead>
                                <tr className="bg-gray-800/50">
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-left whitespace-nowrap">Competition</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-left whitespace-nowrap">Team</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Apps</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Goals</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Assists</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Min</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Rating</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Pos</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Shots</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Passes</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Duels</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Drib</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Y/R</th>
                                    <th className="py-1 px-1 text-blue-300 font-semibold text-center whitespace-nowrap">Pen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statsArr.map((stat, idx) => (
                                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
                                        <td className="py-1 px-1 text-gray-200 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <Image src={stat.league.logo} alt={stat.league.name} width={30} height={30} className="" />
                                                <Link href={`/league/${stat.league.id}`} className=" max-w-20">{stat.league.name}</Link>
                                            </div>
                                        </td>
                                        <td className="py-1 px-1 text-gray-200 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <Image src={stat.team.logo} alt={stat.team.name} width={4} height={4} className="w-4 h-4 object-contain rounded border bg-white flex-shrink-0" />
                                                   <span className="no-underline text-blue-400"><Link href={`/league/${stat.league.id}/${stat.team.id}`} className="truncate max-w-20">{stat.team.name}</Link></span> 
                                            </div>
                                        </td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.games.appearences ?? "-"}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.goals.total ?? "-"}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.goals.assists ?? "-"}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.games.minutes ?? "-"}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.games.rating ?? "-"}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">
                                            <span className="truncate max-w-12 inline-block">{stat.games.position ?? "-"}</span>
                                        </td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.shots.total ?? "-"} ({stat.shots.on ?? "-"})</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.passes.total ?? "-"} ({stat.passes.key ?? "-"})</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.duels.total ?? "-"} ({stat.duels.won ?? "-"})</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.dribbles.attempts ?? "-"} ({stat.dribbles.success ?? "-"})</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.cards.yellow ?? 0}/{stat.cards.red ?? 0}</td>
                                        <td className="py-1 px-1 text-blue-400 font-bold text-center whitespace-nowrap">{stat.penalty.scored ?? 0}/{stat.penalty.missed ?? 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}