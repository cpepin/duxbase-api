const knex = require("knex");

const { DB_URL } = process.env;

module.exports = knex({
  client: "pg",
  connection: DB_URL
});
