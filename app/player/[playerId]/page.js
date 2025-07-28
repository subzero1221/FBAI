import PlayerStats from "@/app/_mainComponents/PlayerStats";

export async function generateMetadata({ params }) {
    const { playerId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Player  - Player #${playerId}`,
      description: `Live stats and details for player #${playerId}`,
    };
  }


export default async function PlayerPage({params}){
  const { playerId } = await params;

    return <PlayerStats playerId={playerId} />
}