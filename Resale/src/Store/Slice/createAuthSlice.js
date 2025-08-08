import { showToast } from "@/components/ToastContainer";
import apiClient from "@/lib/api-client"; // Your Axios client
import { REFRESH_TOKEN_ROUTE } from "@/utils/constants";

export const createAuthSlice = (set) => ({
  accessToken: null,
  user: null,
  isInitializing: false,
  setAuth: ({ accessToken, user }) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken, user });
  },
  clearAuth: () => {
    localStorage.removeItem("accessToken"); // Clear localStorage
    set({ accessToken: null, user: null, isInitializing: false });
  },
  initializeAuth: async () => {
    set({ isInitializing: true });
    const token = localStorage.getItem("accessToken");
    if (token) {
      set({ accessToken: token, isInitializing: false });
    } else {
      try {
        const response = await apiClient.post(
          REFRESH_TOKEN_ROUTE,
          {},
          { withCredentials: true }
        );
        const { accessToken, user } = response.data;
        if (!accessToken || !user) {
          throw new Error("Invalid refresh response");
        }
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken, user, isInitializing: false });
        showToast.success("Session restored successfully");
      } catch (error) {
        console.error(
          "Initialize auth failed:",
          error.response?.data?.error || error.message
        );
        localStorage.removeItem("accessToken"); // Clear stale token
        set({ accessToken: null, user: null, isInitializing: false });
      }
    }
  },
});
