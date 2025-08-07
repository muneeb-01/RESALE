import { REFRESH_TOKEN_ROUTE } from "@/utils/constants";
export const createAuthSlice = (set) => ({
  accessToken: null,
  user: null,
  isInitializing: false,
  setAuth: ({ accessToken, user }) => set({ accessToken, user }),
  clearAuth: () =>
    set({ accessToken: null, user: null, isInitializing: false }),
  initializeAuth: async () => {
    set({ isInitializing: true });
    try {
      const response = await apiClient.post(REFRESH_TOKEN_ROUTE, {});
      const { accessToken, user } = response.data;
      set({ accessToken, user, isInitializing: false });
      showToast.success("Session restored successfully");
    } catch (error) {
      set({ isInitializing: false });
    }
  },
});
