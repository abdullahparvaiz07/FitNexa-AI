"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [workouts, setWorkouts] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const [workoutsRes, dietsRes] = await Promise.all([
            fetch('/api/workouts'),
            fetch('/api/diet')
          ]);
          if (workoutsRes.ok) setWorkouts(await workoutsRes.json());
          if (dietsRes.ok) setDiets(await dietsRes.json());
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchData();
    }
  }, [status]);

  if (status === 'loading' || isLoadingData) {
    return <div className="text-white flex items-center justify-center p-10"><span className="material-symbols-outlined animate-spin text-4xl text-primary">fitness_center</span></div>;
  }

  // Calculate Stats
  const today = new Date().toDateString();
  const todaysDiets = diets.filter(d => new Date(d.date).toDateString() === today);
  const totalCalories = todaysDiets.reduce((sum, d) => sum + d.calories, 0);
  const totalProtein = todaysDiets.reduce((sum, d) => sum + d.protein, 0);
  const totalCarbs = todaysDiets.reduce((sum, d) => sum + d.carbs, 0);
  const totalFats = todaysDiets.reduce((sum, d) => sum + d.fats, 0);
  
  const CAL_GOAL = 2200;
  const PRO_GOAL = 180;
  const CARB_GOAL = 250;
  const FAT_GOAL = 65;

  const activeWorkout = workouts.find(w => !w.isCompleted) || workouts[0];
  const workoutsThisWeek = workouts.filter(w => {
    const d = new Date(w.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  }).length;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between group hover:border-primary/30 transition-colors">
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Calories Eaten</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{totalCalories}</span>
              <span className="text-sm font-medium text-primary">/ {CAL_GOAL}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-2xl">local_fire_department</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between group hover:border-primary/30 transition-colors">
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Workouts Done</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{workoutsThisWeek}</span>
              <span className="text-sm font-medium text-slate-500">This Week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-blue-400 text-2xl">fitness_center</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between group hover:border-primary/30 transition-colors">
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Current Streak</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">12</span>
              <span className="text-sm font-medium text-slate-500">Days</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-orange-400 text-2xl">bolt</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between group hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">AI Motivation Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-primary neon-text-glow">92%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow border border-primary/50">
            <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Middle Column: Current Plan & AI Coach (2 cols wide) */}
        <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
          
          {/* Today's AI Workout Plan */}
          <div className="glass-panel p-6 rounded-3xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Today's AI Protocol</h3>
                  <p className="text-slate-400 text-xs">Generated based on your recent performance</p>
                </div>
              </div>
              <Link href="/dashboard/workouts">
                <button className="text-primary text-sm font-semibold hover:underline">View Full Plan</button>
              </Link>
            </div>

            <div className="bg-background-dark/50 border border-slate-700/50 rounded-2xl p-5 relative z-10 flex flex-col md:flex-row gap-6">
              {activeWorkout ? (
                <>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20 w-max mb-3 uppercase tracking-wider">
                      {activeWorkout.type}
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">{activeWorkout.name}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-6">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-[18px]">timer</span> {activeWorkout.duration} mins</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-[18px]">fitness_center</span> {activeWorkout.exercises ? activeWorkout.exercises.length : 0} Exercises</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-[18px]">signal_cellular_alt</span> AI Gen</span>
                    </div>
                    <button className="bg-primary hover:bg-[#32e612] text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all neon-glow w-full md:w-auto self-start">
                      <span className="material-symbols-outlined">{activeWorkout.isCompleted ? 'check' : 'play_arrow'}</span> {activeWorkout.isCompleted ? 'Completed' : 'Start Workout'}
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-3">
                    {activeWorkout.exercises && activeWorkout.exercises.slice(0, 2).map((ex: any, i: number) => (
                      <div key={i} className="bg-surface-glass rounded-xl p-3 border border-slate-700/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-slate-300 text-lg">image</span>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-white text-sm font-bold truncate">{ex.name}</span>
                          <span className="text-slate-400 text-xs text-primary font-medium">{ex.sets}x{ex.reps}</span>
                        </div>
                      </div>
                    ))}
                    {activeWorkout.exercises && activeWorkout.exercises.length > 2 && (
                      <div className="text-center mt-1">
                        <span className="text-slate-500 text-xs">+{activeWorkout.exercises.length - 2} more exercises</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full text-center py-6">
                  <p className="text-slate-400">No active workout plan generated.</p>
                  <Link href="/dashboard/workouts">
                    <button className="mt-4 bg-primary text-black font-bold py-2 px-4 rounded-lg text-sm">Generate Plan</button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* AI Coach Mini Chat */}
          <div className="glass-panel p-6 rounded-3xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col h-[350px]">
            <div className="flex justify-between items-center pb-4 border-b border-surface-glass-border mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 relative">
                  <span className="material-symbols-outlined text-primary">robot_2</span>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-[#151515]"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Coach Nexus</h3>
                  <p className="text-primary text-xs font-semibold">Online • Ready to assist</p>
                </div>
              </div>
              <Link href="/dashboard/ai-trainer">
                <button className="w-8 h-8 rounded-full bg-surface-glass hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-white text-[18px]">open_in_full</span>
                </button>
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 mb-4 custom-scrollbar">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="material-symbols-outlined text-primary text-sm">robot_2</span>
                </div>
                <div className="bg-surface-glass border border-slate-700/50 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-200">
                  Good morning! Based on your recent logs, I've adjusted your plan for today. Let me know if you are ready to start.
                </div>
              </div>
            </div>

            <div className="relative mt-auto">
              <input readOnly type="text" placeholder="Go to full chat to message AI Coach..." className="w-full bg-background-dark border border-surface-glass-border text-white text-sm rounded-full pl-4 pr-12 py-3 placeholder:text-slate-500 opacity-70 cursor-not-allowed" />
              <Link href="/dashboard/ai-trainer" className="absolute right-2 top-1/2 -translate-y-1/2">
                <button className="w-8 h-8 bg-primary hover:bg-[#32e612] rounded-full flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-black text-[18px]">open_in_new</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Diet & Macros (1 col wide) */}
        <div className="flex flex-col gap-6 lg:gap-8">
          
          <div className="glass-panel p-6 rounded-3xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400">restaurant_menu</span>
                Daily Macros
              </h3>
              <div className="bg-slate-800 rounded-lg p-1 flex items-center gap-2">
                <span className="px-2 text-xs font-semibold text-white">Today</span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6 relative py-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#39FF14" strokeWidth="8" fill="none" strokeDasharray={`${Math.min((totalCalories/CAL_GOAL)*251.2, 251.2)} 251.2`} strokeDashoffset="0" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white">{Math.max(0, CAL_GOAL - totalCalories)}</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Kcal Left</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">Protein</span>
                  <span className="text-white font-bold">{totalProtein}g <span className="text-slate-500 font-normal">/ {PRO_GOAL}g</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]" style={{ width: `${Math.min((totalProtein/PRO_GOAL)*100, 100)}%` }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">Carbs</span>
                  <span className="text-white font-bold">{totalCarbs}g <span className="text-slate-500 font-normal">/ {CARB_GOAL}g</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full shadow-[0_0_5px_rgba(57,255,20,0.5)]" style={{ width: `${Math.min((totalCarbs/CARB_GOAL)*100, 100)}%` }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">Fats</span>
                  <span className="text-white font-bold">{totalFats}g <span className="text-slate-500 font-normal">/ {FAT_GOAL}g</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.5)]" style={{ width: `${Math.min((totalFats/FAT_GOAL)*100, 100)}%` }}></div>
                </div>
              </div>
            </div>

            <Link href="/dashboard/diet">
              <button className="w-full bg-surface-glass border border-slate-700 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition-colors mt-6 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">add_circle</span> Log Meal
              </button>
            </Link>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] bg-gradient-to-br from-[#111] to-[#1a1a1a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">accessibility_new</span>
              <h3 className="text-white font-bold text-lg">Posture Check</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Use AI camera tracking during your next set for real-time form correction.
            </p>
            <div className="bg-background-dark border border-slate-700 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">videocam</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold group-hover:text-primary transition-colors">Start Camera AI</span>
                  <span className="text-xs text-slate-500">Requires permission</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">arrow_forward</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
