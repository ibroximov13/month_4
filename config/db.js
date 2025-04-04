const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "n17",
    host: "localhost",
    port: 5432,
});

module.exports = pool
