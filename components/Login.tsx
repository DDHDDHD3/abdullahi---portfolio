import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
    isDark: boolean;
    onLogin: (password: string) => void;
    onExit: () => void;
}

export const Login: React.FC<LoginProps> = ({ isDark, onLogin, onExit }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate auth check
        setTimeout(() => {
            if (password === 'Ami@Dev2025!') { // Replace with real auth logic if needed
                onLogin(password);
            } else {
                setError('Invalid security credentials provided.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-dark rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10" />

                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-6 shadow-inner border border-blue-500/20">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight mb-3">Admin Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Verify your identity to access the Control Console.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <Lock size={22} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Security Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all text-lg font-bold"
                                required
                            />
                        </div>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-2 text-red-500 text-sm font-bold ml-2"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-blue-600/40 transition-all flex items-center justify-center space-x-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={26} className="animate-spin" />
                            ) : (
                                <>
                                    <span>Authenticate</span>
                                    <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </motion.button>

                        <button
                            type="button"
                            onClick={onExit}
                            className="w-full py-4 text-slate-500 dark:text-slate-400 font-black hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-[0.2em] text-xs"
                        >
                            Back to Portfolio
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30">
                        Powered by Dhabhabod Control
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
