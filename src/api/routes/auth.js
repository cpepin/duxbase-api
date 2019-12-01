const express = require("express");
const boom = require("boom");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { findUserByEmail } = require("../queries/users");
const {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken
} = require("../utils/jwt");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authenticated = require("../middleware/authenticated");

const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    const schema = {
      email: Joi.string().required(),
      password: Joi.string().required()
    };

    const creds = req.body;

    const { error } = Joi.validate(creds, schema, { abortEarly: false });

    if (error) {
      throw boom.badRequest(error);
    }

    const user = await findUserByEmail(creds.email);

    if (user) {
      const match = await bcrypt.compare(creds.password, user.password);

      if (match) {
        delete user.password;

        return res.status(200).send({
          accessToken: getAccessToken(user),
          refreshToken: getRefreshToken(user),
        });
      }
    }

    throw boom.unauthorized();
  })
);

AuthRouter.post('/token', asyncMiddleware(async (req, res) => {
  const schema = {
    refreshToken: Joi.string().required(),
  };

  const { error } = Joi.validate(req.body, schema, { abortEarly: false });

  if (error) {
    throw boom.badRequest(error);
  }

  try {
    const user = await verifyRefreshToken(req.body.refreshToken);

    return res.status(200).send({
      jwt: getAccessToken(user),
    });
  } catch (e) {
    throw boom.unauthorized('Invalid refresh token.');
  }
}));

AuthRouter.get(
  "/me",
  authenticated,
  (req, res) => {
    return res.status(200).send(req.user);
  }
);

module.exports = AuthRouter;
