// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");
const { validateAction, validateId } = require("../actions/actions-middlware");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get().then((actions) => {
    if (actions.length > 0) {
      res.json(actions);
    } else {
      res.json([]);
    }
  });
});

router.get("/:id", validateId, (req, res, next) => {
  Actions.get(req.params.id).then((actions) => {
    if (actions) {
      res.json(actions);
    } else {
      res.status(404).json({ message: "No id found" });
    }
    next();
  });
});

router.post("/", async (req, res) => {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes || typeof completed !== "boolean") {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const action = await Actions.insert({
      project_id,
      description,
      notes,
      completed,
    });
    res.status(201).json(action);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error trying to create action" });
  }
});

router.put("/:id", validateAction, async (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;

  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }

    if (!project_id || !description || !notes || !completed) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedAction = await Actions.update(req.params.id, {
      project_id,
      description,
      notes,
      completed,
    });
    res.json(updatedAction);
  } catch (next) {
    next();
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const action = await Actions.get(id);
    if (!action) {
      return res.status(404).end();
    }

    await Actions.remove(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting project" });
  }
});

module.exports = router;
