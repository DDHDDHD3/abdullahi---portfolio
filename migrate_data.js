import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_iNH1qLBe5uav@ep-aged-sky-ah8fibwq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const SKILLS = [
    { name: 'Customer Support & Remittance', level: 95, category: 'tools' },
    { name: 'System Management & IT Support', level: 90, category: 'backend' },
    { name: 'MEAN Stack Development', level: 85, category: 'frontend' },
    { name: 'Git & GitHub', level: 90, category: 'tools' },
    { name: 'Vercel Deployment', level: 85, category: 'tools' },
    { name: 'Data Management', level: 90, category: 'backend' },
    { name: 'Next.js & React', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend' },
    { name: 'TypeScript', level: 75, category: 'frontend' },
];

const EXPERIENCES = [
    {
        role: 'Sales Assistant (Student Fee Collection & Customer Support)',
        company: 'Qabas Alhoda – Mogadishu',
        period: 'January 2025 – June 2025',
        description: [
            'Collected payments from students and maintained accurate financial records.',
            'Developed and managed an online system for students to track subjects and scores.',
            'Handled backend operations, ensuring secure and accurate data management.',
            'Provided guidance and support to users navigating the system.',
            'Generated timely reports and ensured platform reliability.'
        ]
    },
    {
        role: 'Multimedia & System Management Assistant (Freelance)',
        company: 'Qabas Alhoda – Mogadishu',
        period: 'January 2025 – June 2025',
        description: [
            'Designed digital promotional materials using multimedia tools.',
            'Managed databases for registration and data tracking.',
            'Supported IT systems, including user accounts, digital filing, and reporting.',
            'Implemented system improvements to streamline operations.'
        ]
    }
];

const PROJECTS = [
    {
        title: 'Qabas Alhoda Management System',
        description: 'A comprehensive academic portal developed for Qabas Alhoda to streamline student performance tracking, subject management, and real-time score reporting.',
        tech: ['MEAN Stack', 'Node.js', 'Data Management', 'IT Support'],
        link: '#',
        github: '#',
        image: '/system_management.png'
    },
    {
        title: 'Financial Tracking & Reporting',
        description: 'A dedicated financial management tool for precise collection and recording of student fees, ensuring accurate accounting and transparent reporting.',
        tech: ['React', 'TypeScript', 'Secure Data', 'Reporting'],
        link: '#',
        github: '#',
        image: '/full_stack.png'
    },
    {
        title: 'Dhabhabod Control Center',
        description: 'An advanced administrative dashboard for secure data archiving, record verification, and multi-tier audit trail management for educational institutions.',
        tech: ['Next.js', 'PostgreSQL', 'Auth', 'Tailwind CSS'],
        link: '#',
        github: '#',
        image: '/dhabhabod_control.png'
    },
    {
        title: 'Multimedia Design Solutions',
        description: 'A collection of digital promotional materials and system-integrated visuals designed to enhance organizational brand presence and user engagement.',
        tech: ['Adobe Suite', 'Brand Identity', 'UI/UX Visuals'],
        link: '#',
        github: '#',
        image: '/devops.png'
    }
];

async function migrate() {
    const sql = neon(DATABASE_URL);
    console.log('Migrating initial data...');
    try {
        // Skills
        for (const skill of SKILLS) {
            await sql`INSERT INTO portfolio_skills (name, level, category) VALUES (${skill.name}, ${skill.level}, ${skill.category})`;
        }
        console.log('Migrated Skills.');

        // Experience
        for (const exp of EXPERIENCES) {
            await sql`INSERT INTO portfolio_experience (role, company, period, description) VALUES (${exp.role}, ${exp.company}, ${exp.period}, ${exp.description})`;
        }
        console.log('Migrated Experiences.');

        // Projects
        for (const project of PROJECTS) {
            await sql`INSERT INTO portfolio_projects (title, description, tech, link, github, image) VALUES (${project.title}, ${project.description}, ${project.tech}, ${project.link}, ${project.github}, ${project.image})`;
        }
        console.log('Migrated Projects.');

    } catch (error) {
        console.error('Migration error:', error);
    }
}

migrate();
