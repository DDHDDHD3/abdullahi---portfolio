
export interface PortfolioMessage {
  id: string;
  sender: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
export interface HeroData {
  id?: string;
  name: string;
  tagline: string;
  bio: string;
  available: boolean;
  image?: string;
}
