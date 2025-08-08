import { GOOGLE_OR_FACEBOOK_SIGNUP } from "@/utils/constants";
export const handleSocialLogin = (platform) => {
  const url = `${GOOGLE_OR_FACEBOOK_SIGNUP}/auth/${platform}`;
  window.location.href = url;
};
