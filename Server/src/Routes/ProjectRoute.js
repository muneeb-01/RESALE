import express from "express";
const ProjectRoute = express.Router();

ProjectRoute.get("/", (req, res) => {
  res.send("Okay");
});

export default ProjectRoute;
