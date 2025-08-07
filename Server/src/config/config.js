import dotenv from "dotenv";

dotenv.config({ quiet: true });

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  mongo: {
    uri: process.env.MONGODB_URI,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  port: process.env.PORT || 3000,
  frontendUrl: process.env.ORIGIN,
  mailer: {
    email: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  },
  serverUrl: process.env.SERVER_URL,
};
