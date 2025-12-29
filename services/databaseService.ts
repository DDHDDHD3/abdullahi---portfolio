import { neon } from '@neondatabase/serverless';
import { PortfolioMessage, Skill, Experience, Project, HeroData } from '../types';

const sql = neon(import.meta.env.VITE_DATABASE_URL || '');

export const databaseService = {
    // Inbox Management
    async getMessages(): Promise<PortfolioMessage[]> {
        try {
            const result = await sql`SELECT * FROM portfolio_messages ORDER BY created_at DESC`;
            return result as any;
        } catch (error) {
            console.error('Fetch Messages Error:', error);
            return [];
        }
    },

    async saveMessage(sender: string, email: string, message: string) {
        try {
            await sql`
        INSERT INTO portfolio_messages (sender, email, message) 
        VALUES (${sender}, ${email}, ${message})
      `;
            return true;
        } catch (error) {
            console.error('Save Message Error:', error);
            return false;
        }
    },

    async deleteMessage(id: string) {
        try {
            await sql`DELETE FROM portfolio_messages WHERE id = ${id}`;
            return true;
        } catch (error) {
            return false;
        }
    },

    async markMessageAsRead(id: string) {
        try {
            await sql`UPDATE portfolio_messages SET is_read = true WHERE id = ${id}`;
            return true;
        } catch (error) {
            console.error('Mark Message Read Error:', error);
            return false;
        }
    },

    // Skills Management
    async getSkills(): Promise<Skill[]> {
        try {
            const result = await sql`SELECT * FROM portfolio_skills ORDER BY created_at ASC`;
            return result as any;
        } catch (error) {
            console.error('Fetch Skills Error:', error);
            return [];
        }
    },

    async saveSkill(skill: Skill) {
        try {
            if (skill.id) {
                await sql`
                    UPDATE portfolio_skills 
                    SET name = ${skill.name}, level = ${skill.level}, category = ${skill.category}
                    WHERE id = ${skill.id}
                `;
            } else {
                await sql`
                    INSERT INTO portfolio_skills (name, level, category)
                    VALUES (${skill.name}, ${skill.level}, ${skill.category})
                `;
            }
            return true;
        } catch (error) {
            console.error('Save Skill Error:', error);
            return false;
        }
    },

    async deleteSkill(id: string) {
        try {
            await sql`DELETE FROM portfolio_skills WHERE id = ${id}`;
            return true;
        } catch (error) {
            return false;
        }
    },

    // Projects Management
    async getProjects(): Promise<Project[]> {
        try {
            const result = await sql`SELECT * FROM portfolio_projects ORDER BY created_at DESC`;
            return result as any;
        } catch (error) {
            console.error('Fetch Projects Error:', error);
            return [];
        }
    },

    async saveProject(project: Project) {
        try {
            if (project.id) {
                await sql`
                    UPDATE portfolio_projects 
                    SET title = ${project.title}, description = ${project.description}, 
                        tech = ${project.tech}, link = ${project.link}, 
                        github = ${project.github}, image = ${project.image}
                    WHERE id = ${project.id}
                `;
            } else {
                await sql`
                    INSERT INTO portfolio_projects (title, description, tech, link, github, image)
                    VALUES (${project.title}, ${project.description}, ${project.tech}, ${project.link}, ${project.github}, ${project.image})
                `;
            }
            return true;
        } catch (error) {
            console.error('Save Project Error:', error);
            return false;
        }
    },

    async deleteProject(id: string) {
        try {
            await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;
            return true;
        } catch (error) {
            return false;
        }
    },

    // Experience Management
    async getExperiences(): Promise<Experience[]> {
        try {
            const result = await sql`SELECT * FROM portfolio_experience ORDER BY created_at DESC`;
            return result as any;
        } catch (error) {
            console.error('Fetch Experience Error:', error);
            return [];
        }
    },

    async saveExperience(exp: Experience) {
        try {
            if (exp.id) {
                await sql`
                    UPDATE portfolio_experience 
                    SET role = ${exp.role}, company = ${exp.company}, 
                        period = ${exp.period}, description = ${exp.description}
                    WHERE id = ${exp.id}
                `;
            } else {
                await sql`
                    INSERT INTO portfolio_experience (role, company, period, description)
                    VALUES (${exp.role}, ${exp.company}, ${exp.period}, ${exp.description})
                `;
            }
            return true;
        } catch (error) {
            console.error('Save Experience Error:', error);
            return false;
        }
    },

    async deleteExperience(id: string) {
        try {
            await sql`DELETE FROM portfolio_experience WHERE id = ${id}`;
            return true;
        } catch (error) {
            return false;
        }
    },

    // Stats for Portfolio
    async getStats() {
        try {
            const msgCount = await sql`SELECT COUNT(*) as total FROM portfolio_messages`;
            const projectCount = await sql`SELECT COUNT(*) as total FROM portfolio_projects`;
            const skillCount = await sql`SELECT COUNT(*) as total FROM portfolio_skills`;
            const expCount = await sql`SELECT COUNT(*) as total FROM portfolio_experience`;

            return {
                messagesReceived: msgCount[0].total,
                projectsCount: projectCount[0].total,
                skillsCount: skillCount[0].total,
                experiencesCount: expCount[0].total,
                lastSync: new Date().toLocaleTimeString()
            };
        } catch (error) {
            return {
                messagesReceived: 0,
                projectsCount: 0,
                skillsCount: 0,
                experiencesCount: 0,
                lastSync: 'N/A'
            };
        }
    },

    // Hero Section Management
    async getHero(): Promise<HeroData> {
        try {
            const result = await sql`SELECT * FROM portfolio_hero LIMIT 1`;
            if (result && result.length > 0) {
                return result[0] as HeroData;
            }
            return {
                name: 'ABDULLAHI MUSE ISSA',
                tagline: 'Full Stack Developer | Next.js | React | TypeScript. Building scalable digital solutions with a focus on performance and user experience.',
                bio: 'I am a highly motivated and dedicated Full Stack Developer with a strong background in customer service, system management, and IT. Based in Mogadishu, Somalia, I specialize in the MEAN stack and modern frontend frameworks like Next.js.',
                available: true,
                image: '/profile.png'
            };
        } catch (error) {
            console.error('Fetch Hero Error (using defaults):', error);
            // Return defaults if table doesn't exist
            return {
                name: 'ABDULLAHI MUSE ISSA',
                tagline: 'Full Stack Developer | Next.js | React | TypeScript. Building scalable digital solutions with a focus on performance and user experience.',
                bio: 'I am a highly motivated and dedicated Full Stack Developer with a strong background in customer service, system management, and IT. Based in Mogadishu, Somalia, I specialize in the MEAN stack and modern frontend frameworks like Next.js.',
                available: true,
                image: '/profile.png'
            };
        }
    },

    async saveHero(data: HeroData) {
        try {
            const saveOperation = async () => {
                const existing = await sql`SELECT id FROM portfolio_hero LIMIT 1`;
                if (existing && existing.length > 0) {
                    await sql`
                        UPDATE portfolio_hero 
                        SET name = ${data.name}, tagline = ${data.tagline}, bio = ${data.bio}, available = ${data.available}, image = ${data.image}
                        WHERE id = ${existing[0].id}
                    `;
                } else {
                    await sql`
                        INSERT INTO portfolio_hero (name, tagline, bio, available, image)
                        VALUES (${data.name}, ${data.tagline}, ${data.bio}, ${data.available}, ${data.image})
                    `;
                }
            };

            try {
                await saveOperation();
            } catch (error: any) {
                // If table doesn't exist (Postgres error 42P01), create it and retry
                if (error.code === '42P01' || error.message?.includes('does not exist')) {
                    console.log('Table missing, creating portfolio_hero...');
                    await sql`
                        CREATE TABLE IF NOT EXISTS portfolio_hero (
                            id SERIAL PRIMARY KEY,
                            name TEXT NOT NULL,
                            tagline TEXT NOT NULL,
                            bio TEXT NOT NULL,
                            available BOOLEAN DEFAULT true,
                            image TEXT,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        )
                    `;
                    await saveOperation();
                } else {
                    throw error;
                }
            }
            return true;
        } catch (error) {
            console.error('Save Hero Error:', error);
            return false;
        }
    }
};
