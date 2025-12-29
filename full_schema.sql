-- Enable UUID extension if we want to use UUIDs, 
-- but we will stick to SERIAL to match the hero schema style unless specified otherwise.

-- 1. Messages Table
CREATE TABLE IF NOT EXISTS portfolio_messages (
    id SERIAL PRIMARY KEY,
    sender TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS portfolio_skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[], -- Stores array of strings
    link TEXT,
    github TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Experience Table
CREATE TABLE IF NOT EXISTS portfolio_experience (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT[], -- Stores array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Hero Table (included for completeness, uses existing schema)
CREATE TABLE IF NOT EXISTS portfolio_hero (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    bio TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Queries to verify data:
-- SELECT * FROM portfolio_messages;
-- SELECT * FROM portfolio_skills;
-- SELECT * FROM portfolio_projects;
-- SELECT * FROM portfolio_experience;
-- SELECT * FROM portfolio_hero;
