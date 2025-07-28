const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function updateMe({ avatar }) {
    try {
      const res = await fetch(`${URL}/users/updateMe`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || 'Error' };
      }
      const data = await res.json();
      return { success: true, data: data.user };
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };
    }
  }