import axios from "axios";
import Cookies from "js-cookie";

export const basicURL = "http://127.0.0.1:8000/api/";
export const storageURL = "http://127.0.0.1:8000/storage/images/";

export const getData = async (url) => {
  try {
    const response = await axios.get(basicURL + url, {
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

      if (status === 401 && data.message === "You are not Superadmin") {
        Cookies.remove("feasta_token");
        Cookies.remove("feasta_admin");
        window.location.href = "/auth/login";
      } else if (status >= 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error(`Error response (${status}):`, data);
      }
    } else if (error.request) {
      console.error("Network error: No response received", error.request);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const getDataById = async (url, id) => {
  try {
    const response = await axios.get("/Store/" + url + ".json");
    let alone = response.data.find((data) => data.id === parseInt(id));
    return alone;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) return;

      if (status === 401 && data.message === "You are not Superadmin") {
        Cookies.remove("feasta_token");
        Cookies.remove("feasta_admin");
        window.location.href = "/auth/login";
      } else if (status >= 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error(`Error response (${status}):`, data);
      }
    } else if (error.request) {
      console.error("Network error: No response received", error.request);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const addData = async (url, data) => {
  try {
    const response = await axios.post(basicURL + url, data, {
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
    const response = await axios.put(basicURL + url, data, {
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
    const response = await axios.delete(basicURL + url, {
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

// export const updateData = async (url, data, multipart, method = "post") => {
//   let loader = document.getElementById("Loader");

//   try {
//     if (loader) loader.classList.add("show");

//     const response = await axios({
//       method: method,
//       url: basicURL + url,
//       data: data,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": multipart ? "multipart/form-data" : false,
//         Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
//       },
//     });

//     if (response) if (loader) loader.classList.remove("show");

//     return response.data;
//   } catch (error) {
//     if (loader) loader.classList.remove("show");

//     if (error.response) {
//       const { status, data } = error.response;

//       if (status === 404) return;

//       if (status >= 500) {
//         console.error("Server error. Please try again later.");
//       } else {
//         console.error(`Error response (${status}):`, data);
//       }
//     } else if (error.request) {
//       console.error("Network error: No response received", error.request);
//     } else {
//       console.error("Error occurred:", error.message);
//     }

//     throw error;
//   } finally {
//     if (loader) loader.classList.remove("show");
//   }
// };

// export const deleteData = async (url) => {
//   let loader = document.getElementById("Loader");

//   try {
//     if (loader) loader.classList.add("show");

//     const response = await axios.delete(basicURL + url, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
//       },
//     });

//     if (response) if (loader) loader.classList.remove("show");

//     return response.data;
//   } catch (error) {
//     if (loader) loader.classList.remove("show");

//     if (error.response) {
//       const { status, data } = error.response;
//       if (status === 404) return;

//       if (status >= 500) {
//         console.error("Server error. Please try again later.");
//       } else {
//         console.error(`Error response (${status}):`, data);
//       }
//     } else if (error.request) {
//       console.error("Network error: No response received", error.request);
//     } else {
//       console.error("Error occurred:", error.message);
//     }

//     throw error;
//   } finally {
//     if (loader) loader.classList.remove("show");
//   }
// };
