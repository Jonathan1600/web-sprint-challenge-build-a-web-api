const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')


server.use(express.json())
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);


server.use("*", (req, res) => {
    res.status(404).json("Wrong Url!")
})
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
