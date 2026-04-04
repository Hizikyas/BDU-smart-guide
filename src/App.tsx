import React, { useState, useEffect } from "react";
import {
  Search, Compass, MessageSquare,
  Contact2, Wifi, CreditCard, Key, CalendarX2, FileWarning,
  Trash2, Building, Shield, ClipboardCheck, FileText, VolumeX,
  Droplet, Shirt, BookX, Utensils, Lock, BatteryCharging,
  Lamp, DoorOpen, HelpCircle, Loader2
} from "lucide-react";
import { motion } from "motion/react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import GuideCard from "./components/GuideCard";
import AdminPanel from "./components/AdminPanel";
import BottomNav from "./components/BottomNav";
import ChatPanel from "./components/ChatPanel";
import { fetchGuides, type Guide } from "./services/api";

const iconMap: Record<string, React.ReactNode> = {
  "id-card": <Contact2 className="w-6 h-6" />,
  "book-open": <Compass className="w-6 h-6" />,
  "key": <Key className="w-6 h-6" />,
  "calendar-x": <CalendarX2 className="w-6 h-6" />,
  "file-warning": <FileWarning className="w-6 h-6" />,
  "trash": <Trash2 className="w-6 h-6" />,
  "building": <Building className="w-6 h-6" />,
  "shield": <Shield className="w-6 h-6" />,
  "clipboard-check": <ClipboardCheck className="w-6 h-6" />,
  "file-text": <FileText className="w-6 h-6" />,
  "volume-x": <VolumeX className="w-6 h-6" />,
  "droplet": <Droplet className="w-6 h-6" />,
  "shirt": <Shirt className="w-6 h-6" />,
  "book-x": <BookX className="w-6 h-6" />,
  "utensils": <Utensils className="w-6 h-6" />,
  "lock": <Lock className="w-6 h-6" />,
  "battery-charging": <BatteryCharging className="w-6 h-6" />,
  "lamp": <Lamp className="w-6 h-6" />,
  "door-open": <DoorOpen className="w-6 h-6" />,
  "help-circle": <HelpCircle className="w-6 h-6" />,
  "wifi": <Wifi className="w-6 h-6" />,
  "credit-card": <CreditCard className="w-6 h-6" />,
};

export default function App() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGuides()
      .then((data) => setGuides(data.guides))
      .catch(() => setGuides([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <Header />

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Mobile Search */}
        <div className="md:hidden mb-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-all font-sans text-on-background"
              placeholder="Search campus guide..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-8 p-8 rounded-xl bg-surface-container border border-primary/20 relative overflow-hidden flex flex-col justify-end min-h-[350px]"
          >
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                alt="Cyberpunk campus"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSQrZP8MKWOtPKEjkjTfvTWwaciXKHIWrRqAA7tjV9AjnCtS15C7d3q7Bct8b35osXwhS28MwkcMigPzpFzEiZdOXSfMFOwFIUCxAzSMWMML-nGt6t8zY3MM2w50JomRvKOles28bYBA3ksIWwM6F0-iXRr58ofbsyLb9IIgaS3TdBtmMKJ6FRwOuN0GtxCwczSaw2BXjGGeVPEPOoMPxuomeU4KIC9XWiTsVbckK1VKOc-18iEn-cHPNJdskvl9Ot_763ckPdp-Y"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <h1 className="font-headline font-extrabold text-4xl mb-2 neon-text-pink">
                Welcome to BDU Smart Guide
              </h1>
              <p className="text-on-surface-variant max-w-lg mb-6">
                Need a hand navigating the digital layers of BDU? Your smart guide is synced and ready to assist.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setChatOpen(true)}
                  className="px-6 py-2 bg-primary/20 border border-primary rounded-lg font-label text-sm text-primary hover:bg-primary/30 transition-all uppercase tracking-wider"
                >
                  Ask AI Guide
                </button>
                <button className="px-6 py-2 bg-secondary/20 border border-secondary rounded-lg font-label text-sm text-secondary hover:bg-secondary/30 transition-all uppercase tracking-wider">
                  Campus News
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Mini Card */}
          <div className="md:col-span-4">
            <StatsCard />
          </div>

          {/* Guide Cards Grid */}
          <div className="md:col-span-12 mt-4">
            <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2">
              <Compass className="text-secondary w-6 h-6" />
              Essential Survival Guides
              {!loading && (
                <span className="text-sm font-label text-on-surface-variant font-normal ml-2">
                  ({filteredGuides.length} guides)
                </span>
              )}
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-on-surface-variant font-label">Loading guides...</span>
              </div>
            ) : filteredGuides.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                <p className="font-headline text-lg">No guides found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredGuides.map((guide, idx) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <GuideCard
                      icon={iconMap[guide.icon] || <HelpCircle className="w-6 h-6" />}
                      title={guide.title}
                      tag={guide.tag}
                      tagColor={guide.tagColor}
                      points={guide.steps.slice(0, 2)}
                      warning={guide.dont[0]}
                      footerLabel={guide.office}
                      footerAction="VIEW GUIDE"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AdminPanel />
      </main>

      {/* FAB for Chatbot */}
      <button
        onClick={() => setChatOpen((prev) => !prev)}
        className="fab-glow fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,45,120,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <MessageSquare className={`w-8 h-8 transition-transform fill-current ${chatOpen ? "rotate-12" : "group-hover:rotate-12"}`} />
        <div className="absolute -top-12 right-0 bg-surface-container border border-primary text-primary px-3 py-1 rounded-lg text-xs font-label opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {chatOpen ? "Close Chat" : "Ask AI Guide"}
        </div>
      </button>

      {/* Chat Panel */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <BottomNav />

      {/* Map Background Subtle Detail */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-5">
        <img
          alt="City map overlay"
          className="w-full h-full object-cover grayscale invert"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK1ZVFzGNGvKDjr2SYz6bo6FofRkoRWWbW9fX8QCOUbuppEyvHnId7jCnHT5KIbQhVLSLiC0hHP5uDRCkp9sdFVHyX73HTyf89SuQt4H3pleDDUBXLP2BK29lOaesI4Jn8AJ6OUL4OBxMXqoOvoiHkn1fowBu94hgVSmveEC3S4uTAr4RHfeINusoQrI48RgVjX2Yeah7QAi3m1ESLgcyOKwiOtx8c5j-VDkJvOmeiz016xa1YaauJ05mIz0MpDJnFd6TPBTCJEW4"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
