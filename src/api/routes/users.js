const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const boom = require("boom");

const asyncMiddleware = require("../middleware/asyncMiddleware");
const { createUser } = require("../queries/users");
const { getJwt } = require("../utils/jwt");

const UsersRouter = express.Router();

/*
 * ^                         Start anchor
 * (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
 * (?=.*[!@#$&*])            Ensure string has one special case letter.
 * (?=.*[0-9].*[0-9])        Ensure string has two digits.
 * (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
 * .{8}                      Ensure string is of length 8.
 * $                         End anchor.
 */
const PASSWORD_REGEX = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

UsersRouter.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const schema = {
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string()
        .regex(PASSWORD_REGEX)
        .required()
    };

    let newUser = req.body;

    const { error } = Joi.validate(newUser, schema, { abortEarly: false });

    if (error) {
      throw boom.badRequest("Invalid user registration request", error);
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    newUser = Object.assign({}, newUser, { password: hashedPassword });

    const [savedUser] = await createUser(newUser);

    return res.status(201).send({ jwt: getJwt(savedUser) });
  })
);

module.exports = UsersRouter;
