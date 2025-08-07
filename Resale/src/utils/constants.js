export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/user";

export const GOOGLE_OR_FACEBOOK_SIGNUP = `${HOST + AUTH_ROUTES}`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const OTP_VERIFY_ROUTE = `${AUTH_ROUTES}/verify-otp`;
export const REFRESH_TOKEN_ROUTE = `${AUTH_ROUTES}/refresh-token`;

//redirects
export const LOGIN_REDIRECT = "/";
export const SIGN_UP_REDIRECT = "/";
