const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Covid_Payment",
    password: "ngocvinh",
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};