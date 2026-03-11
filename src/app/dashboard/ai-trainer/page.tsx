"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function AITrainerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/chat');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMessages(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.content };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: error.message || "Failed to get response." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any }
    }
  };

  return (
    <motion.div 
      className="flex h-[calc(100vh-80px)] -mx-4 md:-mx-8 overflow-hidden bg-background-dark/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* PANEL 1: CONVERSATIONS LIST (Hidden on small screens, absolute/drawer on mobile maybe, here just hidden or block) */}
      <motion.div variants={itemVariants} className="hidden lg:flex flex-col w-80 border-r border-surface-glass-border bg-background-dark/80 backdrop-blur-md flex-shrink-0">
        <div className="p-5 border-b border-surface-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Conversations</h2>
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(56,255,20,0.8)]"></div>
              <span className="text-xs font-medium text-slate-300">Online</span>
            </div>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder-slate-500" placeholder="Search chats..." type="text" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {/* Active Conversation */}
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 shadow-[0_4px_12px_rgba(56,255,20,0.05)] cursor-pointer group relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-sm text-white truncate pr-4">Nutrition for Muscle Gain</h3>
              <span className="text-xs text-primary font-medium whitespace-nowrap">Active</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">Let's adjust your macros to focus on lean protein and complex carbs for recovery.</p>
          </div>

          {/* Past Conversations */}
          {[
            { title: 'Workout Recovery Tips', time: 'Yesterday', desc: 'Try to get 8 hours of sleep and consider an ice bath.' },
            { title: 'HIIT Cardio Questions', time: 'Tue', desc: 'A good ratio for beginners is 1:2 work to rest.' },
            { title: 'Sleep & Recovery', time: 'Oct 12', desc: 'Magnesium before bed might help with muscle soreness.' }
          ].map((chat, idx) => (
            <div key={idx} className="p-3 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-700 cursor-pointer transition-colors group">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm text-slate-300 group-hover:text-white truncate pr-4">{chat.title}</h3>
                <span className="text-xs text-slate-500 whitespace-nowrap">{chat.time}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{chat.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-surface-glass-border bg-background-dark/50 backdrop-blur-sm">
          <button className="w-full py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm shadow-[0_0_10px_rgba(56,255,20,0.1)]">
            <span className="material-symbols-outlined text-lg">add</span>
            New Chat
          </button>
        </div>
      </motion.div>

      {/* PANEL 2: CHAT WINDOW */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col bg-background-dark relative border-r border-surface-glass-border">
        
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Chat Header */}
        <div className="h-16 border-b border-surface-glass-border bg-slate-900/80 backdrop-blur-md flex items-center px-6 justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-full">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-primary shadow-[0_0_10px_rgba(56,255,20,0.3)]">
                <span className="material-symbols-outlined text-primary">smart_toy</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h2 className="font-semibold text-base leading-tight text-white">Coach Nexa</h2>
              <p className="text-xs text-slate-400">AI Fitness Specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 scroll-smooth custom-scrollbar">
          
          <div className="flex items-center justify-center my-4">
            <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-700/50">Today</span>
          </div>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 opacity-60">
              <span className="material-symbols-outlined text-4xl text-primary mb-2 drop-shadow-[0_0_8px_rgba(56,255,20,0.5)]">auto_awesome</span>
              <p className="text-sm text-slate-400">Ask Coach Nexa anything about your fitness journey.</p>
            </div>
          )}

          {messages.map((m: Message) => (
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] md:max-w-[75%] bg-slate-800/80 backdrop-blur-sm text-slate-100 rounded-2xl rounded-tr-sm p-4 shadow-md border border-slate-700">
                  <p className="text-sm">{m.content}</p>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start items-end gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-primary/50 flex-shrink-0 mb-1">
                  <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                </div>
                <div className="max-w-[85%] md:max-w-[75%] bg-slate-900/80 backdrop-blur-sm text-slate-200 rounded-2xl rounded-tl-sm p-5 shadow-lg border-l-2 border-l-primary border-t border-r border-b border-slate-800/50">
                  <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{m.content}</div>
                </div>
              </div>
            )
          ))}

          {isLoading && (
            <div className="flex justify-start items-end gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-primary/50 flex-shrink-0 mb-1">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 shadow-md border border-slate-800 flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-surface-glass-border z-10 w-full">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary/50 transition-all">
            <button type="button" className="p-2 text-slate-400 hover:text-white rounded-full transition-colors flex-shrink-0">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <textarea 
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-white resize-none py-3 max-h-32 placeholder-slate-500 custom-scrollbar" 
              placeholder="Message Coach Nexa..." 
              rows={1} 
              style={{ minHeight: '44px' }}
            />
            <button type="button" className="p-2 text-slate-400 hover:text-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button disabled={isLoading || !input.trim()} type="submit" className="p-2 bg-primary text-black rounded-xl hover:bg-[#32e612] transition-colors shadow-[0_0_10px_rgba(56,255,20,0.3)] flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-500">FitNexa AI can make mistakes. Consider verifying important fitness advice.</span>
          </div>
        </div>
      </motion.div>

      {/* PANEL 3: AI CONTEXT SIDEBAR (Hidden on small/medium screens) */}
      <motion.div variants={itemVariants} className="hidden xl:flex flex-col w-80 bg-slate-900/50 backdrop-blur-md flex-shrink-0 overflow-y-auto z-10 custom-scrollbar">
        <div className="p-5 border-b border-surface-glass-border">
          <h2 className="text-lg font-bold text-white mb-1">Context Window</h2>
          <p className="text-xs text-slate-400">Session insights & tools</p>
        </div>
        
        <div className="p-5 space-y-6">
          
          {/* Session Summary */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">subject</span>
              Session Summary
            </h3>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800">
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">Discussing nutritional strategies for optimizing recovery on rest days after heavy leg workouts.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">Recovery</span>
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">Nutrition</span>
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">Macros</span>
              </div>
            </div>
          </div>

          {/* Your Stats */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">monitoring</span>
              Your Stats
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-orange-500">local_fire_department</span> Streak
                </div>
                <div className="text-lg font-bold text-white">14 <span className="text-xs font-normal text-slate-500">days</span></div>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-blue-500">monitor_weight</span> Weight
                </div>
                <div className="text-lg font-bold text-white">178 <span className="text-xs font-normal text-slate-500">lbs</span></div>
              </div>
              <div className="col-span-2 bg-slate-950/50 rounded-lg p-3 border border-slate-800 flex justify-between items-center mt-1">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Last Workout</div>
                  <div className="text-sm font-semibold text-white">Heavy Legs (65m)</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="material-symbols-outlined text-[16px] text-slate-300">directions_run</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">bolt</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: 'fitness_center', label: 'Create Workout Plan' },
                { icon: 'fastfood', label: 'Analyze Diet' },
                { icon: 'videocam', label: 'Check Form' },
                { icon: 'flag', label: 'Set Goals' },
              ].map((action, idx) => (
                <button key={idx} className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 transition-colors text-left group">
                  <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors border border-slate-700">
                    <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
