import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import debug from "debug";
import ProjectRoute from "./src/Routes/ProjectRoute.js";

dotenv.config();
const dbgr = debug("development:app");

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/projects", ProjectRoute);

const server = app.listen(PORT, () => {
  dbgr(`Listening on http://localhost:${PORT}`);
});
