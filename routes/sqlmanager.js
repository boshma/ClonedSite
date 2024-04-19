var pg = require('pg');
const { Pool } = pg;

// Pool for accessing the database
const pool = new Pool({
  user: "shpbzsoi",
  database: "shpbzsoi",
  password: "wB0kROcAF134esw1aPsWsqWhTlYbDacm",
  port: 5432,
  host: "bubble.db.elephantsql.com",
});

module.exports = {
  executeQuery: async function (query) {
    try {
      // Run query on the SQL database
      const res = await pool.query(query);
      // Return Result
      return res;
    }
    catch (error) {
      console.log(error.toString());
    }
  }
};