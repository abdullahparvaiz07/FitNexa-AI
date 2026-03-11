"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any }
    }
  };

  const popVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        type: "spring" as any, 
        bounce: 0.4,
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-1">
        <div className="@container mb-20">
          <div className="flex flex-col-reverse gap-10 px-4 py-10 lg:py-20 @[864px]:flex-row items-center max-w-[1200px] mx-auto overflow-hidden">
            <motion.div 
              className="flex flex-col gap-8 w-full @[864px]:w-1/2 justify-center relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col gap-4 text-left">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 w-fit mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">FitNexa AI v2.0 Live</span>
                </motion.div>
                <motion.h1 variants={itemVariants} className="text-slate-100 text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  Train Smarter with <span className="text-primary">AI-Powered</span> Fitness
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-lg">
                  Meet your personal AI trainer and dietitian. Hyper-personalized plans, real-time posture analysis, and 24/7 coaching in one premium app.
                </motion.h2>
              </div>
              <motion.div variants={itemVariants} className="flex-wrap gap-4 flex mt-2">
                <Link href="/signup">
                  <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-primary/90 text-slate-900 text-base font-bold neon-glow transition-all hover:scale-105 active:scale-95">
                    <span className="truncate">Start Free</span>
                  </button>
                </Link>
                <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-transparent border-2 border-slate-700 hover:border-primary text-slate-100 hover:text-primary text-base font-bold transition-all hover:scale-105 active:scale-95 group">
                  <span className="material-symbols-outlined mr-2 group-hover:text-primary transition-colors">play_circle</span>
                  <span className="truncate group-hover:text-primary transition-colors">Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full @[864px]:w-1/2 relative flex justify-center items-center"
              variants={popVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full z-0 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="glass-panel rounded-2xl p-4 w-full aspect-auto sm:aspect-square min-h-[450px] max-w-md relative z-10 shadow-[0_20px_50px_-12px_rgba(57,255,20,0.15)] flex flex-col gap-4 overflow-hidden border border-slate-700/50 hover:border-primary/30 transition-colors duration-500">
                <motion.div variants={itemVariants} className="flex justify-between items-center px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">FitNexa Dashboard</div>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full bg-slate-800/50 rounded-xl aspect-[16/9] flex items-end p-4 relative overflow-hidden border border-slate-700/30">
                  <div className="absolute top-4 left-4">
                    <div className="text-xs text-slate-400">Current Heart Rate</div>
                    <div className="text-2xl font-bold text-primary flex items-center gap-1">142 <span className="text-xs text-slate-400 font-normal">bpm</span></div>
                  </div>
                  <div className="flex w-full h-24 items-end gap-2">
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '30%' }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '80%' }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '95%' }} transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }} className="flex-1 bg-primary/40 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_12px_#39FF14]"></div></motion.div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: '70%' }} transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }} className="flex-1 bg-primary/20 rounded-t-sm relative"><div className="absolute top-0 w-full h-1 bg-primary shadow-[0_0_8px_#39FF14]"></div></motion.div>
                  </div>
                </motion.div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:h-full">
                  <motion.div variants={itemVariants} className="w-full sm:w-1/2 bg-slate-800/50 rounded-xl p-4 flex flex-col justify-between border border-slate-700/30 relative overflow-hidden group min-h-[140px]">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-xl transition-all group-hover:bg-primary/20 group-hover:scale-150 duration-500"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-sm group-hover:rotate-12 transition-transform">fitness_center</span>
                      <div className="text-xs text-slate-300">Workout Plan</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 mt-2">Upper Body Power</div>
                      <div className="text-xs text-slate-400 mt-1 mb-2">AI Generated • 45m</div>
                      <div className="mt-2 bg-primary/10 w-fit text-primary px-2 py-1 rounded text-[10px] font-bold group-hover:bg-primary group-hover:text-slate-900 transition-colors cursor-default">START NOW</div>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="w-full sm:w-1/2 bg-slate-800/50 rounded-xl p-3 flex flex-col gap-2 border border-slate-700/30 min-h-[140px] justify-between">
                    <div className="text-xs text-slate-400 mb-1">AI Coach Messages</div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="bg-slate-700/50 rounded-lg rounded-tl-none p-2 text-[10px] text-slate-200 w-11/12 border border-slate-600/50">
                      Your recovery is looking optimal today. Ready to push?
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="bg-primary/20 rounded-lg rounded-tr-none p-2 text-[10px] text-primary w-11/12 self-end text-right border border-primary/30 mt-2">
                      Let's go! I'm ready.
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="max-w-[1200px] mx-auto glass-panel rounded-2xl p-8 mb-20 relative overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
          <div className="flex flex-wrap gap-8 justify-between relative z-10 text-center">
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">AI Accuracy</p>
              <p className="text-primary text-4xl font-black leading-tight neon-text-glow">98%</p>
            </div>
            <div className="hidden md:block w-px bg-slate-700"></div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Workouts</p>
              <p className="text-slate-100 text-4xl font-black leading-tight">500+</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-[1200px] mx-auto flex flex-col gap-12 px-4 py-10 mb-20" 
          id="features"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col gap-4 text-center items-center">
            <motion.h1 variants={itemVariants} className="text-slate-100 text-4xl lg:text-5xl font-black leading-tight max-w-[720px]">
              Why Choose <span className="text-primary">FitNexa AI?</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-400 text-lg font-normal leading-normal max-w-[600px]">Our premium, proprietary AI features help you reach your specific fitness goals faster and safer.</motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">memory</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">AI Workout Generator</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Get highly personalized daily workouts generated by AI based on your equipment, goals, and recovery state.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Smart Diet Planner</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Receive exact macro-calculated meal plans tailored to your body type, goals, and dietary restrictions.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Posture Analyzer</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Use your phone's camera to get real-time AI feedback on your form to prevent injuries and maximize gains.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Progress Tracking</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Track your macro and micro progress with advanced predictive analytics and beautiful glowing charts.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">forum</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">24/7 AI Coach</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Chat with your personal AI coach anytime for motivation, form questions, or on-the-fly workout adjustments.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel group rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(57,255,20,0.3)] hover:border-primary/50 relative overflow-hidden cursor-default">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
              <div className="text-primary w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-100 text-xl font-bold leading-tight">Community Challenges</h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">Join exclusive global challenges, compete on leaderboards, and share your AI-generated achievements.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

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

        <motion.div 
          className="max-w-[1200px] mx-auto relative w-full rounded-3xl overflow-hidden mb-20 p-[1px] bg-gradient-to-r from-primary via-slate-800 to-primary"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="absolute inset-0 bg-primary/10 blur-xl"></div>
          <div className="bg-background-dark rounded-[23px] px-8 py-16 md:py-20 flex flex-col items-center justify-center text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-6">Ready to <span className="text-primary neon-text-glow">Transform</span> Your Body?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl">Join thousands of users who have revolutionized their fitness routines with FitNexa AI. Start your premium experience today.</p>
            <Link href="/signup">
              <button className="flex cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-primary hover:bg-primary/90 text-slate-900 text-lg font-black uppercase tracking-wider neon-glow transition-all transform hover:scale-105">
                Start Free
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
