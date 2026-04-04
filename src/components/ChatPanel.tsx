import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, CheckCircle, AlertTriangle, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { askQuestion, type AskResponse } from "../services/api";

interface Message {
  id: number;
  type: "user" | "bot";
  text?: string;
  guide?: AskResponse;
  loading?: boolean;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: "bot",
      text: "Hey there! 👋 I'm your BDU Smart Guide AI. Ask me anything about campus — lost ID, registration, grades, facilities, and more!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || isLoading) return;

    const userMsg: Message = { id: Date.now(), type: "user", text: q };
    const loadingMsg: Message = { id: Date.now() + 1, type: "bot", loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const guide = await askQuestion(q);
      setMessages((prev) =>
        prev.map((m) => (m.loading ? { ...m, loading: false, guide } : m))
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.loading
            ? { ...m, loading: false, text: "⚠️ Connection error. Make sure the backend server is running." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-28 right-4 md:bottom-28 md:right-10 w-[calc(100vw-2rem)] max-w-[420px] h-[520px] z-[60] flex flex-col rounded-2xl overflow-hidden chat-glass border border-primary/30 shadow-[0_0_40px_rgba(255,45,120,0.15)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary/20 via-surface-container to-surface-container border-b border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-on-background">
                  BDU AI Guide
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] font-label text-secondary uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/40 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "user" ? (
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-primary/20 border border-primary/30 text-sm text-on-background">
                      {msg.text}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end gap-2 max-w-[90%]">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-high border border-outline-variant text-sm">
                      {msg.loading ? (
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-xs">Thinking...</span>
                        </div>
                      ) : msg.guide ? (
                        <div className="space-y-3">
                          <p className="font-medium text-secondary text-xs uppercase tracking-wider font-label">
                            📋 Here's your guide:
                          </p>
                          <div className="space-y-1.5">
                            {msg.guide.steps.map((s, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                                <span className="text-on-surface-variant text-xs">{s}</span>
                              </div>
                            ))}
                          </div>
                          {msg.guide.dont.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              {msg.guide.dont.map((d, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                  <span className="text-red-400/80 text-xs">{d}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 pt-2 border-t border-outline-variant">
                            <MapPin className="w-3 h-3 text-tertiary" />
                            <span className="text-tertiary text-[10px] font-label uppercase">{msg.guide.office}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-on-surface-variant">{msg.text}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-surface-container border-t border-outline-variant">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about campus..."
                className="flex-1 bg-surface-container-high border border-outline-variant rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-sans text-on-background placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
