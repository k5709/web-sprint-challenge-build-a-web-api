// add middlewares here related to actions
const Actions = require("../actions/actions-model");

function logger(req, res, next) {
  // DO YOUR
  const timestamp = new Date().toLocaleDateString;
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes || !completed) {
    return res.status(400).json({ message: "Missing Required Fields" });
  }
  next();
}

function validateId(req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "No id found" });
  }
  next();
}

module.exports = { logger, validateAction, validateId };
