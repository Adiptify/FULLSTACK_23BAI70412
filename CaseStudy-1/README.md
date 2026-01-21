# Online Quiz & Examination SPA (AI Enhanced 🚀)

Welcome to the **Next-Gen Online Quiz & Examination Platform**. I've taken this Single Page Application (SPA) to the next level by integrating cutting-edge AI, fluid animations, and a vibrant new design system.

## 🚀 New Features

*   **🤖 AI Study Tutor**: A floating AI chatbot powered by **Ollama (DeepSeek-v3.1)**. It allows you to ask questions about your quiz topics in real-time, complete with a "thinking" trace.
*   **✨ AI Quiz Generator**: I added a magic tool on the dashboard. Simply type a topic (e.g., "Quantum Physics"), and the AI will generate a fresh 3-question examination for you on the fly.
*   **🎭 Fluid Animations**: Every page transition and quiz question now slide beautifully using **Framer Motion**.
*   **🎨 Vibrant Theme**: I've overhauled the color scheme to a high-energy **Deep Purple & Neon Teal** palette with glassmorphic UI elements.
*   **📊 Dynamic Leaderboard**: Clean slate! The leaderboard now tracks only your real local attempts.

---

## 🛠️ The Tech Stack

### 🧠 AI Integration (Ollama)
I've integrated the `ollama` JS library to connect to local/cloud models.
*   **DeepSeek-v3.1 Integration**: The system uses the `deepseek-v3.1:671b-cloud` model for both tutoring and quiz generation.
*   **Streaming Logic**: The chatbot supports streaming responses, allowing you to see the AI's "thought process" as it works.

### 🎭 Animation Framework (Framer Motion)
*   **Page Transitions**: I used `AnimatePresence` to create smooth horizontal slides between the Login, Dashboard, and Quiz pages.
*   **Hover Effects**: Quiz cards now lift and glow when you hover over them, giving the app a "lively" feel.

### 🏢 UI Libraries (MUI & Bootstrap)
*   ** metallurgy/MUI**: Used for complex icons (`MagicIcon`, `RobotIcon`), progress bars, and the AI chat interface.
*   **Bootstrap**: Still handles the core responsive grid and high-level layout.

---

## 📦 Getting Started

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/Adiptify/FULLSTACK_23BAI70412.git
    npm install
    ```
2.  **Ollama Setup (CRITICAL)**:
    Since the AI features run via Ollama, you must have Ollama installed and running. To allow the web app to talk to it, start Ollama with CORS enabled:
    ```bash
    $env:OLLAMA_ORIGINS="*"; ollama serve
    ```
3.  **Run**:
    ```bash
    npm run dev
    ```

## 🚀 Deployment
```bash
npm run deploy
```
*Hosted with ❤️ on GitHub Pages.*
