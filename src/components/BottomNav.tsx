import { Home, Compass, MessageSquare, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 bg-[#0a0a12]/90 backdrop-blur-lg border-t border-[#ff2d78]/30 z-50 md:hidden">
      <div className="flex flex-col items-center justify-center text-[#ff2d78] drop-shadow-[0_0_8px_rgba(255,45,120,0.6)] scale-110">
        <Home className="w-6 h-6" />
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Home</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#00ffcc] transition-colors">
        <Compass className="w-6 h-6" />
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Guides</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#00ffcc] transition-colors">
        <MessageSquare className="w-6 h-6" />
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Chat</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#00ffcc] transition-colors">
        <User className="w-6 h-6" />
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Profile</span>
      </div>
    </nav>
  );
}
