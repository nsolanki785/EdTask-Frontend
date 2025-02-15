import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  params: { lng: "en" },
});

// Request interceptor to add headers
api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`; // Replace with actual token handling logic.
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
