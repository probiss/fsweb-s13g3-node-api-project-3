const express = require("express");

const server = express();
const { logger } = require("./middleware/middleware");
server.use(express.json());
const userRouter = require("./users/users-router");

server.use(logger);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
