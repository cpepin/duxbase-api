const express = require('express');

const { findTeams } = require('../queries/teams');
const authenticated = require('../middleware/authenticated');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const TeamsRouter = express.Router();

TeamsRouter.get('/', authenticated, asyncMiddleware(async (req, res) => {
  const teams = await findTeams({
    ['team.user_id']: req.user.id,
  });

  res.status(200).send(teams);
}));

module.exports = TeamsRouter;
