export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-auto bg-background-dark py-12 px-4 md:px-10 lg:px-20 xl:px-40 z-10 relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3 text-slate-100">
            <div className="size-6 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <h2 className="text-slate-100 text-lg font-bold leading-tight">FitNexa AI</h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full md:w-auto">
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Terms of Service</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Contact Support</a>
        </div>
        <div className="text-slate-500 text-sm w-full md:w-auto text-center md:text-right">
          © {new Date().getFullYear()} FitNexa AI. All rights reserved.
        </div>
      </div>
      
      {/* Author & Demo Details */}
      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-xs text-slate-500 bg-background-dark/50 backdrop-blur-sm rounded-xl p-4 border border-surface-glass-border text-center md:text-left">
        <div className="flex flex-col gap-1 items-center md:items-start w-full">
          <strong className="text-primary text-sm tracking-wide uppercase">Developed By</strong>
          <span className="text-slate-300 font-medium text-base">Abdullah Parvaiz</span>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2">
            <a href="mailto:abdullahparvaizofficial@gmail.com" className="flex items-center justify-center gap-1.5 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              abdullahparvaizofficial@gmail.com
            </a>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">call</span>
              +923021433046
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
