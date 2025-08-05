export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/user";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const OTP_VERIFY_ROUTE = `${AUTH_ROUTES}/verify-otp`;
