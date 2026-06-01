# 🚀 Pranav Sharma — Personal Portfolio

> A modern, animated, and fully responsive personal portfolio website built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.  
> Live at: **[pranav-sharma.dev](https://pranav-sharma.dev)**

---

## ✨ Features

- ⚡ **Blazing fast** — powered by Vite with instant HMR
- 🎨 **Stunning dark UI** — glassmorphism, gradient accents, ambient glow blobs
- 🎞️ **Smooth animations** — Framer Motion scroll-linked transitions & micro-animations
- 🌊 **Smooth scrolling** — all navbar links, buttons & CTAs use `scrollIntoView`
- 📧 **Working contact form** — EmailJS integration (no backend needed)
- 🎵 **Music player** — ambient background music while scrolling
- 🖱️ **Custom cursor** — branded cursor experience
- 🌟 **Particle background** — interactive particle canvas
- 📱 **Fully responsive** — mobile, tablet & desktop layouts
- 🎨 **Themed scrollbar** — glassmorphism gradient scrollbar matching the palette
- 🔒 **Environment variables** — EmailJS credentials stored securely via `.env`

---

## 🗂️ Project Structure

```
Portfolio/
├── public/                  # Static assets (Resume PDF, favicon)
├── src/
│   ├── assets/              # Images (avatar, logo, project screenshots)
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed navbar with smooth scroll + hide-on-scroll logic
│   │   ├── OverlayMenu.jsx  # Animated fullscreen overlay menu
│   │   ├── CustomCursor.jsx # Custom branded cursor
│   │   ├── MusicPlayer.jsx  # Ambient background music player
│   │   ├── IntroAnimation.jsx # Intro splash/loader animation
│   │   └── ParticlesBackground.jsx # Interactive particle canvas
│   ├── sections/
│   │   ├── Home.jsx         # Hero section — typewriter, avatar, CTA buttons, socials
│   │   ├── About.jsx        # About me — bio, quick stats, CTA buttons
│   │   ├── Skills.jsx       # Auto-scrolling skills carousel
│   │   ├── Projects.jsx     # Coming soon placeholder (projects in progress)
│   │   ├── Experience.jsx   # Scroll-animated timeline (desktop + mobile)
│   │   ├── Testimonials.jsx # Client/peer testimonials
│   │   ├── Contact.jsx      # Contact form with EmailJS + validation
│   │   └── Footer.jsx       # Footer with socials and links
│   ├── App.jsx              # Root component — section assembly
│   ├── App.css              # Root-level styles
│   ├── index.css            # Global styles, animations, custom scrollbar
│   └── main.jsx             # React entry point
├── .env                     # ⚠️ Local only — EmailJS credentials (gitignored)
├── .env.template            # Template showing required env variable keys
├── .gitignore
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev) | UI library |
| [Vite 7](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & scroll effects |
| [EmailJS](https://www.emailjs.com) | Contact form email delivery |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Router DOM](https://reactrouter.com) | Routing |

---

## 📦 Sections Overview

### 🏠 Home
Hero section with a **typewriter role animation** (Software Developer → Backend Developer → Freelancer), avatar, gradient heading, CTA buttons (**View My Work**, **My Resume**), and social links (X, LinkedIn, Instagram, GitHub).

### 👤 About
Profile card with photo, bio, quick stats (Experience, Specialty, Focus), and two CTA buttons — **View Projects** & **Get in Touch** — both with smooth scroll.

### 🧠 Skills
Auto-scrolling infinite carousel with scroll-direction-aware motion. Current skills:
`Java` · `React` · `Spring` · `REST API` · `Python` · `Docker` · `JDBC`

### 💼 Projects
Currently showing a **"Coming Soon"** placeholder with animated dots and gradient heading. Original multi-project scroll-hijack layout is preserved in comments and ready to be restored.

### 📈 Experience
Horizontal timeline (desktop) / Vertical timeline (mobile) with scroll-linked animations. Experiences:
1. **Tutor** @ Preply *(Feb 2025 – Present)*
2. **Java Intern** @ Learn and Build *(Jun–Jul 2025)*
3. **Back End Developer** @ Wise Tech Labs *(May 2026 – Present)*
4. **Back End Developer** @ SSNAM Global Marketing Pvt Ltd *(May 2026 – Present)*

### 💬 Testimonials
Animated testimonials section showcasing client/peer feedback.

### 📬 Contact
Fully functional contact form with:
- Fields: Name, Email, Service Needed, Budget (conditional), Idea
- Client-side validation with inline error messages
- EmailJS integration for direct email delivery
- Success / Error / Sending states
- Form auto-reset on success

### 🔻 Footer
Social links and copyright.

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/Pranav-Sharma-Official/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the template and fill in your EmailJS credentials:

```bash
cp .env.template .env
```

Open `.env` and add your values:

```env
VITE_SERVICE_ID=service_xxxxxxx
VITE_TEMPLATE_ID=template_xxxxxxx
VITE_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

> Get these from [emailjs.com](https://www.emailjs.com) → Email Services, Email Templates, and Account → API Keys.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

---

## 📧 EmailJS Setup (Contact Form)

1. Sign up at [emailjs.com](https://www.emailjs.com) (free — 200 emails/month)
2. **Add a Gmail service** → copy the `Service ID`
3. **Create an email template** using these variables:

```
Subject: New Contact from {{from_name}}

Name: {{from_name}}
Email: {{reply_to}}
Service: {{service}}
Budget: {{budget}}
Message: {{idea}}
```

4. Copy the `Template ID`
5. Go to **Account → General → API Keys** → copy the `Public Key`
6. Paste all three into your `.env` file

---

## 🚀 Deployment on Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "🚀 Portfolio v1"
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Vite — no config needed
4. Add your environment variables in **Vercel → Settings → Environment Variables**:
   - `VITE_SERVICE_ID`
   - `VITE_TEMPLATE_ID`
   - `VITE_PUBLIC_KEY`
5. Click **Deploy** ✅

### 🌐 Connect Custom Domain (`pranav-sharma.dev`)

In Vercel → **Settings → Domains** → Add `pranav-sharma.dev`, then add these DNS records at your registrar:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Vercel auto-provisions free HTTPS/SSL. 🔒

---

## 🎨 Customization Guide

| What to change | Where |
|----------------|-------|
| Your name & bio | `src/sections/About.jsx`, `src/sections/Home.jsx` |
| Profile photo | `src/assets/p.png`, `src/assets/avator.png` |
| Logo | `src/assets/Logo.png` |
| Skills list | `src/sections/Skills.jsx` → `skills` array |
| Experience entries | `src/sections/Experience.jsx` → `experiences` array |
| Social links | `src/sections/Home.jsx` → `socials` array |
| Resume PDF | `public/Resume.pdf` (replace with your own) |
| Contact email | EmailJS template settings |
| Color palette | `src/index.css` (theme uses `#1CD8D2`, `#00bf8f`, `#302b63`) |
| Projects | Uncomment original code in `src/sections/Projects.jsx` |

---

## 📁 Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `VITE_SERVICE_ID` | EmailJS Service ID (from Email Services tab) |
| `VITE_TEMPLATE_ID` | EmailJS Template ID (from Email Templates tab) |
| `VITE_PUBLIC_KEY` | EmailJS Public Key (from Account → API Keys) |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.  
> When deploying, always add these as environment variables directly in Vercel/Netlify dashboard.

---

## 📜 License

This project is personal and not open-sourced for redistribution. All rights reserved © 2026 Pranav Sharma.

---

## 🙋‍♂️ Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/-pranav--sharma-/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pranav-Sharma-Official)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/_pranav__sharma/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pranav_sharma.official/)

---

<p align="center">Built with ❤️ by <strong>Pranav Sharma</strong> · <a href="https://pranav-sharma.dev">pranav-sharma.dev</a></p>
