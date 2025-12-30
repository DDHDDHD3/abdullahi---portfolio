<div align="center">
  <img width="1200" height="475" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  # Abdullahi Muse Issa - Portfolio
  
  <p>
    <strong>A modern, dynamic portfolio website with an integrated admin dashboard and AI-powered chat assistant.</strong>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Neon-Database-00E599?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon DB" />
    <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  </p>
</div>

---

## ✨ Features

### 🌐 Public Portfolio
- **Hero Section** - Dynamic, customizable introduction with availability status
- **About Section** - Professional bio with personal details and language skills
- **Skills Showcase** - Interactive skill bars organized by category (Frontend, Backend, Tools)
- **Experience Timeline** - Visual timeline of professional experiences
- **Projects Gallery** - Featured work with live demos and source code links
- **Contact Form** - Database-connected form for visitor inquiries
- **AI Chat Assistant** - Gemini-powered assistant to answer visitor questions

### 🔐 Admin Dashboard
- **Portfolio Manager** - Full CRUD operations for all portfolio content
- **Home Content Editor** - Edit hero section (name, tagline, bio, availability, image)
- **Skills Manager** - Add, edit, and delete skills with proficiency levels
- **Projects Manager** - Manage project showcases with tech stacks
- **Experience Manager** - Update professional experience entries
- **Inbox** - View and manage contact form submissions
- **Session Management** - Auto-logout after 15 minutes of inactivity

### 🎨 Design Features
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Glassmorphism UI** - Modern glass-effect styling
- **Framer Motion Animations** - Smooth scroll and interaction animations
- **Three.js Background** - Interactive 3D particle scene

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | CSS3, Glassmorphism, Responsive Design |
| **Animations** | Framer Motion, Three.js, React Three Fiber |
| **Database** | Neon (Serverless PostgreSQL) |
| **AI Integration** | Google Gemini API |
| **Icons** | Lucide React |
| **PDF Generation** | jsPDF (for CV download) |

---

## 📁 Project Structure

```
abdullahi---portfolio/
├── components/
│   ├── AdminDashboard.tsx   # Admin panel for content management
│   ├── ChatAssistant.tsx    # AI-powered chat widget
│   ├── Login.tsx            # Admin authentication
│   ├── Navbar.tsx           # Navigation with theme toggle
│   └── ThreeScene.tsx       # 3D particle background
├── services/
│   ├── databaseService.ts   # Neon database operations
│   └── geminiService.ts     # Google Gemini AI integration
├── App.tsx                  # Main application component
├── constants.tsx            # Static personal information
├── types.ts                 # TypeScript interfaces
├── index.tsx                # Application entry point
├── index.html               # HTML template
├── index.css                # Global styles
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Neon Database Account** ([neon.tech](https://neon.tech))
- **Google Gemini API Key** ([ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/abdullahi---portfolio.git
   cd abdullahi---portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create or edit `.env.local` with your credentials:
   ```env
   VITE_DATABASE_URL=postgresql://username:password@host/database?sslmode=require
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Set up the database**
   
   Run the SQL schema in your Neon database console:
   ```bash
   # Use the provided schema file
   # Copy contents of full_schema.sql to Neon SQL Editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📦 Database Schema

The portfolio uses the following database tables:

| Table | Purpose |
|-------|---------|
| `portfolio_hero` | Hero section content (name, tagline, bio, availability, image) |
| `portfolio_skills` | Technical skills with proficiency levels |
| `portfolio_projects` | Project showcases |
| `portfolio_experience` | Professional experience entries |
| `portfolio_messages` | Contact form submissions |

### Quick Schema Setup

```sql
-- Hero Section
CREATE TABLE portfolio_hero (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    bio TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE portfolio_skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE portfolio_projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    tech TEXT[],
    link TEXT,
    github TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience
CREATE TABLE portfolio_experience (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE portfolio_messages (
    id SERIAL PRIMARY KEY,
    sender TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Admin Access

To access the admin dashboard:

1. Click the **lock icon** in the navigation bar
2. Enter the admin password
3. Manage your portfolio content through the dashboard

> **Note:** Change the default password in `App.tsx` for production use.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🌐 Deployment

This project can be deployed to any static hosting platform:

- **Vercel** - Recommended for Vite projects
- **Netlify** - Easy deployment with environment variables
- **GitHub Pages** - Free hosting option

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `VITE_DATABASE_URL`
- `VITE_GEMINI_API_KEY`

---

## 📞 Contact

**Abdullahi Muse Issa**
- 📧 Email: abdallaise877@gmail.com
- 📱 Phone: +252 61 4163362
- 📍 Location: Mogadishu, Banaadir, Somalia

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p><strong>Built with ❤️ using React, TypeScript, and modern web technologies</strong></p>
</div>
