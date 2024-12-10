import axios from "axios";
import Cookies from "js-cookie";
const basicURL = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(basicURL + "auth/login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("feasta_token", response.data.token);
    Cookies.set("feasta_admin", JSON.stringify(response.data.data));

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(basicURL + "auth/register", data);

    // Setting cookies
    Cookies.set("feasta_token", response.data.token);
    Cookies.set("feasta_admin", JSON.stringify(response.data.data));

    return response.data;
  } catch (error) {
    return error.response?.data;
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
