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

module.exports = {
  findPlayerByUserId,
  insertPlayerForUserId
};
