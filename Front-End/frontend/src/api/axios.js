import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bookstore-production-3bee.up.railway.app",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      console.log("auth from localStorage:", JSON.parse(auth));
      const token = JSON.parse(auth).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log("Attached headers:", config.headers); 
    return config;
  },
  (error) => Promise.reject(error)
);



export default axiosInstance;

