# BDU Smart Guide 🎓✨

Your campus survival companion with a neon-futuristic aesthetic! **BDU Smart Guide** is designed to provide seamless, intelligent, and visually striking assistance to users navigating campus life. 

## 🚀 Features

- **Neon-Futuristic UI:** Stunning design paired with extremely fluid animations (`motion` toolkit).
- **Responsive Layout:** Beautiful across desktops and mobile viewing, sporting a handy bottom navigation.
- **Smart Assistance Integrations:** Features elements leveraging `@google/genai` for clever features.
- **Interactive Dashboards & Statistics:** Monitor activities with intuitive UI components like the `StatsCard` and `AdminPanel`.
- **AI Document Parsing System:** The `AdminPanel` boasts a dedicated pipeline to ingest raw, unstructured manuals. The backend LLM translates and structures it automatically into live interactive `GuideCards` on Firebase!
- **Organized Knowledge Items:** Real-time data from Firestore delivered via beautiful components like `GuideCard`.
- **Campus News Integration:** Quick-access links redirecting to official University resources natively within the UI.

## 📚 Detailed Documentation

Looking for deep architectural details on components, state management, and the `api.ts` flow? Check out our newly curated technical breakdown:
👉 **[FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)**

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite for a blazing-fast development experience.
- **Styling:** Tailwind CSS (v4) for robust, utility-first UI design.
- **Animations:** Motion (`motion`) for complex, smooth page transitions and micro-interactions.
- **Icons:** Lucide React for consistent, crisp SVG icons.
- **AI Integration:** `@google/genai` for smart text and data generation features.
- **Backend (Optional proxy/service):** Express & dotenv setup built-in if backend APIs are needed.

## 📂 Project Structure

```bash
BDU-smart-guide/
├── index.html            # Entry point
├── package.json          # Dependencies & Scripts
├── vite.config.ts        # Vite configuration
├── src/
│   ├── App.tsx           # Main application shell
│   ├── main.tsx          # React DOM render entry
│   ├── index.css         # Global styles (Tailwind imports)
│   └── components/       # Reusable UI elements
│       ├── AdminPanel.tsx
│       ├── BottomNav.tsx
│       ├── GuideCard.tsx
│       ├── Header.tsx
│       └── StatsCard.tsx
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd BDU-smart-guide
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Copy the example environment file and configure your variables to enable features like Google GenAI:

```bash
cp .env.example .env
```
*(Make sure to populate `.env` with your relevant keys).*

## 🏃‍♂️ Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server using Vite on port 3000.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Boot up a local web server to preview the production build.
- `npm run lint`: Runs TypeScript validation.
- `npm run clean`: Clears out the `dist` folder.

## 🎨 Design Philosophy

BDU Smart Guide doesn't just work well; it *feels* premium. It leverages distinct color palettes, glassmorphism elements, and micro-hover states to achieve a modern, living interface that moves away from standard generic interfaces.