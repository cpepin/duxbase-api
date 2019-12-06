const boom = require("boom");

const asyncMiddleware = require("./asyncMiddleware");

const { findMemberAndManagedTeamsForUser } = require("../queries/teams");

const authorizedForTeam = asyncMiddleware(async (req, _, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    next();
  } else {
    const teams = await findMemberAndManagedTeamsForUser(req.user.id);
    const team = teams.find(_team => _team.id === parseInt(teamId, 10));

    if (team) {
      req.team = team;
      next();
    } else {
      throw boom.forbidden(`User does not have access to team ${teamId}`);
    }
  }
});

module.exports = authorizedForTeam;
