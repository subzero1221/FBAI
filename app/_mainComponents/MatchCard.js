'use client';

import Image from 'next/image';
import Link from 'next/link';


const MatchCard = ({ match }) => {
  const { fixture, teams, goals, league, score } = match;
  
  // Format match start time (HH:mm)
  const matchTime = new Date(fixture.date);
  const formattedTime = matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-2 hover:bg-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image 
            src={league.flag} 
            alt={league.country} 
            width={20} 
            height={20} 
            className="rounded-full mr-2"
          />
          <span className="text-sm text-gray-300">{league.name}</span>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded text-xs ${
            fixture.status.short === "1H" || fixture.status.short === "2H" ? "bg-red-600" : 
            fixture.status.short === "FT" ? "bg-gray-600" : 
            "bg-green-600"
          }`}>
            {fixture.status.long}
          </span>
          {fixture.status.short !== "1H" && fixture.status.short !== "2H" && fixture.status.short !== "FT" && (
            <span className="ml-2 text-xs text-gray-400">{formattedTime}</span>
          )}
          {fixture.status.short === "1H" || fixture.status.short === "2H" && (
            <span className="ml-2 text-xs text-gray-400">{fixture.status.elapsed}&apos;</span>
          )}
        </div>  
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1">
          <Image 
            src={teams.home.logo? teams.home.logo : "/clubDefault.jpg"} 
            alt={teams.home.name} 
            width={24} 
            height={24} 
            className="mr-2"
          />
          <span className={`${teams.home.winner ? "font-bold text-white" : "text-gray-300"}`}>
            {teams.home.name}
          </span>
        </div>
        
        <div className="flex items-center px-4 font-bold">
          <span className="text-white">{goals.home}</span>
          <span className="mx-2 text-gray-400">-</span>
          <span className="text-white">{goals.away}</span>
        </div>
        
        <div className="flex items-center flex-1 justify-end">
          <span className={`${teams.away.winner ? "font-bold text-white" : "text-gray-300"}`}>
            {teams.away.name}
          </span>
          <Image 
            src={teams.away.logo? teams.away.logo : "/clubDefault.jpg"} 
            alt={teams.away.name} 
            width={24} 
            height={24} 
            className="ml-2"
          />
        </div>
      </div>
      
      {score.penalty && (score.penalty.home !== null || score.penalty.away !== null) && (
        <div className="text-center text-sm text-gray-400 mt-1">
          Penalties: {score.penalty.home} - {score.penalty.away}
        </div>
      )}
      <div className="text-center mt-3">
        <Link href={`/fixture/${fixture.id}`} className="inline-block px-4 py-1 rounded bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors">
          Match Center
        </Link>
      </div>
    </div>
  );
};

export default MatchCard; 