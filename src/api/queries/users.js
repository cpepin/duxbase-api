const { executeQuery } = require('../utils/db');

function createUser(user) {
  return executeQuery(_db => _db.insert(user).into('user'));
}

function findUserByEmail(email) {
  return executeQuery(_db =>
    _db
      .select('user.*')
      .from('user')
      .where({ 'user.email': email })
      .first()
  );
}

module.exports = {
  createUser,
  findUserByEmail,
};
