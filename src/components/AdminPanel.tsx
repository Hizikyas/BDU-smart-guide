import { ShieldAlert, ChevronDown, Activity, Users, Database, Wifi, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fetchStats, type StatsResponse } from "../services/api";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

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
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3.5 h-3.5 text-slate-500 group-hover:text-secondary transition-colors" />
                    <p className="font-label text-[10px] text-slate-500 uppercase">System Status</p>
                  </div>
                  <p className="font-sans text-sm font-bold text-secondary">
                    {stats?.systemStatus || "OFFLINE"}
                  </p>
                </div>
                <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-slate-500 group-hover:text-tertiary transition-colors" />
                    <p className="font-label text-[10px] text-slate-500 uppercase">Guide Categories</p>
                  </div>
                  <p className="font-sans text-sm font-bold">
                    {stats?.totalGuides ?? "—"} GUIDES
                  </p>
                </div>
                <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-3.5 h-3.5 text-slate-500 group-hover:text-primary transition-colors" />
                    <p className="font-label text-[10px] text-slate-500 uppercase">Campus Offices</p>
                  </div>
                  <p className="font-sans text-sm font-bold">
                    {stats?.totalOffices ?? "—"} OFFICES
                  </p>
                </div>
                <div className="p-4 bg-background rounded border border-outline-variant hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <Wifi className="w-3.5 h-3.5 text-slate-500 group-hover:text-secondary transition-colors" />
                    <p className="font-label text-[10px] text-slate-500 uppercase">API Connection</p>
                  </div>
                  <p className="font-sans text-sm font-bold text-secondary">
                    {stats?.apiStatus || "DISCONNECTED"}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
