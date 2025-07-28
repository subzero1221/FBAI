import Link from "next/link"

export default function PlayerCard  ({ player, teamColor }) {
    return <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
      <span className="w-6 h-6 flex items-center justify-center rounded bg-gray-700 text-white text-xs font-bold">
        {player.number}
      </span>
      <Link href={`/player/${player.id}`}  className="text-white text-sm">{player.name}</Link>
      <span className="text-gray-400 text-xs ml-auto">{player.pos}</span>
    </div>
};