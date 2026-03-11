"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type DietEntry = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
};

const CALORIE_GOAL = 2200;
const PROTEIN_GOAL = 160;
const CARBS_GOAL = 200;
const FAT_GOAL = 70;

export default function DietPlannerPage() {
  const [diets, setDiets] = useState<DietEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diet');
      if (res.ok) setDiets(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const todaysDiets = diets.filter(d => new Date(d.date).toDateString() === new Date().toDateString());
  const totalCalories = todaysDiets.reduce((sum, d) => sum + d.calories, 0);
  const totalProtein = todaysDiets.reduce((sum, d) => sum + d.protein, 0);
  const totalCarbs = todaysDiets.reduce((sum, d) => sum + d.carbs, 0);
  const totalFats = todaysDiets.reduce((sum, d) => sum + d.fats, 0);
  const caloriePct = Math.min(Math.round((totalCalories / CALORIE_GOAL) * 100), 100);

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.calories) return;
    try {
      const res = await fetch('/api/diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          calories: parseInt(form.calories),
          protein: parseInt(form.protein) || 0,
          carbs: parseInt(form.carbs) || 0,
          fats: parseInt(form.fats) || 0,
        }),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ name: '', calories: '', protein: '', carbs: '', fats: '' });
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

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
      className="flex flex-col gap-6 lg:gap-8 max-w-6xl mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-1">AI Diet Planner 🥗</h1>
          <p className="text-primary text-base font-medium">Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-[#32e612] text-black px-6 py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(56,255,20,0.5)] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Log a Meal
        </button>
      </motion.div>

      {/* Macro Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Calories', current: totalCalories, goal: CALORIE_GOAL, unit: 'kcal', color: 'bg-primary', glow: '#39FF14' },
          { label: 'Protein', current: totalProtein, goal: PROTEIN_GOAL, unit: 'g', color: 'bg-blue-500', glow: '#3b82f6' },
          { label: 'Carbs', current: totalCarbs, goal: CARBS_GOAL, unit: 'g', color: 'bg-primary', glow: '#39FF14' },
          { label: 'Fat', current: totalFats, goal: FAT_GOAL, unit: 'g', color: 'bg-orange-500', glow: '#f97316' },
        ].map(stat => (
          <div key={stat.label} className="glass-panel rounded-xl p-5 border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{isLoading ? '...' : stat.current.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ {stat.goal}{stat.unit}</span></p>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
              <div className={`${stat.color} h-1.5 rounded-full shadow-[0_0_8px_var(--glow)]`} style={{ width: `${Math.min((stat.current / stat.goal) * 100, 100)}%`, boxShadow: `0 0 8px ${stat.glow}` }} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Today's Meals Log */}
      <motion.div variants={itemVariants} className="glass-panel rounded-xl p-6 border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-bold text-white mb-4">Today's Meals</h2>
        {isLoading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : todaysDiets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <span className="material-symbols-outlined text-4xl text-slate-600">restaurant</span>
            <p className="text-slate-400 text-sm">No meals logged today. Click "Log a Meal" to get started!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todaysDiets.map(diet => (
              <div key={diet.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-primary/30 transition-colors">
                <div>
                  <p className="font-medium text-white">{diet.name}</p>
                  <p className="text-slate-400 text-xs mt-1">{diet.protein}g P · {diet.carbs}g C · {diet.fats}g F</p>
                </div>
                <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">{diet.calories} kcal</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Macro donut + summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-6 border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <h3 className="text-white font-bold text-lg mb-6">Macro Breakdown</h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#f97316" strokeWidth="12" fill="none" strokeDasharray={`${(totalFats / (totalCalories || 1)) * 251.2} 251.2`} strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="12" fill="none" strokeDasharray={`${(totalProtein / (totalCalories || 1)) * 251.2 * 4} 251.2`} strokeDashoffset={`${-(totalFats / (totalCalories || 1)) * 251.2}`} />
                <circle cx="50" cy="50" r="40" stroke="#39FF14" strokeWidth="12" fill="none" strokeDasharray={`${(totalCarbs / (totalCalories || 1)) * 251.2 * 4} 251.2`} strokeDashoffset={`${-((totalFats + totalProtein * 4) / (totalCalories || 1)) * 251.2}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{caloriePct}%</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {[
                { label: 'Protein', val: `${totalProtein}g`, color: 'bg-blue-500', glow: '#3b82f6' },
                { label: 'Carbs', val: `${totalCarbs}g`, color: 'bg-primary', glow: '#39FF14' },
                { label: 'Fat', val: `${totalFats}g`, color: 'bg-orange-500', glow: '#f97316' },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.glow, boxShadow: `0 0 8px ${m.glow}` }} />
                    <span className="text-slate-300 text-sm font-medium">{m.label}</span>
                  </div>
                  <span className="text-white text-sm font-bold">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 relative overflow-hidden border border-primary/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute -right-10 -top-10 text-primary/10 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">smart_toy</span>
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-background-dark border border-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,255,20,0.3)]">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1.5 flex items-center gap-2">
                AI Nutrition Tip
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {totalCalories < CALORIE_GOAL * 0.7
                  ? `You're ${CALORIE_GOAL - totalCalories} kcal below your goal. Add a protein-rich meal or snack to fuel your recovery.`
                  : totalProtein < PROTEIN_GOAL
                  ? `You're ${PROTEIN_GOAL - totalProtein}g short on protein today. Consider a lean protein source like grilled chicken or a whey shake.`
                  : `Great work! You're on track with your nutrition goals today. Keep it up! 🎯`}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Log Meal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md border border-primary/30 shadow-[0_0_40px_rgba(56,255,20,0.1)]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white font-bold text-lg">Log a Meal</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleLog} className="flex flex-col gap-4">
              <div>
                <label className="text-slate-400 text-sm font-medium mb-1.5 block">Meal Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., Grilled Chicken with Rice" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'calories', label: 'Calories (kcal) *', placeholder: '450' },
                  { key: 'protein', label: 'Protein (g)', placeholder: '30' },
                  { key: 'carbs', label: 'Carbs (g)', placeholder: '50' },
                  { key: 'fats', label: 'Fat (g)', placeholder: '15' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-slate-400 text-xs font-medium mb-1 block">{f.label}</label>
                    <input type="number" min="0" required={f.key === 'calories'} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder={f.placeholder} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-primary text-black font-bold rounded-lg text-sm hover:bg-[#32e612] transition-colors shadow-[0_0_15px_rgba(56,255,20,0.3)]">Log Meal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
