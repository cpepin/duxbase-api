const boom = require("boom");

const db = require("../db");

async function executeQuery(callback) {
  try {
    return await callback(db);
  } catch (e) {
    if (e.constraint && e.constraint.indexOf("unique") !== -1) {
      throw boom.conflict(e.detail);
    }
    throw boom.badImplementation(e.detail);
  }
}

module.exports = {
  executeQuery
};
