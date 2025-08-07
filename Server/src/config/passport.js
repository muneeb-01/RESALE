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
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const result = await handleSocialLogin(
          { res: req.res },
          profile,
          "google"
        );
        return done(null, { result });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
