
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message, Project, Skill, Experience } from '../types';

interface ChatAssistantProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  isDark: boolean;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ projects, skills, experiences, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Abdullahi's AI assistant. Ask me anything about his skills, experience, or how he can help your team!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, { projects, skills, experiences });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[150] p-4 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/20"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[200] w-full md:w-[350px] h-full md:h-[500px] md:max-h-[70vh] flex flex-col md:rounded-2xl overflow-hidden shadow-2xl border ${isDark
              ? 'bg-slate-950 md:bg-slate-950/95 border-white/20 text-white'
              : 'bg-white md:bg-white border-slate-200 text-slate-900'
              }`}
          >
            {/* Header */}
            <div className="p-4 bg-blue-600/80 flex justify-between items-center text-white shrink-0 relative z-50">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <span className="font-semibold">Portfolio Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer relative z-50"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl flex items-start space-x-2 ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-white/5'
                    }`}>
                    <div className="shrink-0 mt-1">
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <span className="text-sm whitespace-pre-wrap">{msg.content}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-slate-100 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
