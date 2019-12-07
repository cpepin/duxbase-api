/*
 * UI Specific Routes
 * - would be good candidates to move to a GrqphQL at some point
 */

const express = require("express");
const Joi = require("joi");
const boom = require("boom");

const { insertPlayer } = require("../queries/player");
const { createPlayerTeamRelationship } = require("../queries/playerTeam");

const authenticated = require("../middleware/authenticated");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authorizedForTeam = require("../middleware/authorizedForTeam");

const UIRouter = express.Router();

UIRouter.post(
  "/teams/:teamId/players",
  authenticated,
  authorizedForTeam,
  asyncMiddleware(async (req, res) => {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required()
    };

    let newPlayer = req.body;

    const { error } = Joi.validate(newPlayer, schema, { abortEarly: false });

    if (error) {
      throw boom.badRequest("Invalid player", error);
    }

    const [savedPlayer] = await insertPlayer(newPlayer);
    await createPlayerTeamRelationship(savedPlayer.id, req.team.id);

    return res.status(201).send(savedPlayer);
  })
);

module.exports = UIRouter;
