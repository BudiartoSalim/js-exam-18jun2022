const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
const buildSchemas = require('./schemas');
const {open} = require('sqlite');

module.exports = async () => {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });
  buildSchemas(db);
  return db;
};
