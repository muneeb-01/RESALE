import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import debug from "debug";
import passport from "passport";

import "./src/config/mongoose-connection.js";
import "./src/config/passport.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRoute from "./src/Routes/authRoute.js";

dotenv.config({ quiet: true });
const dbgr = debug("development:app");

const app = express();
const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Resale Server");
});

app.use("/api/user", authRoute);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  dbgr(`Listening on http://localhost:${PORT}`);
});
