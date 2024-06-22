const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const { Client } = pg;

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: true,
});
module.exports = { client };