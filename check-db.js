const { createClient } = require('@libsql/client');
const path = require('path');

async function test() {
  const dbPath = path.resolve(__dirname, 'si-ptsp.db');
  console.log(`Testing db at: ${dbPath}`);
  const client = createClient({ url: 'file:' + dbPath });

  try {
    const res = await client.execute("SELECT * FROM remissions LIMIT 1");
    console.log("Select success", res.rows);
  } catch (err) {
    console.error("Select error:", err);
  }
}

test().catch(console.error);
