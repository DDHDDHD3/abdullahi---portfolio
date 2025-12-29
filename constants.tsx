
import React from 'react';
import { Layout, Server, Wrench, GraduationCap, Briefcase, Globe, MessageSquare, ShieldCheck } from 'lucide-react';
import { Skill, Experience, Project } from './types';

export const SKILLS: Skill[] = [
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

export const EXPERIENCES: Experience[] = [
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

export const PROJECTS: Project[] = [
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

export const EDUCATION = [
  {
    degree: 'MEAN Stack Web Development',
    school: 'Tabaarak ICT Solution, Mogadishu',
    year: 'August – September 2025'
  },
  {
    degree: 'Information Technology (IT)',
    school: 'City University of Mogadishu College',
    year: '2024 – 2025'
  },
  {
    degree: 'Secondary School Certificate',
    school: 'Mujamac Yaqshid Secondary School',
    year: '2019 – 2020'
  }
];

export const PERSONAL_INFO = {
  dob: '11 September 1999',
  birthplace: 'Galdogob',
  gender: 'Male',
  status: 'Single',
  nationality: 'Somali',
  languages: ['Somali (Native)', 'English (Professional)', 'Arabic (Intermediate)'],
  email: 'abdallaise877@gmail.com',
  phone: '+252 61 4163362',
  location: 'Mogadishu, Somalia'
};
