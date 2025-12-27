import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  
});

// Request interceptor to attach token automatically if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ya Redux/Pinia
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional: handle 401 globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirect to login.");
      // Optional: logout user / redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
