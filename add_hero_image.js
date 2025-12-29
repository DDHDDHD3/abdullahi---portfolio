import { neon } from '@neondatabase/serverless';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function getDatabaseUrl() {
    try {
        const envPath = join(__dirname, '.env.local');
        const envContent = await readFile(envPath, 'utf-8');
        const match = envContent.match(/VITE_DATABASE_URL=(.*)/);
        if (match && match[1]) {
            return match[1].trim();
        }
    } catch (error) {
        console.warn('Could not read .env.local, checking process.env...');
    }
    return process.env.VITE_DATABASE_URL || '';
}

async function addImageColumn() {
    const dbUrl = await getDatabaseUrl();
    if (!dbUrl) {
        console.error('Error: VITE_DATABASE_URL not found in .env.local or process.env');
        process.exit(1);
    }

    const sql = neon(dbUrl);

    try {
        console.log('Adding image column to portfolio_hero table...');
        await sql`
            ALTER TABLE portfolio_hero 
            ADD COLUMN IF NOT EXISTS image TEXT;
        `;
        console.log('Success: Image column added (if it did not exist).');
    } catch (error) {
        console.error('Error adding column:', error);
    }
}

addImageColumn();
