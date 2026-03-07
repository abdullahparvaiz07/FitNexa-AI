export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-auto bg-background-dark py-12 px-4 md:px-10 lg:px-20 xl:px-40 z-10 relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-slate-100">
          <div className="size-6 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">psychology</span>
          </div>
          <h2 className="text-slate-100 text-lg font-bold leading-tight">FitNexa AI</h2>
        </div>
        <div className="flex gap-6">
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Terms of Service</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Contact Support</a>
        </div>
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} FitNexa AI. All rights reserved.
        </div>
      </div>
      
      {/* Author & Demo Details */}
      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500 bg-background-dark/50 backdrop-blur-sm rounded-xl p-4 border border-surface-glass-border">
        <div className="flex flex-col gap-1">
          <strong className="text-primary text-sm tracking-wide uppercase">Developed By</strong>
          <span className="text-slate-300 font-medium text-base">Abdullah Parvaiz</span>
          <div className="flex items-center gap-3 mt-1">
            <a href="mailto:abdullahparvaizofficial@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              abdullahparvaizofficial@gmail.com
            </a>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">call</span>
              +923021433046
            </span>
          </div>
        </div>
        
        <div className="flex flex-col shrink-0 gap-1 bg-slate-900/80 p-3 rounded-lg border border-slate-700 w-full md:w-auto">
          <strong className="text-slate-300 flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[16px] text-primary">key</span>
            Demo Account Login
          </strong>
          <div className="flex justify-between md:justify-start gap-4">
            <span className="text-slate-500">Email:</span>
            <span className="text-white font-mono select-all">abdullahparvaizofficial@gmail.com</span>
          </div>
          <div className="flex justify-between md:justify-start gap-4">
            <span className="text-slate-500">Pass:</span>
            <span className="text-white font-mono select-all">FitNexaAI@2026.Ltd</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
