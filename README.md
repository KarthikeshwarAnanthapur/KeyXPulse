# KeyXPulse – AI Typing Coach ⌨️✨

> A sleek, AI-powered typing coach built with React + Vite.  
> Track your WPM, accuracy, and get smart personalized feedback — all in a beautiful minimal UI.

![KeyXPulse Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF) ![React](https://img.shields.io/badge/React-18-61DAFB)

---

## 🌟 Features

| Feature | Description |
|---|---|
| ⏱ **Time Control** | Choose from 10s, 20s, 30s, 1 min, or 5 min sessions |
| ⌨️ **Live Typing** | Real-time char-by-char color feedback (green ✓ / red ✗) |
| 🚫 **No Backspace** | Deletions disabled — forces deliberate, intentional typing |
| 📊 **Live Stats** | WPM, Accuracy, and Error count update every second |
| 🧠 **AI Coach** | Personalized feedback message after every session |
| 🔑 **Weak Key Detection** | Tracks your most-missed characters and surfaces them as key chips |
| 🔮 **WPM Prediction** | Linear regression over last 3 sessions predicts your next WPM |
| 📈 **Progress Graphs** | Chart.js line charts for WPM & accuracy trends |
| 💾 **Session History** | All sessions stored in localStorage, viewable in History tab |
| ⏰ **Ring Timer** | Animated SVG ring timer that turns red in the last 10 seconds |
| 📱 **Fully Responsive** | Works beautifully on mobile, tablet, and desktop |

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Charts** | Chart.js 4 + react-chartjs-2 |
| **Styling** | Pure CSS with custom properties |
| **Fonts** | Inter + DM Mono (Google Fonts) |
| **Persistence** | localStorage |
| **Deployment** | Vercel (static) |

---

## 🗂 File Structure

```
KeyXPulse/
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
├── README.md
└── src/
    ├── main.jsx              ← React entry point
    ├── App.jsx               ← Root app (tabs, keyboard shortcuts)
    ├── index.css             ← All global styles
    ├── components/
    │   ├── Header.jsx        ← Logo + tab navigation
    │   ├── Controls.jsx      ← Duration selector, ring timer, buttons
    │   ├── TypingArea.jsx    ← Word display + input (backspace blocked)
    │   ├── LiveStats.jsx     ← WPM / Accuracy / Errors cards
    │   ├── Results.jsx       ← Post-test results panel
    │   ├── AIFeedback.jsx    ← AI suggestion + weak keys + prediction
    │   ├── Charts.jsx        ← Chart.js WPM & accuracy line charts
    │   ├── History.jsx       ← Session history table + charts
    │   └── Toast.jsx         ← Toast notification system
    ├── hooks/
    │   └── useTypingTest.js  ← All typing test state & logic
    └── utils/
        ├── wordBank.js       ← Random word generation
        ├── storage.js        ← localStorage helpers
        └── aiLogic.js        ← AI suggestions, weak keys, WPM prediction
```
---

## 🎯 How to Use

1. **Select** a time duration from the dropdown
2. **Press Start** (or hit `Enter`)
3. **Type** the displayed words in the input field
4. Timer starts automatically on your **first keystroke**
5. **Results + AI feedback** appear when time runs out
6. Check the **History** tab for your progress over time

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Enter` | Start test (from idle state) |
| `Escape` | Reset / cancel active test |
| `Backspace` | Blocked during test (by design) |

---

## 🧠 AI Logic

- **Smart Suggestions** — Rule-based feedback tailored to your WPM + accuracy combo
- **Weak Key Detection** — Tracks every mismatch and surfaces top 5 most-missed keys
- **WPM Prediction** — Linear regression over your last 3 sessions + current to predict next WPM

---

## 📄 License

MIT — free to use, modify, and share.

---

*Made with 💖 · KeyXPulse © 2026*
