'use client';

import { useQuery } from '@tanstack/react-query';
import { getLiveMatches } from '../actions/footballActions';
import MatchCard from './MatchCard';
import Image from 'next/image';

const LiveMatches = () => {
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ['liveMatches'],
    queryFn: getLiveMatches,
  });


  if (isLoading) {
    return <div className="text-white text-center py-4">Loading live matches...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error loading live matches</div>;
  }

  if (matches?.length === 0 || Object.keys(matches).length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-extrabold mb-8 text-white text-center tracking-wide mt-10">Live Matches</h2>
      {Object.entries(matches).map(([country, countryMatches]) => (
        <div key={country} className="mb-10">
          {/* Group by league */}
          {Object.entries(
            countryMatches.reduce((acc, match) => {
              const leagueName = match.league.name;
              if (!acc[leagueName]) acc[leagueName] = [];
              acc[leagueName].push(match);
              return acc;
            }, {})
          ).map(([leagueName, leagueMatches]) => {
            const league = leagueMatches[0].league;
            return (
              <div
                key={leagueName}
                className="bg-gradient-to-br from-gray-900/80 to-blue-900/60 border-2 border-blue-700/40 rounded-3xl shadow-xl mb-8 px-6 py-6 flex flex-col items-center max-w-2xl mx-auto"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <Image
                      src={league.flag}
                      alt={league.country}
                      width={32}
                      height={32}
                      className="rounded-full mr-2 border border-blue-400 shadow"
                    />
                    <span className="text-lg font-bold text-white text-center mr-2">{leagueName}</span>
                  </div>
                  <span className="text-sm text-blue-200 font-medium text-center">{country}</span>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {leagueMatches.map((match) => (
                    <MatchCard key={match.fixture.id} match={match} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LiveMatches; 