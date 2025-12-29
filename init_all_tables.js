import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_iNH1qLBe5uav@ep-aged-sky-ah8fibwq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function init() {
    const sql = neon(DATABASE_URL);
    console.log('Initializing database tables...');
    try {
        // Projects Table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                tech TEXT[] NOT NULL,
                link TEXT,
                github TEXT,
                image TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Table portfolio_projects created or already exists.');

        // Skills Table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_skills (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                level INTEGER NOT NULL,
                category TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Table portfolio_skills created or already exists.');

        // Experience Table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_experience (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                role TEXT NOT NULL,
                company TEXT NOT NULL,
                period TEXT NOT NULL,
                description TEXT[] NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Table portfolio_experience created or already exists.');

    } catch (error) {
        console.error('Initialization error:', error);
    }
}

init();
