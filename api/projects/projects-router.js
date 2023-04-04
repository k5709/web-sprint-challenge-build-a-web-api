// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

router.get("/api/projects", async (req, res) => {
  const projects = await Project.get();
  if (projects) {
    res.json(projects);
  } else if (!projects) {
    return [];
  }
});

router.get("api/projects/:id", async (req, res) => {});

router.post("/api/projects", (req, res) => {});

router.put("api/projects/:id", (req, res) => {});

router.delete("api/projects/:id", (req, res) => {});

router.get("api/projects/:id/actions", (req, res) => {});

module.exports = router;
