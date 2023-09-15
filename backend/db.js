const POOL = require("pg").Pool;

const pool = new POOL({
  user: "postgres",
  password: "osedebajay",
  host: "localhost",
  port: 5432,
  database: "project_manager",
});

module.exports = pool;
