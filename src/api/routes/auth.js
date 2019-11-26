const express = require("express");
const boom = require("boom");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { findUserByEmail } = require("../queries/users");
const { getJwt, verifyJwt } = require("../utils/jwt");
const asyncMiddleware = require("../middleware/asyncMiddleware");

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

        return res.status(200).send({ jwt: getJwt(user) });
      }
    }

    throw boom.unauthorized();
  })
);

AuthRouter.get(
  "/me",
  asyncMiddleware(async (req, res) => {
    const { authorization } = req.headers;

    if (authorization && authorization.split(" ")[0] === "Bearer") {
      const accessToken = authorization.split(" ")[1];

      try {
        const decoded = await verifyJwt(accessToken);

        return res.status(200).send(decoded);
      } catch (error) {
        throw boom.unauthorized(error);
      }
    } else {
      throw boom.unauthorized("User is not authenticated");
    }
  })
);

module.exports = AuthRouter;
