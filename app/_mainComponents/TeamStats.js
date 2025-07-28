'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamStats } from "../actions/footballActions";
import PulseSpinner from "./PulseSpinner";
import TeamStatsCard from "./TeamStatsCard";

export default function TeamStats({ leagueId, teamId}) {
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${leagueId}-${teamId}-teamStats`, teamId, season, leagueId],
    enabled: !!teamId && !!season,
    queryFn: () => getTeamStats(leagueId, teamId, season,),
  });

  console.log(data);


  // Generate season options from 2005 to current year
  const seasonOptions = [];
  for (let y = currentYear; y >= 2005; y--) {
    seasonOptions.push(y);
  }



  if (isLoading) return <PulseSpinner className="min-h-screen" text={"Loading team stats..."} />;
  if (isError || !data?.data?.teamStats) return <div className="text-red-500 py-8 text-center bg-red-50 rounded mx-4">Error loading stats</div>;

  const stats = data.data.teamStats;
  const { league, team, fixtures, goals, biggest, clean_sheet, failed_to_score, lineups, cards, penalty } = stats;

  return (
    <TeamStatsCard teamStats={stats} onSeasonChange={setSeason} />
  );
}