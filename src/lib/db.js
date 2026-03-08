import { createClient } from '@libsql/client';
import path from 'path';

let client = null;

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL || ('file:' + path.join(process.cwd(), 'si-ptsp.db'));
    const authToken = process.env.TURSO_AUTH_TOKEN;

    client = createClient({
      url: url,
      authToken: authToken
    });
  }
  return client;
}
