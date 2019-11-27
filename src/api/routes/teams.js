const express = require("express");
const Joi = require("joi");
const boom = require("boom");

const {
  createTeam,
  findMemberAndManagedTeamsForUser
} = require("../queries/teams");
const authenticated = require("../middleware/authenticated");
const asyncMiddleware = require("../middleware/asyncMiddleware");

const TeamsRouter = express.Router();

TeamsRouter.get(
  "/",
  authenticated,
  asyncMiddleware(async (req, res) => {
    const teams = await findMemberAndManagedTeamsForUser(req.user.id);

    res.status(200).send(teams);
  })
);

TeamsRouter.post(
  "/",
  authenticated,
  asyncMiddleware(async (req, res) => {
    const schema = {
      name: Joi.string().required()
    };

    let newTeam = req.body;

    const { error } = Joi.validate(newTeam, schema, { abortEarly: false });

    if (error) {
      throw boom.badRequest("Invalid team", error);
    }

    const [savedTeam] = await createTeam({
      ...newTeam,
      ["user_id"]: req.user.id
    });
    return res.status(201).send(savedTeam);
  })
);

module.exports = TeamsRouter;
