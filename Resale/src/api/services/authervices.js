// src/api/services/userService.js
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE, OTP_VERIFY_ROUTE } from "@/utils/constants";

export const authServices = {
  register: async ({ email, password }) => {
    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (data) => {
    try {
      const response = await apiClient.post(
        OTP_VERIFY_ROUTE,
        { email: data.email, otp: data.otpValue },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
