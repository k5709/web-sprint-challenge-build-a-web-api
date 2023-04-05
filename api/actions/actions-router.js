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

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
