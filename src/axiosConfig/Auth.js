import axios from "axios";
import Cookies from "js-cookie";
const basicURL2 = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.post(basicURL2 + "auth/login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("feasta_token", response.data.token);
    Cookies.set("feasta_admin", JSON.stringify(response.data.data));

    // illogical
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }

    if (!localStorage.getItem("cartTotal")) {
      localStorage.setItem("cartTotal", 0);
    }

    return response.data;
  } catch (error) {
    return error.response?.data;
  } finally {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.remove("show");
    }
  }
};

export const register = async (data) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.post(basicURL2 + "auth/register", data);

    // Setting cookies
    Cookies.set("feasta_token", response.data.token);
    Cookies.set("feasta_admin", JSON.stringify(response.data.data));

    // illogical
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }

    if (!localStorage.getItem("cartTotal")) {
      localStorage.setItem("cartTotal", 0);
    }

    return response.data;
  } catch (error) {
    return error.response?.data;
  } finally {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.remove("show");
    }
  }
};

export const logout = () => {
  return new Promise((resolve) => {
    if (Cookies.get("feasta_token")) Cookies.remove("feasta_token");
    if (Cookies.get("feasta_admin")) Cookies.remove("feasta_admin");
    resolve({ status: 200, message: "Logged out successfully" });
  });
};

export const getUser = () => {
  const user = Cookies.get("feasta_admin");
  return user ? user : null;
};

export const isAuth = () => {
  return !!Cookies.get("feasta_token");
};
