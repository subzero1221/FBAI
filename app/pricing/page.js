import PricingPage from "../_mainComponents/PricingPage";

export async function generateMetadata({ params }) {
    const { leagueId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Pricing`,
      description: `Pricing page`,
    };
  }

  export default function Pricing({}){
    return <PricingPage  />
  }
