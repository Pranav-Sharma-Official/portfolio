import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import {
  FaGithub, FaDocker, FaShieldAlt, FaDatabase, FaLock,
  FaChartBar, FaLink, FaCheck, FaChevronDown, FaExternalLinkAlt,
  FaKey, FaCode, FaUsers, FaBolt, FaLinkedin, FaEnvelope,
  FaLayerGroup, FaServer, FaClock, FaTerminal, FaCog,
  FaCloud, FaArrowDown, FaCheckCircle, FaBoxOpen,
  FaGlobe, FaNetworkWired, FaRocket, FaLeaf,
  FaReact, FaStar, FaPlay, FaBook,
} from "react-icons/fa";
import { SiSpringboot, SiPostgresql, SiMysql, SiTailwindcss, SiVite, SiAxios } from "react-icons/si";

// Project screenshots
import ssLanding   from "../assets/projects/ps-linky/landing.png";
import ssDashboard from "../assets/projects/ps-linky/dashboard.png";
import ssLogin     from "../assets/projects/ps-linky/login.png";
import ssAnalytics from "../assets/projects/ps-linky/analytics.png";
import ssRegister  from "../assets/projects/ps-linky/register.png";
import ssModal     from "../assets/projects/ps-linky/short_url_model.png";

// ── Animated Counter ───────────────────────────────────────────────────────
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return { count, ref };
}

// ── Reusable fade-in wrapper ───────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// ── Glass card ─────────────────────────────────────────────────────────────
const Glass = ({ children, className = "", glow = false }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm
      transition-all duration-300 hover:border-[#1CD8D2]/25 hover:bg-white/[0.07]
      ${glow ? "shadow-[0_0_30px_rgba(28,216,210,0.08)]" : ""}
      ${className}`}
  >
    {children}
  </div>
);

// ── Section wrapper ────────────────────────────────────────────────────────
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-24 px-4 md:px-8 overflow-hidden ${className}`}>
    {children}
  </section>
);

// ── Section heading ────────────────────────────────────────────────────────
const Heading = ({ tag, title, sub }) => (
  <FadeIn className="text-center mb-16">
    <span className="inline-block px-4 py-1 rounded-full border border-[#1CD8D2]/30 bg-[#1CD8D2]/10 text-[#1CD8D2] text-xs font-semibold uppercase tracking-widest mb-5">
      {tag}
    </span>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h2>
    {sub && <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{sub}</p>}
  </FadeIn>
);

// ── Method badge ───────────────────────────────────────────────────────────
const MethodBadge = ({ method }) => {
  const colors = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md border text-xs font-bold font-mono ${colors[method] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
      {method}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STICKY NAV
// ─────────────────────────────────────────────────────────────────────────────
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Overview", "Features", "Architecture", "APIs", "Security", "Interview"];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10" : "py-5"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-white font-bold text-lg cursor-pointer border-none bg-transparent"
        >
          <FaLink className="text-[#1CD8D2]" />
          <span>PS Linky</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="text-sm text-gray-400 hover:text-[#1CD8D2] transition-colors duration-200 bg-transparent border-none cursor-pointer relative group"
            >
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#1CD8D2] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>
        <a
          href="https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white hover:border-[#1CD8D2]/60 hover:text-[#1CD8D2] transition-all"
        >
          <FaGithub size={14} /> GitHub
        </a>
      </div>
    </motion.header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT COUNTER CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ value, suffix = "", label, icon: Icon }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center p-6">
      <div className="flex items-center justify-center gap-1 mb-1">
        <span className="text-4xl md:text-5xl font-black text-white">{count}</span>
        <span className="text-3xl md:text-4xl font-black text-[#1CD8D2]">{suffix}</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-gray-400 text-sm">
        {Icon && <Icon size={12} className="text-[#1CD8D2]" />}
        <span>{label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const techChips = [
    "Java 26", "Spring Boot 4", "React 19", "JWT", "PostgreSQL",
    "Docker", "TanStack Query", "Chart.js", "Vite 8",
  ];

  const buttons = [
    { label: "Live Demo", icon: FaGlobe, href: "https://ps-linky.netlify.app/", primary: true },
    { label: "GitHub", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener" },
    { label: "Docker", icon: FaDocker, href: "https://hub.docker.com/repository/docker/pranavsharmaofficial/ps-linky-url-shortener/general" },
    { label: "Hoppscotch Collection", icon: FaBoxOpen, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/blob/main/docs/Hoppscotch_Export.json" },
    { label: "Summarised Documentation", icon: FaBook, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/blob/main/README.md" },
  ];

  return (
    <Section id="hero" className="pt-36 pb-0 min-h-screen flex flex-col justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#1CD8D2] opacity-[0.06] blur-[120px]" />
        <div className="absolute top-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#302b63] opacity-20 blur-[100px]" />
        <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full bg-[#00bf8f] opacity-10 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live in Production · Full Stack Project
        </motion.div>

        {/* Project name */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #1CD8D2 0%, #00bf8f 50%, #302b63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PS Linky
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-medium mb-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          URL Shortening, Simplified.
        </motion.p>
        <motion.p
          className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          A production-grade full-stack URL shortener with JWT authentication, click analytics,
          interactive dashboards, and a multi-stage Docker deployment pipeline.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {buttons.map(({ label, icon: Icon, href, primary }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                primary
                  ? "bg-gradient-to-r from-[#1CD8D2] to-[#00bf8f] text-black font-semibold shadow-[0_0_24px_rgba(28,216,210,0.4)]"
                  : "border border-white/15 bg-white/5 text-white hover:border-[#1CD8D2]/40 hover:text-[#1CD8D2]"
              }`}
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </motion.div>

        {/* Tech chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {techChips.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.06] border border-white/10 text-gray-300">
              {t}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Glass className="inline-grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/10 rounded-3xl overflow-hidden w-full max-w-3xl" glow>
            <StatCard value={1600} suffix="+" label="Lines of Code" icon={FaCode} />
            <StatCard value={7} suffix="+" label="REST Endpoints" icon={FaNetworkWired} />
            <StatCard value={17} suffix="" label="Components" icon={FaLayerGroup} />
            <StatCard value={3} suffix="" label="Database Tables" icon={FaDatabase} />
          </Glass>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          {/* Browser mockup — real dashboard screenshot */}
          <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(28,216,210,0.12)]">
            {/* Mac-style browser chrome */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white/[0.06] rounded-md px-4 py-1 text-xs text-gray-500 font-mono text-center border border-white/5">
                https://app.pslinky.com/dashboard
              </div>
            </div>
            {/* Real dashboard image */}
            <img
              src={ssDashboard}
              alt="PS Linky Dashboard"
              className="w-full block"
            />
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#1CD8D2] opacity-[0.06] blur-3xl" />
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewSection() {
  const highlights = [
    { icon: FaShieldAlt, label: "Stateless JWT Auth", desc: "48-hour tokens, BCrypt hashing, HMAC-SHA signed" },
    { icon: FaChartBar, label: "Click Analytics", desc: "Per-URL & aggregate daily charts with Chart.js" },
    { icon: FaDatabase, label: "Dual DB Support", desc: "PostgreSQL (prod via Neon) + MySQL (local dev)" },
    { icon: FaDocker, label: "Dockerized Deploy", desc: "Multi-stage build with Eclipse Temurin Java 26" },
  ];

  const users = [
    { icon: FaCode, type: "Developers", desc: "Share portfolio links, project demos, or blog posts compactly" },
    { icon: FaChartBar, type: "Marketers", desc: "Track how many times shared links are clicked over time" },
    { icon: FaUsers, type: "Educators", desc: "Share clean, short reference URLs with students" },
    { icon: FaGlobe, type: "Businesses", desc: "Self-hosted Bitly alternative with full data control" },
  ];

  return (
    <Section id="overview" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Overview" title="The Complete Picture" sub="A production-ready URL shortener engineered from database to deployment" />

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FadeIn delay={0.1}>
            <Glass className="p-8 h-full" glow>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                <span className="text-red-400 text-lg font-bold">!</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Problem</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Long URLs are unwieldy, untrustworthy in appearance, and difficult to share verbally or in constrained formats — social media bios, SMS, or print media.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Existing commercial solutions like Bitly lock analytics behind paywalls and store your data on third-party servers with no visibility into how it's used.
              </p>
            </Glass>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Glass className="p-8 h-full border-[#1CD8D2]/15" glow>
              <div className="w-10 h-10 rounded-xl bg-[#1CD8D2]/10 border border-[#1CD8D2]/20 flex items-center justify-center mb-5">
                <FaCheckCircle className="text-[#1CD8D2]" size={16} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Solution</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                PS Linky generates compact 8-character alphanumeric slugs (62⁸ = 218 trillion combinations) that redirect instantly to the original destination.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Users get a private dashboard with actionable analytics — click counts and date-filtered bar charts — giving full visibility into link performance, all self-hosted.
              </p>
            </Glass>
          </FadeIn>
        </div>

        {/* Target Users */}
        <FadeIn className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Who Is It For?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map(({ icon: Icon, type, desc }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Glass className="p-5 h-full">
                  <Icon className="text-[#1CD8D2] mb-3" size={20} />
                  <div className="font-semibold text-white mb-2">{type}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Key Highlights */}
        <FadeIn>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Highlights</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Glass className="p-5 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#1CD8D2]/10 border border-[#1CD8D2]/20 flex items-center justify-center mb-4">
                    <Icon className="text-[#1CD8D2]" size={16} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">{label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FEATURES
// ─────────────────────────────────────────────────────────────────────────────
function FeaturesSection() {
  const groups = [
    {
      title: "Authentication",
      icon: FaKey,
      color: "#a78bfa",
      features: [
        "User registration with username, email & password",
        "BCrypt password hashing (10 rounds, never stored plain)",
        "JWT issued on login — 48-hour expiry, HMAC-SHA256 signed",
        "Token stored in localStorage, sent as Authorization: Bearer",
        "Route guards via PrivateRoute — redirect unauthenticated users",
        "Logout clears token from both React state and localStorage",
      ],
    },
    {
      title: "Analytics",
      icon: FaChartBar,
      color: "#34d399",
      features: [
        "Total click count per URL (integer, incremented on each redirect)",
        "Per-click ClickEvent row with precise LocalDateTime timestamp",
        "Aggregate daily clicks for all user links (Chart.js bar chart)",
        "Per-link daily clicks over custom date range",
        "startDate / endDate ISO 8601 query params on all analytics APIs",
        "Analytics panel lazy-loaded — only fetches when Analytics clicked",
      ],
    },
    {
      title: "Dashboard",
      icon: FaLayerGroup,
      color: "#60a5fa",
      features: [
        "Full-width Chart.js bar chart of total daily clicks",
        "URL list sorted by most recently created (descending)",
        "One-click copy of short URL with visual clipboard feedback",
        "Open short URL in new tab via external link icon",
        "Inline expandable analytics panel per URL card",
        "TanStack React Query with 5s staleTime — no redundant fetches",
      ],
    },
    {
      title: "Security",
      icon: FaShieldAlt,
      color: "#f87171",
      features: [
        "BCrypt via Spring Security BCryptPasswordEncoder",
        "JWT validated on every request by JwtAuthenticationFilter",
        "CORS restricted to specific frontend origin via env variable",
        "CSRF disabled — safe for stateless JWT (Authorization header)",
        "@PreAuthorize('hasRole(USER)') method-level authorization",
        "Spring Data JPA parameterized queries — SQL injection prevention",
      ],
    },
    {
      title: "Deployment",
      icon: FaDocker,
      color: "#38bdf8",
      features: [
        "Multi-stage Dockerfile: JDK build stage → lean JRE runtime",
        "Eclipse Temurin Java 26 — official OpenJDK distribution",
        "Maven dependency pre-caching layer for faster Docker rebuilds",
        "Environment variable-driven config — no hardcoded secrets",
        "Separate .env (MySQL/local) and .env.prod (Neon/production)",
        "Frontend static build deployable to any CDN or static host",
      ],
    },
    {
      title: "User Experience",
      icon: FaRocket,
      color: "#fbbf24",
      features: [
        "Framer Motion entrance animations on hero text & feature cards",
        "Sticky gradient navbar with mobile hamburger menu",
        "React Hot Toast notifications for all success/failure actions",
        "Responsive design — mobile, tablet, desktop with Tailwind CSS",
        "Empty state UX — ghost placeholder bars in chart when no data",
        "Hourglass spinner shown during per-URL analytics fetch",
      ],
    },
  ];

  return (
    <Section id="features">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Features" title="Everything You Need" sub="Authentication, analytics, security, and deployment — built to production standards" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map(({ title, icon: Icon, color, features }, gi) => (
            <FadeIn key={title} delay={gi * 0.08}>
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <Glass className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="font-bold text-white">{title}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <FaCheck className="text-[#1CD8D2] mt-0.5 shrink-0" size={10} />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
function ArchitectureSection() {
  const layers = [
    { label: "Browser (React 19 SPA)", icon: FaReact, color: "#61dafb", desc: "Single-page application — TanStack Query, Framer Motion, Chart.js, React Router v7" },
    { label: "Spring Boot REST API", icon: SiSpringboot, color: "#6db33f", desc: "Port 8080 — SecurityFilterChain, three controllers, CORS, JSON responses" },
    { label: "JWT Auth Filter", icon: FaKey, color: "#a78bfa", desc: "OncePerRequestFilter — validates HMAC-SHA token, populates SecurityContextHolder" },
    { label: "Controller Layer", icon: FaServer, color: "#60a5fa", desc: "AuthController, UrlMappingController, RedirectController — HTTP in/out only" },
    { label: "Service Layer", icon: FaCog, color: "#fbbf24", desc: "Business logic — slug generation, click recording, analytics aggregation" },
    { label: "Repository Layer", icon: FaDatabase, color: "#34d399", desc: "Spring Data JPA interfaces — derived queries, no raw SQL, Hibernate ORM" },
    { label: "PostgreSQL / MySQL", icon: SiPostgresql, color: "#336791", desc: "3 normalized tables: users, url_mapping, click_event — Neon serverless in prod" },
  ];

  return (
    <Section id="architecture" className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Architecture" title="Layered by Design" sub="Three-layer backend architecture combined with a SPA + REST API pattern" />
        <div className="relative">
          {layers.map(({ label, icon: Icon, color, desc }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="relative flex gap-4 mb-2">
                {/* Connector line */}
                {i < layers.length - 1 && (
                  <div className="absolute left-6 top-14 w-px h-8 bg-gradient-to-b from-white/20 to-transparent z-10" />
                )}
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-20"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon size={18} style={{ color }} />
                </motion.div>
                <Glass className="flex-1 p-4 mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{label}</span>
                    <span className="text-xs text-gray-600 font-mono">Layer {i + 1}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </Glass>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-start ml-5 my-1">
                  <FaArrowDown className="text-[#1CD8D2]/40" size={10} />
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. TECH STACK
// ─────────────────────────────────────────────────────────────────────────────
function TechStackSection() {
  const categories = [
    {
      name: "Frontend",
      icon: FaReact,
      color: "#61dafb",
      items: ["React 19", "Vite 8", "TailwindCSS v4", "Framer Motion", "React Router v7"],
    },
    {
      name: "Backend",
      icon: SiSpringboot,
      color: "#6db33f",
      items: ["Spring Boot 4.1.0", "Spring MVC", "Spring Data JPA", "Spring Security", "Java 26", "Maven"],
    },
    {
      name: "Database",
      icon: FaDatabase,
      color: "#336791",
      items: ["PostgreSQL (Neon serverless)", "MySQL (development)", "Hibernate ORM", "HikariCP connection pool"],
    },
    {
      name: "Security",
      icon: FaShieldAlt,
      color: "#f87171",
      items: ["JWT via jjwt 0.13.0", "BCrypt password hashing", "HMAC-SHA256 signing", "Spring Security filter chain"],
    },
    {
      name: "Deployment",
      icon: FaDocker,
      color: "#2496ed",
      items: ["Docker multi-stage build", "Eclipse Temurin Java 26", "Neon serverless PostgreSQL", "Environment variable config"],
    },
    {
      name: "Libraries",
      icon: FaBoxOpen,
      color: "#a78bfa",
      items: ["TanStack React Query v5", "Axios", "Chart.js + react-chartjs-2", "react-hook-form", "react-hot-toast", "MUI (Material UI)", "Lombok", "dayjs"],
    },
  ];

  return (
    <Section id="techstack">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Tech Stack" title="Built with the Best" sub="A carefully selected, production-proven technology stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ name, icon: Icon, color, items }, i) => (
            <FadeIn key={name} delay={i * 0.08}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <Glass className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span className="font-bold text-white">{name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.06] border border-white/10 text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SCREENSHOTS
// ─────────────────────────────────────────────────────────────────────────────
function ScreenshotsSection() {
  const [lightbox, setLightbox] = useState(null);

  const screens = [
    { name: "Landing Page",       route: "/",          img: ssLanding,   desc: "Hero section with animated headline and feature cards" },
    { name: "Dashboard",          route: "/dashboard", img: ssDashboard, desc: "URL list, analytics chart, and create button" },
    { name: "Login Page",         route: "/login",     img: ssLogin,     desc: "Branded auth card with react-hook-form validation" },
    { name: "Analytics Panel",    route: "/dashboard", img: ssAnalytics, desc: "Per-URL bar chart with date-range filtering" },
    { name: "Register Page",      route: "/register",  img: ssRegister,  desc: "Registration with email, username, password" },
    { name: "Short URL Modal",    route: "/dashboard", img: ssModal,     desc: "MUI modal to create and copy a new short link" },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Screenshots" title="See It in Action" sub="Every screen designed for clarity, speed, and a premium experience" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {screens.map(({ name, img, desc }, i) => (
            <FadeIn key={name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
                onClick={() => setLightbox(screens[i])}
              >
                <Glass className="overflow-hidden group">
                  {/* Mac browser frame */}
                  <div className="bg-[#1a1a1a] px-3 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 bg-white/[0.06] rounded px-3 py-0.5 text-[10px] text-gray-600 font-mono text-center border border-white/[0.06] truncate">
                      https://ps-linky.netlify.app{screens[i] ? (screens[i].route || "/") : "/"}
                    </div>
                  </div>
                  {/* Real screenshot */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <FaExternalLinkAlt size={11} /> Click to enlarge
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{name}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                    <FaExternalLinkAlt size={11} className="text-gray-600 shrink-0 mt-1" />
                  </div>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="relative max-w-5xl w-full"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightbox.img}
                  alt={lightbox.name}
                  className="w-full rounded-2xl border border-white/15 shadow-2xl"
                />
                <div className="mt-4 flex items-center justify-between px-1">
                  <div>
                    <div className="font-semibold text-white">{lightbox.name}</div>
                    <div className="text-sm text-gray-400">{lightbox.desc}</div>
                  </div>
                  <button
                    onClick={() => setLightbox(null)}
                    className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-white/25"
                  >
                    Close ✕
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ENGINEERING HIGHLIGHTS
// ─────────────────────────────────────────────────────────────────────────────
function EngineeringSection() {
  const items = [
    { icon: FaKey, title: "JWT Authentication", color: "#a78bfa", desc: "HMAC-SHA256 signed tokens with 48h expiry, validated by OncePerRequestFilter on every request before Spring Security processes it." },
    { icon: FaLayerGroup, title: "Layered Architecture", color: "#60a5fa", desc: "Controller → Service → Repository — strict separation of concerns. Each class has a single responsibility enabling testability and maintainability." },
    { icon: FaNetworkWired, title: "7 REST Endpoints", color: "#34d399", desc: "RESTful JSON API with resource-based naming, proper HTTP status codes, DTO pattern for stable API contracts independent of entity changes." },
    { icon: FaDocker, title: "Multi-Stage Docker", color: "#2496ed", desc: "Build stage with JDK 26, runtime stage with lean JRE only. Maven dependency caching layer reduces rebuild time significantly." },
    { icon: FaChartBar, title: "Dual Analytics", color: "#fbbf24", desc: "Cumulative click counter (O(1) display) + immutable ClickEvent log (date-range queries) maintained simultaneously on every redirect." },
    { icon: FaCheck, title: "Frontend Validation", color: "#f87171", desc: "react-hook-form with onTouched mode, regex-validated email and URL fields, minimum password length — errors only shown after user interaction." },
    { icon: FaShieldAlt, title: "Exception Handling", color: "#fb923c", desc: "try/catch on all API calls, react-hot-toast error display, PrivateRoute auth guards, wildcard route to ErrorPage component." },
    { icon: FaLock, title: "Defense in Depth", color: "#e879f9", desc: "BCrypt + JWT + CORS restriction + @PreAuthorize + JPA parameterized queries + React JSX escaping — multiple independent security layers." },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Engineering" title="Built to Last" sub="Production-grade engineering decisions throughout the entire stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, title, color, desc }, i) => (
            <FadeIn key={title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
                <Glass className="p-5 h-full">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">{title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CHALLENGES SOLVED
// ─────────────────────────────────────────────────────────────────────────────
function ChallengesSection() {
  const challenges = [
    {
      num: "01",
      problem: "Stateless JWT Integration with Spring Security",
      solution: "Built a custom OncePerRequestFilter that intercepts every request, parses the Bearer token, validates the HMAC signature without a session store, and populates the SecurityContextHolder — all without breaking the filter chain for public routes.",
      outcome: "Zero-session stateless auth across all protected endpoints, seamlessly coexisting with Spring Security's default filter chain.",
    },
    {
      num: "02",
      problem: "CORS for SPA + Separate API Origin",
      solution: "Both permitting OPTIONS requests in SecurityFilterChain and configuring CorsRegistry in WebConfig.java, with the allowed origin injected from the FRONTEND_URL environment variable.",
      outcome: "Frontend (port 5173 dev / production CDN) can make authenticated cross-origin requests to the backend API with correct preflight handling.",
    },
    {
      num: "03",
      problem: "TanStack React Query v5 Migration",
      solution: "The onError callback was removed in v5. Restructured all error handling to use useEffect with the isError and error states instead of the callback pattern, and adopted the new queryKey array format.",
      outcome: "Clean, future-proof data fetching with proper error handling and background re-fetching working correctly.",
    },
    {
      num: "04",
      problem: "N+1 Query Problem in Aggregate Analytics",
      solution: "Implemented findByUrlMappingInAndClickDateBetween JPA query using an IN clause to fetch click events for all of a user's URLs in a single database round-trip instead of one query per URL.",
      outcome: "Analytics for users with hundreds of URLs fetches in O(1) DB round-trips instead of O(n), eliminating N+1 performance degradation.",
    },
    {
      num: "05",
      problem: "Dual Database (MySQL dev / PostgreSQL prod)",
      solution: "Maintained separate .env and .env.prod files with Hibernate ddl-auto=update and dialect switching via DATABASE_DIALECT environment variable, without any code changes between environments.",
      outcome: "Seamless local development on MySQL and production on Neon PostgreSQL with identical codebase — zero environment-specific code.",
    },
  ];

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <Heading tag="Challenges" title="Problems Solved" sub="Real engineering challenges and the decisions made to overcome them" />
        <div className="space-y-4">
          {challenges.map(({ num, problem, solution, outcome }, i) => (
            <FadeIn key={num} delay={i * 0.08}>
              <Glass className="p-6 md:p-8">
                <div className="flex gap-5">
                  <div className="text-4xl font-black text-white/5 shrink-0 leading-none select-none">{num}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-base mb-4">{problem}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold mb-2">Solution</div>
                        <p className="text-sm text-gray-400 leading-relaxed">{solution}</p>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#1CD8D2] uppercase tracking-widest font-semibold mb-2">Outcome</div>
                        <p className="text-sm text-gray-400 leading-relaxed">{outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Glass>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. REST APIs
// ─────────────────────────────────────────────────────────────────────────────
function APIsSection() {
  const apis = [
    { method: "POST", endpoint: "/api/auth/public/register", desc: "Register a new user account", auth: false },
    { method: "POST", endpoint: "/api/auth/public/login", desc: "Authenticate user, returns signed JWT", auth: false },
    { method: "POST", endpoint: "/api/urls/shorten", desc: "Create a new shortened URL for authenticated user", auth: true },
    { method: "GET", endpoint: "/api/urls/myurls", desc: "Get all shortened URLs for the authenticated user", auth: true },
    { method: "GET", endpoint: "/api/urls/analytics/{shortUrl}", desc: "Click data grouped by day for a specific URL", auth: true },
    { method: "GET", endpoint: "/api/urls/totalClicks", desc: "Total clicks grouped by day for all user links", auth: true },
    { method: "GET", endpoint: "/{shortUrl}", desc: "Resolve short URL — 302 redirect to original", auth: false },
  ];

  return (
    <Section id="apis" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="REST API" title="7 Clean Endpoints" sub="Resource-based naming, consistent HTTP status codes, DTO-pattern responses" />
        <FadeIn>
          <Glass className="overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</div>
              <div className="col-span-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Endpoint</div>
              <div className="col-span-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
              <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Auth</div>
            </div>
            {apis.map(({ method, endpoint, desc, auth }, i) => (
              <motion.div
                key={endpoint}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <div className="col-span-2 flex items-center"><MethodBadge method={method} /></div>
                <div className="col-span-5 flex items-center">
                  <code className="text-sm text-[#1CD8D2] font-mono break-all">{endpoint}</code>
                </div>
                <div className="col-span-4 flex items-center text-sm text-gray-400">{desc}</div>
                <div className="col-span-1 flex items-center justify-center">
                  {auth
                    ? <span className="w-2 h-2 rounded-full bg-yellow-400" title="Auth required" />
                    : <span className="w-2 h-2 rounded-full bg-emerald-400" title="Public" />}
                </div>
              </motion.div>
            ))}
          </Glass>
        </FadeIn>

        {/* Response schemas */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <FadeIn delay={0.1}>
            <Glass className="p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">UrlMappingDTO Response</div>
              <pre className="text-xs text-[#1CD8D2] font-mono leading-relaxed overflow-x-auto">{`{
  "id": 1,
  "originalUrl": "https://example.com/long/path",
  "shortUrl": "Ab3Cd8Ef",
  "clickCount": 42,
  "createdDate": "2025-01-15T10:30:00",
  "username": "john_doe"
}`}</pre>
            </Glass>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Glass className="p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">ClickEventDTO Response</div>
              <pre className="text-xs text-[#1CD8D2] font-mono leading-relaxed overflow-x-auto">{`{ "clickDate": "2025-01-15", "count": 12 }

// Analytics endpoint query params:
?startDate=2024-01-01&endDate=2026-12-31

// JWT Authorization header:
Authorization: Bearer <token>`}</pre>
            </Glass>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. DATABASE
// ─────────────────────────────────────────────────────────────────────────────
function DatabaseSection() {
  const tables = [
    {
      name: "users",
      color: "#60a5fa",
      columns: [
        { col: "id", type: "BIGINT", note: "PK, AUTO_INCREMENT" },
        { col: "username", type: "VARCHAR", note: "Login identifier" },
        { col: "email", type: "VARCHAR", note: "User email address" },
        { col: "password", type: "VARCHAR", note: "BCrypt-hashed" },
        { col: "role", type: "VARCHAR", note: "DEFAULT 'ROLE_USER'" },
      ],
    },
    {
      name: "url_mapping",
      color: "#1CD8D2",
      columns: [
        { col: "id", type: "BIGINT", note: "PK, AUTO_INCREMENT" },
        { col: "original_url", type: "VARCHAR", note: "Full long URL" },
        { col: "short_url", type: "VARCHAR", note: "8-char alphanumeric slug" },
        { col: "click_count", type: "INT", note: "DEFAULT 0, incremented on redirect" },
        { col: "created_date", type: "TIMESTAMP", note: "Creation timestamp" },
        { col: "user_id", type: "BIGINT", note: "FK → users.id" },
      ],
    },
    {
      name: "click_event",
      color: "#34d399",
      columns: [
        { col: "id", type: "BIGINT", note: "PK, AUTO_INCREMENT" },
        { col: "click_date", type: "TIMESTAMP", note: "Precise click timestamp" },
        { col: "url_mapping_id", type: "BIGINT", note: "FK → url_mapping.id" },
      ],
    },
  ];

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        <Heading tag="Database" title="3 Normalized Tables" sub="Relational design with foreign key constraints and JPA-managed relationships" />
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {tables.map(({ name, color, columns }, i) => (
            <FadeIn key={name} delay={i * 0.1}>
              <Glass className="overflow-hidden h-full">
                <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2" style={{ borderTop: `2px solid ${color}` }}>
                  <FaDatabase size={12} style={{ color }} />
                  <code className="font-mono font-bold text-sm" style={{ color }}>{name}</code>
                </div>
                <div className="p-2">
                  {columns.map(({ col, type, note }) => (
                    <div key={col} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <code className="text-xs font-mono text-white/80 w-28 shrink-0">{col}</code>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 font-mono shrink-0">{type}</span>
                      <span className="text-[10px] text-gray-600 truncate">{note}</span>
                    </div>
                  ))}
                </div>
              </Glass>
            </FadeIn>
          ))}
        </div>

        {/* Relationships */}
        <FadeIn>
          <Glass className="p-6">
            <div className="text-sm font-semibold text-white mb-4">Relationships</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1CD8D2] mt-1.5 shrink-0" />
                <div><span className="text-white font-mono text-xs">users</span> → <span className="text-white font-mono text-xs">url_mapping</span>: One-to-Many — <code className="text-[#1CD8D2] text-xs">@ManyToOne</code> on UrlMapping.user with <code className="text-[#1CD8D2] text-xs">@JoinColumn(name="user_id")</code></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#34d399] mt-1.5 shrink-0" />
                <div><span className="text-white font-mono text-xs">url_mapping</span> → <span className="text-white font-mono text-xs">click_event</span>: One-to-Many — <code className="text-[#1CD8D2] text-xs">@OneToMany(mappedBy="urlMapping", fetch=LAZY)</code></div>
              </div>
            </div>
          </Glass>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. SECURITY
// ─────────────────────────────────────────────────────────────────────────────
function SecuritySection() {
  const items = [
    { icon: FaKey, title: "JWT Authentication", color: "#a78bfa", desc: "HMAC-SHA256 signed tokens using Base64-decoded secret from env var. Claims: sub (username), roles, iat, exp. Expiry: 48 hours." },
    { icon: FaLock, title: "BCrypt Hashing", color: "#f87171", desc: "BCryptPasswordEncoder with 10 rounds. Adaptive one-way hash — brute-force computationally expensive. Plaintext password never stored or logged." },
    { icon: FaGlobe, title: "CORS Policy", color: "#60a5fa", desc: "Origin restricted to FRONTEND_URL env var only (not *). Allowed: GET, POST, PUT, DELETE, OPTIONS. allowCredentials(true). maxAge(3600)." },
    { icon: FaShieldAlt, title: "CSRF Disabled", color: "#34d399", desc: "Safe for stateless JWT APIs. JWT sent in Authorization header (not cookie), so browsers can't automatically send it cross-origin — CSRF inapplicable." },
    { icon: FaDatabase, title: "SQL Injection Prevention", color: "#fbbf24", desc: "Spring Data JPA + Hibernate ORM for all DB ops. Derived queries and Spring Data interfaces only — Hibernate uses parameterized queries internally." },
    { icon: FaCode, title: "XSS Prevention", color: "#fb923c", desc: "React JSX inherently escapes all rendered values. No dangerouslySetInnerHTML found. User-supplied URLs displayed as text content only." },
  ];

  return (
    <Section id="security" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Security" title="Defense in Depth" sub="Multiple independent security layers — each layer assumes the previous may fail" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, color, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Glass className="p-6 h-full">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="font-bold text-white text-sm mb-3">{title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. PERFORMANCE
// ─────────────────────────────────────────────────────────────────────────────
function PerformanceSection() {
  const items = [
    { icon: FaBolt, title: "React Query Caching", color: "#fbbf24", desc: "5-second staleTime prevents redundant API calls within the stale window during the same session. URL list and total clicks cached in parallel." },
    { icon: FaLeaf, title: "Lazy Analytics Loading", color: "#34d399", desc: "Per-URL analytics fetched on demand only when Analytics button clicked — not pre-loaded. Hourglass spinner shown during lazy fetch." },
    { icon: FaCloud, title: "Vite Build Optimization", color: "#60a5fa", desc: "ES module tree-shaking, chunk splitting, minified output. Only production-necessary code shipped to browser." },
    { icon: FaDocker, title: "Lean Docker Image", color: "#2496ed", desc: "Multi-stage build: JDK only for compilation, JRE-only runtime image. No Maven, JDK, or build tools in the production container." },
    { icon: FaDatabase, title: "Bulk IN-Clause Query", color: "#1CD8D2", desc: "findByUrlMappingInAndClickDateBetween fetches click events for all user URLs in a single DB round-trip, eliminating N+1 query problems." },
    { icon: FaServer, title: "HikariCP + Neon Pooling", color: "#a78bfa", desc: "Spring Boot uses HikariCP by default. Neon serverless provides PgBouncer-compatible connection pooling at cloud infrastructure level." },
  ];

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        <Heading tag="Performance" title="Engineered for Speed" sub="Caching, lazy loading, build optimization, and efficient database queries" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, color, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <Glass className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <span className="font-semibold text-white text-sm">{title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </Glass>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. DEPLOYMENT
// ─────────────────────────────────────────────────────────────────────────────
function DeploymentSection() {
  const steps = [
    { icon: FaDocker, label: "Stage 1 — Build", color: "#2496ed", desc: "eclipse-temurin:26-jdk base image. Maven wrapper pre-caches dependencies with dependency:go-offline for Docker layer caching. mvn clean package -DskipTests compiles the Spring Boot JAR." },
    { icon: FaServer, label: "Stage 2 — Runtime", color: "#6db33f", desc: "eclipse-temurin:26-jre lean runtime image. COPY --from=build copies only the final JAR. EXPOSE 8080. ENTRYPOINT: java -jar /app/app.jar. No JDK or Maven in production." },
    { icon: FaDatabase, label: "Database — Neon", color: "#336791", desc: "Neon serverless PostgreSQL in production. Connection string injected via DATABASE_URL env var. Neon provides built-in PgBouncer connection pooling. DDL auto-migrated by Hibernate on startup." },
    { icon: FaGlobe, label: "Frontend — Static CDN", color: "#1CD8D2", desc: "Vite builds optimized static assets to dist/. Deployable to Vercel, Netlify, GitHub Pages, or S3+CloudFront. VITE_BACKEND_URL env var configures the API base URL at build time." },
    { icon: FaCog, label: "Environment Variables", color: "#a78bfa", desc: "Backend: DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_DIALECT, JWT_SECRET, FRONTEND_URL. Frontend: VITE_BACKEND_URL, VITE_REACT_FRONT_END_URL. Zero hardcoded secrets." },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <Heading tag="Deployment" title="Ship Anywhere" sub="Fully containerized backend, environment-variable driven config, cloud-native database" />
        <div className="space-y-4">
          {steps.map(({ icon: Icon, label, color, desc }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 mt-2 mb-0" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)`, minHeight: "24px" }} />}
                </div>
                <Glass className="flex-1 p-5 mb-4">
                  <div className="font-semibold text-white text-sm mb-2">{label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
                </Glass>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. FUTURE IMPROVEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function FutureSection() {
  const items = [
    "Add collision detection in slug generation — check uniqueness and regenerate if conflict found",
    "Implement URL expiration with expiresAt timestamp field checked during redirect resolution",
    "Add global @ControllerAdvice exception handler for consistent error response format",
    "Implement API rate limiting to prevent abuse of the URL shortening endpoint",
    "Add pagination to /api/urls/myurls — single response won't scale with hundreds of links",
    "Track geolocation, browser, OS, device type, and referrer per click event",
    "Implement unique visitor tracking via IP deduplication and bot/crawler filtering",
    "Add refresh token support to avoid forcing login every 48 hours",
    "Add Docker Compose for local development — orchestrate backend + PostgreSQL container",
    "Add server-side caching (Redis) for frequently accessed short URL → original URL lookups",
    "Implement QR code generation for each short URL",
    "Add custom slug support — let users specify their own short URL slug",
  ];

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <Heading tag="Roadmap" title="What's Next" sub="Planned improvements and future features for PS Linky v2" />
        <FadeIn>
          <Glass className="p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  <div className="w-5 h-5 rounded border-2 border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-sm bg-white/10" />
                  </div>
                  <span className="text-sm text-gray-400 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </Glass>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. PROJECT TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
function TimelineSection() {
  const phases = [
    { phase: "Research & Design", icon: FaStar, color: "#a78bfa", desc: "Studied URL shortener architecture, designed the 3-table DB schema, planned layered Spring Boot architecture, chose tech stack." },
    { phase: "Backend Development", icon: FaServer, color: "#60a5fa", desc: "Built Spring Boot API with JWT auth, URL shortening logic, analytics endpoints, CORS, and Docker configuration." },
    { phase: "Frontend Development", icon: FaReact, color: "#61dafb", desc: "Built React SPA with dashboard, auth flows, Chart.js analytics, TanStack Query caching, and Framer Motion animations." },
    { phase: "Testing & Deployment", icon: FaRocket, color: "#34d399", desc: "Integrated frontend with backend, resolved CORS issues, configured Neon production DB, deployed via Docker and CDN." },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Timeline" title="How It Was Built" sub="From database design to production deployment" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map(({ phase, icon: Icon, color, desc }, i) => (
            <FadeIn key={phase} delay={i * 0.1}>
              <Glass className="p-5 h-full relative overflow-hidden">
                <div className="text-5xl font-black text-white/[0.04] absolute -top-2 -right-2 select-none">0{i + 1}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 relative" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="font-bold text-white text-sm mb-2">{phase}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
              </Glass>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. RESOURCES
// ─────────────────────────────────────────────────────────────────────────────
function ResourcesSection() {
  const resources = [
    { label: "Live Demo", icon: FaGlobe, href: "https://ps-linky.netlify.app/", color: "#1CD8D2" },
    { label: "GitHub", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official", color: "#fff" },
    { label: "GitHub — Backend", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/tree/main/urlshortener", color: "#fff" },
    { label: "GitHub — Frontend", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/tree/main/urlshortener-frontend", color: "#fff" },
    { label: "Docker Hub", icon: FaDocker, href: "https://hub.docker.com/repository/docker/pranavsharmaofficial/ps-linky-url-shortener/general", color: "#2496ed" },
    { label: "Hoppscotch Collection", icon: FaBoxOpen, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/blob/main/docs/Hoppscotch_Export.json", color: "#ff6c37" },
    { label: "Technical Documentation", icon: FaBook, href: "https://github.com/Pranav-Sharma-Official/ps-linky-url-shortener/blob/main/docs/PS_Linky_Documentation.md", color: "#a78bfa" },
    { label: "Video Demo", icon: FaPlay, href: "#", color: "#f87171" },
  ];

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <Heading tag="Resources" title="Explore the Project" sub="All the links you need to dive deeper into PS Linky" />
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {resources.map(({ label, icon: Icon, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200 text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3, scale: 1.03 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">{label}</span>
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 17. INTERVIEW QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
const QA = [
  { q: "What is PS Linky and what real-world problem does it solve?", a: "PS Linky is a full-stack URL shortener that converts long URLs into 8-character alphanumeric slugs. It solves the problem of unwieldy links in social media, SMS, and print, while adding click analytics so users know how their links perform. It's a self-hosted, private alternative to Bitly." },
  { q: "Walk me through the complete JWT authentication flow.", a: "Registration hashes the password with BCrypt and saves the user. Login calls AuthenticationManager.authenticate(), which internally invokes UserDetailsServiceImpl.loadUserByUsername() and verifies BCrypt. On success, JwtUtils.generateToken() creates an HMAC-SHA256 signed token stored in localStorage. Every subsequent API call sends Authorization: Bearer <token>. JwtAuthenticationFilter intercepts, validates the signature, parses the username claim, and populates SecurityContextHolder." },
  { q: "How does the URL shortening algorithm work? What is the search space?", a: "The algorithm randomly samples 8 characters from a 62-character set (A-Z, a-z, 0-9) using java.util.Random. This produces 62⁸ = 218,340,105,584,896 unique combinations (~218 trillion). There is no explicit collision detection in the current version — a future improvement." },
  { q: "Explain the three-layer architecture used in the backend.", a: "Controller layer handles HTTP in/out and delegates to services. Service layer contains all business logic (slug generation, click recording, analytics aggregation). Repository layer uses Spring Data JPA interfaces for CRUD and custom JPQL queries. This ensures single responsibility per class and promotes testability." },
  { q: "How does click analytics work at both the cumulative and event level?", a: "On every redirect, two writes occur: (1) url_mapping.click_count is incremented by 1 (O(1) display), and (2) a new ClickEvent row is inserted with LocalDateTime.now() (immutable event log). This enables both instant count display and date-filtered analytics queries via Java Streams groupingBy." },
  { q: "What is TanStack React Query and how does PS Linky use it?", a: "TanStack Query is a server-state management library. PS Linky uses it with 5-second staleTime to cache the URL list and total clicks data, preventing redundant API calls within the stale window. Custom hooks useFetchMyShortUrls and useFetchTotalClicks wrap the Query logic. Error handling uses useEffect with isError/error states (the onError callback was removed in v5)." },
  { q: "Why is CSRF disabled and is it secure to do so?", a: "CSRF is disabled because JWT is sent in the Authorization header, not in a cookie. Browsers automatically send cookies cross-origin (enabling CSRF attacks) but never automatically send custom headers. Since the JWT lives in localStorage and is attached via Axios in the Authorization header, CSRF attacks are inapplicable — disabling it is correct and safe for stateless JWT APIs." },
  { q: "Explain the multi-stage Docker build.", a: "Stage 1 uses eclipse-temurin:26-jdk to compile the Spring Boot JAR with Maven. The dependency:go-offline step pre-caches all Maven dependencies in a separate Docker layer, so rebuilds don't re-download dependencies if only source code changes. Stage 2 uses the lean eclipse-temurin:26-jre image and copies only the final JAR — no JDK, Maven, or source code in production." },
  { q: "Describe the three database tables and their JPA relationships.", a: "users: stores credentials and roles. url_mapping: stores original URL, 8-char slug, click counter, creation date, and FK to users. click_event: stores precise click timestamps and FK to url_mapping. Relationships: users @OneToMany url_mapping (@ManyToOne with @JoinColumn). url_mapping @OneToMany click_event (@OneToMany mappedBy, LAZY fetch)." },
  { q: "Walk me through the complete redirect flow step by step.", a: "User opens the short link → React Router matches /s/:url → ShortenUrlPage sets window.location.href to BACKEND_URL/slug → Browser sends GET /{shortUrl} to Spring Boot → JwtAuthenticationFilter runs (no token, proceeds unauthenticated) → SecurityFilterChain permits the public route → RedirectController calls service.getOriginalUrl() → Service increments click_count, saves ClickEvent, returns UrlMapping → Controller responds with HTTP 302 + Location header → Browser follows redirect to original URL." },
  { q: "Why is BCrypt used instead of MD5 or SHA-256 for passwords?", a: "BCrypt is an adaptive one-way hash function designed specifically for passwords. Unlike MD5/SHA-256 which are fast (making brute-force cheap), BCrypt's cost factor (10 rounds here) makes each hash computation slow by design. It also automatically incorporates a random salt, preventing rainbow table attacks. Spring Security's BCryptPasswordEncoder handles this transparently." },
  { q: "How are per-link analytics different from aggregate analytics?", a: "Per-link: fetches ClickEvents for a single UrlMapping within a date range, groups by clickDate.toLocalDate(), returns List<ClickEventDTO>. Aggregate: fetches all user's UrlMappings first, then uses a single IN-clause query findByUrlMappingInAndClickDateBetween to fetch all click events in one DB round-trip, returns Map<LocalDate, Long>. The IN-clause prevents N+1." },
  { q: "What is the JwtAuthenticationFilter and when does it run?", a: "It's a custom OncePerRequestFilter (guaranteed to run exactly once per request). It calls JwtUtils.getJwtFromHeader() to strip the Bearer prefix, JwtUtils.validateToken() to verify HMAC signature and expiry, getUsernameFromJwtToken() to parse the sub claim, then loads UserDetails from DB and sets UsernamePasswordAuthenticationToken in SecurityContextHolder. Runs before Spring Security evaluates authorization rules." },
  { q: "How does the PrivateRoute component work?", a: "PrivateRoute reads the JWT token from React Context. If the route is protected (publicPage=false) and token is null, it redirects to /login. If the route is public-only (publicPage=true) and token is set, it redirects to /dashboard. This prevents unauthenticated access to the dashboard and prevents authenticated users from seeing login/register pages." },
  { q: "What is Spring Data JPA and how does it prevent N+1 queries here?", a: "Spring Data JPA generates SQL from method signatures. findByUrlMappingInAndClickDateBetween(List<UrlMapping>, start, end) generates a single SQL IN-clause query instead of one query per URL. The @OneToMany(fetch=LAZY) on clickEvents prevents loading all click events when fetching URL mappings for the dashboard list." },
  { q: "How does the frontend handle authentication state persistence across page refreshes?", a: "On login, the JWT is stored in both React Context state and localStorage under the key JWT_TOKEN. ContextApi.jsx initializes token state from localStorage on app load via JSON.parse(localStorage.getItem('JWT_TOKEN')). This means the user stays authenticated across browser refreshes without re-logging in, as long as the 48-hour token hasn't expired." },
  { q: "How is CORS configured and why are both WebConfig and SecurityFilterChain needed?", a: "WebConfig.java's CorsRegistry configures allowed origins, methods, credentials, and maxAge. SecurityFilterChain must also permit OPTIONS requests (.requestMatchers(HttpMethod.OPTIONS).permitAll()) because Spring Security intercepts requests before the CORS filter. Without this, OPTIONS preflight requests would be blocked with 403 before CORS headers are added, breaking all cross-origin requests." },
  { q: "What is the staleTime setting in React Query and what does it optimize?", a: "staleTime: 5000 means data is considered 'fresh' for 5 seconds after fetching. During this window, React Query returns the cached data immediately without making a new API call. This prevents redundant refetches when the user navigates between components or when the component re-renders, reducing API calls and improving perceived performance." },
  { q: "What are three major future improvements you would add to PS Linky?", a: "(1) Collision detection: check findByShortUrl() before saving and regenerate if slug already exists. (2) Rate limiting: add Spring's @RateLimiter or a filter to prevent API abuse. (3) @ControllerAdvice global exception handler for consistent error response DTOs instead of relying on Spring Security's default error responses." },
  { q: "How does the @PreAuthorize annotation provide defense-in-depth?", a: "@PreAuthorize('hasRole(USER)') adds a second layer of authorization after the SecurityFilterChain already requires authentication for /api/urls/**. Even if the filter chain configuration is misconfigured to accidentally permit a request, @PreAuthorize provides an independent check at the method level, ensuring the caller has the correct role." },
  { q: "How are date-range analytics queries implemented in the backend?", a: "Analytics endpoints accept startDate and endDate as ISO 8601 query parameters. The backend uses DateTimeFormatter.ISO_LOCAL_DATE_TIME for per-URL queries (includes time) and ISO_LOCAL_DATE for total clicks (date only). JPA's findByUrlMappingAndClickDateBetween and findByUrlMappingInAndClickDateBetween handle the DB filtering. Java Streams Collectors.groupingBy groups results by date." },
  { q: "Why use a separate DTO layer instead of returning JPA entities directly?", a: "DTOs (Data Transfer Objects) decouple the API contract from the domain model. If you add a sensitive field to the User entity (e.g., failedLoginAttempts), it won't accidentally appear in API responses. DTOs also let you shape the response exactly as the client needs it (e.g., UrlMappingDTO includes username from the related User entity)." },
  { q: "How does the redirect flow handle the case where the short URL doesn't exist?", a: "UrlMappingService.getOriginalUrl() returns the UrlMapping entity or null if not found. RedirectController checks if the returned mapping is not null. If null, it returns ResponseEntity.notFound().build() which translates to HTTP 404 Not Found with an empty body. The React frontend's ShortenUrlPage redirects the browser directly to the backend, so the 404 is shown by the browser." },
  { q: "Explain the URL sorting logic on the dashboard.", a: "The useFetchMyShortUrls hook uses TanStack Query's select transformer to sort the returned array client-side: data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)). This sorts by createdDate descending so the most recently created link always appears at the top of the dashboard list without requiring any backend changes." },
  { q: "What security risk does localStorage JWT storage present and how could it be mitigated?", a: "Storing JWT in localStorage makes it vulnerable to XSS attacks — any injected script can read localStorage. PS Linky mitigates XSS via React's built-in JSX escaping and no dangerouslySetInnerHTML usage. A more secure alternative would be HttpOnly cookies (not accessible by JavaScript), but this would require enabling CSRF protection and adding proper cookie-based session management." },
];

function InterviewSection({ activeAccordion, setActiveAccordion }) {
  return (
    <Section id="interview" className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Interview Prep" title="25 Questions & Answers" sub="Deep-dive questions a technical interviewer might ask about PS Linky" />
        <div className="space-y-2">
          {QA.map(({ q, a }, i) => {
            const isOpen = activeAccordion === i;
            return (
              <FadeIn key={i} delay={Math.min(i * 0.02, 0.3)}>
                <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#1CD8D2]/30 bg-[#1CD8D2]/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"}`}>
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[#1CD8D2] font-mono text-xs shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm font-medium text-white leading-relaxed">{q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                      <FaChevronDown size={12} className="text-gray-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-14">
                          <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 18. FOOTER CTA
// ─────────────────────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <Section className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1CD8D2] opacity-[0.05] blur-[100px] rounded-full" />
      </div>
      <FadeIn className="max-w-3xl mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full border border-[#1CD8D2]/30 bg-[#1CD8D2]/10 text-[#1CD8D2] text-xs font-semibold uppercase tracking-widest mb-6">
          Let's Connect
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Interested in<br />
          <span style={{ backgroundImage: "linear-gradient(135deg, #1CD8D2, #00bf8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Collaborating?
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          I'm open to full-stack roles, freelance projects, and tutoring opportunities.
          Let's build something great together.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/-pranav--sharma-/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A66C2] text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
          >
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a
            href="mailto:job.pranav.sharma@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#1CD8D2] to-[#00bf8f] text-black font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
          >
            <FaEnvelope size={16} /> Send Email
          </a>
          <a
            href="https://github.com/Pranav-Sharma-Official"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/10 transition-all hover:scale-105"
          >
            <FaGithub size={16} /> GitHub
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/10 transition-all hover:scale-105"
          >
            <FaGlobe size={16} /> Portfolio
          </a>
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-sm text-gray-600">
          Built by <span className="text-[#1CD8D2]">Pranav Sharma</span> · PS Linky Case Study · {new Date().getFullYear()}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PSLinkyPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <CustomCursor />
      <StickyNav />
      <HeroSection />
      <OverviewSection />
      <FeaturesSection />
      <ArchitectureSection />
      <TechStackSection />
      <ScreenshotsSection />
      <EngineeringSection />
      <ChallengesSection />
      <APIsSection />
      <DatabaseSection />
      <SecuritySection />
      <PerformanceSection />
      <DeploymentSection />
      <FutureSection />
      <TimelineSection />
      <ResourcesSection />
      <InterviewSection activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion} />
      <FooterCTA />
    </div>
  );
}
