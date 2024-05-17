import axios from "axios";

export const LOCALBASEURL = "http://localhost:8000/";
export const BASEURL = "https://rammy.pythonanywhere.com/";

const getToken = () =>
  localStorage.getItem("shopany-user")
    ? JSON.parse(localStorage.getItem("shopany-user"))
    : null;

// const token = getToken()
const axiosInstance = axios.create({
  baseURL: BASEURL,

  headers: {
    Accept: "application/json",
    // Authorization: "Bearer " + token?.access,
  },
});

export const axiosFormInstance = axios.create({
  baseURL: BASEURL,

  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (!token?.access) return config;

    config.headers.Authorization = `Bearer ${token?.access}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosFormInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (!token?.access) return config;

    config.headers.Authorization = `Bearer ${token?.access}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
