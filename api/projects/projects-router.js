// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    if (projects.length > 0) {
      res.json(projects);
    } else {
      res.json([]);
    }
  });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id).then((projects) => {
    if (projects) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "No id found" });
    }
  });
});

router.post("/", (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description || !completed) {
    return res.status(400);
  }
  Projects.insert({ name, description, completed }).then((projects) => {
    res.json(projects);
  });
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id).then((projectActions) => {
    res.json(projectActions);
  });
});

module.exports = router;
