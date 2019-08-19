const { executeQuery } = require('../utils/db');

function findTeams(params) {
  return executeQuery(_db =>
    _db
      .select('team.*')
      .from('team')
      .where(params)
  );
}

function createTeam(team) {
  return executeQuery(_db => 
    _db
      .insert(team, ['*'])
      .into('team')
  );
}

module.exports = {
  findTeams,
  createTeam,
};
