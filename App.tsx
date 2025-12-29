
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Info,
  Languages,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Server,
  Wrench
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ThreeScene } from './components/ThreeScene';
import { ChatAssistant } from './components/ChatAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { PERSONAL_INFO, EDUCATION } from './constants';
import { Project, Skill, Experience } from './types';
import { databaseService } from './services/databaseService';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      const [projs, skls, exps] = await Promise.all([
        databaseService.getProjects(),
        databaseService.getSkills(),
        databaseService.getExperiences()
      ]);
      setProjects(projs as Project[]);
      setSkills(skls as Skill[]);
      setExperiences(exps as Experience[]);
      const hero = await databaseService.getHero();
      setHeroData(hero);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Fetch dynamic data
  useEffect(() => {
    fetchPortfolioData();
  }, []);
  const [currentView, setCurrentView] = useState<'portfolio' | 'login' | 'admin'>('portfolio');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Session Timeout
  // Session Timeout with Activity Tracking
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
    let checkIntervalId: NodeJS.Timeout;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    if (isAdmin) {
      // Initialize activity time
      lastActivityRef.current = Date.now();

      // Setup listeners
      window.addEventListener('mousemove', updateActivity);
      window.addEventListener('keydown', updateActivity);
      window.addEventListener('click', updateActivity);
      window.addEventListener('scroll', updateActivity);

      // Check periodlically if session should expire
      checkIntervalId = setInterval(() => {
        if (Date.now() - lastActivityRef.current > TIMEOUT_MS) {
          setIsAdmin(false);
          setCurrentView('portfolio');
          alert('Session expired due to inactivity. Please log in again.');
        }
      }, 10000); // Check every 10 seconds for better precision
    }

    return () => {
      if (checkIntervalId) clearInterval(checkIntervalId);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, [isAdmin]);

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF();
      let y = 20;

      // --- COVER LETTER ---
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');

      // Date & Location
      doc.text('Date: December 24, 2025', 140, y);
      doc.text('Location: Mogadishu, Banaadir, Somalia', 20, y);
      y += 15;

      // Subject
      doc.setFont('helvetica', 'bold');
      doc.text('SUBJECT: APPLICATION FOR CUSTOMER CARE OFFICER POSITION', 20, y);
      y += 10;

      // Salutation
      doc.setFont('helvetica', 'normal');
      doc.text('Dear Hiring Manager,', 20, y);
      y += 10;

      // Body
      const body = `I am writing to express my interest in the Customer Care Officer position at Tawakal Express in Garoowe, Puntland, Somalia. With a strong background in customer service, system management, and IT, I am confident in my ability to provide high-quality support to both customers and agents.

Previously, I worked with Qabas Alhoda as a Sales Assistant and System Management Assistant. In this role, I collected payments from students and developed an online system that allowed students to track their subjects and scores securely. I handled backend operations, ensured accurate data management, and provided guidance to users navigating the system. This experience strengthened my problem-solving skills, attention to detail, and ability to assist clients efficiently.

I also hold an IT certificate from the City University of Mogadishu and have completed a MEAN Stack course with Tabaarak ICT Solution. I am proficient in Full Stack development, Git, GitHub, and Vercel, which enable me to manage systems, resolve technical issues, and support smooth operations effectively.

I am highly motivated to contribute to Tawakal Express by delivering exceptional customer service, monitoring transactions, and ensuring compliance with company policies. I am confident that my combination of technical skills, customer-focused mindset, and practical experience make me a strong candidate for this role.

Thank you for considering my application. I would welcome the opportunity to discuss how my skills and experience can contribute to the continued success of Tawakal Express.`;

      const splitBody = doc.splitTextToSize(body, 170);
      doc.text(splitBody, 20, y);
      y += (splitBody.length * 5) + 15;

      // Sign-off
      doc.text('Sincerely,', 20, y);
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Abdullahi Muse Issa', 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text('Phone: +252 61 4163362', 20, y);
      y += 6;
      doc.text('Email: abdallaise877@gmail.com', 20, y);

      // --- CV PAGE ---
      doc.addPage();
      y = 20;

      // Header
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('CURRICULUM VITAE', 105, y, { align: 'center' });
      y += 10;
      doc.setFontSize(12);
      doc.text('Abdullahi Muse Issa', 105, y, { align: 'center' });
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Phone: +252 61 4163362 | Email: abdallaise877@gmail.com', 105, y, { align: 'center' });
      y += 5;
      doc.text('Address: Mogadishu, Banaadir, Somalia', 105, y, { align: 'center' });
      y += 15;

      // Helper function for section headers
      const addSectionHeader = (title: string) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(230, 230, 230); // Light gray
        doc.rect(20, y - 5, 170, 7, 'F');
        doc.text(title, 22, y);
        y += 10;
      };

      // OBJECTIVE
      addSectionHeader('OBJECTIVE');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const objective = "A highly motivated and dedicated individual seeking the position of Customer Care Officer at Tawakal Express. I aim to leverage my skills in customer service, data management, IT systems, and full-stack development to ensure high-quality customer support and smooth operational processes, while contributing to the growth and efficiency of the organization.";
      const objLines = doc.splitTextToSize(objective, 170);
      doc.text(objLines, 20, y);
      y += (objLines.length * 5) + 10;

      // SKILLS
      addSectionHeader('SKILLS');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const skills = [
        'Proficient in customer support and money remittance operations',
        'Strong system management skills: data entry, record management, IT support',
        'Full Stack development (MEAN Stack)',
        'Version control and collaboration tools: Git, GitHub',
        'Deployment and hosting platforms: Vercel',
        'Excellent interpersonal communication',
        'Problem-solving and conflict resolution',
        'Fluent in Somali (native), English, and Arabic',
        'Ability to work night shifts independently and under pressure'
      ];
      skills.forEach(skill => {
        doc.text(`• ${skill}`, 25, y);
        y += 5;
      });
      y += 5;

      // WORK EXPERIENCE
      addSectionHeader('WORK EXPERIENCE');

      // Job 1
      doc.setFont('helvetica', 'bold');
      doc.text('Sales Assistant (Student Fee Collection & Customer Support)', 20, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.text('Qabas Alhoda – Mogadishu | January 2025 – June 2025', 20, y);
      y += 6;
      const job1Tasks = [
        'Collected payments from students and maintained accurate financial records',
        'Developed and managed an online system for students to track subjects and scores',
        'Handled backend operations, ensuring secure and accurate data management',
        'Provided guidance and support to users navigating the system',
        'Generated timely reports and ensured platform reliability'
      ];
      job1Tasks.forEach(task => {
        const lines = doc.splitTextToSize(`• ${task}`, 160);
        doc.text(lines, 25, y);
        y += (lines.length * 5);
      });
      y += 8;

      // Job 2
      if (y > 250) { doc.addPage(); y = 20; }

      doc.setFont('helvetica', 'bold');
      doc.text('Multimedia & System Management Assistant (Freelance / Qabas Alhoda)', 20, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.text('Mogadishu | January 2025 – June 2025', 20, y);
      y += 6;
      const job2Tasks = [
        'Designed digital promotional materials using multimedia tools',
        'Managed databases for registration and data tracking',
        'Supported IT systems, including user accounts, digital filing, and reporting',
        'Implemented system improvements to streamline operations'
      ];
      job2Tasks.forEach(task => {
        const lines = doc.splitTextToSize(`• ${task}`, 160);
        doc.text(lines, 25, y);
        y += (lines.length * 5);
      });
      y += 10;

      // EDUCATION
      if (y > 250) { doc.addPage(); y = 20; }
      addSectionHeader('EDUCATION');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const edu = [
        'Secondary School Certificate – Mujamac Yaqshid Secondary School, Mogadishu (2019 – 2020)',
        'Information Technology (IT) – City University of Mogadishu College, Mogadishu (2024 – 2025)',
        'MEAN Stack Web Development – Tabaarak ICT Solution, Mogadishu (August – September 2025)'
      ];
      edu.forEach(item => {
        const lines = doc.splitTextToSize(`• ${item}`, 170);
        doc.text(lines, 20, y);
        y += (lines.length * 5) + 2;
      });
      y += 5;

      // PERSONAL INFORMATION
      if (y > 240) { doc.addPage(); y = 20; }
      addSectionHeader('PERSONAL INFORMATION');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('• Date of Birth: 11 September 1999', 20, y); y += 5;
      doc.text('• Place of Birth: Galdogob', 20, y); y += 5;
      doc.text('• Gender: Male', 20, y); y += 5;
      doc.text('• Marital Status: Single', 20, y); y += 5;
      doc.text('• Nationality: Somali', 20, y); y += 10;

      // REFERENCE
      if (y > 250) { doc.addPage(); y = 20; }
      addSectionHeader('REFERENCE');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Zakria Mahmud Elmi', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(' – IT Manager at City University of Mogadishu', 57, y);
      y += 5;
      doc.text('Email: Zakariamacalin123@gmail.com', 20, y); y += 5;
      doc.text('Phone: +252 61 7654470', 20, y); y += 5;
      doc.text('Location: Mogadishu, Banaadir, Somalia', 20, y);

      doc.save('Abdullahi_Muse_Issa_CV.pdf');
    }).catch(err => {
      console.error('Failed to generate PDF:', err);
      alert('Could not generate PDF. Please try again.');
    });
  };

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const success = await databaseService.saveMessage(data.name, data.email, data.message);

    if (success) {
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleLogin = (password: string) => {
    if (password === 'Ami@Dev2025!') {
      setIsAdmin(true);
      setCurrentView('admin');
    }
  };

  if (currentView === 'login') {
    return <Login isDark={isDark} onLogin={handleLogin} onExit={() => setCurrentView('portfolio')} />;
  }

  if (isAdmin && currentView === 'admin') {
    return (
      <AdminDashboard
        isDark={isDark}
        onExit={() => {
          setCurrentView('portfolio');
          fetchPortfolioData();
        }}
      />
    );
  }

  if (isDataLoading) {
    return (
      <div className={`h-screen flex items-center justify-center ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-black uppercase tracking-widest text-xs opacity-50">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} overflow-x-hidden selection:bg-blue-500/30`}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[110] origin-left" style={{ scaleX }} />

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} onAdminClick={() => isAdmin ? setCurrentView('admin') : setCurrentView('login')} />

      <main className="relative z-10">

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
          <ThreeScene />
          <div className="container mx-auto px-6 relative z-40">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block px-4 py-1.5 md:px-5 md:py-2 mb-6 md:mb-8 text-xs md:text-sm font-bold tracking-widest uppercase rounded-full glass border shadow-sm ${heroData?.available ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'text-red-500 border-red-500/30'}`}
                >
                  {heroData?.available ? 'Available for hire' : 'Currently Unavailable'}
                </motion.span>

                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-8 leading-[1] tracking-tighter text-slate-900 dark:text-white uppercase">
                  {heroData?.name ? (
                    <>
                      {heroData.name.split(' ').slice(0, -2).join(' ')} <br />
                      <span className="text-blue-600 dark:text-blue-500 drop-shadow-sm">{heroData.name.split(' ').slice(-2).join(' ')}</span>
                    </>
                  ) : (
                    <>
                      ABDULLAHI <br />
                      <span className="text-blue-600 dark:text-blue-500 drop-shadow-sm">MUSE ISSA</span>
                    </>
                  )}
                </h1>

                <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 mb-8 md:mb-12 max-w-2xl leading-relaxed font-semibold">
                  {heroData?.tagline || 'Full Stack Developer | Next.js | React | TypeScript. Building scalable digital solutions with a focus on performance and user experience.'}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-12 relative z-50 pointer-events-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadCV}
                    className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black flex items-center justify-center space-x-4 transition-all shadow-2xl shadow-blue-600/40 group cursor-pointer"
                  >
                    <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
                    <span className="text-lg md:text-xl">Download CV</span>
                  </motion.button>

                  <motion.a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                    whileHover={{ x: 10 }}
                    className="group flex items-center space-x-3 text-lg md:text-xl font-black text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer py-2 pl-2 sm:pl-0"
                  >
                    <span>Contact Me</span>
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 relative scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
              <motion.div
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="relative max-w-[300px] md:max-w-full mx-auto"
              >
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden glass p-1.5 shadow-2xl">
                  <img
                    src={heroData?.image || "/profile.png"}
                    alt="Abdullahi Muse Issa"
                    className="rounded-[2.4rem] w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/40 blur-[100px] -z-10 animate-pulse" />
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-indigo-600/40 blur-[100px] -z-10 animate-pulse" />
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black mb-8 md:mb-10 text-slate-900 dark:text-white tracking-tighter">Professional Bio</h2>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line">
                    {heroData?.bio || "I am a highly motivated and dedicated Full Stack Developer with a strong background in customer service, system management, and IT. Based in Mogadishu, Somalia, I specialize in the MEAN stack and modern frontend frameworks like Next.js."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                  <div className="p-6 md:p-8 rounded-3xl glass-dark border border-white/10 shadow-xl">
                    <h4 className="flex items-center space-x-2 text-blue-500 font-black mb-3 uppercase tracking-widest text-xs">
                      <Info size={14} />
                      <span>Personal Details</span>

                    </h4>
                    <div className="space-y-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center">
                        <span className="mr-2">DOB:</span>
                        <div className="relative">
                          <span className="opacity-0 select-none">{PERSONAL_INFO.dob}</span>
                          <motion.div
                            initial={{ scaleX: 0, rotate: 1 }}
                            whileInView={{ scaleX: 1, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                            className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm rounded-sm"
                            style={{ originX: 0 }}
                          >
                            <div className="w-full h-full opacity-[0.03] bg-black dark:bg-white" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">Birthplace:</span>
                        <div className="relative">
                          <span className="opacity-0 select-none">{PERSONAL_INFO.birthplace}</span>
                          <motion.div
                            initial={{ scaleX: 0, rotate: -2 }}
                            whileInView={{ scaleX: 1, rotate: -1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                            className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm rounded-sm"
                            style={{ originX: 0 }}
                          >
                            <div className="w-full h-full opacity-[0.03] bg-black dark:bg-white" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                          </motion.div>
                        </div>
                      </div>
                      <p>Nationality: {PERSONAL_INFO.nationality}</p>
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl glass-dark border border-white/10 shadow-xl">
                    <h4 className="flex items-center space-x-2 text-indigo-500 font-black mb-3 uppercase tracking-widest text-xs">
                      <Languages size={14} />
                      <span>Languages</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {PERSONAL_INFO.languages.map(lang => (
                        <span key={lang} className="text-sm font-bold text-slate-700 dark:text-slate-300 bg-white/5 px-2 py-1 rounded-md">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 bg-white/50 dark:bg-black/20 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">Technical Prowess</h2>
              <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full shadow-lg shadow-blue-500/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {['Frontend', 'Backend', 'Tools'].map((cat) => (
                <motion.div
                  key={cat}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] glass-dark border border-white/10 shadow-2xl relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-all" />
                  <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-10 flex items-center space-x-4 text-slate-900 dark:text-white">
                    <span className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {cat === 'Frontend' ? <Github size={24} /> : cat === 'Backend' ? <Server size={24} /> : <Wrench size={24} />}
                    </span>
                    <span>{cat}</span>
                  </h3>
                  <div className="space-y-6 md:space-y-8">
                    {skills.filter(s => s.category.toLowerCase() === cat.toLowerCase()).map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2 md:mb-3">
                          <span className="font-bold text-base md:text-lg text-slate-800 dark:text-slate-200">{skill.name}</span>
                          <span className="text-xs md:text-sm font-black text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="h-2.5 md:h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-32 scroll-mt-24">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-16 md:mb-24 text-center text-slate-900 dark:text-white tracking-tighter">Journey & Expertise</h2>

            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  viewport={{ once: true }}
                  className="relative pl-8 md:pl-12 border-l-4 border-blue-600/20 pb-12 md:pb-16 last:pb-0"
                >
                  <div className="absolute left-[-14px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-slate-50 dark:border-slate-950 shadow-2xl" />
                  <div className="p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] glass-dark border border-white/10 hover:border-blue-500/40 transition-all group shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4 md:gap-6">
                      <h3 className="text-2xl md:text-3xl font-black group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{exp.role}</h3>
                      <span className="text-xs md:text-sm font-black bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full shadow-lg shadow-blue-600/20 shrink-0 self-start md:self-center">{exp.period}</span>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 font-black text-lg md:text-xl mb-6 md:mb-8 flex items-center space-x-3">
                      <Briefcase size={20} />
                      <span>{exp.company}</span>
                    </p>
                    <ul className="space-y-4 md:space-y-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3 md:space-x-4 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={20} className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-base md:text-lg leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 md:mt-32">
              <h3 className="text-3xl md:text-4xl font-black mb-10 md:mb-16 text-center tracking-tight text-slate-900 dark:text-white">Academic Foundation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] glass-dark border border-white/10 flex flex-col items-center text-center shadow-2xl hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 md:mb-8 shadow-inner">
                      <GraduationCap size={32} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black mb-3 text-slate-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-4 md:mb-6 font-semibold">{edu.school}</p>
                    <span className="text-sm md:text-md font-black text-blue-600 dark:text-blue-400 flex items-center space-x-3">
                      <Calendar size={16} />
                      <span>{edu.year}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-32 bg-white/50 dark:bg-black/20 scroll-mt-24">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-16 md:mb-24 text-center text-slate-900 dark:text-white tracking-tighter">Featured Work</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] glass-dark border border-white/10 shadow-2xl"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{project.title}</h3>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-8 line-clamp-2 font-medium leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                      {project.tech.map(t => (
                        <span key={t} className="px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20 rounded-xl">{t}</span>
                      ))}
                    </div>
                    <div className="flex space-x-6 md:space-x-8">
                      <a href={project.link} className="flex items-center space-x-2 md:space-x-3 text-base md:text-lg font-black text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors group/link">
                        <span>Live Demo</span>
                        <ExternalLink size={18} className="group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                      <a href={project.github} className="flex items-center space-x-2 md:space-x-3 text-base md:text-lg font-black text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group/git">
                        <Github size={18} className="group-hover/git:rotate-12 transition-transform" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto glass-dark rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 border border-white/10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10" />

              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 relative z-10">
                <div>
                  <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-10 tracking-tighter text-slate-900 dark:text-white">Let's Connect</h2>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 md:mb-16 leading-relaxed font-medium">
                    I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Reach out and I'll get back to you as soon as possible.
                  </p>

                  <div className="space-y-8 md:space-y-12">
                    <div className="flex items-center space-x-6 md:space-x-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-500/20 shadow-inner">
                        <Mail size={28} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] font-black opacity-40 mb-2">Email me at</p>
                        <p className="text-xl md:text-2xl font-black tracking-tight">{PERSONAL_INFO.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 md:space-x-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-500/20 shadow-inner">
                        <Phone size={28} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] font-black opacity-40 mb-2">Call me at</p>
                        <p className="text-xl md:text-2xl font-black tracking-tight">{PERSONAL_INFO.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 md:space-x-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-500/20 shadow-inner">
                        <MapPin size={28} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] font-black opacity-40 mb-2">Located in</p>
                        <p className="text-xl md:text-2xl font-black tracking-tight">{PERSONAL_INFO.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-6 md:space-y-8" onSubmit={handleSendMessage}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-sm font-black uppercase tracking-widest opacity-60 ml-2">Your Name</label>
                      <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-base md:text-lg font-bold" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-sm font-black uppercase tracking-widest opacity-60 ml-2">Email Address</label>
                      <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-base md:text-lg font-bold" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60 ml-2">Your Message</label>
                    <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-base md:text-lg font-bold resize-none" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'sending'}
                    className="w-full py-5 md:py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg md:text-xl shadow-2xl shadow-blue-600/40 transition-all flex items-center justify-center space-x-4 group pointer-events-auto disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? (
                      <Loader2 className="animate-spin" size={26} />
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle2 size={26} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </motion.button>
                  {formStatus === 'error' && (
                    <p className="text-red-500 text-sm font-black text-center mt-4">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 md:py-24 border-t border-white/10 relative z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 md:mb-10 inline-block tracking-tighter">
            AMI.DEV
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto leading-relaxed text-center">
            Crafting digital excellence in Mogadishu. Every pixel tells a story of innovation, dedication, and technical mastery.
          </p>
          <div className="flex justify-center space-x-6 md:space-x-8 mb-12 md:mb-16">
            <a href="#" className="p-4 md:p-5 glass rounded-2xl hover:bg-blue-600 hover:text-white text-slate-500 transition-all shadow-xl group"><Github size={24} className="group-hover:scale-110 transition-transform md:w-[30px] md:h-[30px]" /></a>
            <a href="#" className="p-4 md:p-5 glass rounded-2xl hover:bg-blue-600 hover:text-white text-slate-500 transition-all shadow-xl group"><Mail size={24} className="group-hover:scale-110 transition-transform md:w-[30px] md:h-[30px]" /></a>
            <a href="#" className="p-4 md:p-5 glass rounded-2xl hover:bg-blue-600 hover:text-white text-slate-500 transition-all shadow-xl group"><MapPin size={24} className="group-hover:scale-110 transition-transform md:w-[30px] md:h-[30px]" /></a>
          </div>
          <p className="text-slate-500 dark:text-slate-600 text-sm uppercase tracking-[0.5em] font-black">
            © {new Date().getFullYear()} Abdullahi Muse Issa
          </p>
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[140] flex flex-col space-y-3 md:space-y-4">
        <motion.a
          href="https://wa.me/qr/QRMHO25CBD64E1"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-green-500 text-white shadow-xl shadow-green-500/20 flex items-center justify-center"
          title="WhatsApp Me"
        >
          <MessageCircle size={28} />
        </motion.a>

        <motion.a
          href="tel:+2520614163362"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/20 flex items-center justify-center"
          title="Call Me"
        >
          <Phone size={28} />
        </motion.a>
      </div>

      <ChatAssistant projects={projects} skills={skills} experiences={experiences} isDark={isDark} />
    </div>
  );
};

export default App;
