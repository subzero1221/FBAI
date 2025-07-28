import Image from "next/image";
import Link from "next/link";

function getPlayerPhoto(player) {
    return player.photo || null;
  }
  


export default function  FieldPlayer({ player, teamColor }){

    
    return <div className="flex flex-col items-center">
      {getPlayerPhoto(player) ? (
        <Image
          src={getPlayerPhoto(player)}
          alt={player.name}
          width={36}
          height={36}
          className="rounded-full border-2 border-white shadow"
          style={{ background: teamColor ? `#${teamColor}` : '#222' }}
        />
      ) : (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow"
          style={{ background: teamColor ? `#${teamColor}` : '#222' }}
        >
          {player.pos}
        </div>
      )}
      <Link href={`/player/${player.id}`} className="no-underline" >
      <span className="text-[12px] text-white hover:text-blue-300 mt-1 no-underline text-center max-w-[48px] truncate">
    {player.number} {player.name.split(' ')[1] || player.name}
  </span>
      </Link>
    </div>
};