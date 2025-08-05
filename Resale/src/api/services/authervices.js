// src/api/services/userService.js
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE, OTP_VERIFY_ROUTE } from "@/utils/constants";

export const authServices = {
  register: async ({ email, password }) => {
    const response = await apiClient.post(
      SIGNUP_ROUTE,
      { email, password },
      { withCredentials: true }
    );
    return response;
  },
  login: async ({ email, password }) => {
    const response = await apiClient.post(
      LOGIN_ROUTE,
      { email, password },
      { withCredentials: true }
    );
    return response;
  },
  verifyOTP: async ({ email, otp }) => {
    const response = await apiClient.post(
      OTP_VERIFY_ROUTE,
      { email, otp },
      { withCredentials: true }
    );
    return response;
  },
};
