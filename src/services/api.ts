const API_BASE = import.meta.env.VITE_API_URL || "https://bdu-smartguide-production.up.railway.app";

export interface Guide {
  id: string;
  title: string;
  steps: string[];
  dont: string[];
  office: string;
  keywords: string[];
  tag: string;
  tagColor: "primary" | "secondary" | "tertiary";
  icon: string;
}

export interface GuidesResponse {
  guides: Guide[];
  total: number;
}

export interface StatsResponse {
  totalGuides: number;
  totalOffices: number;
  systemStatus: string;
  apiStatus: string;
}

export interface AskResponse {
  steps: string[] | null;
  dont: string[] | null;
  office: string | null;
  message?: string | null;
}

export async function fetchGuides(): Promise<GuidesResponse> {
  const res = await fetch(`${API_BASE}/guides`);
  if (!res.ok) throw new Error("Failed to fetch guides");
  return res.json();
}

export async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function askQuestion(question: string): Promise<AskResponse> {
  const res = await fetch(`${API_BASE}/ask?format=friendly`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("Failed to get answer");
  return res.json();
}
