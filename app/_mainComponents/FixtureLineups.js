import { useQuery } from "@tanstack/react-query";
import { getFixtureLineups } from "../actions/footballActions";
import FootballField from "./FootBallField";
import TeamLineup from "./TeamLineup";
import PulseSpinner from "./PulseSpinner";

export default function FixtureLineups({ fixtureId }) {
  const { data: lineups, isLoading, error } = useQuery({
    queryKey: ["fixtureLineups", fixtureId],
    queryFn: () => getFixtureLineups(fixtureId),
  });


  if (isLoading) return <div className="text-white text-center py-8"><PulseSpinner text={"Loading lineups..."} /></div>;
  if (error) return <div className="text-red-500 text-center py-8">Error loading lineups</div>;
  if (!lineups?.fixtureLineups?.length) return <div className="text-gray-400 text-center py-8">Lineups not available</div>;

  const [home, away] = lineups.fixtureLineups;
 

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
      {home?.formation && away?.formation ? <FootballField home={home} away={away} /> : null}
      <div className="flex mt-8">
        <TeamLineup data={home} isHome={true} /> 
        <div className="w-px bg-gray-800"></div>
        <TeamLineup data={away} isHome={false} /> 
      </div>
    </div>
  );
}