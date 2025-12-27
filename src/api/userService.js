import axiosInstance from "./axiosInstance";

// Auth URLS 
export const registerUser = (data) => axiosInstance.post("/register", data);