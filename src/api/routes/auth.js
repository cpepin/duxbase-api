const express = require('express');
const boom = require('boom');
const jwt = require('jsonwebtoken');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const JWT_SECRET = process.env.JWT_SECRET;

const AuthRouter = express.Router();

AuthRouter.get('/me', asyncMiddleware(async (req, res) => {
  const { authorization } = req.headers;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const accessToken = authorization.split(' ')[1];

    try {
      const decoded = await jwt.verify(accessToken, JWT_SECRET);

      return res.status(200).send(decoded);
    } catch (error) {
      throw boom.unauthorized(error);
    }
  } else {
    throw boom.unauthorized('User is not authenticated');
  }
}));

module.exports = AuthRouter;

