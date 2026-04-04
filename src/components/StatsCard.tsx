import { Compass, Loader2, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { fetchStats, type StatsResponse } from "../services/api";

export default function StatsCard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-surface-container border border-tertiary/20 flex flex-col justify-between h-full"
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 text-tertiary animate-spin" />
        </div>
      ) : stats ? (
        <>
          <div className="flex justify-between items-start">
            <span className="font-label text-tertiary uppercase tracking-widest text-xs">
              Guide Database
            </span>
            <Compass className="text-tertiary w-5 h-5" />
          </div>
          <div className="mt-4">
            <div className="text-4xl font-headline font-bold text-on-background">
              {stats.totalGuides}
            </div>
            <p className="text-sm text-slate-400">Active survival guides</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant">
            <Building2 className="w-4 h-4 text-secondary" />
            <span>{stats.totalOffices} campus offices covered</span>
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-tertiary shadow-[0_0_8px_#ffe04a]"
            />
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] font-label text-secondary uppercase tracking-wider">
              {stats.systemStatus}
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-on-surface-variant text-sm">
          Unable to load stats
        </div>
      )}
    </motion.div>
  );
}
