"use client";

import { useSession } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();
  
  const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "there";

  return (
    <header className="h-20 border-b border-surface-glass-border flex items-center justify-between px-4 md:px-8 shrink-0 glass-panel z-20 transition-all">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.dispatchEvent(new Event('toggleSidebar'))}
          className="md:hidden w-10 h-10 rounded-lg bg-background-dark border border-surface-glass-border flex items-center justify-center hover:bg-surface-glass transition-colors"
        >
          <span className="material-symbols-outlined text-slate-300">menu</span>
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-primary">{firstName}</span>! <span className="text-xl md:text-2xl ml-1">💪</span>
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-6 hidden sm:flex">
        <div className="relative group hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
          <input className="bg-background-dark border border-surface-glass-border focus:border-primary/50 text-white text-sm rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-500" placeholder="Ask AI Coach or search..." type="text" />
        </div>
        <button className="w-10 h-10 rounded-full bg-background-dark border border-surface-glass-border flex items-center justify-center relative hover:bg-surface-glass transition-colors">
          <span className="material-symbols-outlined text-slate-300">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_#39FF14]"></span>
        </button>
      </div>
    </header>
  );
}
