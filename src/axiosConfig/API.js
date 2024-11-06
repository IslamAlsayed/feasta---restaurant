import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios.get("/Store/" + url + ".json");
    return response.data;
  } catch (error) {
    console.error(error.response || error.message);
    throw error;
  }
};

export const getDataById = async (url, id) => {
  try {
    const response = await axios.get("/Store/" + url + ".json");
    let alone = response.data.find((data) => data.id === parseInt(id));
    return alone;
  } catch (error) {
    console.error(error.response || error.message);
    throw error;
  }
};

// export const addData = async (url, data) => {
//   let loader = document.getElementById("Loader");

//   try {
//     if (loader) loader.classList.add("show");

//     const response = await axios.post(basicURL + url, data, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
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
