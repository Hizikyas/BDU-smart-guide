import { Search, Compass, CreditCard, Wifi, Contact2, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import GuideCard from "./components/GuideCard";
import AdminPanel from "./components/AdminPanel";
import BottomNav from "./components/BottomNav";

export default function App() {
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
                Welcome back, Student 2024
              </h1>
              <p className="text-on-surface-variant max-w-lg mb-6">
                Need a hand navigating the digital layers of BDU? Your smart guide is synced and ready to assist.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-primary/20 border border-primary rounded-lg font-label text-sm text-primary hover:bg-primary/30 transition-all uppercase tracking-wider">
                  Quick Map
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GuideCard
                icon={<Contact2 className="w-6 h-6" />}
                title="Lost ID Card"
                tag="Urgent"
                tagColor="primary"
                points={[
                  "Lock card via the app immediately",
                  "Visit Admin Center Building C"
                ]}
                warning="Don't share temporary gate codes"
                footerLabel="OFFICE: BLDG C, RM 104"
                footerAction="START GUIDE"
              />
              <GuideCard
                icon={<Wifi className="w-6 h-6" />}
                title="Campus WiFi"
                tag="Tech Support"
                tagColor="secondary"
                points={[
                  "Use BDU_SECURE for encryption",
                  "SSO Login with Student Email"
                ]}
                warning="Don't use public BDU_GUEST for exams"
                footerLabel="IT HUB: LIBRARY LVL 2"
                footerAction="SETTINGS"
              />
              <GuideCard
                icon={<CreditCard className="w-6 h-6" />}
                title="Meal Credit"
                tag="Finance"
                tagColor="tertiary"
                points={[
                  "Top-up via Kiosk or App Portal",
                  "Credits expire every semester"
                ]}
                warning="Don't transfer credits to peers"
                footerLabel="CAFETERIA MAIN HALL"
                footerAction="TOP UP"
              />
            </div>
          </div>
        </div>

        <AdminPanel />
      </main>

      {/* FAB for Chatbot */}
      <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,45,120,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform fill-current" />
        <div className="absolute -top-12 right-0 bg-surface-container border border-primary text-primary px-3 py-1 rounded-lg text-xs font-label opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Guide
        </div>
      </button>

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
