import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-1">
        <div className="@container mb-20">
          <div className="flex flex-col-reverse gap-10 px-4 py-10 lg:py-20 @[864px]:flex-row items-center max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-8 w-full @[864px]:w-1/2 justify-center relative z-10">
              <div className="flex flex-col gap-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 w-fit mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">FitNexa AI v2.0 Live</span>
                </div>
                <h1 className="text-slate-100 text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  Train Smarter with <span className="text-primary">AI-Powered</span> Fitness
                </h1>
                <h2 className="text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-lg">
                  Meet your personal AI trainer and dietitian. Hyper-personalized plans, real-time posture analysis, and 24/7 coaching in one premium app.
                </h2>
              </div>
              <div className="flex-wrap gap-4 flex">
                <Link href="/signup">
                  <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-primary/90 text-slate-900 text-base font-bold neon-glow transition-all">
                    <span className="truncate">Start Free Trial</span>
                  </button>
                </Link>
                <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-transparent border-2 border-slate-700 hover:border-primary text-slate-100 hover:text-primary text-base font-bold transition-all">
                  <span className="material-symbols-outlined mr-2">play_circle</span>
                  <span className="truncate">Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Qiqty2olr1WeeTs2KSfnmYTDqvIw6f7xgsok2yM9mGUDeYTT_iM-lUeux7JslyPOVUO5JfN4kVuvAw2txgq_cacvvZGDo6kmWhH1WVdETL5AQcPX8mMKBTW8JQsDXT2l-xkwrSPT4mGI_4J0GAlv0sAQcVGaoQHK4WjPfpgz3ZV_uMMdAEc_08HRvaMlrIIp2Is_0jIm2urT8K4vP-n2CCJpZ1kgHjoQKLf8CWUz_K81Mkoll8DCCSs5qCmnmwJeaxu8ugvsUe4" alt="User portrait" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcIkfP4tB0u2NXeKLuLn0wH8FQsqaWviPTjdq1i3mZOnQZ_34qxwPSnBC2Vh8W-KMcVYv1Eo15zvjm2u_nVahzHxq6qHLV0paTTAbCvBI4TTKVJGwR5v_ZfoPFu-EDnvXbgnjAUgR6g-dT-LMcGhy1oEFO9HF3UXhr_3a4VeZHq1R_kqUPJMCRmYyU_ff4Eh3Zs3ZTsDwaWITVuPVvi1D035zviSg0kpojplSqsLVuadSfwWBiTS6zqzaAmIrX8eUIOxlGaYEoDuA" alt="User portrait" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-vqCIfKGd2N5hOEngjjv3OlDQTHoMuLFtGYEbhMVbs3-rjS-i7J8WxghvNeGWpSn1RYQ41kIhQkradLtMoUQanpEPV_fGGQ13OHuJ3T0f1_kc_iJI8j03uMz8Tt0RwFcUiosedka1JfXkZaZw-UfbKclSD3jKJeFvIIEsyCsXo9UpMdKXhbXqxpqgH4RVVgvQG5ms8-SfwUV0BCZt5tq5YkV5gFOswi_gPrrdncOVSY4vuy3aMx6H9HzC05VHuX4ToQVDG8bR05I" alt="User portrait" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 z-10 relative">+2k</div>
                </div>
                <div className="text-sm text-slate-400">Trusted by <span className="text-slate-100 font-semibold">50,000+</span> athletes.</div>
              </div>
            </div>
            
            <div className="w-full @[864px]:w-1/2 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full z-0"></div>
              <div className="glass-panel rounded-2xl p-4 w-full aspect-square max-w-md relative z-10 shadow-2xl flex flex-col gap-4 overflow-hidden border border-slate-700/50">
                <div className="flex justify-between items-center px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">FitNexa Dashboard</div>
                </div>
                <div className="w-full bg-slate-800/50 rounded-xl aspect-[16/9] flex items-end p-4 relative overflow-hidden border border-slate-700/30">
                  <div className="absolute top-4 left-4">
                    <div className="text-xs text-slate-400">Current Heart Rate</div>
                    <div className="text-2xl font-bold text-primary flex items-center gap-1">142 <span className="text-xs text-slate-400 font-normal">bpm</span></div>
                  </div>
                  <div className="flex w-full h-24 items-end gap-2">
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[30%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[40%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[60%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[50%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[80%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/40 rounded-t-sm h-[95%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_12px_#39FF14]"></div></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[70%] relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></div>
                  </div>
                </div>
                <div className="flex gap-4 w-full h-full">
                  <div className="w-1/2 bg-slate-800/50 rounded-xl p-4 flex flex-col justify-between border border-slate-700/30 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-sm">fitness_center</span>
                      <div className="text-xs text-slate-300">Workout Plan</div>
                    </div>
                    <div className="text-sm font-semibold text-slate-100">Upper Body Power</div>
                    <div className="text-xs text-slate-400 mt-1">AI Generated • 45m</div>
                    <div className="mt-4 bg-primary/10 w-fit text-primary px-2 py-1 rounded text-[10px] font-bold">START NOW</div>
                  </div>
                  <div className="w-1/2 bg-slate-800/50 rounded-xl p-3 flex flex-col gap-2 border border-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1">AI Coach Messages</div>
                    <div className="bg-slate-700/50 rounded-lg rounded-tl-none p-2 text-[10px] text-slate-200 w-11/12 border border-slate-600/50">
                      Your recovery is looking optimal today. Ready to push?
                    </div>
                    <div className="bg-primary/20 rounded-lg rounded-tr-none p-2 text-[10px] text-primary w-11/12 self-end text-right border border-primary/30">
                      Let's go! I'm ready.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto glass-panel rounded-2xl p-8 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
          <div className="flex flex-wrap gap-8 justify-between relative z-10 text-center">
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Users</p>
              <p className="text-slate-100 text-4xl font-black leading-tight">50K+</p>
            </div>
            <div className="hidden sm:block w-px bg-slate-700"></div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">AI Accuracy</p>
              <p className="text-primary text-4xl font-black leading-tight neon-text-glow">98%</p>
            </div>
            <div className="hidden md:block w-px bg-slate-700"></div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Workouts</p>
              <p className="text-slate-100 text-4xl font-black leading-tight">500+</p>
            </div>
            <div className="hidden sm:block w-px bg-slate-700"></div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">User Rating</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-slate-100 text-4xl font-black leading-tight">4.9</p>
                <span className="material-symbols-outlined text-primary text-3xl">star</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 px-4 py-10 mb-20" id="features">
          <div className="flex flex-col gap-4 text-center items-center">
            <h1 className="text-slate-100 text-4xl lg:text-5xl font-black leading-tight max-w-[720px]">
              Why Choose <span className="text-primary">FitNexa AI?</span>
            </h1>
            <p className="text-slate-400 text-lg font-normal leading-normal max-w-[600px]">Our premium, proprietary AI features help you reach your specific fitness goals faster and safer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">memory</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">AI Workout Generator</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Get highly personalized daily workouts generated by AI based on your equipment, goals, and recovery state.</p>
              </div>
            </div>
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Smart Diet Planner</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Receive exact macro-calculated meal plans tailored to your body type, goals, and dietary restrictions.</p>
              </div>
            </div>
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Posture Analyzer</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Use your phone's camera to get real-time AI feedback on your form to prevent injuries and maximize gains.</p>
              </div>
            </div>
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Progress Tracking</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Track your macro and micro progress with advanced predictive analytics and beautiful glowing charts.</p>
              </div>
            </div>
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">forum</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">24/7 AI Coach</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Chat with your personal AI coach anytime for motivation, form questions, or on-the-fly workout adjustments.</p>
              </div>
            </div>
            <div className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Community Challenges</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Join exclusive global challenges, compete on leaderboards, and share your AI-generated achievements.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 px-4 py-10 mb-20">
          <div className="flex flex-col gap-4 text-center items-center">
            <h1 className="text-slate-100 text-4xl lg:text-5xl font-black leading-tight max-w-[720px]">
              Get Fit in <span className="text-primary">3 Steps</span>
            </h1>
            <p className="text-slate-400 text-lg font-normal leading-normal max-w-[600px]">It's never been easier to start a comprehensive fitness journey.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-slate-800 z-0">
              <div className="h-full bg-primary/50 w-full animate-pulse shadow-[0_0_10px_#39FF14]"></div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel border-2 border-primary flex items-center justify-center text-4xl font-black text-primary neon-glow shadow-primary/20 bg-background-dark">
                1
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Create Profile</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Input your vitals, goals, and available equipment to inform the AI.</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel border-2 border-primary flex items-center justify-center text-4xl font-black text-primary neon-glow shadow-primary/20 bg-background-dark">
                2
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Get Your Plan</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Instantly receive your hyper-personalized workout and diet protocol.</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel border-2 border-primary flex items-center justify-center text-4xl font-black text-primary neon-glow shadow-primary/20 bg-background-dark">
                3
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Start Training</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Follow the app, get real-time feedback, and watch the results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto relative w-full rounded-3xl overflow-hidden mb-20 p-[1px] bg-gradient-to-r from-primary via-slate-800 to-primary">
          <div className="absolute inset-0 bg-primary/10 blur-xl"></div>
          <div className="bg-background-dark rounded-[23px] px-8 py-16 md:py-20 flex flex-col items-center justify-center text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-6">Ready to <span className="text-primary neon-text-glow">Transform</span> Your Body?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl">Join thousands of users who have revolutionized their fitness routines with FitNexa AI. Start your premium experience today.</p>
            <Link href="/signup">
              <button className="flex cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-primary hover:bg-primary/90 text-slate-900 text-lg font-black uppercase tracking-wider neon-glow transition-all transform hover:scale-105">
                Start Free 14-Day Trial
              </button>
            </Link>
            <p className="text-slate-500 text-sm mt-4">No credit card required for trial.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
