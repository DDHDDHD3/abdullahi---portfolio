import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_iNH1qLBe5uav@ep-aged-sky-ah8fibwq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function updateSchema() {
    const sql = neon(DATABASE_URL);
    console.log('Updating portfolio_messages schema...');
    try {
        // Check if table exists
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_messages (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                sender TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                is_read BOOLEAN DEFAULT FALSE
            );
        `;

        // Add column if it doesn't exist (idempotent via ALTER TABLE IF NOT EXISTS or catching error)
        try {
            await sql`ALTER TABLE portfolio_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE`;
            console.log('Added is_read column if it was missing.');
        } catch (e) {
            console.log('Column add/check info:', e.message);
        }

        console.log('Schema update complete.');
    } catch (error) {
        console.error('Schema update error:', error);
    }
}

updateSchema();
