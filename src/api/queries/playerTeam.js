const { executeQuery } = require("../utils/db");

function createPlayerTeamRelationship(player_id, team_id) {
  return executeQuery(_db =>
    _db.insert({ player_id, team_id }, ["*"]).into("player_team")
  );
}

module.exports = { createPlayerTeamRelationship };
