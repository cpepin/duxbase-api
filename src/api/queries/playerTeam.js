const { executeQuery } = require("../utils/db");

function createPlayerTeamRelationship(player_id, team_id) {
  return executeQuery(_db =>
    _db.insert({ player_id, team_id }, ["*"]).into("player_team")
  );
}

function deletePlayerTeamRelationship(player_id, team_id) {
  return executeQuery(_db =>
    _db("player_team")
      .where({ player_id: player_id, team_id: team_id })
      .del()
  );
}

module.exports = { createPlayerTeamRelationship, deletePlayerTeamRelationship };
