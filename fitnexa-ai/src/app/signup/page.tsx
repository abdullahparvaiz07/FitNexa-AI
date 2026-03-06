"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Redirect to login after successful register
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="hidden lg:flex w-[40%] flex-col justify-between p-12 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(57, 255, 20, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-[#111111]">
              <span className="material-symbols-outlined font-bold text-2xl">fitness_center</span>
            </div>
            <Link href="/">
              <span className="text-2xl font-bold tracking-wider text-white cursor-pointer">FitNexa<span className="text-primary neon-text-glow"> AI</span></span>
            </Link>
          </div>
          
          <div className="flex flex-col gap-4 mb-12">
            <h1 className="text-white text-5xl font-black leading-tight tracking-tight">
              Join 50,000+<br/>Fitness Enthusiasts
            </h1>
          </div>

          <div className="glass-panel rounded-xl p-6 mb-12 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg">AI Plan Ready</p>
                <p className="text-slate-400 text-sm">Generating optimal workout...</p>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 glass-panel rounded-lg p-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-700 border-t-primary border-r-primary flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">85%</span>
                </div>
                <p className="text-slate-400 text-xs uppercase tracking-wider">Intensity</p>
              </div>
              <div className="flex-1 glass-panel rounded-lg p-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-700 border-t-primary border-l-primary flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">92%</span>
                </div>
                <p className="text-slate-400 text-xs uppercase tracking-wider">Recovery</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-primary/60 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <p className="text-white text-base font-medium">Free 14-Day Trial</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">credit_card_off</span>
              <p className="text-white text-base font-medium">No Credit Card Required</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">event_busy</span>
              <p className="text-white text-base font-medium">Cancel Anytime</p>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-slate-500 text-sm mt-auto pt-8">
          © {new Date().getFullYear()} FitNexa AI. All rights reserved.
        </div>
      </div>

      <div className="flex-1 w-full lg:w-[60%] flex flex-col justify-center items-center p-6 sm:p-12 relative bg-background-dark">
        <div className="w-full max-w-[480px] glass-panel rounded-2xl p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-[#111111]">
              <span className="material-symbols-outlined font-bold text-xl">fitness_center</span>
            </div>
            <span className="text-xl font-bold tracking-wider text-white">FitNexa<span className="text-primary neon-text-glow"> AI</span></span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-white text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-slate-400 text-base">Start your AI fitness journey today</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 glass-panel hover:bg-white/10 transition-colors rounded-xl h-12 px-6 text-white font-medium mb-6 border border-white/20">
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-slate-500 text-sm">or sign up with email</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">person</span>
              </div>
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                placeholder="Full Name" 
                required 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">mail</span>
              </div>
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                placeholder="Email Address" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">lock</span>
              </div>
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                placeholder="Password" 
                required 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative mt-7">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">shield</span>
              </div>
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                placeholder="Confirm Password" 
                required 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input className="w-5 h-5 rounded bg-white/5 border-white/20 text-primary focus:ring-primary focus:ring-offset-background-dark cursor-pointer" id="terms" type="checkbox" required />
              </div>
              <label className="text-sm text-slate-400 cursor-pointer" htmlFor="terms">
                I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>
              </label>
            </div>

            <button 
              className="w-full h-12 mt-4 bg-primary text-[#111111] font-bold text-lg rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-8 text-sm">
            Already have an account? <Link href="/login" className="text-primary font-medium hover:underline neon-text-glow">Sign In</Link>
          </p>
        </div>

        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    </div>
  );
}
