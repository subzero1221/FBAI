import Image from "next/image";
import FieldPlayer from "./FieldPlayer";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

function parseFormation(formation) {
    return formation?.split('-').map(Number);
  }
  
  function getPlayersByPosition(players, pos) {
    return players.filter(p => p.player.pos === pos).map(p => p.player);
  }
  
 
  const renderPlayerLine = (players, formationCount, teamColor, isAway = false) => {
    if (players.length === 0) return null;
    
   
    const actualPlayers = players.slice(0, formationCount);
    
    return actualPlayers.map((player, idx) => {
      let topPosition;
      if (actualPlayers.length === 1) {
        topPosition = 50; 
      } else {
       
        topPosition = (idx * (80 / (actualPlayers.length - 1))) + 10;
      }
      
      return (
        <div
          key={player.id}
          className="absolute flex items-center justify-center"
          style={{
            left: '50%',
            top: `${topPosition}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <FieldPlayer player={player} teamColor={teamColor} />
        </div>
      );
    });
  };
  
 export default function FootballField  ({ home, away })  {
  const language = useUserStore((state) => state.language);
  
  if(!home?.formation || !away?.formation) return null;
 
 

    const homeFormation = parseFormation(home.formation);
    const awayFormation = parseFormation(away.formation);
  
   
    const homeGK = getPlayersByPosition(home.startXI, 'G');
    const homeD = getPlayersByPosition(home.startXI, 'D');
    const homeM = getPlayersByPosition(home.startXI, 'M');
    const homeF = getPlayersByPosition(home.startXI, 'F');
  
    const awayGK = getPlayersByPosition(away.startXI, 'G');
    const awayD = getPlayersByPosition(away.startXI, 'D');
    const awayM = getPlayersByPosition(away.startXI, 'M');
    const awayF = getPlayersByPosition(away.startXI, 'F');
  

    const homeDefCount = homeFormation[0] || homeD.length;
    const homeMidCount = homeFormation[1] || homeM.length;
    const homeAttCount = homeFormation[2] || homeF.length;
    
    const awayDefCount = awayFormation[0] || awayD.length;
    const awayMidCount = awayFormation[1] || awayM.length;
    const awayAttCount = awayFormation[2] || awayF.length;
  
    
    const maxHomePlayers = Math.max(homeDefCount, homeMidCount, homeAttCount);
    const maxAwayPlayers = Math.max(awayDefCount, awayMidCount, awayAttCount);
  
    
  
    return (
      <>
        {/* Team names and logos above the field */}
        <div className="flex w-full max-w-4xl mx-auto mb-4 px-4 justify-between items-center">
          <div className="flex flex-col items-center">
            <Image src={home.team.logo} alt={home.team.name} width={48} height={48} className="rounded-full bg-white mb-2" />
            <span className="text-white font-bold text-lg drop-shadow text-center whitespace-nowrap px-3 py-1 bg-black/40 rounded-lg">
              {home.team.name}
            </span>
            <span className="text-gray-300 text-sm mt-1">{home.formation}</span>
          </div>
          <div className="text-center">
            <div className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-lg">
              {t('footballfield_starting_lineups', language)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image src={away.team.logo} alt={away.team.name} width={48} height={48} className="rounded-full bg-white mb-2" />
            <span className="text-white font-bold text-lg drop-shadow text-center whitespace-nowrap px-3 py-1 bg-black/40 rounded-lg">
              {away.team.name}
            </span>
            <span className="text-gray-300 text-sm mt-1">{away.formation}</span>
          </div>
        </div>
  
        <div className="relative w-full max-w-4xl mx-auto aspect-[3/2] bg-green-700 rounded-2xl border-8 border-green-900 shadow-2xl mb-8 overflow-hidden" 
             style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)' }}>
          
          {/* Grass pattern */}
          <div className="absolute inset-0 z-0">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`absolute left-0 w-full`} 
                   style={{ 
                     top: `${i * 8.33}%`, 
                     height: '4.17%', 
                     background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' 
                   }} />
            ))}
          </div>
  
          {/* Stadium lines */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1200 800">
            {/* Outer boundary */}
            <rect x="30" y="30" width="1140" height="740" rx="40" fill="none" stroke="#fff" strokeWidth="5" />
            {/* Center line */}
            <line x1="600" y1="30" x2="600" y2="770" stroke="#fff" strokeWidth="4" />
            {/* Center circle */}
            <circle cx="600" cy="400" r="90" fill="none" stroke="#fff" strokeWidth="4" />
            <circle cx="600" cy="400" r="6" fill="#fff" />
            
            {/* Left penalty area */}
            <rect x="30" y="220" width="165" height="360" fill="none" stroke="#fff" strokeWidth="4" />
            <rect x="30" y="320" width="55" height="160" fill="none" stroke="#fff" strokeWidth="3" />
            <circle cx="140" cy="400" r="6" fill="#fff" />
            
            {/* Right penalty area */}
            <rect x="1005" y="220" width="165" height="360" fill="none" stroke="#fff" strokeWidth="4" />
            <rect x="1115" y="320" width="55" height="160" fill="none" stroke="#fff" strokeWidth="3" />
            <circle cx="1060" cy="400" r="6" fill="#fff" />
            
            {/* Penalty arcs */}
            <path d="M 192 310 A 90 90 0 0 1 192 490" fill="none" stroke="#fff" strokeWidth="3" />
            <path d="M 1003 310 A 90 90 0 0 0 1003 490" fill="none" stroke="#fff" strokeWidth="3" />
            
            {/* Goals */}
            <rect x="10" y="340" width="20" height="120" fill="none" stroke="#fff" strokeWidth="3" />
            <rect x="1170" y="340" width="20" height="120" fill="none" stroke="#fff" strokeWidth="3" />
          </svg>
  
          {/* Home team (left side) */}
          <div className="absolute left-0 top-0 w-1/2 h-full z-20">
            {/* Goalkeeper - Always in goal area */}
            <div className="absolute" style={{ left: '2%', top: '40%', width: '15%', height: '20%' }}>
              {homeGK.length > 0 && (
                <div className="relative w-full h-full">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FieldPlayer player={homeGK[0]} teamColor={home.team.colors?.player?.primary} />
                  </div>
                </div>
              )}
            </div>
  
            {/* Defenders - Based on formation */}
            <div className="absolute" style={{ left: '20%', top: '15%', width: '25%', height: '70%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(homeD.slice(0, homeDefCount), homeDefCount, home.team.colors?.player?.primary)}
              </div>
            </div>
  
            {/* Midfielders - Based on formation */}
            <div className="absolute" style={{ left: '50%', top: '20%', width: '25%', height: '60%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(homeM.slice(0, homeMidCount), homeMidCount, home.team.colors?.player?.primary)}
              </div>
            </div>
  
            {/* Forwards/Attackers - Based on formation */}
            <div className="absolute" style={{ left: '75%', top: '25%', width: '20%', height: '50%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(homeF.slice(0, homeAttCount), homeAttCount, home.team.colors?.player?.primary)}
              </div>
            </div>
          </div>
  
          {/* Away team (right side) */}
          <div className="absolute right-0 top-0 w-1/2 h-full z-20">
            {/* Goalkeeper - Always in goal area */}
            <div className="absolute" style={{ right: '2%', top: '40%', width: '15%', height: '20%' }}>
              {awayGK.length > 0 && (
                <div className="relative w-full h-full">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FieldPlayer player={awayGK[0]} teamColor={away.team.colors?.player?.primary} />
                  </div>
                </div>
              )}
            </div>
  
            {/* Defenders - Based on formation */}
            <div className="absolute" style={{ right: '20%', top: '15%', width: '25%', height: '70%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(awayD.slice(0, awayDefCount), awayDefCount, away.team.colors?.player?.primary, true)}
              </div>
            </div>
  
            {/* Midfielders - Based on formation */}
            <div className="absolute" style={{ right: '50%', top: '20%', width: '25%', height: '60%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(awayM.slice(0, awayMidCount), awayMidCount, away.team.colors?.player?.primary, true)}
              </div>
            </div>
  
            {/* Forwards/Attackers - Based on formation */}
            <div className="absolute" style={{ right: '75%', top: '25%', width: '20%', height: '50%' }}>
              <div className="relative w-full h-full">
                {renderPlayerLine(awayF.slice(0, awayAttCount), awayAttCount, away.team.colors?.player?.primary, true)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };