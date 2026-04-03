import { Search, Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col">
          <span className="text-xl font-headline font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.8)]">
            BDU Smart Guide
          </span>
          <span className="font-label text-[10px] text-slate-400 uppercase tracking-[0.2em]">
            Your campus survival companion
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="w-full bg-surface-container border border-outline-variant rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-sm text-on-background"
              placeholder="Search guides, locations, or services..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-secondary transition-colors duration-300 active:scale-95">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-slate-400 hover:text-secondary transition-colors duration-300 active:scale-95">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
