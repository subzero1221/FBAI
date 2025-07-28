import League from "@/app/_mainComponents/League";

export async function generateMetadata({ params }) {
    const { leagueId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Leagues  - League #${leagueId}`,
      description: `Live stats and details for match #${leagueId}`,
    };
  }


export default async function LeaguePage({params}){
  const { leagueId } = await params;

    return <League leagueId={leagueId} />
}