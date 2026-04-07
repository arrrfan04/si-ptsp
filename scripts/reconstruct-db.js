const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

async function reconstruct() {
    const dbPath = path.resolve(__dirname, "../si-ptsp.db");
    
    console.log("Reconstructing database...");

    if (fs.existsSync(dbPath)) {
        console.log("Removing corrupted database...");
        fs.unlinkSync(dbPath);
    }

    const client = createClient({ url: `file:${dbPath}` });

    try {
        console.log("Creating tables...");

        // USERS table
        await client.execute(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // VISITORS table
        await client.execute(`
            CREATE TABLE visitors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                wbp_name TEXT,
                wbp_case TEXT,
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
                status TEXT DEFAULT 'pending',
                pdf_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // NEWS table
        await client.execute(`
            CREATE TABLE news (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // REMISSIONS table
        await client.execute(`
            CREATE TABLE remissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                wbp_name TEXT NOT NULL,
                case_type TEXT,
                remission_details TEXT,
                sentence_reduction TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // SETTINGS table
        await client.execute(`
            CREATE TABLE settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        `);

        console.log("Seeding default data...");

        // Seed default users
        const adminHash = bcrypt.hashSync("admin123", 10);
        await client.execute({
            sql: "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            args: ["admin", adminHash, "admin"]
        });

        // Seed default settings
        const defaultSettings = [
            ["app_name", "SI PTSP LPP TERNATE"],
            ["app_logo", ""],
            ["hero_title", "Selamat Datang di SI PTSP"],
            ["hero_subtitle", "Lembaga Pemasyarakatan Perempuan Kelas III Ternate"],
            ["footer_address", "Jl. SKB No. 1, Ternate"],
            ["footer_phone", "08123456789"],
            ["footer_email", "lppternate@gmail.com"]
        ];

        for (const [key, value] of defaultSettings) {
            await client.execute({
                sql: "INSERT INTO settings (key, value) VALUES (?, ?)",
                args: [key, value]
            });
        }

        console.log("Reconstruction completed successfully.");
    } catch (error) {
        console.error("Error during reconstruction:", error);
    }
}

reconstruct();
