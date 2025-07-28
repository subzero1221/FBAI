const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getLiveMatches() {
    try {
        const res = await fetch(`${URL}/fball/getLiveMatches`);
        if (!res.ok) {
          return { success: false, message:  'Error' };
        } 

        const data = await res.json();
        return data.data;
       
       
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFixtures(date) {
    try {
        const res = await fetch(`${URL}/fball/getFixtures/${date}`);
        if (!res.ok) {
          return { success: false, message:  'Error' };
        }
       
         
        const data = await res.json();
        return {success:true, matches : data.data};
        

        
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export async function getCountries() {
    try {
        const res = await fetch(`${URL}/fball/getCountries`);
        const data = await res.json();
        return data.data;
    } catch (error) {   
        console.error(error);
        return [];
    }
}   

export async function getLeaguesByCountry(country) {
    try {
        const res = await fetch(`${URL}/fball/getCountriesLeagues/${country}`);
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to fetch leagues for country' };
    }
}

export async function getFixtureCenter(fixtureId){
    try {
        const res = await fetch(`${URL}/fball/getFixtureCenter/${fixtureId}`);
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to fetch fixture center' };
    }
}

export async function getFixtureLineups(fixtureId){
    try {
        const res = await fetch(`${URL}/fball/getFixtureLineups/${fixtureId}`);
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to fetch fixture lineups' };
    }
}


export async function getFixtureH2H(fixtureId) {
    try {
      const res = await fetch(`${URL}/fball/getFixtureH2H/${fixtureId}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch fixture H2H' };
    }
  }


  export async function getLeagueFixtures(leagueId, type) {
    try {
      const res = await fetch(`${URL}/fball/getLeagueFixtures/${leagueId}/${type}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch fixture H2H' };
    }
  }

  export async function getLeagueStandings(leagueId, season) {
    try {
      const res = await fetch(`${URL}/fball/getLeagueStandings/${season}/${leagueId}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch fixture League Standings' };
    }
  }



  
  export async function getEliteLeagues() {
    try {
      const res = await fetch(`${URL}/fball/getEliteLeagues`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch fixture H2H' };
    }
  }

  export async function getUefaLeagues() {
    try {
      const res = await fetch(`${URL}/fball/getUefaLeagues`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch fixture H2H' };
    }
  }


  export async function getTeamGeneral(teamId) {
    try {
      const res = await fetch(`${URL}/fball/getTeamData/${teamId}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
        return { success: false, message: 'Failed to fetch team data' };
    }
  }

  
  export async function getTeamStats(leagueId, teamId, season) {
    try {
      const res = await fetch(`${URL}/fball/getTeamStats/${leagueId}/${teamId}/${season}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};

    } catch (error) {
      console.error("Fetch error:", error);
        return { success: false, message: 'Failed to fetch team data' };
    }
  }

  export async function getPlayerStats(playerId, season) {
    try {
      const res = await fetch(`${URL}/fball/getPlayerProfile/${playerId}/${season}`);
      
      if (!res.ok) {
        return { success: false, message:  'Error' };
      }

      const data = await res.json();
      return {success:true, data};    
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, message: 'Failed to fetch player stats' };
    }
  }

  export async function search(query) {
    try {
      const res = await fetch(`${URL}/fball/search?query=${query}`);
      const data = await res.json();
      return {success:true, data};

    } catch (error) {
        console.error("Fetch error:", error);
      return { success: false, message: 'Failed to search' };
    }
  }