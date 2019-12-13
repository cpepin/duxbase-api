const knex = require("knex");

const { executeQuery } = require("../utils/db");

function findPlayerByUserId(userId) {
  return executeQuery(_db =>
    _db
      .select("player.*")
      .from("player")
      .where({ "player.user_id": userId })
      .first()
  );
}

function insertPlayerForUserId(userId) {
  return executeQuery(_db =>
    _db.insert({ user_id: userId }, ["*"]).into("player")
  );
}

function insertPlayer(player) {
  return executeQuery(_db => _db.insert(player, ["*"]).into("player"));
}

function findPlayersByTeamId(teamId) {
  return executeQuery(_db =>
    _db
      .select([
        _db.raw(`COALESCE(??, ??) AS "firstName"`, [
          "player.firstName",
          "user.firstName"
        ]),
        _db.raw(`COALESCE(??, ??) AS "lastName"`, [
          "player.lastName",
          "user.lastName"
        ]),
        _db.raw(`COALESCE(??, ??) AS "email"`, ["player.email", "user.email"]),
        "player.id"
      ])
      .from("player")
      .leftJoin("player_team", "player.id", "player_team.player_id")
      .leftOuterJoin("user", "player.user_id", "user.id")
      .where({ "player_team.team_id": teamId })
  );
}

module.exports = {
  findPlayerByUserId,
  insertPlayerForUserId,
  insertPlayer,
  findPlayersByTeamId
};
