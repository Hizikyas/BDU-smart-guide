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
      </div>
    </header>
  );
}
