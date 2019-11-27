const { executeQuery } = require("../utils/db");

function findMemberAndManagedTeamsForUser(userId) {
  return executeQuery(_db =>
    _db
      .select("team.*")
      .from("team")
      .where({ ["manager_id"]: userId })
      .union([
        _db
          .select("team.*")
          .from("team")
          .leftJoin("player_team", "team.id", "player_team.team_id")
          .where({ ["player_id"]: userId })
      ])
  );
}

function createTeam(team) {
  return executeQuery(_db => _db.insert(team, ["*"]).into("team"));
}

module.exports = {
  createTeam,
  findMemberAndManagedTeamsForUser
};
