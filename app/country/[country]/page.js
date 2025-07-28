import CountriesLeagues from "@/app/_mainComponents/CountriesLeagues";

export async function generateMetadata({ params }) {
    const { country } = await params;
  
    // You can use fixtureId to fetch match title, teams, etc.
    return {
      title: `FBAI / Leagues  - Country #${country}`,
      description: `Live stats and details for country #${country}`,
    };
  }

  export default async function CountryPage({ params }) {
    const { country } = await params;
    return (
        <div>
            <CountriesLeagues country={country} />
        </div>
    )
  }