import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    Activity,
    FileText,
    Settings,
    LogOut,
    Search,
    ArrowUpRight,
    TrendingUp,
    Database,
    Lock,
    Plus,
    Mail,
    Edit,
    Trash2,
    CheckCircle2,
    Clock,
    Briefcase,
    Wrench,
    Loader2,
    Eye,
    Menu,
    X,
    Home,
    Save
} from 'lucide-react';
import { databaseService } from '../services/databaseService';
import { PROJECTS, SKILLS, EXPERIENCES } from '../constants';
import { HeroData } from '../types';

interface AdminDashboardProps {
    isDark: boolean;
    onExit: () => void;
}

type View = 'overview' | 'projects' | 'skills' | 'experience' | 'inbox' | 'settings' | 'home';

const StatsCard = ({ title, value, icon: Icon, trend, color, isDark, onClick }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className={`p-6 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl ${isDark ? 'glass-dark' : 'bg-white shadow-lg'} cursor-pointer transition-all hover:shadow-blue-500/20`}
    >
        <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 bg-${color}-600`} />
        <div className="relative z-10 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{title}</p>
                <h4 className="text-3xl font-black tracking-tight">{value}</h4>
                <div className="flex items-center space-x-1 text-emerald-500 font-bold text-[10px] mt-2 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                    <TrendingUp size={10} />
                    <span>{trend}</span>
                </div>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-${color}-600/10 flex items-center justify-center text-${color}-600 dark:text-${color}-400 shadow-inner`}>
                <Icon size={24} />
            </div>
        </div>
    </motion.div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDark, onExit }) => {
    const [activeView, setActiveView] = useState<View>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isHeroSaving, setIsHeroSaving] = useState(false);
    const [dbStats, setDbStats] = useState({ messagesReceived: 0, projectsCount: 0, skillsCount: 0, experiencesCount: 0, lastSync: 'N/A' });
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [msgs, projs, skls, exps, stats, hero] = await Promise.all([
                databaseService.getMessages(),
                databaseService.getProjects(),
                databaseService.getSkills(),
                databaseService.getExperiences(),
                databaseService.getStats(),
                databaseService.getHero()
            ]);
            setMessages(msgs);
            setProjects(projs);
            setSkills(skls);
            setExperiences(exps);
            setDbStats(stats as any);
            setHeroData(hero);
        } catch (error) {
            console.error('Fetch Data Error:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setIsAdding(false);
        setFormData({});
        fetchData();
    }, [activeView]);

    const handleSaveHero = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!heroData) return;

        setIsHeroSaving(true);
        const success = await databaseService.saveHero(heroData);
        setIsHeroSaving(false);

        if (success) {
            alert('Home content updated successfully!');
        } else {
            alert('Failed to update content. Database table might be missing.');
        }
    };

    const sidebarLinks = [
        { id: 'overview', icon: Activity, label: 'Overview' },
        { id: 'home', icon: Home, label: 'Home Content' },
        { id: 'projects', icon: FileText, label: 'Projects' },
        { id: 'skills', icon: Wrench, label: 'Skills' },
        { id: 'experience', icon: Briefcase, label: 'Experience' },
        { id: 'inbox', icon: Mail, label: 'Inbox' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const renderView = () => {
        switch (activeView) {
            case 'home':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            <div className={`p-8 rounded-3xl border border-white/5 ${isDark ? 'bg-slate-900/50' : 'bg-white shadow-xl'}`}>
                                <h2 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center space-x-3">
                                    <Home size={20} className="text-blue-500" />
                                    <span>Hero Section Content</span>
                                </h2>

                                {heroData ? (
                                    <form onSubmit={handleSaveHero} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase font-black tracking-widest opacity-60">Display Name</label>
                                                <input
                                                    type="text"
                                                    value={heroData.name}
                                                    onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                                                    className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                                />
                                            </div>
                                            <div className="flex items-center space-x-4 pt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setHeroData({ ...heroData, available: !heroData.available })}
                                                    className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-colors ${heroData.available ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20' : 'bg-slate-500/20 text-slate-500 border border-slate-500/20'}`}
                                                >
                                                    {heroData.available ? 'Status: Available' : 'Status: Unavailable'}
                                                </button>
                                            </div>
                                        </div>



                                        <div className="space-y-4 pt-4">
                                            <label className="text-xs uppercase font-black tracking-widest opacity-60">Profile Image</label>
                                            <div className="flex items-center space-x-6">
                                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shrink-0 bg-white/5">
                                                    <img
                                                        src={heroData.image || '/profile.png'}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png'; }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setHeroData({ ...heroData, image: reader.result as string });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'} text-xs`}
                                                    />
                                                    <p className="mt-2 text-[10px] opacity-40 uppercase tracking-widest">Recommended: Square Aspect Ratio (e.g. 500x500)</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-black tracking-widest opacity-60">Tagline / Subtitle</label>
                                            <textarea
                                                rows={3}
                                                value={heroData.tagline}
                                                onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                                                className={`w-full p-4 rounded-xl border border-white/5 resize-none ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-black tracking-widest opacity-60">Short Bio</label>
                                            <textarea
                                                rows={4}
                                                value={heroData.bio}
                                                onChange={(e) => setHeroData({ ...heroData, bio: e.target.value })}
                                                className={`w-full p-4 rounded-xl border border-white/5 resize-none ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                            />
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isHeroSaving}
                                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
                                            >
                                                {isHeroSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex justify-center p-8">
                                        <Loader2 className="animate-spin text-blue-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black tracking-tight">Manage Projects</h2>
                            {!isAdding && (
                                <button
                                    onClick={() => {
                                        setIsAdding(true);
                                        setFormData({ title: '', description: '', tech: '', link: '', github: '', image: '' });
                                    }}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                                >
                                    <Plus size={20} />
                                    <span>Add Project</span>
                                </button>
                            )}
                        </div>

                        {isAdding && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2rem] border border-white/10 mb-8 ${isDark ? 'glass-dark' : 'bg-white shadow-xl'}`}>
                                <h3 className="text-xl font-black mb-6 uppercase tracking-widest">{formData.id ? 'Edit Project' : 'New Project'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        placeholder="Title"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                    <input
                                        placeholder="Tech Stack (comma separated)"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.tech}
                                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        className={`w-full p-4 rounded-xl border border-white/5 md:col-span-2 min-h-[100px] ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <input
                                        placeholder="Live Link"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    />
                                    <input
                                        placeholder="GitHub Link"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.github}
                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    />
                                    <div className="md:col-span-2 space-y-4">
                                        <label className="block text-xs font-black uppercase tracking-widest opacity-40">Project Image</label>
                                        <div className="flex items-center space-x-4">
                                            {formData.image && (
                                                <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className={`flex-1 p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setFormData({ ...formData, image: reader.result as string });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4 mt-8">
                                    <button
                                        onClick={async () => {
                                            try {
                                                const project = {
                                                    ...formData,
                                                    tech: Array.isArray(formData.tech) ? formData.tech : (formData.tech || '').split(',').map((s: string) => s.trim())
                                                };
                                                const success = await databaseService.saveProject(project);
                                                if (success) {
                                                    setIsAdding(false);
                                                    setFormData({});
                                                    const [newProjs, newStats] = await Promise.all([
                                                        databaseService.getProjects(),
                                                        databaseService.getStats()
                                                    ]);
                                                    setProjects(newProjs);
                                                    setDbStats(newStats as any);
                                                } else {
                                                    alert('Failed to save project. Please check database connection.');
                                                }
                                            } catch (err) {
                                                alert('An error occurred while saving.');
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700"
                                    >
                                        {formData.id ? 'Update Project' : 'Save Project'}
                                    </button>
                                    <button
                                        onClick={() => setIsAdding(false)}
                                        className="bg-white/5 text-slate-500 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        <div className="grid grid-cols-1 gap-4">
                            {isLoading ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin opacity-50" size={40} /></div>
                            ) : projects.length === 0 ? (
                                <p className="opacity-40 text-center font-black uppercase tracking-widest py-20">No projects found.</p>
                            ) : (
                                projects.map((project) => (
                                    <div key={project.id} className={`p-6 rounded-2xl border border-white/5 flex items-center justify-between group h-24 ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                        <div className="flex items-center space-x-6">
                                            <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-500/10">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg">{project.title}</h4>
                                                <p className="text-xs opacity-50 uppercase tracking-widest font-bold">{project.tech.join(' • ')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setFormData({ ...project, tech: project.tech.join(', ') });
                                                    setIsAdding(true);
                                                }}
                                                className="p-3 bg-blue-600/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Delete this project?')) {
                                                        await databaseService.deleteProject(project.id);
                                                        setProjects(await databaseService.getProjects());
                                                    }
                                                }}
                                                className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black tracking-tight">Technical Skills</h2>
                            {!isAdding && (
                                <button
                                    onClick={() => {
                                        setIsAdding(true);
                                        setFormData({ name: '', level: 80, category: 'frontend' });
                                    }}
                                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
                                >
                                    <Plus size={20} />
                                    <span>Add Skill</span>
                                </button>
                            )}
                        </div>

                        {isAdding && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2rem] border border-white/10 mb-8 ${isDark ? 'glass-dark' : 'bg-white shadow-xl'}`}>
                                <h3 className="text-xl font-black mb-6 uppercase tracking-widest">{formData.id ? 'Edit Skill' : 'New Skill'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input
                                        placeholder="Skill Name"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Level (0-100)"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                    />
                                    <select
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="frontend">Frontend</option>
                                        <option value="backend">Backend</option>
                                        <option value="tools">Tools</option>
                                    </select>
                                </div>
                                <div className="flex space-x-4 mt-8">
                                    <button
                                        onClick={async () => {
                                            const success = await databaseService.saveSkill(formData);
                                            if (success) {
                                                setIsAdding(false);
                                                setFormData({});
                                                const [newSkls, newStats] = await Promise.all([
                                                    databaseService.getSkills(),
                                                    databaseService.getStats()
                                                ]);
                                                setSkills(newSkls);
                                                setDbStats(newStats as any);
                                            } else {
                                                alert('Failed to save skill.');
                                            }
                                        }}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700"
                                    >
                                        {formData.id ? 'Update Skill' : 'Save Skill'}
                                    </button>
                                    <button onClick={() => setIsAdding(false)} className="bg-white/5 text-slate-500 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10">Cancel</button>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className={`p-6 rounded-2xl border border-white/5 flex items-center justify-between group ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-600 border border-indigo-500/10 font-bold uppercase text-[10px]">
                                            {skill.level}%
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg">{skill.name}</h4>
                                            <p className="text-xs opacity-50 uppercase tracking-widest font-bold">{skill.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                setFormData(skill);
                                                setIsAdding(true);
                                            }}
                                            className="p-3 bg-indigo-600/10 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (confirm('Delete skill?')) {
                                                    await databaseService.deleteSkill(skill.id);
                                                    setSkills(await databaseService.getSkills());
                                                }
                                            }}
                                            className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black tracking-tight">Work History</h2>
                            {!isAdding && (
                                <button
                                    onClick={() => {
                                        setIsAdding(true);
                                        setFormData({ role: '', company: '', period: '', description: '' });
                                    }}
                                    className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
                                >
                                    <Plus size={20} />
                                    <span>Add Experience</span>
                                </button>
                            )}
                        </div>

                        {isAdding && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2rem] border border-white/10 mb-8 ${isDark ? 'glass-dark' : 'bg-white shadow-xl'}`}>
                                <h3 className="text-xl font-black mb-6 uppercase tracking-widest">{formData.id ? 'Edit Experience' : 'New Experience'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        placeholder="Role"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    />
                                    <input
                                        placeholder="Company"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                    <input
                                        placeholder="Period"
                                        className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.period}
                                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Responsibilities (one per line)"
                                        className={`w-full p-4 rounded-xl border border-white/5 md:col-span-2 min-h-[100px] ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="flex space-x-4 mt-8">
                                    <button
                                        onClick={async () => {
                                            const exp = {
                                                ...formData,
                                                description: (formData.description || '').split('\n').filter((s: string) => s.trim())
                                            };
                                            const success = await databaseService.saveExperience(exp);
                                            if (success) {
                                                setIsAdding(false);
                                                setFormData({});
                                                const [newExps, newStats] = await Promise.all([
                                                    databaseService.getExperiences(),
                                                    databaseService.getStats()
                                                ]);
                                                setExperiences(newExps);
                                                setDbStats(newStats as any);
                                            } else {
                                                alert('Failed to save experience.');
                                            }
                                        }}
                                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700"
                                    >
                                        {formData.id ? 'Update Experience' : 'Save Experience'}
                                    </button>
                                    <button onClick={() => setIsAdding(false)} className="bg-white/5 text-slate-500 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10">Cancel</button>
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp.id} className={`p-8 rounded-[2rem] border border-white/10 ${isDark ? 'bg-white/5' : 'bg-white shadow-md'} group`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h4 className="text-xl font-black">{exp.role}</h4>
                                            <p className="text-sm text-emerald-500 font-bold uppercase tracking-widest">{exp.company} • {exp.period}</p>
                                        </div>
                                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setFormData({ ...exp, description: exp.description.join('\n') });
                                                    setIsAdding(true);
                                                }}
                                                className="p-3 bg-emerald-600/10 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Delete experience?')) {
                                                        await databaseService.deleteExperience(exp.id);
                                                        setExperiences(await databaseService.getExperiences());
                                                    }
                                                }}
                                                className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {exp.description.map((desc: string, i: number) => (
                                            <li key={i} className="flex items-start space-x-3 text-sm opacity-70">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'inbox':
                return (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tight mb-8">Contact Inbox</h2>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                <Loader2 className="animate-spin mb-4" size={40} />
                                <p className="font-black uppercase tracking-[0.3em] text-xs">Syncing Messages...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.length === 0 ? (
                                    <p className="opacity-40 text-center font-black uppercase tracking-widest py-20">No messages found.</p>
                                ) : (
                                    messages.map(msg => (
                                        <div key={msg.id} className={`p-8 rounded-[2rem] border border-white/10 ${isDark ? 'glass-dark text-white' : 'bg-white text-slate-800 shadow-md'} group cursor-pointer hover:border-blue-500/30 transition-all`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-500/10">{msg.sender[0]}</div>
                                                    <div>
                                                        <h4 className="font-black text-xl">{msg.sender}</h4>
                                                        <p className="text-sm opacity-50 font-bold">{msg.email}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{new Date(msg.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="opacity-80 font-medium leading-relaxed">{msg.message}</p>
                                            <div className="mt-6 pt-6 border-t border-white/5 flex space-x-4">
                                                {!msg.is_read && (
                                                    <button
                                                        onClick={async (e) => {
                                                            e.stopPropagation();
                                                            await databaseService.markMessageAsRead(msg.id);
                                                            const msgs = await databaseService.getMessages();
                                                            setMessages(msgs);
                                                        }}
                                                        className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 hover:text-blue-400 transition-colors flex items-center space-x-2"
                                                    >
                                                        <Eye size={14} />
                                                        <span>Mark as Read</span>
                                                    </button>
                                                )}
                                                {msg.is_read && (
                                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center space-x-2 opacity-50">
                                                        <CheckCircle2 size={14} />
                                                        <span>Read</span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={async () => {
                                                        await databaseService.deleteMessage(msg.id);
                                                        const msgs = await databaseService.getMessages();
                                                        setMessages(msgs);
                                                    }}
                                                    className="text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors flex items-center space-x-2"
                                                >
                                                    <Trash2 size={14} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            default:
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <StatsCard
                                onClick={() => setActiveView('projects')}
                                title="Live Projects"
                                value={dbStats.projectsCount.toString()}
                                icon={FileText}
                                trend="+1"
                                color="blue"
                                isDark={isDark}
                            />
                            <StatsCard
                                onClick={() => setActiveView('skills')}
                                title="Total Skills"
                                value={dbStats.skillsCount.toString()}
                                icon={Wrench}
                                trend="+2"
                                color="indigo"
                                isDark={isDark}
                            />
                            <StatsCard
                                onClick={() => setActiveView('experience')}
                                title="Exp. Entries"
                                value={dbStats.experiencesCount.toString()}
                                icon={Briefcase}
                                trend="Active"
                                color="emerald"
                                isDark={isDark}
                            />
                            <StatsCard
                                onClick={() => setActiveView('inbox')}
                                title="Inbox Alerts"
                                value={dbStats.messagesReceived.toString()}
                                icon={Mail}
                                trend="New"
                                color="orange"
                                isDark={isDark}
                            />
                        </div>

                        <section className={`rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden shadow-2xl ${isDark ? 'glass-dark text-white' : 'bg-white text-slate-900 shadow-lg'}`}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10" />
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black mb-2 tracking-tight">Recent Activity</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Monitoring your portfolio touchpoints</p>
                                </div>
                                <button
                                    onClick={() => setActiveView('projects')}
                                    className="flex items-center space-x-2 text-xs font-black text-blue-600 hover:text-blue-400 transition-colors uppercase tracking-widest"
                                >
                                    <span>Go to Management</span>
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div
                                    onClick={fetchData}
                                    className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                            <Database size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-orange-500">Neon Database Health</p>
                                            <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Latency: Optimal • Connection: Secure • Click to Refresh</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500">ONLINE</span>
                                </div>
                                <div
                                    onClick={fetchData}
                                    className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-blue-600">Dashboard Synchronized</p>
                                            <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Last Sync: {dbStats.lastSync}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black opacity-30">JUST NOW</span>
                                </div>
                                {messages.slice(0, 1).map(msg => (
                                    <div key={msg.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-emerald-500">Inquiry from Portfolio</p>
                                                <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Sender: {msg.sender}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black opacity-30">NEW</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                );
            case 'settings':
                return (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black tracking-tight mb-8">System Settings</h2>

                        <div className={`p-10 rounded-[2.5rem] border border-white/10 ${isDark ? 'glass-dark' : 'bg-white shadow-xl'}`}>
                            <div className="flex items-center space-x-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-500/10">
                                    <Settings size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Profile Configuration</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Manage your basic portfolio information</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Display Name</label>
                                    <input className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`} defaultValue="Abdullahi Muse Issa" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Contact Email</label>
                                    <input className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`} defaultValue="abdallaise877@gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Phone Number</label>
                                    <input className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`} defaultValue="+252 61 4163362" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Location</label>
                                    <input className={`w-full p-4 rounded-xl border border-white/5 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`} defaultValue="Mogadishu, Somalia" />
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/5">
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        <div className={`p-10 rounded-[2.5rem] border border-white/10 ${isDark ? 'glass-dark' : 'bg-white shadow-xl'}`}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 border border-indigo-500/10">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Security & API</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Manage access and integration tokens</p>
                                </div>
                            </div>
                            <p className="opacity-50 text-sm font-medium">Security settings are managed through your environment configuration for maximum protection.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={`h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'} flex selection:bg-blue-500/30 relative overflow-hidden`}>
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={`fixed lg:sticky top-0 h-screen w-72 flex flex-col border-r border-white/5 p-8 z-[100] transition-transform duration-300 ease-in-out ${isDark ? 'bg-slate-950/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-600/30">P</div>
                        <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">Portfolio</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveView(item.id as View);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all font-black text-[10px] uppercase tracking-[0.2em] relative group ${activeView === item.id
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                                : 'text-slate-500 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                            {activeView === item.id && (
                                <motion.div layoutId="active-pill" className="absolute right-3 w-1 h-3 bg-white rounded-full" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
                    <button
                        onClick={onExit}
                        className="w-full flex items-center space-x-4 px-5 py-4 rounded-xl text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={18} />
                        <span>Close Manager</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-8 lg:p-14 overflow-y-auto overflow-x-hidden w-full max-w-[100vw]" style={{ WebkitOverflowScrolling: 'touch' }}>
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black mb-1 capitalize tracking-tight">{activeView === 'home' ? 'Home Content' : activeView}</h1>
                            <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] opacity-40">Portfolio Management Center</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end md:self-auto">
                        <button
                            onClick={onExit}
                            className="hidden sm:flex items-center space-x-2 bg-slate-500/10 text-slate-500 hover:text-blue-500 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest border border-slate-500/10 cursor-pointer transition-colors"
                        >
                            <Home size={14} />
                            <span>BACK TO HOME</span>
                        </button>
                        <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest border border-emerald-500/10 animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>SYNC ACTIVE</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-500/10 shadow-inner">
                            <ShieldCheck size={22} />
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};
