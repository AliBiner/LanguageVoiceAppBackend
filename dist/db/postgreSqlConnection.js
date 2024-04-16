"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    host: process.env.POSTGRESQL_HOSTNAME,
    port: Number(process.env.POSTGRESQL_PORT),
    database: process.env.POSTGRESQL_DATABASE,
});
client
    .connect()
    .then(() => {
    console.log("Connected to PostgreSQL database");
})
    .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
});
exports.default = client;
//# sourceMappingURL=postgreSqlConnection.js.map