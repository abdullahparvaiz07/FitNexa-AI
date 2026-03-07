"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/dashboard');
        router.refresh(); // Recommended to force layout refresh
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:flex w-[40%] relative flex-col justify-between p-12 bg-background-dark overflow-hidden border-r border-primary/20" style={{ backgroundImage: 'linear-gradient(to right, rgba(40, 255, 20, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(40, 255, 20, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(40,255,20,0.3)]">
            <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
          </div>
          <Link href="/">
            <h2 className="text-white text-2xl font-bold tracking-tight cursor-pointer">FitNexa <span className="text-primary">AI</span></h2>
          </Link>
        </div>

        <div className="relative z-10 mt-16 mb-auto flex flex-col gap-8 max-w-md">
          <h1 className="text-white text-[42px] font-bold leading-tight tracking-tight">
            Your AI-Powered <br/>Fitness Journey <br/><span className="text-primary">Starts Here.</span>
          </h1>
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[14px]">check</span>
              </div>
              <p className="text-slate-300 text-lg font-medium">Personalized AI Workout Plans</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[14px]">check</span>
              </div>
              <p className="text-slate-300 text-lg font-medium">Smart Diet & Nutrition Tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[14px]">check</span>
              </div>
              <p className="text-slate-300 text-lg font-medium">Real-time Posture Analysis</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 mt-12 w-full max-w-lg">
          <div className="glass-panel rounded-2xl p-5 transform hover:-translate-y-1 transition-transform duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">local_fire_department</span>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Calories Burned</p>
            </div>
            <p className="text-white text-3xl font-bold">850 <span className="text-primary text-lg font-medium">kcal</span></p>
          </div>
          <div className="glass-panel rounded-2xl p-5 transform translate-y-4 hover:translate-y-3 transition-transform duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Current Streak</p>
            </div>
            <p className="text-white text-3xl font-bold">14 <span className="text-primary text-lg font-medium">Days</span></p>
          </div>
          <div className="glass-panel rounded-2xl p-5 col-span-2 mt-2 transform hover:-translate-y-1 transition-transform duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">AI Optimization Score</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-bold">98<span className="text-slate-500 text-xl">/100</span></p>
              <div className="w-2/3 h-2 bg-background-dark rounded-full overflow-hidden border border-primary/20">
                <div className="h-full bg-primary w-[98%] shadow-[0_0_15px_rgba(40,255,20,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex items-center justify-center bg-[#111111] relative">
        <div className="absolute top-6 left-6 flex lg:hidden items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">fitness_center</span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight">FitNexa <span className="text-primary">AI</span></h2>
        </div>

        <div className="w-full max-w-[480px] p-8 sm:p-10 glass-panel rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-slate-800 relative z-10 m-4">
          <div className="mb-10 text-center">
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-3">Welcome Back <span className="inline-block animate-bounce">👋</span></h2>
            <p className="text-slate-400 text-base">Sign in to continue your fitness journey</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-sm font-medium">or continue with email</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium pl-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3.5 bg-background-dark border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none shadow-sm" 
                  id="email" 
                  placeholder="alex@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium pl-1" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-12 py-3.5 bg-background-dark border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none shadow-sm" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-primary transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 pb-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input className="peer appearance-none w-5 h-5 border-2 border-slate-600 rounded bg-transparent checked:bg-primary checked:border-primary focus:ring-offset-background-dark focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer" type="checkbox"/>
                  <span className="material-symbols-outlined text-background-dark text-sm absolute opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
            </div>
            <button 
              className="w-full py-4 px-4 bg-primary hover:bg-[#20e50f] text-background-dark font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark shadow-[0_0_15px_rgba(40,255,20,0.3)] disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In to FitNexa'}
            </button>
          </form>
          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account? 
            <Link href="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors ml-1">Sign up for Premium</Link>
          </p>
        </div>
        
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-[50px] pointer-events-none"></div>
      </div>
    </div>
  );
}
