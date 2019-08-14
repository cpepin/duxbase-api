const express = require('express');

const UsersRouter = require('./users');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('Hello World');
});

indexRouter.use('/users', UsersRouter);

module.exports = indexRouter;
