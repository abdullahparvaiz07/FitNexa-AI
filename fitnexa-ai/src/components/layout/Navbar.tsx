import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="glass-panel sticky top-4 z-50 rounded-2xl flex items-center justify-between whitespace-nowrap px-6 py-4 mb-10 transition-all mx-4 md:mx-10 lg:mx-20 xl:mx-40">
      <div className="flex items-center gap-3 text-slate-100">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </div>
        <Link href="/">
          <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight neon-text-glow cursor-pointer">FitNexa AI</h2>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-8">
          <Link href="#features" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal">
            Features
          </Link>
          <Link href="#pricing" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal">
            Pricing
          </Link>
          <Link href="#about" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal">
            About
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-100 text-sm font-bold transition-all">
              <span className="truncate">Login</span>
            </button>
          </Link>
          <Link href="/signup">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-slate-900 text-sm font-bold neon-glow transition-all">
              <span className="truncate">Get Started Free</span>
            </button>
          </Link>
        </div>
      </div>
      <button className="md:hidden text-slate-100">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
