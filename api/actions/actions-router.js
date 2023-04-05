// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

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

router.get("/:id", (req, res) => {
  Actions.get(req.params.id).then((actions) => {
    if (actions) {
      res.json(actions);
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
    Actions.insert({ name, description, completed }).then((actions) => {
      res.json(actions);
    });
});

router.put("/:id", (req, res) => {});

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
