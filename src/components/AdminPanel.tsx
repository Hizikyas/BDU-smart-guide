import { ShieldAlert, ChevronDown, Activity, Users, Database, Wifi, Loader2, FileText, List, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fetchStats, type StatsResponse, generateGuideFromDocument, fetchGuides, updateGuide, deleteGuide } from "../services/api";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Raw Guide Generation State
  const [rawText, setRawText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateMessage, setGenerateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [recentGuides, setRecentGuides] = useState<any[]>([]);

  // CRUD State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleGenerateGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsGenerating(true);
    setGenerateMessage(null);

    try {
      const response = await generateGuideFromDocument(rawText);
      setGenerateMessage({ type: 'success', text: `Successfully transcribed and translated! Generated ${response.guides_count} unique guides.` });
      setRawText('');
      // Refresh stats and guides if successful
      const newStats = await fetchStats();
      setStats(newStats);
      const newGuides = await fetchGuides();
      setRecentGuides(newGuides.guides.sort((a: any, b: any) => (a.title || "").localeCompare(b.title || "")));
    } catch (error: any) {
      setGenerateMessage({ type: 'error', text: error.message || 'An error occurred.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditClick = (guide: any) => {
    setEditingId(guide.id);
    setEditForm({
      title: guide.title || '',
      office: guide.office || '',
      steps: (guide.steps || []).join('\n'),
      dont: (guide.dont || []).join('\n'),
      keywords: (guide.keywords || []).join(', ')
    });
  };

  const handleUpdateGuide = async () => {
    if (!editingId) return;
    setIsUpdating(true);
    try {
      const payload = {
        title: editForm.title,
        office: editForm.office,
        steps: editForm.steps.split('\n').map((s: string) => s.trim()).filter(Boolean),
        dont: editForm.dont.split('\n').map((s: string) => s.trim()).filter(Boolean),
        keywords: editForm.keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
      };
      await updateGuide(editingId, payload);
      setEditingId(null);
      const [newStats, newGuides] = await Promise.all([fetchStats(), fetchGuides()]);
      setStats(newStats);
      setRecentGuides(newGuides.guides.sort((a: any, b: any) => (a.title || "").localeCompare(b.title || "")));
    } catch (e: any) {
      alert(e.message || "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteGuide = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;
    try {
      await deleteGuide(id);
      const [newStats, newGuides] = await Promise.all([fetchStats(), fetchGuides()]);
      setStats(newStats);
      setRecentGuides(newGuides.guides.sort((a: any, b: any) => (a.title || "").localeCompare(b.title || "")));
    } catch (e: any) {
      alert("Failed to delete guide");
    }
  };

  useEffect(() => {
    Promise.all([fetchStats(), fetchGuides()])
      .then(([statsData, guidesData]) => {
        setStats(statsData);
        const sortedGuides = guidesData.guides.sort((a: any, b: any) => 
          (a.title || "").localeCompare(b.title || "")
        );
        setRecentGuides(sortedGuides);
      })
      .catch(() => {
        setStats(null);
        setRecentGuides([]);
      })
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

            {/* Raw Document Generator Form */}
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-secondary" />
                <h4 className="font-headline font-bold text-white">Generate Guide from Document</h4>
              </div>
              
              {generateMessage && (
                <div className={`p-3 mb-4 rounded text-sm ${generateMessage.type === 'success' ? 'bg-secondary/20 text-secondary border border-secondary/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                  {generateMessage.text}
                </div>
              )}

              <form onSubmit={handleGenerateGuide} className="space-y-4">
                <div>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full h-40 p-3 bg-background border border-outline-variant rounded-lg text-white focus:outline-none focus:border-primary/50 resize-none font-sans text-sm"
                    placeholder="Paste unformatted student manual text, PDF rules, or procedures here to automatically generate a structured guide..."
                    disabled={isGenerating}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isGenerating || !rawText.trim()}
                  className="px-6 py-2 bg-primary/90 text-white font-label tracking-wide uppercase text-xs rounded-full hover:bg-primary disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing via AI...
                     </>
                  ) : 'Generate and Save Guide'}
                </button>
              </form>


              {/* Recently Added Guides List */}
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-5 h-5 text-tertiary" />
                  <h4 className="font-headline font-bold text-white">Database Contents (Guides)</h4>
                </div>
                
                {recentGuides.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {recentGuides.map((g: any) => (
                      editingId === g.id ? (
                        <div key={g.id} className="p-4 bg-surface border border-tertiary/50 rounded-lg space-y-3">
                          <input type="text" className="w-full bg-background border border-outline-variant p-2 rounded text-sm text-white" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Title" />
                          <input type="text" className="w-full bg-background border border-outline-variant p-2 rounded text-sm text-white" value={editForm.office} onChange={e => setEditForm({...editForm, office: e.target.value})} placeholder="Office" />
                          <textarea className="w-full bg-background border border-outline-variant p-2 rounded text-sm text-white h-24" value={editForm.steps} onChange={e => setEditForm({...editForm, steps: e.target.value})} placeholder="Steps (one per line)" />
                          <textarea className="w-full bg-background border border-outline-variant p-2 rounded text-sm text-white h-16" value={editForm.dont} onChange={e => setEditForm({...editForm, dont: e.target.value})} placeholder="Don'ts (one per line)" />
                          <input type="text" className="w-full bg-background border border-outline-variant p-2 rounded text-sm text-white" value={editForm.keywords} onChange={e => setEditForm({...editForm, keywords: e.target.value})} placeholder="Keywords (comma separated)" />
                          <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => setEditingId(null)} className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"><X className="w-4 h-4"/></button>
                            <button onClick={handleUpdateGuide} disabled={isUpdating} className="p-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded hover:bg-green-500/30 transition-colors">
                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Check className="w-4 h-4"/>}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div key={g.id} className="p-3 bg-surface-container-highest border border-outline-variant rounded flex justify-between items-center group hover:border-tertiary/50 transition-all">
                          <div>
                            <p className="text-white text-sm font-bold">{g.title}</p>
                            <p className="text-slate-400 text-xs mt-1">{g.steps?.length || 0} Steps • Office: {g.office}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-1 rounded font-bold uppercase mr-2">{g.id}</span>
                            <button onClick={() => handleEditClick(g)} className="text-slate-400 hover:text-blue-400 transition-colors"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteGuide(g.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No guides found in database.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
