cat > README.md << 'EOF'
# EduGPT 🧠📚

**EduGPT** is an AI-powered platform designed to assist tuition classes and educators by automating tasks like **exam paper creation**, **note generation**, and offering an interactive **AI chatbot** for learning support.

This monorepo contains all components of the EduGPT ecosystem.

---

## 🚀 Project Structure

\`\`\`
EduGPT/
├── EduGPT-Frontend/     # React + Vite frontend
├── EduGPT-Backend/      # Node.js + TypeScript API server
└── EduGPT-AI-Server/    # AI service (LLM integration, prompt handling, etc.)
\`\`\`

---

## 📦 Tech Stack

| Layer       | Stack                                       |
|-------------|---------------------------------------------|
| Frontend    | React, Vite, TypeScript, Tailwind (Planned) |
| Backend     | Node.js, Express, TypeScript                |
| AI Server   | OpenAI/Gemini (TBD), Custom Prompt Engine   |

---

## 📅 Current Status

🛠️ *Project is in early development stage. Initial boilerplates for frontend, backend, and AI server are being set up.*

---

## 📁 Getting Started

### Clone the monorepo

\`\`\`bash
git clone https://github.com/your-username/EduGPT.git
cd EduGPT
\`\`\`

---

## 🔧 Setup (Dev)

Each sub-project has its own README and setup instructions. Start by going into each directory:

\`\`\`bash
cd EduGPT-Frontend
npm install
npm run dev
\`\`\`

\`\`\`bash
cd EduGPT-Backend
npm install
npm run dev
\`\`\`

\`\`\`bash
cd EduGPT-AI-Server
npm install
npm run dev
\`\`\`

---

## 📌 Roadmap (Coming Soon)

- [ ] User Dashboard
- [ ] AI Notes Generator
- [ ] Exam Paper Generator
- [ ] Admin Tools
- [ ] PDF Export & Downloads
- [ ] Chat-based Q&A with Source Referencing

---

## 🤝 Contribution

> This is a solo project for now — but feedback, suggestions, and collabs are welcome once the MVP is up!

---

## 📜 License

MIT License — Feel free to use and modify with credit.

---

> Built with ❤️ to simplify learning using AI.
EOF
