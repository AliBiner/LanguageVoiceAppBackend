import { Client } from "pg";

const client = new Client({
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

export default client;
