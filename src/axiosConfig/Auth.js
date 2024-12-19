import axios from "axios";
import Cookies from "js-cookie";
import { basic_URL_API, getData } from "./API";

export const login = async (email, password) => {
    try {
        const response = await axios.post(basic_URL_API + "auth/login", {
            email: email,
            password: password,
        });

        // Setting cookies
        Cookies.set("feasta_token", response.data.token);
        Cookies.set("feasta_client", JSON.stringify(response.data.data));

        if (Cookies.get("feasta_client")) {
            let client = JSON.parse(Cookies.get("feasta_client"));

            try {
                let response = await getData(`cart/${client.id}`);

                if (response && response.status === 200) {
                    localStorage.setItem("cartItems", response.result.items);
                    localStorage.setItem("cartId", response.result.id);
                    localStorage.setItem("code", response.result.code);
                }
            } catch (error) {
                console.error(error);
            }
        }

        return response.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const checkClient = async () => {
    try {
        const response = await axios.get(basic_URL_API + "auth/client", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("feasta_token") || ""}`,
            }
        });

        return response.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(basic_URL_API + "auth/register", data);

        // Setting cookies
        Cookies.set("feasta_token", response.data.token);
        Cookies.set("feasta_client", JSON.stringify(response.data.data));

        return response.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const logout = () => {
    return new Promise((resolve) => {
        if (Cookies.get("feasta_token")) Cookies.remove("feasta_token");
        if (Cookies.get("feasta_client")) Cookies.remove("feasta_client");
        resolve({ status: 200, message: "Logged out successfully" });
    });
};

export const getClient = () => {
    const client = Cookies.get("feasta_client");
    return client ? client : null;
};

export const isAuth = async () => {
    if (Cookies.get("feasta_token")) {
        try {
            const response = await checkClient();
            if (response.status !== 200) {
                Cookies.remove("feasta_token");
                Cookies.remove("feasta_client");
                return false;
            }
        } catch (error) {
            return true;
        }
    }

    return !!Cookies.get("feasta_token");
};
