const express = require("express");
const server = express();
server.use(express.json());

const userRouter = require("./users/users-router");
const { logger } = require("./middleware/middleware");
server.use(logger);

server.use("/api/users",logger, userRouter);


server.get("/", (req, res) => {
  res.send(`<h2>Aşk gidene acımak mı...</h2>`);
});

module.exports = server;
