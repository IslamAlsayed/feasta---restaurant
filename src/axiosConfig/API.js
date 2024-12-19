import axios from "axios";
import Cookies from "js-cookie";

export const siteURL = "http://192.168.1.63:3000/";
export const basic_URL_API = "http://127.0.0.1:8000/api/";
export const storageURL = basic_URL_API + "storage/images/";

export const getData = async (url) => {
    try {
        const response = await axios.get(basic_URL_API + url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("feasta_token") || null}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 404) return;

            if (status === 401) {
                Cookies.remove("feasta_token");
                Cookies.remove("feasta_client");
            } else if (status >= 500) {
                console.error("Server error. Please try again later.");
            } else {
                console.error(`Error response (${status}):`, data);
            }
        }

        if (error.message) console.error("Error occurred:", error.message);
    }
};

export const addData = async (url, data) => {
    try {
        const response = await axios.post(basic_URL_API + url, data, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("feasta_token") || null}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateData = async (url, data) => {
    try {
        const response = await axios.put(basic_URL_API + url, data, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("feasta_token") || null}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (url) => {
    try {
        const response = await axios.delete(basic_URL_API + url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("feasta_token") || null}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};