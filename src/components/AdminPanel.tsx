import { ShieldAlert, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-12 mb-20 p-6 rounded-xl bg-surface-container border-t-4 border-primary shadow-[0_0_20px_rgba(255,45,120,0.1)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-primary w-5 h-5" />
          <h3 className="font-headline font-bold uppercase tracking-widest text-sm text-primary">Admin Control Panel</h3>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer">
                <p className="font-label text-[10px] text-slate-500 uppercase">System Status</p>
                <p className="font-sans text-sm font-bold text-secondary">ALL SYSTEMS NOMINAL</p>
              </div>
              <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer">
                <p className="font-label text-[10px] text-slate-500 uppercase">Active Users</p>
                <p className="font-sans text-sm font-bold">12,482 STDS</p>
              </div>
              <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer">
                <p className="font-label text-[10px] text-slate-500 uppercase">Emergency Protocol</p>
                <p className="font-sans text-sm font-bold text-red-500">STANDBY</p>
              </div>
              <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer">
                <p className="font-label text-[10px] text-slate-500 uppercase">Database Link</p>
                <p className="font-sans text-sm font-bold">ENCRYPTED</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
