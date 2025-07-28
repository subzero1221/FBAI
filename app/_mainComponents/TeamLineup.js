import Image from "next/image";
import PlayerCard from "./PlayerCard";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function   TeamLineup({ data, isHome })  {
  console.log(data)
  const language = useUserStore((state) => state.language);
    if (!data) return null;
    const bgColor = data.team.colors?.player?.primary || '808080';
    
    return (
      <div className={`flex-1 ${!isHome ? 'ml-4' : 'mr-4'}`}>
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={data.team.logo}
            alt={data.team.name}
            width={48}
            height={48}
            className="rounded-full bg-white p-1"
          />
          <div>
            <h3 className="text-white font-bold text-lg">{data.team.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{t('teamlineup_formation', language)}</span>
              <span className="text-white font-semibold">{data.formation}</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-gray-400 text-sm font-medium">{t('teamlineup_starting_xi', language)}</span>
          </div>
          <div className="space-y-1">
            {data.startXI.map((item) => (
              <PlayerCard
                key={item.player.id}
                player={item.player}
                teamColor={bgColor}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-gray-400 text-sm font-medium">{t('teamlineup_substitutes', language)}</span>
          </div>
          <div className="space-y-1">
            {data.substitutes.map((item) => (
              <PlayerCard
                key={item.player.id}
                player={item.player}
                teamColor={bgColor}
              />
            ))}
          </div>
        </div>
        {data.coach && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-400 text-sm font-medium">{t('teamlineup_coach', language)}</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50">
              {data.coach.photo && (
                <Image
                  src={data.coach.photo}
                  alt={data.coach.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-white text-sm">{data.coach.name}</span>
            </div>
          </div>
        )}
      </div>
    );
  };