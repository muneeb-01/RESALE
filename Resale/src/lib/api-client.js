import axios from "axios";
import { HOST } from "../utils/constants.js";
import { showToast } from "@/components/ToastContainer";
import { useAppStore } from "@/Store/index.js";
import { REFRESH_TOKEN_ROUTE } from "@/utils/constants.js";
const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      useAppStore.getState().accessToken || localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Attaching access token to request:", config.url);
    } else {
      console.warn("No access token available for request:", config.url);
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
  async (error) => {
    const { response, config } = error;
    let errorMessage = "An unexpected error occurred";

    if (response) {
      errorMessage =
        response.data?.error || response.statusText || errorMessage;

      if (response.status === 401) {
        // Handle expired access token
        try {
          // Attempt to refresh the access token
          const refreshResponse = await apiClient.post(REFRESH_TOKEN_ROUTE);
          const newAccessToken = refreshResponse.data.accessToken;

          // Store new access token
          localStorage.setItem("accessToken", newAccessToken);
          useAppStore.setState().setAuth({ accessToken: newAccessToken });
          // Update the Authorization header for the original request
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request
          return apiClient(config);
        } catch (refreshError) {
          // Refresh failed (e.g., invalid refresh token)
          localStorage.removeItem("accessToken");
          useAppStore.getState().clearAuth();
          showToast.error("Session expired. Please log in again.");
          return Promise.reject(
            new Error("Session expired. Please log in again.")
          );
        }
      } else if (response.status >= 500) {
        showToast.error(errorMessage || "Server error, please try again later");
      } else if (response.status !== 403) {
        showToast.error(errorMessage);
        console.error(
          `API error [${response.status}] for ${config.url}:`,
          errorMessage
        );
      }
    } else {
      console.error("Network error:", error.message);
      showToast.error(
        error.message || "Network error, please check your connection"
      );
    }

    return Promise.reject(new Error(errorMessage));
  }
);
export default apiClient;
