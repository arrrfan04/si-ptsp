const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

async function verify() {
    const dbPath = path.resolve(__dirname, "../si-ptsp.db");
    console.log(`Verifying database at: ${dbPath}`);

    const client = createClient({ url: `file:${dbPath}` });

    try {
        console.log("Checking integrity...");
        const integrity = await client.execute("PRAGMA integrity_check;");
        console.log("Integrity Status:", integrity.rows[0].integrity_check);

        console.log("Checking tables...");
        const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("Tables found:", tables.rows.map(r => r.name).join(", "));

        console.log("Checking seeded admin user...");
        const users = await client.execute("SELECT username, role FROM users;");
        console.log("Users found:", JSON.stringify(users.rows));

        console.log("Verification successful.");
    } catch (error) {
        console.error("Verification failed:", error.message);
    }
}

verify();
