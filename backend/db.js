const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const { SERVER_PORT } = process.env;

console.log(SERVER_PORT);

module.exports = pool;
