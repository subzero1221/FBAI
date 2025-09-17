const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function handleCheckOut(product) {
    console.log("calling payment session")
    try {
      const res = await fetch(`${URL}/payments/create-checkout-session`,{
        method: 'POST',
        credentials:"include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product}) // or amount, etc.
      });
  
      if (!res.ok) {
        return { success: false, message: data?.message || "Error" };
      }

      const data = await res.json();
      return {success:true, url: data.url, tokens:data.tokens}

    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };
    }
  }
