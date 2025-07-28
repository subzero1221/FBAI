const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signup(formData) {
    const { email, name, password, confirmPassword } = formData;
    console.log("From actions:",email, name, password, confirmPassword);
  
    try {
      const res = await fetch(`${URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return errorData;
      }
  
      const data = await res.json();
  
      return {
        success: true,
        user: data.data.user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "An error occurred",
      };
    }
  }


  export async function login(formData) {
    const { email, password } = formData;
    console.log("From actions:",email, password);
  
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
            password,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return errorData;
      }
  
      const data = await res.json();
  
      return {
        success: true,
        user: data.data.user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "An error occurred",
      };
    }
  }

  export async function logout() {
    try {
      const res = await fetch(`${URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return errorData;
      }
      return {
        success: true,
      };
    } catch (err) { 
      return {
        success: false,
        message: err.message || "An error occurred",
      };
    }
  }

  export async function forgotPassword({ email }) {
    try {
      const res = await fetch(`${URL}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || 'Error' };
      }
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };
    }
  }

  export async function resetPassword(token, { password, passwordConfirm }) {
    try {
      const res = await fetch(`${URL}/auth/reset-password/${token}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, passwordConfirm }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || 'Error' };
      }
      const data = await res.json();
      return { success: true, data: data.data.user };
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };
    }
  } 