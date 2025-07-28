import { useUserStore } from "../store/userStore";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function getSingleFixture( fixtureId ) {
    try {
        const res = await fetch(`${URL}/fball/getSingleFixture/${fixtureId}`, {
            method: "GET",

        });
        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Error' };
        }
        const data = await res.json();
        return { success: true, data: data.fixture };
    } catch (err) {
        return { success: false, message: err.message || "An error occurred" };
    }
}

export async function predictResults(leagueId, season, fixtureId, team1Id, team2Id, predict) {
  try {
    const res = await fetch(`${URL}/predictions/predictResults/${leagueId}/${season}/${fixtureId}/${team1Id}/${team2Id}/${predict}`, {
      method: "GET",
      credentials: "include",
    });

    if(res.status === 403){
      return {noTokens : true}
    }

    if (!res.ok) {
      return { success: false, message: data?.message || "Error" };
    }
    const data = await res.json();

    // ✅ update tokens in the store directly
    if (data?.user?.tokens != null) {
      useUserStore.getState().updateTokens(data.user.tokens);
    }

    return { success: true, data: data.prediction, user: data.user };
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}