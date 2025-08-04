import { HOST } from "../utils/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Example: Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.error("Unauthorized, redirecting to login...");
      // Example: window.location.href = '/login';
    } else if (response?.status >= 500) {
      console.error("Server error, please try again later.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
