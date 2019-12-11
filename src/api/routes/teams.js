const express = require("express");
const Joi = require("joi");
const boom = require("boom");

const {
  createTeam,
  findMemberAndManagedTeamsForUser
} = require("../queries/teams");
const {
  findPlayerByUserId,
  insertPlayerForUserId,
  insertPlayer,
  findPlayersByTeamId
} = require("../queries/player");
const { createPlayerTeamRelationship } = require("../queries/playerTeam");
const authenticated = require("../middleware/authenticated");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authorizedForTeam = require("../middleware/authorizedForTeam");

const TeamsRouter = express.Router();

TeamsRouter.get(
  "/",
  authenticated,
  asyncMiddleware(async (req, res) => {
    const teams = await findMemberAndManagedTeamsForUser(req.user.id);

    return res.status(200).send(teams);
  })
);

TeamsRouter.get(
  "/:teamId",
  authenticated,
  authorizedForTeam,
  asyncMiddleware(async (req, res) => {
    return res.status(200).send(req.team);
  })
);

TeamsRouter.get(
  "/:teamId/players",
  authenticated,
  authorizedForTeam,
  asyncMiddleware(async (req, res) => {
    const players = await findPlayersByTeamId(req.team.id);

    return res.status(200).send(players);
  })
);

TeamsRouter.post(
  "/:teamId/players",
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

TeamsRouter.post(
  "/",
  authenticated,
  asyncMiddleware(async (req, res) => {
    const schema = {
      name: Joi.string().required(),
      player: Joi.bool()
    };

    let newTeam = req.body;

    const { error } = Joi.validate(newTeam, schema, { abortEarly: false });

    if (error) {
      throw boom.badRequest("Invalid team", error);
    }

    const [savedTeam] = await createTeam({
      name: newTeam.name,
      ["manager_id"]: req.user.id
    });

    // Create pivot entry if user is a player-manager
    if (newTeam.player) {
      let player = await findPlayerByUserId(req.user.id);

      if (!player) {
        player = await insertPlayerForUserId(req.user.id);
      }

      await createPlayerTeamRelationship(player.id, savedTeam.id);
    }

    return res.status(201).send(savedTeam);
  })
);

module.exports = TeamsRouter;
