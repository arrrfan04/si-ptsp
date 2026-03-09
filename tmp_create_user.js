const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const path = require('path');

async function main() {
  const dbPath = path.join(process.cwd(), 'si-ptsp.db');
  
  const client = createClient({
    url: 'file:' + dbPath,
  });

  const username = 'pelayanan';
  const password = 'pelayanan123';
  const role = 'pelayanan';

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    await client.execute({
      sql: 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      args: [username, hash, role]
    });
    console.log(`Successfully created user: ${username} with role: ${role}`);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      console.log(`User ${username} already exists. Updating password and role...`);
      await client.execute({
        sql: 'UPDATE users SET password = ?, role = ? WHERE username = ?',
        args: [hash, role, username]
      });
      console.log(`Successfully updated existing user: ${username}`);
    } else {
      console.error('Error creating user:', error);
    }
  }
}

main().catch(console.error);
