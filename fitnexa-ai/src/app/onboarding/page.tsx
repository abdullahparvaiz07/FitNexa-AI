"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const predefinedGoals = [
  { id: 'lose_weight', title: 'Lose Weight', desc: 'Burn fat and slim down efficiently.', icon: 'local_fire_department' },
  { id: 'build_muscle', title: 'Build Muscle', desc: 'Increase muscle mass and strength.', icon: 'fitness_center' },
  { id: 'improve_endurance', title: 'Improve Endurance', desc: 'Boost stamina and heart health.', icon: 'favorite' },
  { id: 'improve_flexibility', title: 'Improve Flexibility', desc: 'Enhance mobility and stretch.', icon: 'accessibility_new' },
  { id: 'strength_training', title: 'Strength Training', desc: 'Build overall functional strength.', icon: 'sports_gymnastics' },
  { id: 'overall_wellness', title: 'Overall Wellness', desc: 'Maintain a balanced, healthy lifestyle.', icon: 'self_improvement' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['build_muscle']);
  const [timeline, setTimeline] = useState('3months');
  const [motivation, setMotivation] = useState(70);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    // In a real app, we would save this to the user profile
    router.push('/dashboard');
  };

  return (
    <div className="bg-background-dark text-slate-100 font-display min-h-screen relative overflow-x-hidden" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%231f2937' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}>
      <div className="fixed top-24 right-8 bg-slate-800/40 backdrop-blur-md rounded-xl p-4 w-64 z-50 border border-primary/20 shadow-lg hidden md:block">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm font-medium text-slate-300">Your AI is analyzing your selections...</p>
        </div>
      </div>

      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
            <div className="flex flex-col w-full max-w-[1024px] flex-1 relative z-10">
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-800 pb-4 mb-8">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-3xl neon-text-glow">fitness_center</span>
                  <Link href="/">
                    <h2 className="text-slate-100 text-2xl font-bold leading-tight tracking-tight cursor-pointer">FitNexa <span className="text-primary">AI</span></h2>
                  </Link>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
                  <span>Need help?</span>
                  <a className="text-primary hover:underline" href="#">Contact Support</a>
                </div>
              </header>

              <div className="w-full mb-10">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-slate-100 text-lg font-medium leading-normal">Fitness Goals</p>
                  <p className="text-primary text-sm font-bold leading-normal bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_8px_rgba(57,255,20,0.2)]">Step 2 of 4</p>
                </div>
                
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full z-0"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[33%] h-1 bg-primary rounded-full z-0 shadow-[0_0_15px_rgba(57,255,20,0.4)]"></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-background-dark flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                      <span className="material-symbols-outlined text-lg">check</span>
                    </div>
                    <span className="text-xs text-primary font-medium hidden sm:block">Profile</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-background-dark border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                      2
                    </div>
                    <span className="text-xs text-primary font-bold hidden sm:block">Fitness Goals</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-700">
                      3
                    </div>
                    <span className="text-xs text-slate-500 font-medium hidden sm:block">Body Stats</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-700">
                      4
                    </div>
                    <span className="text-xs text-slate-500 font-medium hidden sm:block">AI Plan</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 md:p-10 w-full mb-8 border border-white/5">
                <div className="flex flex-col gap-3 mb-10 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <h1 className="text-slate-100 text-3xl md:text-4xl font-black leading-tight tracking-tight">What are your fitness goals?</h1>
                    <span className="material-symbols-outlined text-primary text-3xl neon-text-glow">auto_awesome</span>
                  </div>
                  <p className="text-slate-400 text-base md:text-lg font-normal leading-normal">Select all that apply — your AI trainer will personalize your plan based on these.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                  {predefinedGoals.map(goal => {
                    const isSelected = selectedGoals.includes(goal.id);
                    return (
                      <div 
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`rounded-xl p-5 flex flex-col gap-4 cursor-pointer relative overflow-hidden group transition-all duration-300 border ${isSelected ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(57,255,20,0.2)]' : 'border-primary/10 bg-slate-900/60 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]'}`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 text-primary animate-pulse">
                            <span className="material-symbols-outlined hidden sm:block">check_circle</span>
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform ${isSelected ? 'bg-primary/20' : 'bg-slate-800/80'}`}>
                          <span className="material-symbols-outlined text-2xl">{goal.icon}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-slate-100 text-lg font-bold leading-tight">{goal.title}</h2>
                          <p className={`text-sm font-normal leading-normal ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{goal.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-10">
                  <h3 className="text-slate-100 text-lg font-bold mb-4">When do you want to achieve this?</h3>
                  <div className="flex flex-wrap gap-3">
                    {['1month', '3months', '6months', '1year'].map(val => (
                      <label key={val} className="flex-1 min-w-[120px]">
                        <input 
                          className="peer sr-only" 
                          name="timeline" 
                          type="radio" 
                          value={val}
                          checked={timeline === val}
                          onChange={(e) => setTimeline(e.target.value)}
                        />
                        <div className="h-12 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 cursor-pointer peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary peer-checked:shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-all hover:bg-slate-800">
                          <span className={timeline === val ? "font-bold" : "font-medium"}>
                            {val === '1month' ? '1 Month' : val === '3months' ? '3 Months' : val === '6months' ? '6 Months' : '1 Year'}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-slate-100 text-lg font-bold">Current Motivation Level</h3>
                    <span className="text-primary font-medium">Ready to crush it ({motivation}/100)</span>
                  </div>
                  <div className="w-full relative h-6 flex items-center">
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-primary rounded-full shadow-[0_0_15px_rgba(57,255,20,0.4)]" style={{ width: `${motivation}%` }}></div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={motivation} 
                      onChange={(e) => setMotivation(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute w-6 h-6 bg-background-dark border-2 border-primary rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)] -translate-x-1/2 cursor-pointer pointer-events-none"
                      style={{ left: `${motivation}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium uppercase tracking-wider">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pb-10">
                <Link href="/signup">
                  <button className="px-6 py-3 rounded-full text-slate-300 font-medium hover:text-white transition-colors flex items-center gap-2 border border-transparent hover:border-slate-700 hover:bg-slate-800/50">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                </Link>
                <button 
                  onClick={handleContinue}
                  className="px-8 py-3 rounded-full bg-primary text-background-dark font-bold hover:bg-[#32e612] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(57,255,20,0.4)] cursor-pointer"
                >
                  Continue to Body Stats
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
