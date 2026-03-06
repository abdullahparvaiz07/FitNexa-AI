"use client";

import { useState, useEffect } from 'react';

type ProgressEntry = {
  id: string;
  weight: number;
  bodyFat: number | null;
  notes: string | null;
  date: string;
};

type WorkoutEntry = {
  id: string;
  name: string;
  duration: number;
  type: string;
  isCompleted: boolean;
  completedAt: string | null;
};

export default function AnalyticsPage() {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [progressRes, workoutsRes] = await Promise.all([
        fetch('/api/progress'),
        fetch('/api/workouts'),
      ]);
      if (progressRes.ok) setProgress(await progressRes.json());
      if (workoutsRes.ok) setWorkouts(await workoutsRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: parseFloat(newWeight), bodyFat: newBodyFat ? parseFloat(newBodyFat) : undefined, notes: newNotes }),
      });
      if (res.ok) {
        setShowLogModal(false);
        setNewWeight(''); setNewBodyFat(''); setNewNotes('');
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

  const totalWorkouts = workouts.length;
  const latestWeight = progress[0]?.weight;
  const latestBodyFat = progress[0]?.bodyFat;
  const weightChange = progress.length > 1 ? (progress[0].weight - progress[progress.length - 1].weight).toFixed(1) : null;

  // Build weight chart points from progress data (normalized to 0-100 SVG height)
  const weightForChart = [...progress].reverse().slice(-7);
  const maxW = Math.max(...weightForChart.map(p => p.weight), 1);
  const minW = Math.min(...weightForChart.map(p => p.weight), 0);
  const chartPoints = weightForChart.map((p, i) => {
    const x = weightForChart.length < 2 ? 50 : (i / (weightForChart.length - 1)) * 100;
    const y = maxW === minW ? 50 : 90 - ((p.weight - minW) / (maxW - minW)) * 80;
    return `${x},${y}`;
  }).join(' ');

  // Day frequency bar chart (last 7 days)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayWorkoutCounts = days.map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (today.getDay() - 1 - i + 7) % 7);
    return workouts.filter(w => w.completedAt && new Date(w.completedAt).toDateString() === d.toDateString()).length;
  });
  const maxCount = Math.max(...dayWorkoutCounts, 1);

  return (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">Progress Analytics <span className="text-2xl">📊</span></h2>
          <p className="text-slate-400 mt-1">Track your fitness journey and AI insights</p>
        </div>
        <button
          onClick={() => setShowLogModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-black font-bold hover:bg-[#32e612] transition-colors text-sm shadow-[0_0_15px_rgba(56,255,20,0.3)]"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Log Today's Progress
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-2 group hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Workouts</p>
            <span className="material-symbols-outlined text-primary/70 group-hover:text-primary transition-colors">fitness_center</span>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">{isLoading ? '...' : totalWorkouts}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-2 group hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Current Weight</p>
            <span className="material-symbols-outlined text-orange-400/70 group-hover:text-orange-400 transition-colors">monitor_weight</span>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">{isLoading ? '...' : latestWeight ? `${latestWeight} lbs` : 'N/A'}</h3>
            {weightChange && <span className={`text-sm font-medium flex items-center mb-1 ${parseFloat(weightChange) < 0 ? 'text-primary' : 'text-red-400'}`}><span className="material-symbols-outlined text-sm">{parseFloat(weightChange) < 0 ? 'arrow_downward' : 'arrow_upward'}</span> {Math.abs(parseFloat(weightChange))} lbs</span>}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-2 group hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Body Fat</p>
            <span className="material-symbols-outlined text-blue-400/70 group-hover:text-blue-400 transition-colors">trending_up</span>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">{isLoading ? '...' : latestBodyFat ? `${latestBodyFat}%` : 'N/A'}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-2 group hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Progress Logs</p>
            <span className="material-symbols-outlined text-purple-400/70 group-hover:text-purple-400 transition-colors">bar_chart</span>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">{isLoading ? '...' : progress.length}</h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <h3 className="text-lg font-bold text-white mb-6">Workout Frequency (This Week)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {days.map((day, i) => {
              const count = dayWorkoutCounts[i];
              const heightPct = Math.round((count / maxCount) * 100);
              const barHeight = Math.max(heightPct, 5);
              return (
                <div key={day} className="w-full flex flex-col items-center gap-2 group">
                  <div
                    className={`w-full rounded-t-md transition-all group-hover:shadow-[0_0_15px_rgba(56,255,20,0.6)] ${count > 0 ? 'bg-primary group-hover:bg-[#32e612]' : 'bg-primary/10 group-hover:bg-primary/25'}`}
                    style={{ height: `${barHeight}%` }}
                  />
                  <span className="text-xs text-slate-400 font-medium">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Body Weight Trend</h3>
            {latestWeight && <span className="text-xs text-slate-400 border border-slate-700 rounded-md px-2.5 py-1 bg-slate-800/50">Current: {latestWeight} lbs</span>}
          </div>
          {progress.length < 2 ? (
            <div className="h-64 flex items-center justify-center flex-col gap-2">
              <span className="material-symbols-outlined text-4xl text-slate-600">show_chart</span>
              <p className="text-slate-500 text-sm">Log your weight at least twice to see a trend chart.</p>
            </div>
          ) : (
            <div className="h-64 relative w-full border-b border-l border-slate-800 pb-2 pl-2 flex flex-col justify-end overflow-hidden">
              <svg className="w-full h-full text-primary z-10 relative overflow-visible drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#39FF14" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline points={chartPoints} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {weightForChart.map((p, i) => {
                  const x = weightForChart.length < 2 ? 50 : (i / (weightForChart.length - 1)) * 100;
                  const y = maxW === minW ? 50 : 90 - ((p.weight - minW) / (maxW - minW)) * 80;
                  return <circle key={p.id} cx={x} cy={y} r="3" fill="currentColor" />;
                })}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Recent Progress Logs */}
      <div className="glass-panel p-6 rounded-xl border border-surface-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <h3 className="text-lg font-bold text-white mb-4">Recent Progress Logs</h3>
        {isLoading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : progress.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <span className="material-symbols-outlined text-4xl text-slate-600">monitoring</span>
            <p className="text-slate-400 text-sm">No progress logged yet. Click "Log Today's Progress" to start!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Date</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Weight</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Body Fat</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {progress.slice(0, 10).map(p => (
                  <tr key={p.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-slate-300">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="py-3 px-3 text-white font-medium">{p.weight} lbs</td>
                    <td className="py-3 px-3 text-slate-300">{p.bodyFat ? `${p.bodyFat}%` : '—'}</td>
                    <td className="py-3 px-3 text-slate-400">{p.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Progress Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md border border-primary/30 shadow-[0_0_40px_rgba(56,255,20,0.1)]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white font-bold text-lg">Log Progress</h3>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleLogProgress} className="flex flex-col gap-4">
              <div>
                <label className="text-slate-400 text-sm font-medium mb-1.5 block">Weight (lbs) *</label>
                <input
                  type="number" step="0.1" required value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 178.5"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium mb-1.5 block">Body Fat % (optional)</label>
                <input
                  type="number" step="0.1" value={newBodyFat}
                  onChange={e => setNewBodyFat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 18.2"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium mb-1.5 block">Notes (optional)</label>
                <textarea
                  value={newNotes} onChange={e => setNewNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  rows={2} placeholder="How did you feel today?"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowLogModal(false)} className="flex-1 py-2.5 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-primary text-black font-bold rounded-lg text-sm hover:bg-[#32e612] transition-colors shadow-[0_0_15px_rgba(56,255,20,0.3)]">Save Progress</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
