# ☁️ Deployment Guide — CVWeb

This guide explains how to build, optimize, and deploy your CVWeb portfolio to production.

---

## ⚙️ Build for Production

Run the following command to generate the optimized static build:

npm run build

This will create a `/dist` directory containing all compiled assets.

---

## 🌐 Preview Locally

Before deploying, you can preview the production build:

npm run preview

This spins up a local static server so you can verify everything before publishing.

---

## 🚀 Deployment Options

### 1️⃣ GitHub Pages (recommended for portfolios)

1. In your `vite.config.ts`, set the correct `base` path if deploying to a subdirectory:
   base: '/CVWeb/'

2. Run:
   npm run build
   npm run deploy  (if you add a deploy script)

3. Push the `dist` folder to your `gh-pages` branch or use GitHub Actions for automation.

---

### 2️⃣ Netlify

1. Create a new site on Netlify  
2. Connect your GitHub repository  
3. Set build command: `npm run build`  
4. Set publish directory: `dist`  
5. Deploy! Netlify will automatically rebuild on push.

---

### 3️⃣ Vercel

1. Install the Vercel CLI (optional):  
```
   npm i -g vercel
```
2. From your project root, run:  
```
   vercel
```
3. Follow the prompts to link your GitHub project.  
```
   Vercel will automatically detect your React/Vite setup.
```
---

## 🧩 Environment Variables (optional)

If you plan to add analytics, contact forms, or APIs later, create a `.env` file:
```
VITE_API_URL=https://yourapi.com  
VITE_TRACKING_ID=UA-XXXXXX  
```
Vite exposes environment variables prefixed with `VITE_` at build time.

---

## 🔍 Testing Production Build

Before final deployment, test for:
- Animation smoothness (Framer Motion)
- Language switching across all locales
- Responsive layout (desktop, tablet, mobile)
- SEO and meta tags

---

## 🏁 Final Notes

After deployment, your site should be live at something like:
https://yourusername.github.io/CVWeb/  
or  
https://yourname.vercel.app/

> _“A portfolio is not just a website — it’s a living representation of your craft.”_