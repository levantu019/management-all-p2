const { Pool, types } = require('pg');
require('dotenv').config();

// Implementing environment variables
const isProduction = process.env.NODE_ENV === 'production'; 

// connection string for development 
const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// cast numeric (OID 1700) as float (string is default in node-postgres)
types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});

// instantiate pool 
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : devConfig,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = pool;