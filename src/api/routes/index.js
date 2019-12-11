const express = require("express");

const UsersRouter = require("./users");
const AuthRouter = require("./auth");
const TeamsRouter = require("./teams");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("Hello World");
});

indexRouter.use("/users", UsersRouter);
indexRouter.use("/auth", AuthRouter);
indexRouter.use("/teams", TeamsRouter);

module.exports = indexRouter;
