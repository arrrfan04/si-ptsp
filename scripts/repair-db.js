const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

async function recover() {
    const dbPath = path.resolve(__dirname, "../si-ptsp.db");
    const recoveredPath = path.resolve(__dirname, "../si-ptsp-recovered.db");

    if (fs.existsSync(recoveredPath)) {
        fs.unlinkSync(recoveredPath);
    }

    const sourceClient = createClient({ url: `file:${dbPath}` });
    const destClient = createClient({ url: `file:${recoveredPath}` });

    try {
        console.log("Fetching table list from corrupted database...");
        // Use a safe query that might work even if indices are corrupt
        const tablesResult = await sourceClient.execute("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        const tables = tablesResult.rows;

        for (const table of tables) {
            console.log(`Recovering table: ${table.name}`);
            try {
                // Create table in destination
                await destClient.execute(table.sql);
                
                // Fetch data from source
                const dataResult = await sourceClient.execute(`SELECT * FROM ${table.name}`);
                const rows = dataResult.rows;

                if (rows.length > 0) {
                    const columns = Object.keys(rows[0]);
                    const placeholders = columns.map(() => "?").join(", ");
                    const insertSql = `INSERT INTO ${table.name} (${columns.join(", ")}) VALUES (${placeholders})`;

                    for (const row of rows) {
                        const values = columns.map(col => row[col]);
                        await destClient.execute({ sql: insertSql, args: values });
                    }
                    console.log(`   Successfully recovered ${rows.length} rows.`);
                }
            } catch (tableError) {
                console.error(`   Error recovering table ${table.name}:`, tableError.message);
            }
        }

        console.log("Checking for indices and triggers...");
        const extraResult = await sourceClient.execute("SELECT sql FROM sqlite_master WHERE type IN ('index', 'trigger', 'view') AND name NOT LIKE 'sqlite_%';");
        for (const extra of extraResult.rows) {
            if (extra.sql) {
                try {
                    await destClient.execute(extra.sql);
                } catch (e) {
                    console.error("   Error creating index/trigger/view:", e.message);
                }
            }
        }

        console.log("Recovery process finished.");
        console.log(`New database created at: ${recoveredPath}`);

    } catch (error) {
        console.error("Fatal error during recovery:", error.message);
    }
}

recover();
