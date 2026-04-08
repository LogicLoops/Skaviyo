const mysql = require('mysql2/promise');
require('dotenv').config();

// Parse MySQL connection string
const url = new URL(process.env.DATABASE_URL);
const config = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: parseInt(url.port) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

module.exports = pool;
