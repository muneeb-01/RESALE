import { HOST } from "../utils/constants";
import axios from "axios";
import { useAppStore } from "@/Store/index";
import { showToast } from "@/components/ToastContainer";
const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAppStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    let errorMessage = "An unexpected error occurred";

    if (response) {
      // Extract server error message
      errorMessage =
        response.data?.error || response.statusText || errorMessage;

      if (response.status === 401) {
        console.error("Unauthorized, redirecting to login...");
        showToast.error(errorMessage || "Please log in again");
      } else if (response.status >= 500) {
        console.error("Server error:", errorMessage);
        showToast.error(errorMessage || "Server error, please try again later");
      } else {
        console.error("API error:", errorMessage);
        showToast.error(errorMessage);
      }
    } else {
      // Network or other errors
      console.error("Network error:", error.message);
      showToast.error(
        error.message || "Network error, please check your connection"
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;
