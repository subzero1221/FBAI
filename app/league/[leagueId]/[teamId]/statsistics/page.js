import TeamStats from "@/app/_mainComponents/TeamStats";

export async function generateMetadata({ params }) {
    const { leagueId, teamId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Leagues  - League #${leagueId} - Team #${teamId} - Statistics`,
      description: `Live stats and details for match #${leagueId} - Team #${teamId} - Statistics`,
    };
  }


export default function  TeamStatsPage({ params }) {
    const { leagueId, teamId } = params;
    return (
        <TeamStats leagueId={leagueId} teamId={teamId} />
    )
}