const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Covid_Management",
  password: "331656",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
