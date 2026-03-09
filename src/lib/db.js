import { createClient } from '@libsql/client';
import path from 'path';

let client = null;

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    // In Production (Vercel), we MUST have a database URL.
    // If not set, don't fall back to local file silently because it will fail.
    if (!url && (process.env.NODE_ENV === 'production' || process.env.VERCEL)) {
      throw new Error('TURSO_DATABASE_URL is not defined. Please set it in Vercel Environment Variables.');
    }

    const finalUrl = url || ('file:' + path.join(process.cwd(), 'si-ptsp.db'));

    client = createClient({
      url: finalUrl,
      authToken,
    });
  }
  return client;
}
