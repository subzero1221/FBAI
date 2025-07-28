import Fixture from "@/app/_mainComponents/Fixture";

// 👇 Define metadata function separately
export async function generateMetadata({ params }) {
  const { fixtureId } = await params;

  // You can use fixtureId to fetch match title, teams, etc.
  return {
    title: `Match  - Fixture #${fixtureId}`,
    description: `Live stats and details for match #${fixtureId}`,
  };
}

export default async function FixturePage({ params }) {
  const { fixtureId } = await params;

  return <Fixture fixtureId={fixtureId} />;
}