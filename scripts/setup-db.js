const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../si-ptsp.db');

async function setup() {
  console.log('Initializing database...');
  
  const client = createClient({
    url: 'file:' + dbPath,
  });

  // Create tables using executeMultiple for batched statements
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wbp_name TEXT,
      wbp_case TEXT,
      status TEXT DEFAULT 'pending', 
      visitor_name TEXT,
      visitor_nik TEXT,
      visitor_purpose TEXT,
      visitor_email TEXT,
      visitor_address TEXT,
      visitor_date TEXT,
      visitor_wa TEXT,
      visitor_ktp_url TEXT,
      follower_name TEXT,
      follower_nik TEXT,
      follower_purpose TEXT,
      follower_email TEXT,
      follower_address TEXT,
      follower_date TEXT,
      follower_wa TEXT,
      follower_ktp_url TEXT,
      pdf_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS remissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wbp_name TEXT NOT NULL,
      case_type TEXT,
      remission_details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Seed default users
  const salt = bcrypt.genSaltSync(10);

  const defaultUsers = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'humas', password: 'humas', role: 'humas' },
    { username: 'AO', password: 'AO', role: 'ao' }
  ];

  for (const user of defaultUsers) {
    const hash = bcrypt.hashSync(user.password, salt);
    await client.execute({
      sql: 'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
      args: [user.username, hash, user.role]
    });
  }
  console.log('Default users seeded (admin, humas, AO).');

  // Seed default settings
  const defaultSettings = [
    { key: 'marquee_text', value: 'Selamat Datang! Hari dan Jam Pelayanan: Senin - Jumat, 08:00 - 15:00 WIT.' },
    { key: 'link_blanko_pembebasan', value: '#' },
    { key: 'link_blanko_cuti_bebas', value: '#' },
    { key: 'link_blanko_cuti_bersyarat', value: '#' },
    { key: 'link_blanko_cuti_keluarga', value: '#' },
    { key: 'link_bantuan_hukum', value: '#' },
    { key: 'link_izin_luar_biasa', value: '#' },
    { key: 'link_pemindahan', value: '#' },
    { key: 'link_esurvey_1', value: '#' },
    { key: 'link_esurvey_2', value: '#' },
    { key: 'link_esurvey_3', value: '#' },
    { key: 'link_pengaduan_gratifikasi', value: 'https://www.lapor.go.id/' },
    { key: 'link_pengaduan_calo', value: 'https://www.kpk.go.id/id/layanan/pengaduan-dugaan-tindak-pidana-korupsi' },
    { key: 'link_pengaduan_pungli', value: 'https://ombudsman.go.id/pengaduan?lang=en/' }
  ];

  for (const setting of defaultSettings) {
    await client.execute({
      sql: 'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
      args: [setting.key, setting.value]
    });
  }
  console.log('Default settings seeded.');

  // ensure uploads directory exists
  const uploadsDir = path.resolve(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  console.log('Database initialization complete.');
}

setup().catch(console.error);
