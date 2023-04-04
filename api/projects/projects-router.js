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
    res.status(400).end();
  } else
    Projects.insert({ name, description, completed }).then((projects) => {
      res.json(projects);
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  if (!name || !description || !completed) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const project = await Projects.get(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Projects.update(id, {
      name,
      description,
      completed,
    });

    return res.json(updatedProject);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error trying to update project" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.get(id);
    if (!project) {
      return res.status(404).end();
    }

    await Projects.remove(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting project" });
  }
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id).then((projectActions) => {
    res.json(projectActions);
  });
  res.status(404);
});

module.exports = router;
