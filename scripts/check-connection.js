const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error('Error: TURSO_DATABASE_URL is not set in .env.local');
    return;
  }

  console.log(`Checking connection to: ${url}`);
  
  try {
    const client = createClient({ url, authToken });
    const result = await client.execute('SELECT 1 + 1 as test');
    console.log('✅ Connection successful!');
    
    const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tables in database:', tables.rows.map(r => r.name).join(', ') || '(No tables found)');
    
    if (!tables.rows.find(r => r.name === 'users')) {
      console.warn('⚠️ Warning: table "users" not found. Need to run setup-db.js');
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

check();
