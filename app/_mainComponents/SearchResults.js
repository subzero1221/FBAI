import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchResults({ results, query }) {
  const router = useRouter();
  if (!results || typeof results !== 'object') {
    return <div className="max-w-xl mx-auto pt-20 text-slate-400 text-center">No results found for &apos;{query}&apos;.</div>;
  }
  const { players = [], countries = [], teams = [] } = results;
  console.log(results);

  const handleSeeAll = (section) => {
    router.push(`/search?query=${encodeURIComponent(query)}&section=${section}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      {/* Players Section */}
      {players && players.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Players</h2>
            {players.length > 3 && (
              <button
                type="button"
                onClick={() => handleSeeAll('players')}
                className="text-blue-600 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                See all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {players.slice(0, 3).map((p, idx) => (
              <Link
                key={p.player.id || p.player.name || idx}
                href={`/player/${p.player.id}`}
                className="group block bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition p-5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex justify-center mb-3">
                  <Image src={p.player.photo} alt={p.player.firstname + ' ' + p.player.lastname} className="w-16 h-16 object-contain rounded-full bg-slate-100" />
                </div>
                <div className="font-semibold text-center text-slate-900 group-hover:text-blue-600 mb-1 truncate">{p.player.firstname} {p.player.lastname}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Countries Section */}
      {countries && countries.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Countries</h2>
            {countries.length > 3 && (
              <button
                type="button"
                onClick={() => handleSeeAll('countries')}
                className="text-blue-600 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                See all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {countries.slice(0, 3).map((c, idx) => (
              <Link
                key={c.id || c.name || idx}
                href={`/country/${encodeURIComponent(c.name || c.value || '')}`}
                className="group block bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition p-5 cursor-pointer shadow-sm hover:shadow-md"
              >
                {c.flag && (
                  <div className="flex justify-center mb-3">
                    <Image src={c.flag} alt={c.name || c.label || c.value} className="w-16 h-16 object-contain rounded-full bg-slate-100" />
                  </div>
                )}
                <div className="font-semibold text-center text-slate-900 group-hover:text-blue-600 mb-1 truncate">{c.name || c.label || c.value}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Teams Section */}
      {teams && teams.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Teams</h2>
            {teams.length > 3 && (
              <button
                type="button"
                onClick={() => handleSeeAll('teams')}
                className="text-blue-600 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                See all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teams.slice(0, 3).map((t, idx) => {
              const team = t.team ? t.team : t;
              return (
                <Link
                  key={team.id || team.name || idx}
                  href={`/team/${team.id || team.value || ''}`}
                  className="group block bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition p-5 cursor-pointer shadow-sm hover:shadow-md"
                >
                  {team.logo && (
                    <div className="flex justify-center mb-3">
                      <Image src={team.logo} alt={team.name || team.label || team.value} className="w-16 h-16 object-contain rounded-full bg-slate-100" />
                    </div>
                  )}
                  <div className="font-semibold text-center text-slate-900 group-hover:text-blue-600 mb-1 truncate">{team.name || team.label || team.value}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}