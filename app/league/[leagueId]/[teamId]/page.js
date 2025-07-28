import TeamGeneral from "@/app/_mainComponents/TeamGeneral";


export async function generateMetadata({ params }) {
    const { leagueId, teamId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Leagues  - League #${leagueId} - Team #${teamId}`,
      description: `Live stats and details for match #${leagueId} - Team #${teamId}`,
    };
  }


export default function TeamPage({ params }) {
  const { leagueId, teamId } = params;
  return (
    <div className="min-h-screen">
      <TeamGeneral teamId={teamId} leagueId={leagueId} />
    </div>
  );
}   