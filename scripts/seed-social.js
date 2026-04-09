const { createClient } = require('@libsql/client');
const path = require('path');

const dbPath = path.resolve(__dirname, '../si-ptsp.db');

async function seed() {
  const url = 'file:' + dbPath;
  const client = createClient({ url });

  const links = [
    { key: 'social_tiktok', value: 'https://www.tiktok.com/@lpp.ternate?_r=1&_t=ZS-95OQfzj3aH2' },
    { key: 'social_x', value: 'https://x.com/TernateLpp' },
    { key: 'social_facebook', value: 'https://www.facebook.com/share/1HV2ewLp2S/' },
    { key: 'social_instagram', value: 'https://www.instagram.com/lpp.ternate_?igsh=Z21jcXJja3dhbWc5' }
  ];

  for (const link of links) {
    await client.execute({
      sql: 'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      args: [link.key, link.value]
    });
    console.log(`Seeded ${link.key}`);
  }
}

seed().catch(console.error);
