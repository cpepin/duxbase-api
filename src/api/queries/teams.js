const { executeQuery } = require('../utils/db');

function findTeams(params) {
  return executeQuery(_db =>
    _db
      .select('team.*')
      .from('team')
      .where(params)
  );
}

module.exports = {
  findTeams,
};
