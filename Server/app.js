import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import debug from "debug";
import passport from "passport";
import rateLimit from "express-rate-limit";

import { authenticateToken } from "./src/middlewares/auth.js";
import config from "./src/config/config.js";
import "./src/config/mongoose-connection.js";
import "./src/config/passport.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRoute from "./src/Routes/authRoute.js";

dotenv.config({ quiet: true });
const dbgr = debug("development:app");

const app = express();
const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Resale Server");
});

app.use("/api/user", authRoute);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  dbgr(`Listening on http://localhost:${PORT}`);
});
