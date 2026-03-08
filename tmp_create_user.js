const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'siptsp.db');
const db = new Database(dbPath);

const username = 'pelayanan';
const password = 'pelayanan123';
const role = 'pelayanan';

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

try {
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  stmt.run(username, hash, role);
  console.log(`Successfully created user: ${username} with role: ${role}`);
} catch (error) {
  if (error.message.includes('UNIQUE constraint failed')) {
    console.log(`User ${username} already exists. Updating password and role...`);
    const updateStmt = db.prepare('UPDATE users SET password = ?, role = ? WHERE username = ?');
    updateStmt.run(hash, role, username);
    console.log(`Successfully updated existing user: ${username}`);
  } else {
    console.error('Error creating user:', error);
  }
}
