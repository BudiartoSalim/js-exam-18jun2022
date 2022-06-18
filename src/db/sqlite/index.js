const db = require('./db_connection');
let conn = null;

module.exports = {
  getConnection: async () => {
    if (!conn) conn = await db();

    return conn;
  },
};
