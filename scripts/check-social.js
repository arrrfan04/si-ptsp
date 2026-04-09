const { createClient } = require('@libsql/client');
const path = require('path');

const dbPath = path.resolve(__dirname, '../si-ptsp.db');

async function check() {
  const url = 'file:' + dbPath;
  const client = createClient({ url });

  const result = await client.execute("SELECT * FROM settings WHERE key LIKE 'social_%'");
  console.log(JSON.stringify(result.rows, null, 2));
}

check().catch(console.error);
