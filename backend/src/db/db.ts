import knex from "knex";
import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    ssl: false
  }
};

const db = knex(knexConfig);

export default db;
