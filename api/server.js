const express = require("express");
const { logger } = require("./actions/actions-middlware");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
//providing JSON because express can not parse in req bodies.
server.use(express.json());

server.use(logger);

// Configure your server here
server.use("/api/actions", actionsRouter);
//
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  console.log(req.body);
  res.send(`<h2>Badda Boom!</h2>`);
});

module.exports = server;
