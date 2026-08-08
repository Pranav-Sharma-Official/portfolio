import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import {
  FaGithub, FaDocker, FaShieldAlt, FaDatabase, FaLock,
  FaChartBar, FaCheck, FaChevronDown, FaExternalLinkAlt,
  FaKey, FaCode, FaUsers, FaBolt, FaLinkedin, FaEnvelope,
  FaLayerGroup, FaServer, FaClock, FaCog,
  FaArrowDown, FaCheckCircle, FaBoxOpen,
  FaGlobe, FaNetworkWired, FaRocket, FaStar,
  FaBook, FaMoneyBillWave, FaBell, FaSearch,
  FaList, FaStream, FaRegStar, FaHeart, FaBan,
  FaUserShield, FaMailBulk, FaSync, FaLayerGroup as FaLayer,
} from "react-icons/fa";
import { SiSpringboot, SiMysql, SiJsonwebtokens, SiDocker } from "react-icons/si";

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
          <FaBook className="text-[#1CD8D2]" />
          <span>PS Library</span>
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
          href="https://github.com/Pranav-Sharma-Official/ps-lms"
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

// ── Stat Counter Card ──────────────────────────────────────────────────────
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
    "Java 21", "Spring Boot 4.1", "MySQL 8.x", "JWT", "Razorpay",
    "Docker", "Hibernate JPA", "Spring Security", "Spring Mail", "Lombok",
  ];

  const buttons = [
    { label: "GitHub", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official/ps-lms", primary: true },
    { label: "Docker Hub", icon: FaDocker, href: "https://hub.docker.com/r/pranavsharmaofficial/ps-lms" },
    { label: "Hoppscotch Collection", icon: FaBoxOpen, href: "https://github.com/Pranav-Sharma-Official/ps-lms/blob/main/docs/Hoppscotch_Export.json" },
    { label: "Summarised Documentation", icon: FaBook, href: "https://github.com/Pranav-Sharma-Official/ps-lms/blob/main/README.md" },
    { label: "Portfolio", icon: FaGlobe, href: "/" },
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-8"
        >
          <FaServer size={10} />
          Enterprise Backend · REST API
        </motion.div>

        {/* Project name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none"
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
            PS Library
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-medium mb-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Enterprise-grade Library Operations Platform
        </motion.p>
        <motion.p
          className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Built with Java 21 &amp; Spring Boot 4.1 — JWT Authentication, Razorpay Payments, Subscription System,
          Queue-based Reservations, and Event-Driven Architecture across 63+ REST endpoints.
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
              target={href.startsWith("http") ? "_blank" : undefined}
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
            <StatCard value={4867} suffix="+" label="Lines of Java Code" icon={FaCode} />
            <StatCard value={63} suffix="+" label="REST Endpoints" icon={FaNetworkWired} />
            <StatCard value={12} suffix="" label="JPA Entities" icon={FaDatabase} />
            <StatCard value={14} suffix="" label="Controllers" icon={FaServer} />
          </Glass>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <FaArrowDown className="text-[#1CD8D2]/40" size={14} />
          </motion.div>
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
    { icon: FaShieldAlt, label: "JWT + Role-Based Auth", desc: "ROLE_ADMIN & ROLE_USER with BCrypt, 24-hour stateless tokens" },
    { icon: FaMoneyBillWave, label: "Razorpay Integration", desc: "Real-money payment links, verification, event-driven activation" },
    { icon: FaStream, label: "Event-Driven Architecture", desc: "ApplicationEventPublisher decouples payment from subscription" },
    { icon: FaDocker, label: "Docker Containerized", desc: "Multi-stage build: JDK build → lean JRE runtime image" },
  ];

  const users = [
    { icon: FaUserShield, type: "ROLE_ADMIN", desc: "Library staff — manage books, plans, waive fines, fulfill reservations, manage all loans" },
    { icon: FaUsers, type: "ROLE_USER", desc: "Library members — browse catalogue, checkout, reserve, review, manage wishlist, pay fines online" },
  ];

  const objectives = [
    "Role-based access control differentiating admins from general members",
    "Subscription-tier-based borrowing limits enforced at checkout",
    "Real-money payment processing via Razorpay for fines and memberships",
    "Hierarchical book genre system for nuanced catalogue organisation",
    "Business rules enforced at service layer — overdue enforcement, review eligibility",
    "Event-driven async architecture for post-payment subscription activation",
  ];

  return (
    <Section id="overview" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Overview" title="The Complete Picture" sub="A production-ready library management backend engineered from database design to Docker deployment" />

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FadeIn delay={0.1}>
            <Glass className="p-8 h-full" glow>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                <span className="text-red-400 text-lg font-bold">!</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Problem</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Traditional library operations suffer from fragmented manual processes: paper-based loan tracking,
                error-prone fine calculations, inefficient book reservation queuing, and no integrated payment mechanism.
              </p>
              <p className="text-gray-400 leading-relaxed">
                These inefficiencies result in poor user experience, loss of revenue from unpaid fines, and significant
                administrative overhead for library staff.
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
                A modern, API-first library management backend that centralises all operations into a single,
                cohesive, secured, and scalable REST API — powering any frontend client.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Members can browse the catalogue, checkout books within subscription limits, reserve unavailable books,
                and pay fines online — all through 63+ endpoints.
              </p>
            </Glass>
          </FadeIn>
        </div>

        {/* Target Users */}
        <FadeIn className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Who Uses It?</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {users.map(({ icon: Icon, type, desc }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Glass className="p-6 h-full">
                  <Icon className="text-[#1CD8D2] mb-3" size={22} />
                  <div className="font-bold text-white mb-2 font-mono text-sm">{type}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Objectives */}
        <FadeIn>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Project Objectives</h3>
          <Glass className="p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <FaCheck className="text-[#1CD8D2] mt-1 shrink-0" size={11} />
                  <span className="text-sm text-gray-400 leading-relaxed">{obj}</span>
                </motion.div>
              ))}
            </div>
          </Glass>
        </FadeIn>

        {/* Key Highlights */}
        <FadeIn className="mt-16">
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
        "User registration with BCrypt-hashed password (10 rounds)",
        "JWT login — 24-hour stateless tokens, HMAC-SHA signed",
        "Forgot Password with UUID token (5-min expiry) via email",
        "Reset Password — validates token, deletes after use",
        "Last login timestamp tracking on every successful login",
        "ROLE_ADMIN & ROLE_USER with fine-grained route protection",
      ],
    },
    {
      title: "Book Management",
      icon: FaBook,
      color: "#34d399",
      features: [
        "Single and bulk book creation (admin only)",
        "Advanced multi-field search: title, author, ISBN, genre",
        "Soft delete (active=false) and hard delete",
        "Book availability copy tracking with @AssertTrue validation",
        "Genre filter, availability filter, pagination, sorting",
        "Book statistics: total active books and available copies",
      ],
    },
    {
      title: "Book Loans & Circulation",
      icon: FaSync,
      color: "#60a5fa",
      features: [
        "9-step checkout validation — subscription, overdue, availability",
        "Admin checkout on behalf of any user",
        "Check-in with RETURNED / LOST / DAMAGED condition",
        "Loan renewal (max 2 renewals per loan, extensionDays configurable)",
        "Overdue bulk scan and status update via admin trigger",
        "Paginated loan history filterable by status",
      ],
    },
    {
      title: "Reservations",
      icon: FaClock,
      color: "#fbbf24",
      features: [
        "Queue-based reservation with position tracking",
        "Admin fulfillment: auto-triggers checkout for reserved user",
        "Max 5 active reservations per user enforced",
        "Duplicate and existing-loan guards prevent abuse",
        "Availability guard: cannot reserve available books",
        "Admin can cancel any reservation; users cancel own",
      ],
    },
    {
      title: "Subscriptions & Payments",
      icon: FaMoneyBillWave,
      color: "#f87171",
      features: [
        "Plan-based membership: maxBooksAllowed, maxDaysPerBook",
        "Plan data snapshotted at creation (historical integrity)",
        "Razorpay payment link creation with customer details",
        "Payment verification: status, amount, captured check",
        "Async subscription activation via ApplicationEventPublisher",
        "Admin bulk deactivation of expired subscriptions",
      ],
    },
    {
      title: "Reviews & Wishlist",
      icon: FaRegStar,
      color: "#fb923c",
      features: [
        "Verified-borrower-only reviews (must have RETURNED loan)",
        "Rating 1–5, review text 10–2000 characters",
        "One review per book per user enforced",
        "Update and delete own review",
        "Personal wishlist with optional notes per entry",
        "Duplicate guard: cannot add same book twice",
      ],
    },
    {
      title: "Fine Management",
      icon: FaBan,
      color: "#e879f9",
      features: [
        "Admin creates fines: OVERDUE, DAMAGE, LOSS, PROCESSING types",
        "Pay fine via Razorpay — returns checkout URL",
        "Admin waiver with full audit trail (waivedBy, waivedAt, reason)",
        "Fine status machine: PENDING → PAID or WAIVED",
        "My fines filterable by status and type",
        "Admin search all fines with user/status/type filters",
      ],
    },
    {
      title: "Email & Events",
      icon: FaMailBulk,
      color: "#38bdf8",
      features: [
        "MIME HTML email support via Spring Mail",
        "Password reset email with time-sensitive link (5-min expiry)",
        "Post-payment async event: @Async @EventListener on separate thread",
        "PaymentEventPublisher decouples PaymentService from SubscriptionService",
        "SMTP timeouts configured (5000ms) to prevent request hangs",
        "Admin seeding on startup via CommandLineRunner",
      ],
    },
    {
      title: "Genre Management",
      icon: FaList,
      color: "#4ade80",
      features: [
        "Hierarchical self-referential genre tree (Fiction → Sci-Fi → Space Opera)",
        "Top-level genre listing and book count per genre",
        "Soft and hard delete for genres",
        "Display order control for catalogue organisation",
        "Genres ordered by displayOrder in all listings",
        "Genre code uniqueness and @NotBlank validations",
      ],
    },
  ];

  return (
    <Section id="features">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Features" title="Every Library Operation Covered" sub="13 modules covering the complete lifecycle from authentication to payment" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map(({ title, icon: Icon, color, features }, gi) => (
            <FadeIn key={title} delay={gi * 0.06}>
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
    { label: "Client (Frontend / Mobile)", icon: FaGlobe, color: "#61dafb", desc: "Any HTTP client — React SPA, mobile app, or API tool (Hoppscotch). Sends Bearer JWT on every /api/** request." },
    { label: "JwtValidator Filter", icon: FaKey, color: "#a78bfa", desc: "OncePerRequestFilter — intercepts every request, validates HMAC-SHA token, sets SecurityContextHolder." },
    { label: "Spring Security FilterChain", icon: FaShieldAlt, color: "#f87171", desc: "Role-based route authorization: /api/admin/** → ROLE_ADMIN, /api/** → authenticated, /auth/** → public." },
    { label: "Controller Layer (14 classes)", icon: FaServer, color: "#60a5fa", desc: "REST controllers handle HTTP in/out. No business logic. Delegates to services, applies @Valid on inputs." },
    { label: "Service Layer (13 interfaces, 15 impls)", icon: FaCog, color: "#fbbf24", desc: "All business rules enforced here — 9-step checkout, reservation queue, payment orchestration, fine audit." },
    { label: "Event System (Async)", icon: FaBolt, color: "#34d399", desc: "PaymentEventPublisher → PaymentEventListener (@Async) routes by payment type, activates subscription." },
    { label: "Repository Layer (12 repos)", icon: FaDatabase, color: "#1CD8D2", desc: "Spring Data JPA — 18+ custom JPQL queries, dynamic filters, pagination via Pageable." },
    { label: "MySQL Database (lms)", icon: SiMysql, color: "#4479a1", desc: "12 tables, foreign key constraints, Hibernate auto-DDL. HikariCP connection pool." },
  ];

  return (
    <Section id="architecture" className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Architecture" title="5-Layer N-Tier Design" sub="Clean separation of concerns from HTTP to database, with an async event backbone" />
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
      name: "Core",
      icon: SiSpringboot,
      color: "#6db33f",
      items: ["Java 21 (LTS)", "Spring Boot 4.1.0", "Spring MVC (WebMVC)", "Maven 3.x (mvnw)"],
    },
    {
      name: "Persistence",
      icon: FaDatabase,
      color: "#4479a1",
      items: ["MySQL 8.x", "Spring Data JPA", "Hibernate ORM", "HikariCP Connection Pool"],
    },
    {
      name: "Security",
      icon: FaShieldAlt,
      color: "#f87171",
      items: ["Spring Security 4.1", "JJWT 0.12.6 (HMAC-SHA)", "BCryptPasswordEncoder", "OncePerRequestFilter"],
    },
    {
      name: "Payments & Email",
      icon: FaMoneyBillWave,
      color: "#34d399",
      items: ["Razorpay Java SDK 1.4.9", "Spring Mail (Jakarta Mail)", "Gmail SMTP (587 STARTTLS)", "MimeMessageHelper"],
    },
    {
      name: "Developer Tools",
      icon: FaCog,
      color: "#a78bfa",
      items: ["Lombok (Builder, Getter, Setter)", "Jakarta Bean Validation", "@NotBlank, @Min, @Max, @Size", "Spring Boot DevTools"],
    },
    {
      name: "Infrastructure",
      icon: SiDocker,
      color: "#2496ed",
      items: ["Docker multi-stage build", "eclipse-temurin:21-jdk (build)", "eclipse-temurin:21-jre (runtime)", "Environment variable config"],
    },
  ];

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        <Heading tag="Tech Stack" title="Production-Proven Stack" sub="Every technology chosen for reliability, scalability, and enterprise-grade quality" />
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
// 6. BUSINESS WORKFLOWS
// ─────────────────────────────────────────────────────────────────────────────
function WorkflowsSection() {
  const workflows = [
    {
      title: "Book Checkout (9-Step)",
      color: "#60a5fa",
      steps: [
        "Validate user exists",
        "Validate active subscription",
        "Validate book exists and is active",
        "Check available copies > 0",
        "Guard: no duplicate active checkout",
        "Guard: subscription book limit not exceeded",
        "Guard: no overdue loans",
        "Create BookLoan (CHECKED_OUT, dueDate = today + days)",
        "Decrement book.availableCopies, save",
      ],
    },
    {
      title: "Subscription Activation (Event-Driven)",
      color: "#34d399",
      steps: [
        "User selects plan → POST /api/subscriptions/subscribe",
        "Subscription created (inactive), Razorpay link generated",
        "User pays on Razorpay payment page",
        "Frontend calls POST /api/payments/verify {razorpayPaymentId}",
        "PaymentServiceImpl fetches details from Razorpay",
        "Validates status=captured and amount matches plan price",
        "Payment marked SUCCESS, PaymentSuccessEvent published",
        "PaymentEventListener (@Async) handles event",
        "SubscriptionService.activateSubscription() called → isActive=true",
      ],
    },
    {
      title: "Password Reset Flow",
      color: "#a78bfa",
      steps: [
        "POST /auth/forgot-password {email}",
        "UUID token generated, saved with 5-minute expiry",
        "Email sent with reset link pointing to frontend URL",
        "User clicks link → frontend extracts token",
        "POST /auth/reset-password {token, newPassword}",
        "Token expiry validated",
        "New password BCrypt-encoded and saved",
        "Token deleted from database after use",
      ],
    },
    {
      title: "Reservation Fulfillment",
      color: "#fbbf24",
      steps: [
        "User calls POST /api/reservations {bookId}",
        "Guards: no active loan, no duplicate reservation, book unavailable",
        "Max 5 reservation guard checked",
        "Queue position = countPending + 1, saved as PENDING",
        "Admin calls POST /api/reservations/{id}/fulfill",
        "Validates book has available copies",
        "Reservation status set to FULFILLED",
        "checkoutBookForUser() triggered automatically for reserved user",
      ],
    },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Business Logic" title="How the System Thinks" sub="Complex multi-step workflows enforcing real-world library business rules" />
        <div className="grid md:grid-cols-2 gap-6">
          {workflows.map(({ title, color, steps }, wi) => (
            <FadeIn key={title} delay={wi * 0.1}>
              <Glass className="p-6 h-full overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }} />
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <span className="text-xs font-mono shrink-0 mt-0.5 w-5 text-right" style={{ color }}>{i + 1}.</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{step}</span>
                    </motion.div>
                  ))}
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
// 7. DATABASE DESIGN
// ─────────────────────────────────────────────────────────────────────────────
function DatabaseSection() {
  const entities = [
    { name: "user", color: "#60a5fa", fields: ["id PK", "email UK", "fullName", "role", "password (BCrypt)", "phone", "authProvider", "lastLogin"] },
    { name: "book", color: "#1CD8D2", fields: ["id PK", "isbn UK", "title", "author", "genre_id FK", "totalCopies", "availableCopies", "active"] },
    { name: "genre", color: "#34d399", fields: ["id PK", "code", "name", "displayOrder", "active", "parentGenre_id FK (self)"] },
    { name: "subscription_plan", color: "#a78bfa", fields: ["id PK", "planCode UK", "name", "price (INR)", "maxBooksAllowed", "maxDaysPerBook", "durationDays"] },
    { name: "subscription", color: "#fbbf24", fields: ["id PK", "user_id FK", "plan_id FK", "planName (snapshot)", "price (snapshot)", "startDate", "endDate", "isActive"] },
    { name: "payment", color: "#f87171", fields: ["id PK", "user_id FK", "subscription_id FK", "paymentType", "status", "gateway", "amount", "transactionId"] },
    { name: "book_loan", color: "#fb923c", fields: ["id PK", "user_id FK", "book_id FK", "status", "checkoutDate", "dueDate", "returnDate", "renewalCount"] },
    { name: "fine", color: "#e879f9", fields: ["id PK", "user_id FK", "book_loan_id FK", "type", "amount", "status", "waivedBy", "waivedAt", "reason"] },
    { name: "reservation", color: "#38bdf8", fields: ["id PK", "user_id FK", "book_id FK", "status", "reservedAt", "queuePosition", "notificationSent"] },
    { name: "book_review", color: "#4ade80", fields: ["id PK", "user_id FK", "book_id FK", "rating (1-5)", "reviewText", "title"] },
    { name: "wishlist", color: "#c084fc", fields: ["id PK", "user_id FK", "book_id FK", "addedAt", "notes"] },
    { name: "password_reset_token", color: "#94a3b8", fields: ["id PK", "token UK", "user_id FK", "expiryDate (5 min)"] },
  ];

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        <Heading tag="Database" title="12 Normalized Tables" sub="Full relational integrity with foreign key constraints and JPA-managed relationships" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {entities.map(({ name, color, fields }, i) => (
            <FadeIn key={name} delay={i * 0.04}>
              <Glass className="overflow-hidden h-full">
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2" style={{ borderTop: `2px solid ${color}` }}>
                  <FaDatabase size={10} style={{ color }} />
                  <code className="font-mono font-bold text-xs" style={{ color }}>{name}</code>
                </div>
                <div className="p-2">
                  {fields.map((f) => (
                    <div key={f} className="px-2 py-1.5 text-[10px] text-gray-500 font-mono hover:text-gray-300 transition-colors">{f}</div>
                  ))}
                </div>
              </Glass>
            </FadeIn>
          ))}
        </div>

        {/* Relationships */}
        <FadeIn>
          <Glass className="p-6">
            <div className="text-sm font-semibold text-white mb-4">Key Relationships</div>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
              {[
                "USER →(1:N) BOOK_LOAN, RESERVATION, FINE, REVIEW, WISHLIST, PAYMENT",
                "BOOK →(1:N) BOOK_LOAN, RESERVATION, BOOK_REVIEW, WISHLIST",
                "BOOK —(N:1)→ GENRE (categorised by)",
                "GENRE —(self-ref N:1)→ GENRE (hierarchical parent)",
                "SUBSCRIPTION —(N:1)→ USER and SUBSCRIPTION_PLAN",
                "PAYMENT —(N:1)→ USER, optionally SUBSCRIPTION",
                "FINE —(N:1)→ BOOK_LOAN, multiple User FKs (waived_by, processed_by)",
                "PASSWORD_RESET_TOKEN —(N:1)→ USER (UUID, 5-min expiry)",
              ].map((rel) => (
                <div key={rel} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1CD8D2] mt-1.5 shrink-0" />
                  <span className="text-xs leading-relaxed font-mono">{rel}</span>
                </div>
              ))}
            </div>
          </Glass>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. APIs SECTION
// ─────────────────────────────────────────────────────────────────────────────
function APIsSection() {
  const apiGroups = [
    { title: "Authentication", icon: FaKey, color: "#a78bfa", count: 4, desc: "signup, login, forgot-password, reset-password — all public, no JWT required.", path: "/auth/**" },
    { title: "Books", icon: FaBook, color: "#34d399", count: 9, desc: "CRUD, bulk create, advanced search, stats, soft/hard delete — admin and authenticated access.", path: "/api/books/**" },
    { title: "Genres", icon: FaList, color: "#4ade80", count: 9, desc: "Hierarchical genre management — CRUD, top-level listing, book count per genre.", path: "/api/genres/**" },
    { title: "Book Loans", icon: FaSync, color: "#60a5fa", count: 7, desc: "Checkout (self & admin), checkin, renewal, my loans, admin search, overdue update.", path: "/api/book-loans/**" },
    { title: "Reservations", icon: FaClock, color: "#fbbf24", count: 6, desc: "Reserve, cancel, fulfill (admin), my reservations, admin search with filters.", path: "/api/reservations/**" },
    { title: "Fines", icon: FaBan, color: "#e879f9", count: 5, desc: "Create (admin), pay (Razorpay link), waive (admin), my fines, all fines (admin).", path: "/api/fines/**" },
    { title: "Payments", icon: FaMoneyBillWave, color: "#f87171", count: 2, desc: "Verify Razorpay payment, list all payments (admin, paginated).", path: "/api/payments/**" },
    { title: "Subscriptions", icon: FaStar, color: "#38bdf8", count: 6, desc: "Subscribe (returns checkout URL), active subscription, cancel, admin list, deactivate expired.", path: "/api/subscriptions/**" },
    { title: "Subscription Plans", icon: FaLayerGroup, color: "#fb923c", count: 4, desc: "Admin CRUD for pricing tiers — create, update, delete, list all (public).", path: "/api/subscription-plans/**" },
    { title: "Reviews", icon: FaRegStar, color: "#c084fc", count: 4, desc: "Create (verified borrower only), update, delete own review, get reviews by book.", path: "/api/reviews/**" },
    { title: "Wishlist", icon: FaHeart, color: "#f472b6", count: 3, desc: "Add, remove from wishlist, paginated my wishlist.", path: "/api/wishlist/**" },
    { title: "Users", icon: FaUsers, color: "#94a3b8", count: 2, desc: "All users list (admin), current user profile for authenticated user.", path: "/api/users/**" },
  ];

  const sampleApis = [
    { method: "POST", endpoint: "/auth/signup", desc: "Register new user account", auth: false },
    { method: "POST", endpoint: "/auth/login", desc: "Login, returns signed 24h JWT", auth: false },
    { method: "POST", endpoint: "/api/book-loans/checkout", desc: "9-step validated book checkout", auth: true },
    { method: "POST", endpoint: "/api/reservations", desc: "Reserve unavailable book with queue position", auth: true },
    { method: "POST", endpoint: "/api/subscriptions/subscribe", desc: "Subscribe to plan, returns Razorpay checkout URL", auth: true },
    { method: "POST", endpoint: "/api/payments/verify", desc: "Verify Razorpay payment, triggers subscription activation", auth: true },
    { method: "POST", endpoint: "/api/fines/{id}/pay", desc: "Initiate fine payment via Razorpay", auth: true },
    { method: "POST", endpoint: "/api/fines/waive", desc: "Admin waive a fine with audit trail", auth: true },
    { method: "GET", endpoint: "/api/books", desc: "Search books — title, author, ISBN, genre, availability", auth: true },
    { method: "POST", endpoint: "/api/book-loans/checkin", desc: "Return book — RETURNED/LOST/DAMAGED condition", auth: true },
    { method: "DELETE", endpoint: "/api/books/{id}", desc: "Soft delete book (active=false)", auth: true },
    { method: "PUT", endpoint: "/api/books/{id}", desc: "Full update of book attributes", auth: true },
  ];

  return (
    <Section id="apis" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="REST API" title="63+ Endpoints Across 14 Controllers" sub="Resource-based naming, proper HTTP status codes, paginated responses, DTO pattern" />

        {/* API category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {apiGroups.map(({ title, icon: Icon, color, count, desc, path }, i) => (
            <FadeIn key={title} delay={i * 0.05}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <Glass className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                        <Icon size={12} style={{ color }} />
                      </div>
                      <span className="font-semibold text-white text-sm">{title}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${color}18`, color }}>{count} endpoints</span>
                  </div>
                  <code className="text-[10px] font-mono text-gray-600 block mb-2">{path}</code>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </Glass>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Sample API table */}
        <FadeIn>
          <h3 className="text-xl font-bold text-white mb-6 text-center">Sample Endpoints</h3>
          <Glass className="overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</div>
              <div className="col-span-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Endpoint</div>
              <div className="col-span-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
              <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Auth</div>
            </div>
            {sampleApis.map(({ method, endpoint, desc, auth }, i) => (
              <motion.div
                key={endpoint}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className="col-span-2 flex items-center"><MethodBadge method={method} /></div>
                <div className="col-span-5 flex items-center">
                  <code className="text-sm text-[#1CD8D2] font-mono break-all">{endpoint}</code>
                </div>
                <div className="col-span-4 flex items-center text-sm text-gray-400">{desc}</div>
                <div className="col-span-1 flex items-center justify-center">
                  {auth
                    ? <span className="w-2 h-2 rounded-full bg-yellow-400" title="JWT required" />
                    : <span className="w-2 h-2 rounded-full bg-emerald-400" title="Public" />}
                </div>
              </motion.div>
            ))}
          </Glass>
        </FadeIn>

        {/* Base URL note */}
        <FadeIn delay={0.2}>
          <Glass className="p-5 mt-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Base URL &amp; Auth</div>
            <pre className="text-xs text-[#1CD8D2] font-mono leading-relaxed overflow-x-auto">{`Base URL: http://localhost:5000
Auth Header: Authorization: Bearer <JWT_TOKEN>

# Public (no auth): /auth/signup, /auth/login, /auth/forgot-password, /auth/reset-password, GET /
# Admin only: /api/admin/books/**, /api/subscription-plans/admin/**
# Authenticated: All /api/** endpoints`}</pre>
          </Glass>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. SECURITY SECTION
// ─────────────────────────────────────────────────────────────────────────────
function SecuritySection() {
  const items = [
    { icon: FaKey, title: "JWT Authentication", color: "#a78bfa", desc: "HMAC-SHA signed tokens using 72-char secret. Claims: email, authorities, iat, exp. Expiry: 24 hours (86,400,000ms). Header: Authorization: Bearer." },
    { icon: FaLock, title: "BCrypt Password Hashing", color: "#f87171", desc: "BCryptPasswordEncoder with default 10 rounds. Adaptive one-way hash — brute-force computationally expensive. Plaintext password never stored or logged." },
    { icon: FaUserShield, title: "Role-Based Access Control", color: "#34d399", desc: "ROLE_ADMIN gets /api/admin/** and /api/subscription-plans/admin/**. ROLE_USER gets all other /api/** endpoints. Spring Security enforces this at filter chain level." },
    { icon: FaShieldAlt, title: "CSRF Disabled", color: "#60a5fa", desc: "Safe for stateless JWT APIs. JWT sent in Authorization header (not cookie), so browsers cannot automatically send it cross-origin — CSRF inapplicable." },
    { icon: FaDatabase, title: "SQL Injection Prevention", color: "#fbbf24", desc: "All custom queries use JPQL with @Param named parameters — never string concatenation. Spring Data derived queries are inherently parameterized." },
    { icon: FaCode, title: "Bean Validation", color: "#fb923c", desc: "@Valid on all controller method parameters. @NotBlank, @Min, @Max, @Size, @Positive, @DecimalMin, @Digits on DTOs. Entity-level @AssertTrue for availableCopies constraint." },
  ];

  return (
    <Section id="security" className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Security" title="Defense in Depth" sub="Multiple independent security layers — stateless JWT, role-based access, input validation" />
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

        {/* CORS config */}
        <FadeIn className="mt-8">
          <Glass className="p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Security Configuration Summary</div>
            <pre className="text-xs text-[#1CD8D2] font-mono leading-relaxed overflow-x-auto">{`// SecurityFilterChain setup (SecurityConfig.java)
.sessionManagement(STATELESS)           // No server-side session
.authorizeHttpRequests(
    /api/subscription-plans/admin/**  → hasRole("ADMIN")
    /api/admin/**                     → hasRole("ADMIN")
    /api/**                           → authenticated()
    anyRequest                        → permitAll()       // /auth/**, GET /
)
.addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
.csrf(disabled)    // Safe — stateless JWT in Authorization header
.cors(configured)  // origin: localhost:5173 (dev), updateable for prod`}</pre>
          </Glass>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. ENGINEERING CHALLENGES
// ─────────────────────────────────────────────────────────────────────────────
function ChallengesSection() {
  const challenges = [
    {
      num: "01",
      problem: "Circular Dependency in Event System",
      solution: "PaymentService needs to trigger subscription activation, but SubscriptionService needs PaymentService to initiate payments — a potential circular dependency. Used Spring's ApplicationEventPublisher to break the cycle. PaymentService publishes an event; PaymentEventListener (separate component) handles it and calls SubscriptionService.",
      outcome: "Clean decoupling, async execution on a separate thread, and easy extensibility — add more listeners without modifying PaymentService.",
    },
    {
      num: "02",
      problem: "Payment Amount Validation (Paisa vs Rupees)",
      solution: "Razorpay stores amount in paisa (1/100 of INR); subscription plans store price in rupees. Direct comparison would always fail. In RazorpayService.isValidPayment(), the fetched Razorpay amount is divided by 100 (amountInRupees = amount / 100) before comparison with plan price.",
      outcome: "Correct amount validation prevents fraudulent underpayments without requiring schema changes.",
    },
    {
      num: "03",
      problem: "Subscription Plan Data Historical Integrity",
      solution: "If a plan's price or limits change after a user subscribes, the subscription should reflect the original agreed terms. When Subscription is created, initializeFromPlan() snapshots planName, planCode, price, maxBooksAllowed, maxDaysPerBook directly into the Subscription entity.",
      outcome: "Historical accuracy maintained — plan changes never retroactively affect existing active subscriptions.",
    },
    {
      num: "04",
      problem: "Verified Review Enforcement Without Direct Relationship",
      solution: "Reviews should only be submitted by users who actually returned the book. hasUserReadBook() queries all BookLoan records for the bookId, then uses a Java stream to check if any loan belongs to the current user AND has status == RETURNED.",
      outcome: "Clean business rule enforcement leveraging existing loan data without schema changes or a dedicated 'readBooks' join table.",
    },
    {
      num: "05",
      problem: "Reservation Queue Consistency",
      solution: "Queue position is calculated at reservation time using countPendingReservationsByBook() + 1. This gives a new reservation its position relative to existing pending reservations, backed directly by a database count query.",
      outcome: "Simple, consistent, database-query-backed queue positioning (note: extreme concurrent load could theoretically cause a race condition — a known improvement area using database locking).",
    },
    {
      num: "06",
      problem: "Soft Delete Without Breaking Foreign Key References",
      solution: "Physically deleting a book would break existing BookLoan, Reservation, Review, and Wishlist records. Books and genres have an active flag. deleteBook() sets active=false; hardDeleteBook() physically removes. searchBooksWithFilters always filters b.active=true.",
      outcome: "Referential integrity preserved — admin has both options, and soft-deleted books never appear in searches.",
    },
  ];

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <Heading tag="Challenges" title="Problems Solved" sub="Real engineering challenges and the architectural decisions made to overcome them" />
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
// 11. PERFORMANCE
// ─────────────────────────────────────────────────────────────────────────────
function PerformanceSection() {
  const items = [
    { icon: FaBolt, title: "Pagination Everywhere", color: "#fbbf24", desc: "All list endpoints use Spring Data Pageable. No unbounded queries. Page size capped at 10 for books, 100 for loans — prevents millions of rows in a single response." },
    { icon: FaDocker, title: "Docker Layer Caching", color: "#2496ed", desc: "mvnw dependency:go-offline runs before copying source code — Maven deps cached as a separate Docker layer, dramatically speeding up rebuilds when only source changes." },
    { icon: FaDatabase, title: "JPQL Named Parameters", color: "#1CD8D2", desc: "All custom queries use @Param named parameters, allowing the database to cache query execution plans for repeated calls." },
    { icon: FaLayerGroup, title: "Lazy Loading", color: "#a78bfa", desc: "Fine.processedBy uses FetchType.LAZY to avoid N+1 loading the processing user when listing fines. Only loaded when explicitly accessed." },
    { icon: FaBell, title: "Async Event Processing", color: "#34d399", desc: "@EnableAsync + @Async on PaymentEventListener.handlePaymentSuccess() ensures subscription activation after payment does not block the HTTP response thread." },
    { icon: FaServer, title: "HikariCP Connection Pool", color: "#fb923c", desc: "Spring Boot auto-configures HikariCP (fastest Java connection pool). Connection reuse eliminates TCP handshake overhead on every database operation." },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Heading tag="Performance" title="Engineered to Scale" sub="Pagination, async processing, Docker caching, and connection pooling from day one" />
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
// 12. FUTURE IMPROVEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function FutureSection() {
  const immediate = [
    "Complete GlobalException handler — add @ExceptionHandler for BookException, UserException, SubscriptionException",
    "Fix Docker EXPOSE port mismatch (server.port=5000 vs EXPOSE 8080)",
    "Externalize JWT secret, admin credentials, Razorpay keys to env vars or Spring Vault",
    "Return UserDTO (not full User entity) from /api/users/profile to avoid exposing password hash",
    "Implement fine auto-calculation on overdue marking (// Calculate fine todo in code)",
  ];
  const shortTerm = [
    "Google OAuth 2.0 login (entity already has googleId and AuthProvider.GOOGLE)",
    "Notification service for reservation availability (notificationSent flag already exists)",
    "Docker Compose with MySQL + LMS backend containers",
    "Spring Boot Actuator for health checks and metrics",
    "Automated unit + integration test suite",
    "Scheduled @Scheduled jobs for nightly overdue detection",
  ];
  const longTerm = [
    "Redis caching for genres, subscription plans, and book catalogue",
    "Admin dashboard analytics: monthly checkouts, fine revenue, active members",
    "Multi-library (branch) support with stock-per-branch tracking",
    "Barcode/QR code support for book check-in using ISBN scanner",
    "STRIPE payment gateway (enum already defined — PaymentGateway.STRIPE)",
    "JWT refresh token mechanism (current tokens are non-revocable on logout)",
    "Rate limiting and API throttling (Bucket4j or Spring Cloud Gateway)",
    "Kubernetes Helm chart for cloud deployment",
  ];

  return (
    <Section>
      <div className="max-w-5xl mx-auto">
        <Heading tag="Roadmap" title="What's Next" sub="Planned improvements across three horizons — from immediate bug fixes to long-term cloud architecture" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Immediate", color: "#f87171", items: immediate },
            { label: "Short Term", color: "#fbbf24", items: shortTerm },
            { label: "Long Term", color: "#1CD8D2", items: longTerm },
          ].map(({ label, color, items }) => (
            <FadeIn key={label}>
              <Glass className="p-6 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-6 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-bold text-white">{label}</span>
                </div>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2.5"
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="w-4 h-4 rounded border-2 border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-sm bg-white/10" />
                      </div>
                      <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
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
// 13. RESOURCES
// ─────────────────────────────────────────────────────────────────────────────
function ResourcesSection() {
  const resources = [
    { label: "GitHub Repo", icon: FaGithub, href: "https://github.com/Pranav-Sharma-Official/ps-lms", color: "#fff" },
    { label: "Docker Hub", icon: FaDocker, href: "https://hub.docker.com/r/pranavsharmaofficial/ps-lms", color: "#2496ed" },
    { label: "Hoppscotch Collection", icon: FaBoxOpen, href: "https://github.com/Pranav-Sharma-Official/ps-lms/blob/main/docs/Hoppscotch_Export.json", color: "#ff6c37" },
    { label: "Technical Documentation", icon: FaBook, href: "https://github.com/Pranav-Sharma-Official/ps-lms/blob/main/docs/PS_Library_Documentation.md", color: "#a78bfa" },
    { label: "Portfolio", icon: FaGlobe, href: "/", color: "#1CD8D2" },
    { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/-pranav--sharma-/", color: "#0A66C2" },
  ];

  return (
    <Section className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Resources" title="Explore the Project" sub="All the links you need to dive deeper into PS Library" />
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {resources.map(({ label, icon: Icon, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
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
// 14. INTERVIEW QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
const QA = [
  { q: "Why did you use Spring Boot 4.1.0 and Java 21 for this project?", a: "Spring Boot 4.1 (on Spring Framework 6.x) offers Jakarta EE 9+ namespace (javax → jakarta), virtual threads support via Project Loom in Java 21, and improved auto-configuration. Java 21 is an LTS release, making it a stable choice for production backend systems." },
  { q: "Walk me through the complete book checkout flow and all its validation steps.", a: "checkoutBookForUser() performs 9 steps: (1) validate user exists, (2) validate active subscription via SubscriptionService, (3) validate book exists, (4) validate book is active (not soft-deleted), (5) check availableCopies > 0, (6) check no duplicate active checkout via BookLoanRepository.hasActiveCheckout(), (7) check loan count < subscription's maxBooksAllowed, (8) check countOverdueByUser == 0, (9) create BookLoan entity, decrement availableCopies, save both." },
  { q: "Explain the event-driven subscription activation. How does it avoid circular dependencies?", a: "PaymentService and SubscriptionService would create a circular dependency if either injected the other. Instead, PaymentService uses Spring's ApplicationEventPublisher to publish a Payment domain event. A separate PaymentEventListener (annotated @EventListener @Async) handles the event and calls SubscriptionService.activateSubscription(). Neither PaymentService nor SubscriptionService depends on the other." },
  { q: "How does Razorpay payment verification work end-to-end?", a: "Frontend calls POST /api/payments/verify {razorpayPaymentId}. Backend fetches payment details from Razorpay API using the SDK. Validates: (1) payment.status == 'captured', (2) amount (in rupees, fetched amount / 100) matches plan price. Extracts internal payment_id from Razorpay notes field. Marks payment as SUCCESS, saves it, publishes PaymentSuccessEvent. Async listener activates the subscription." },
  { q: "What is the Subscription plan snapshot and why is it necessary?", a: "When a Subscription is created, initializeFromPlan() copies planName, planCode, price, maxBooksAllowed, maxDaysPerBook from the SubscriptionPlan entity into the Subscription entity's own columns. This is historical integrity — if an admin later updates the plan's price or limits, existing subscriptions retain the terms the user originally agreed to and paid for." },
  { q: "Explain the reservation queue system and any race condition risks.", a: "Queue position is calculated as countPendingReservationsByBook() + 1 at reservation creation time. Before creating, 6 guards are checked: no active loan on the book, no duplicate reservation, book must be unavailable, max 5 active reservations, etc. The race condition: two users could simultaneously calculate the same queue position if requests are processed concurrently. A production fix would use database-level row locking or an atomic increment." },
  { q: "How does verified review enforcement work without a direct 'readBooks' relationship?", a: "hasUserReadBook(userId, bookId) queries all BookLoan records for the given bookId, then uses Java streams to filter: any loan where loan.getUser().getId().equals(userId) AND loan.getStatus() == RETURNED. Returns true if any such loan exists. This leverages existing loan data without schema changes — no new join table needed." },
  { q: "What is OncePerRequestFilter and why does JwtValidator extend it?", a: "OncePerRequestFilter guarantees the filter runs exactly once per request, even in complex servlet dispatch scenarios. JwtValidator.doFilterInternal() extracts the Bearer token, validates HMAC signature, parses email and authorities claims, loads UserDetails, and sets UsernamePasswordAuthenticationToken in SecurityContextHolder. If invalid, it throws BadCredentialsException, resulting in 401." },
  { q: "Explain the Manual Mapper pattern used instead of MapStruct.", a: "11 @Component mapper classes (BookMapper, FineMapper, etc.) each contain toDTO(Entity), toEntity(DTO), and updateEntityFromDTO(DTO, Entity) methods. This was chosen over MapStruct for explicitness and debuggability. The BookMapper is notably stateful — its toEntity() calls GenreRepository.findById() to resolve genreId to a Genre entity, which MapStruct couldn't handle as cleanly without complex configuration." },
  { q: "What are the known security weaknesses and how would you fix them?", a: "1. JWT secret hardcoded in JwtConstant.java — fix: @Value('${app.jwt.secret}') from env var or Spring Vault. 2. Admin credentials hardcoded in DataInitializationComponent — fix: inject from env vars. 3. Razorpay keys in application.properties — fix: use environment variables or secrets manager. 4. /api/users/profile returns full User entity including password hash — fix: return UserDTO instead. 5. CORS allows all methods/headers — fix: restrict in production." },
  { q: "How does soft delete work and why is it preferred over hard delete for books?", a: "Books have a boolean active field. deleteBook() sets active = false, leaving all FK references (loans, reviews, reservations, wishlist) intact. hardDeleteBook() permanently removes the record, which would violate FK constraints unless cascaded. searchBooksWithFilters always includes WHERE b.active = true, so soft-deleted books never appear. Admin has both options depending on the use case." },
  { q: "Explain the multi-stage Docker build strategy.", a: "Stage 1 uses eclipse-temurin:21-jdk as base. It copies the Maven wrapper, runs ./mvnw dependency:go-offline (pre-caches all Maven deps as a Docker layer — separating dependency downloads from source compilation), then compiles with ./mvnw clean package -DskipTests. Stage 2 uses the smaller eclipse-temurin:21-jre, copies only the compiled JAR via COPY --from=build, exposes port, and sets ENTRYPOINT. Result: no JDK, Maven, or source code in the production image." },
  { q: "What is SessionCreationPolicy.STATELESS and how does it affect scalability?", a: "STATELESS tells Spring Security to never create or use an HTTP session. Every request is authenticated independently from its JWT — there is no session state on the server. This means any instance of the application can serve any request, enabling horizontal scaling (add more servers behind a load balancer). JWT carries all identity information needed for authentication." },
  { q: "How does the Fine state machine work?", a: "A Fine starts as PENDING. Two transitions are possible: (1) PENDING → PAID after Razorpay payment verification calls markFineAsPaid() — records transactionId, paidAt, processedBy. (2) PENDING → WAIVED after admin calls waiveFine() — records waivedBy (admin user), waivedAt, waiverReason. Both transitions are guarded: attempting to pay an already-WAIVED fine, or waive an already-PAID fine, throws an error." },
  { q: "What design patterns are demonstrated in this project?", a: "1. Layered Architecture (N-Tier) — Controller/Service/Repository/Mapper. 2. Repository Pattern — JpaRepository interfaces abstract data access. 3. Service Layer (Facade) — interface + impl separation. 4. DTO Pattern — decouples API contract from DB schema. 5. Builder Pattern (Lombok @Builder) — complex object construction. 6. Observer/Event-Driven — ApplicationEventPublisher decouples payment from subscription. 7. Template Method — JwtValidator extends OncePerRequestFilter. 8. Strategy Pattern — PaymentGateway enum (RAZORPAY/STRIPE). 9. Singleton (Spring IoC) — all beans are singletons by default." },
  { q: "How would you add automatic fine calculation when a book goes overdue?", a: "In BookLoanServiceImpl.updateOverdueBookLoan(), after setting status=OVERDUE and calculating overdueDays, call fineService.createFine(new CreateFineRequest(loan.getId(), FineType.OVERDUE, overdueDays * DAILY_RATE, 'Auto-generated overdue fine')). The daily rate could be configurable via application.properties with @Value. This is currently a // Calculate fine todo comment in the source." },
  { q: "Why does @EnableAsync exist on the main application class?", a: "@EnableAsync activates Spring's asynchronous method execution support. Without it, @Async annotations on methods (like PaymentEventListener.handlePaymentSuccess()) would be silently ignored and the method would execute synchronously. With @EnableAsync, Spring creates a proxy that routes @Async method calls to a thread pool, freeing the calling thread immediately." },
  { q: "How does Spring Data JPA prevent the N+1 query problem in this project?", a: "For Fine.processedBy: FetchType.LAZY ensures the processing user is not loaded when fetching fines — only when explicitly accessed. For BookLoanRepository, countActiveByUser() and countOverdueByUser() are single aggregate queries rather than loading all loans and counting in Java. The searchBooksWithFilters JPQL query handles genre joining in a single query rather than separate lookups." },
  { q: "What HTTP status codes does the API use and why?", a: "201 Created for checkout and reservation creation (new resource created). 200 OK for checkin, renewal, and all reads/updates. 400 Bad Request for GenreException and payment validation failures. 401 Unauthorized via BadCredentialsException when JWT is invalid. Spring's default 400 for Jakarta Bean Validation failures. A known gap: BookException, UserException, SubscriptionException are not handled by GlobalException — they may produce unexpected error formats." },
  { q: "If you were to refactor one thing, what would it be and why?", a: "I would complete the GlobalException handler to cover all custom exceptions (BookException, UserException, SubscriptionException, generic Exception) with appropriate HTTP status codes and consistent ApiResponse format. Currently only GenreException is handled. Incomplete exception handling produces inconsistent error responses, making API integration difficult and hiding server errors from consumers. It's also a straightforward fix with high business value." },
];

function InterviewSection({ activeAccordion, setActiveAccordion }) {
  return (
    <Section id="interview" className="bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Heading tag="Interview Prep" title="20 Technical Questions" sub="Deep-dive questions an interviewer might ask about PS Library's design and implementation" />
        <div className="space-y-2">
          {QA.map(({ q, a }, i) => {
            const isOpen = activeAccordion === i;
            return (
              <FadeIn key={i} delay={Math.min(i * 0.015, 0.25)}>
                <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#1CD8D2]/30 bg-[#1CD8D2]/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"}`}>
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
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
// 15. FOOTER CTA
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
          Interested in the<br />
          <span style={{ backgroundImage: "linear-gradient(135deg, #1CD8D2, #00bf8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Implementation?
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          I'm open to backend roles, freelance projects, and tutoring opportunities.
          Let's build something enterprise-grade together.
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
          Built by <span className="text-[#1CD8D2]">Pranav Sharma</span> · PS Library Case Study · {new Date().getFullYear()}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PSLibraryPage() {
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
      <WorkflowsSection />
      <DatabaseSection />
      <APIsSection />
      <SecuritySection />
      <ChallengesSection />
      <PerformanceSection />
      <FutureSection />
      <ResourcesSection />
      <InterviewSection activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion} />
      <FooterCTA />
    </div>
  );
}
