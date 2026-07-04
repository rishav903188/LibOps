const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    console.log(`✅ PostgreSQL connected at: ${result.rows[0].now}`);
  } catch (err) {
    console.error(`❌ PostgreSQL connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };