import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  tag: string;
  tagColor: "primary" | "secondary" | "tertiary";
  points: string[];
  warning?: string;
  footerLabel: string;
  footerAction: string;
}

export default function GuideCard({
  icon,
  title,
  tag,
  tagColor,
  points,
  warning,
  footerLabel,
  footerAction,
}: GuideCardProps) {
  const tagColors = {
    primary: "bg-primary/20 text-primary border-primary/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30",
    tertiary: "bg-tertiary/20 text-tertiary border-tertiary/30",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-surface-container-high border border-outline-variant hover:border-primary/50 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg transition-colors ${tagColors[tagColor]}`}>
          {icon}
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full font-label uppercase border ${tagColors[tagColor]}`}>
          {tag}
        </span>
      </div>
      
      <h3 className="font-headline font-bold text-xl mb-3">{title}</h3>
      
      <div className="space-y-3 mb-6 flex-grow">
        {points.map((point, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle className="text-secondary w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-on-surface-variant">{point}</span>
          </div>
        ))}
        {warning && (
          <div className="flex items-start gap-2 text-sm text-red-400">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="font-medium">{warning}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
        <span className="text-[10px] font-label text-slate-500 uppercase">{footerLabel}</span>
        <button className="text-primary hover:neon-text-pink transition-all font-label text-sm uppercase tracking-wider">
          {footerAction}
        </button>
      </div>
    </motion.div>
  );
}
