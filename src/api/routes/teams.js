const express = require('express');
const Joi = require('joi');
const boom = require('boom');

const { findTeams } = require('../queries/teams');
const authenticated = require('../middleware/authenticated');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const TeamsRouter = express.Router();

TeamsRouter.get('/', authenticated, asyncMiddleware(async (req, res) => {
  const schema = {
    userId: Joi.number(),
  };

  const searchParams = {
    userId: req.query.userId,
  };

  const { error } = Joi.validate(searchParams, schema, { abortEarly: false });

  if (error) {
    throw boom.badRequest('Invalid /teams request', error);
  }

  if (req.user.id !== parseInt(searchParams.userId, 10)) {
    throw boom.forbidden('User does not have access to requested teams.');
  }

  const teams = await findTeams({
    ['team.user_id']: searchParams.userId,
  });

  res.status(200).send(teams);
}));

module.exports = TeamsRouter;
