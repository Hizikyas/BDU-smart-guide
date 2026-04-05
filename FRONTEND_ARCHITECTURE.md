# BDU Smart Guide - Frontend Architecture & technical Documentation 🎓✨

This document details the frontend architecture, component structure, state management, and data flow of the BDU Smart Guide application. It serves as a technical overview for hackathon judges and developers.

## 1. Overview & Tech Stack

BDU Smart Guide's frontend is a single-page application (SPA) designed with a "neon-futuristic" aesthetic. It emphasizes smooth micro-interactions, responsive design, and real-time AI capabilities.

**Core Technologies:**
*   **Framework:** React 19
*   **Build Tool:** Vite (for rapid HMR and optimized production builds)
*   **Styling:** Tailwind CSS (v4) with custom theme extensions (neon glow, glassmorphism)
*   **Animations:** Motion (Framer Motion) for page transitions and component physics
*   **Icons:** Lucide React
*   **Language:** TypeScript for type safety across components and API responses

---

## 2. Project Structure

The project is structured under the `src` directory, separating reusable UI components, global styles, and external service integrations.

```text
src/
├── App.tsx             # Main application orchestrator & layout
├── main.tsx            # React entry point
├── index.css           # Global Tailwind styles & custom utility classes
├── components/         # Reusable feature components
│   ├── AdminPanel.tsx  # Dashboard for managing guides & AI generation
│   ├── BottomNav.tsx   # Mobile navigation bar
│   ├── ChatPanel.tsx   # Floating AI assistant chat interface
│   ├── GuideCard.tsx   # Individual knowledge base item display
│   ├── Header.tsx      # Top navigation and branding
│   └── StatsCard.tsx   # Quick analytics widget
└── services/
    └── api.ts          # Centralized API client for backend communication
```

---

## 3. Core Components

### `App.tsx` (Main View)
The root component that manages the primary layout and global state.
*   **Functionality:** Fetches the initial list of guides on mount, manages the global search query, filters the `GuideCard` grid dynamically, and acts as the container for floating overlays like the `ChatPanel` and `BottomNav`.
*   **Key State:** `guides` (Array), `searchQuery` (String), `chatOpen` (Boolean), `loading` (Boolean).

### `ChatPanel.tsx` (AI Assistant)
A sophisticated floating chat interface allowing users to converse with the AI backend.
*   **Functionality:** Maintains an array of message objects. When a user sends a query, it displays a loading state and calls the `/ask` endpoint.
*   **Intelligent Rendering:** The component parses the structued `AskResponse` from the backend. If the AI responds with actionable fields (like `steps`, `dont`, or `office`), the chat panel renders them dynamically with specific icons (e.g., Warning icons for "don'ts", MapPin for office locations) rather than just a flat text string.
*   **Animations:** Leverages `AnimatePresence` for smooth mounting/dismounting and spring dynamics when opened.

### `AdminPanel.tsx` (Administrator Dashboard)
A secure module allowing admins to manage the knowledge base without writing code.
*   **AI Document Parsing:** Features a textarea where admins can paste raw, unstructured text (like a student manual). Submitting this calls `generateGuideFromDocument`, which interfaces with the backend LLM to automatically extract rules, translate them into English, and insert structured JSON guides into the database.
*   **CRUD Operations:** Directly fetches and lists all active guides. It provides inline editing (updating `title`, `steps`, `dont`, `office`, `keywords`) and one-click deletion, syncing immediately with the backend via REST.
*   **System Status:** Displays real-time API connection and system health metrics fetched from `/stats`.

### `GuideCard.tsx`
A presentation component used in the main grid to display essential survival guides. Uses tailored animations to fade in smoothly.

---

## 4. API Integration & Data Flow

All external HTTP requests are abstracted in `src/services/api.ts`. It utilizes the standard Fetch API and relies on the `VITE_API_URL` environment variable.

| Function | Endpoint | Purpose | Component Consumer |
| :--- | :--- | :--- | :--- |
| `fetchGuides()` | `GET /guides` | Retrieves all structured guides. | `App`, `AdminPanel` |
| `fetchStats()` | `GET /stats` | Fetches system health and db counts. | `AdminPanel` |
| `askQuestion(q)` | `POST /ask` | Sends user queries to the AI service. | `ChatPanel` |
| `generateGuideFromDocument(text)`| `POST /admin/generate-guide` | Pipes raw text to the backend LLM pipeline. | `AdminPanel` |
| `updateGuide(id, data)` | `PUT /guides/:id` | Modifies an existing guide. | `AdminPanel` |
| `deleteGuide(id)` | `DELETE /guides/:id` | Removes a guide from the database. | `AdminPanel` |

### Data Flow Example: AI Guide Generation
1. Admin pastes unformatted amharic text into the `AdminPanel` text area.
2. Form submission triggers `handleGenerateGuide()`.
3. UI state updates to `isGenerating = true` (showing a loading spinner).
4. `api.ts` makes a POST request to `/admin/generate-guide`.
5. Upon success, the UI displays a success alert showing how many guides were created. `fetchGuides()` is immediately re-called to append the newly generated items directly into the admin list without a page refresh.

---

## 5. UI / UX Design System

The frontend was built to feel premium rather than generic:
*   **Glassmorphism:** Components like the `ChatPanel` and `Header` use subtle transparency (`bg-opacity` or specific hex opacity) and background blurring (`backdrop-blur`) to create depth.
*   **Micro-interactions:** Buttons scale down on click (`active:scale-95`), hover states shift border colors elegantly, and lists stagger-fade in.
*   **Neon Aesthetics:** The glowing UI elements (e.g., the Chat FAB `shadow-[0_0_20px_rgba(255,45,120,0.6)]`) and "neon-text-pink" classes emphasize a cyberpunk/futuristic navigation device motif.
*   **Responsiveness:** Native mobile view support gracefully hides complex elements (like adjusting grid columns and leveraging a bottom navigation bar layout).
