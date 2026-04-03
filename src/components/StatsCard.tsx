import { Utensils } from "lucide-react";
import { motion } from "motion/react";

export default function StatsCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-surface-container border border-tertiary/20 flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start">
        <span className="font-label text-tertiary uppercase tracking-widest text-xs">Meal Credits</span>
        <Utensils className="text-tertiary w-5 h-5" />
      </div>
      <div className="mt-4">
        <div className="text-4xl font-headline font-bold text-on-background">148.50</div>
        <p className="text-sm text-slate-400">Credits remaining for Oct</p>
      </div>
      <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-tertiary shadow-[0_0_8px_#ffe04a]"
        />
      </div>
    </motion.div>
  );
}
