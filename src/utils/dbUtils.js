const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { cwd } = process;

const connect = () => mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  multipleStatements: true,
});

const runSql = (file) => async () => {
  const db = connect();
  const sql = fs.readFileSync(file, 'utf8');
  await db.query(sql);
  await db.end();
};

const populateDb = runSql(path.resolve(cwd(), 'populateDb.sql'));

module.exports = {
  connect,
  populateDb,
};