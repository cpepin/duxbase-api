const express = require('express');

const UsersRouter = require('./users');
const AuthRouter = require('./auth');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('Hello World');
});

indexRouter.use('/users', UsersRouter);
indexRouter.use('/auth', AuthRouter);

module.exports = indexRouter;
