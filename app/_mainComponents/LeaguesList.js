import { useQuery } from '@tanstack/react-query';
import { getLeaguesByCountry } from '../actions/footballActions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LeaguesList({ country }) {
  const router = useRouter();
  const {
    data: leaguesData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['countryLeagues', country],
    queryFn: () => getLeaguesByCountry(country),
    enabled: !!country,
  });

  console.log(leaguesData)

  if (!country) return null;
  if (isLoading) return <div className="text-xs text-gray-400 p-2">Loading leagues...</div>;
  if (error) return <div className="text-xs text-red-400 p-2">{error.message || 'Error loading leagues'}</div>;

  // Defensive: if no data, return null
  if (!leaguesData?.data) return null;


  return (
    <div className="mt-3">
      <div className="text-xs font-semibold mb-2 text-blue-300 tracking-wide uppercase">Leagues</div>
      <div className="flex flex-col gap-1">
        {leaguesData.data.map((item) => (
          <button
            key={item.league.id}
            onClick={() => router.push(`/league/${item.league.id}`)}
            title={item.league.name}
            className="flex items-center mr-12 gap-2 w-full px-2 py-1 rounded-md bg-slate-800/70 hover:bg-blue-900/40 transition-all cursor-pointer mb-1"
          >
            <Image src={item.league.logo} alt={item.league.name} className="w-5 h-5 rounded-full object-contain bg-white" />
            <span className="text-xs font-medium truncate flex-1">{item.league.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 