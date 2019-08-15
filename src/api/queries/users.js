const { executeQuery } = require('../utils/db');

function createUser(user) {
  return executeQuery(_db => _db.insert(user).into('user'));
}

module.exports = {
  createUser,
};
