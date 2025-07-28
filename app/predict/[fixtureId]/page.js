import PredictResults from "@/app/_mainComponents/PredictResults";

export async function generateMetadata({ params }) {
    const { fixtureId } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Predict  - Fixture #${fixtureId}`,
      description: `Predict results for fixture #${fixtureId}`,
    };
  }


export default async function Predictons({ params }) { 
    const { fixtureId } = await params;
    
    return (
        <div>
            <PredictResults fixtureId={fixtureId} />
        </div>
    ) 
}