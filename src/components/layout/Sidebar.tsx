"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { name: 'Workouts', href: '/dashboard/workouts', icon: 'fitness_center' },
    { name: 'Diet Planner', href: '/dashboard/diet', icon: 'restaurant_menu' },
    { name: 'AI Trainer', href: '/dashboard/ai-trainer', icon: 'psychology' },
    { name: 'Posture Analyzer', href: '/dashboard/posture', icon: 'accessibility_new' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'monitoring' },
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={clsx(
        "fixed md:static inset-y-0 left-0 z-50 w-[240px] flex flex-col h-screen border-r border-surface-glass-border bg-background-dark shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
          <span className="material-symbols-outlined text-primary">bolt</span>
        </div>
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-xl font-bold tracking-tight text-white cursor-pointer">FitNexa <span className="neon-text">AI</span></h1>
          </Link>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAKQZLZ56Tc6QotHKa8zi_kQaLUKvZFcyiqpDdZELSLcmCXObX-2lBUabXOomiJSZal0q80QKq6OrkhamvcYKgQqfW3URFwxM435a_N8qNbIsA5eS7sOhhgy_dtqaq2qYWdSWbQxgLoFJL_CNbvD2va34BOyz9mfOTpneBSkG3mm0oFo4FpkIMpBZ3_qRJvRPZT1EMMaF3g-drnxj7o2EDsgN1EnPtzbUVYaDqGWOwcL3XcCZ_LQULkkh11WN1fyHfrvs4EffCJKg")' }}></div>
          <div className="flex flex-col">
            <h2 className="text-white text-sm font-semibold">{session?.user?.name || 'Guest User'}</h2>
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-max border border-primary/20 mt-1 shadow-[0_0_8px_rgba(57,255,20,0.2)]">Pro Member</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className={clsx("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative", isActive ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-glass")}
            >
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"></div>}
              <span className={clsx("material-symbols-outlined text-[20px] transition-colors", !isActive && "group-hover:text-primary")}>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
        <div className="pt-4 pb-2">
          <div className="h-px w-full bg-surface-glass-border"></div>
        </div>
        <Link href="/dashboard/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-glass transition-colors group">
          <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center text-center border border-primary/20 neon-glow bg-gradient-to-b from-primary/5 to-transparent">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
          </div>
          <h3 className="text-white text-sm font-bold mb-1">Take it to the next level</h3>
          <p className="text-slate-400 text-xs mb-4">Unlock advanced AI tracking & 1-on-1 coaching.</p>
          <button className="w-full bg-primary hover:bg-[#32e612] text-black font-bold text-sm py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)]">
            Upgrade to Elite
          </button>
        </div>
      </div>
      </aside>
    </>
  );
}
