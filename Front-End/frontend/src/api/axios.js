import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bookstore-production-3bee.up.railway.app",
  withCredentials: true,  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const token = JSON.parse(auth).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
