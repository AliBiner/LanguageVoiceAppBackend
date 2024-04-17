import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  host: process.env.POSTGRESQL_HOSTNAME,
  port: Number(process.env.POSTGRESQL_PORT),
  database: process.env.POSTGRESQL_DATABASE,
});

export async function connect() {
  try {
    await client.connect();
    console.log("Connected Postgresql Database");
  } catch (error) {
    console.log("Error Postgresql: ", error);
  }
}

export default client;
