# 🧠 Project Architecture — CVWeb

CVWeb is designed with a **modular, scalable, and multilingual architecture** to power a cinematic portfolio experience built on React + Vite + Framer Motion.

---

## 🏗️ Overview

The app follows a **component-based architecture** with **data-driven rendering** and **dynamic routing**.

Each page and project pulls its content dynamically from JSON files, ensuring:
- Easy multilingual updates
- Clear separation between content and presentation
- Fast static builds and minimal bundle size

---

## 📂 Directory Structure
```
src/
│
├── assets/ # Global assets (fonts, icons, etc.)
├── components/ # Reusable UI (FabMenu, SocialBubbles, etc.)
├── data/
│ └── projects/ # Project metadata in JSON (used by Work and Project pages)
├── hooks/ # Custom React hooks (scroll, inertia, etc.)
├── i18n/ # Internationalization files (EN, ES, FR, NL)
├── pages/ # Page components (Home, About, Work, Contact)
├── utils/ # Shared helpers and styles
│
├── App.tsx # Root React component
└── main.tsx # React/Vite entry point
```
---

## 🌍 Internationalization (i18n)

- Managed using **i18next** and **react-i18next**
- Language files stored in `/src/i18n/[lang]/`
- Automatically detects browser language or stored preference
- Supports **English**, **Spanish**, **French**, and **Dutch**

---

## 🧱 Component Hierarchy
```
App
├── FabMenu
│ ├── LanguageBubbles
│ └── SocialBubbles
├── PageRouter
│ ├── Home
│ ├── Work
│ ├── About
│ └── Contact
└── ProjectPage
```


Each component is self-contained and optimized for reuse with minimal prop dependencies.

---

## ⚙️ Data Flow

1. **Project data** lives in `/src/data/projects/`
2. Pages like `/work` and `/project/:slug` import data dynamically
3. Translations are handled through `t('namespace.key')` calls using i18next
4. Global state (language, menu open state, etc.) is locally managed per component — no external state library

---

## 🎨 UI / UX

- **Framer Motion** handles animations for a cinematic and responsive feel  
- **Custom hooks** for scroll and inertia enhance user interaction  
- **Flexbox and CSS Grid** manage responsive layout cleanly  
- **Focus on performance**: minimal dependencies and lazy loading for routes

---

## 🔒 Design Philosophy

> “Simplicity, structure, and storytelling.”

The goal of CVWeb is to merge design and engineering — delivering a personal portfolio that feels dynamic yet minimal, cinematic yet lightweight.

