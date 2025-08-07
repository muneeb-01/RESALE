import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleSocialLogin } from "../services/authService.js";
import { GOOGLE_AUTH_ROUTE } from "../utils/constants.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_AUTH_ROUTE,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const token = await handleSocialLogin(profile, "google");
        return done(null, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
