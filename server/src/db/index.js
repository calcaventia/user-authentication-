const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_auth",
  password: "password",
  port: "port",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
