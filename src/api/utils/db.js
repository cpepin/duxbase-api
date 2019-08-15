const boom = require('boom');

const db = require('../db');

async function executeQuery(callback) {
  try {
    return await callback(db);
  } catch (e) {
    throw boom.badImplementation(e.message);
  }
}

module.exports = {
  executeQuery,
};
