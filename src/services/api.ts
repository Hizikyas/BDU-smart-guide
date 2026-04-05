const API_BASE = import.meta.env.VITE_API_URL || "https://bdu-smartguide-production.up.railway.app";

if (API_BASE.includes("127.0.0.1") || API_BASE.includes("localhost")) {
  // Remind developers to set the hosted backend URL in env when still pointing locally
  // This log helps detect when the app is still using the local fallback.
  // Set `VITE_API_URL` in a `.env` file to point to your hosted backend (see .env.example).
  // eslint-disable-next-line no-console
  console.warn(
    "Using local API fallback. Set VITE_API_URL in .env to point to your hosted backend.",
  );
}

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

export interface GenerateGuideResponse {
  ids: string[];
  guides_count: number;
  status: string;
}

export async function generateGuideFromDocument(
  documentText: string,
): Promise<GenerateGuideResponse> {
  const res = await fetch(`${API_BASE}/admin/generate-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_text: documentText }),
  });
  if (!res.ok) throw new Error("Failed to generate guide from document");
  return res.json();
}

export async function updateGuide(
  guideId: string,
  guideData: any,
): Promise<any> {
  const res = await fetch(`${API_BASE}/guides/${guideId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guideData),
  });
  if (!res.ok) throw new Error("Failed to update guide");
  return res.json();
}

export async function deleteGuide(guideId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/guides/${guideId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete guide");
  return res.json();
}
