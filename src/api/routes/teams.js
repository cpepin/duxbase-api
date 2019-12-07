const express = require("express");
const Joi = require("joi");
const boom = require("boom");

const {
  createTeam,
  findMemberAndManagedTeamsForUser
} = require("../queries/teams");
const {
  findPlayerByUserId,
  insertPlayerForUserId
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
