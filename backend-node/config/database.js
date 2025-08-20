require('dotenv').config();
const { Pool } = require('pg');

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10, // optional: maximum number of clients in the pool
  idleTimeoutMillis: 30000 // optional: close idle clients after 30 seconds
});