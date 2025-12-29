-- Create the Hero Section table
CREATE TABLE IF NOT EXISTS portfolio_hero (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    bio TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data if it doesn't exist
INSERT INTO portfolio_hero (name, tagline, bio, available)
SELECT 
    'ABDULLAHI MUSE ISSA', 
    'Full Stack Developer | Next.js | React | TypeScript. Building scalable digital solutions with a focus on performance and user experience.', 
    'I am a highly motivated and dedicated Full Stack Developer with a strong background in customer service, system management, and IT. Based in Mogadishu, Somalia, I specialize in the MEAN stack and modern frontend frameworks like Next.js.', 
    true
WHERE NOT EXISTS (SELECT 1 FROM portfolio_hero);

-- Verify the table exists
SELECT * FROM portfolio_hero;
