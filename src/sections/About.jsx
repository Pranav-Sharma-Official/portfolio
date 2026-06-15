import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import p from "../assets/p.png";
import {
  FaLinkedin,
  FaClock,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { SiLastdotfm } from "react-icons/si";

// ─── Live IST Clock ──────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = time.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StatCard icon={<FaClock className="text-[#1CD8D2]" size={16} />} title="Local Time · IST">
      <p className="text-2xl font-bold text-white font-mono tracking-widest">{timeStr}</p>
      <p className="text-xs text-gray-400 mt-0.5">{dateStr}</p>
    </StatCard>
  );
}

// ─── Last.fm Now Playing ─────────────────────────────────────────────────────
function NowPlayingWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/now-playing");
      const json = await res.json();
      setData(json);
    } catch {
      setData({ isPlaying: false, configured: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(id);
  }, []);

  const progressPct =
    data?.isPlaying && data.duration
      ? Math.round((data.progress / data.duration) * 100)
      : 0;

  return (
    <StatCard
      icon={<SiLastdotfm className="text-[#d51007]" size={16} />}
      title={data?.isPlaying ? "Currently Listening" : "Last Listened"}
    >
      {loading ? (
        <p className="text-xs text-gray-500 animate-pulse">Fetching…</p>
      ) : (data?.isPlaying || data?.title) ? (
        <div className="flex items-center gap-3 w-full">
          {data.albumArt && (
            <img
              src={data.albumArt}
              alt={data.album}
              className="w-12 h-12 rounded-lg object-cover shrink-0 shadow-lg"
              style={{ boxShadow: data.isPlaying ? "0 0 12px rgba(213,16,7,0.5)" : "none" }}
            />
          )}
          <div className="flex-1 min-w-0">
            <a
              href={data.songUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-white truncate block hover:text-[#d51007] transition-colors"
            >
              {data.title}
            </a>
            <p className="text-xs text-gray-400 truncate">{data.artist}</p>
            {data.album && (
              <p className="text-[10px] text-gray-600 truncate mt-0.5">{data.album}</p>
            )}
          </div>
          {/* Animated bars — only when actively playing */}
          {data.isPlaying && (
            <span className="flex items-end gap-[2px] shrink-0" style={{ height: "14px" }}>
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: "3px",
                    borderRadius: "2px",
                    background: "#d51007",
                    animation: `musicBar${i} 0.${4 + i}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </span>
          )}
        </div>
      ) : !data?.configured ? (
        <div>
          <p className="text-xs text-gray-500 italic">Not configured yet</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Add LASTFM_API_KEY + LASTFM_USERNAME to Vercel</p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 italic">Nothing playing right now</p>
      )}
    </StatCard>
  );
}

// ─── Preply Tutor Rating ─────────────────────────────────────────────────────
function PreplyCard() {
  const metrics = [
    { label: "Reassurance", score: 4.7 },
    { label: "Clarity",     score: 4.3 },
    { label: "Progress",    score: 4.3 },
    { label: "Preparation", score: 4.1 },
  ];
  const overall = 4.3;

  return (
    <StatCard
      icon={
        <img
          src="https://cdn-1.webcatalog.io/catalog/preply/preply-icon-filled-256.png?v=1779064504690"
          alt="Preply"
          className="w-4 h-4 rounded-sm"
        />
      }
      title="Preply Tutor"
      href="https://preply.com/en/tutor/5555978"
    >
      {/* Overall stars */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              size={12}
              className={
                s <= Math.round(overall)
                  ? "text-yellow-400"
                  : "text-gray-600"
              }
            />
          ))}
        </div>
        <span className="text-white font-bold text-sm">{overall.toFixed(1)}</span>
        <span className="text-gray-500 text-xs">/ 5.0</span>
      </div>

      {/* Individual metrics */}
      <div className="flex flex-col gap-1.5 w-full mt-1">
        {metrics.map(({ label, score }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 w-24 shrink-0">{label}</span>
            <div className="flex-1 h-1 rounded-full bg-white/10">
              <div
                className="h-1 rounded-full transition-all duration-700"
                style={{
                  width: `${(score / 5) * 100}%`,
                  background: "linear-gradient(90deg, #1CD8D2, #00bf8f)",
                }}
              />
            </div>
            <span className="text-[10px] text-gray-400 w-6 text-right shrink-0">{score}</span>
          </div>
        ))}
      </div>
    </StatCard>
  );
}

// ─── LinkedIn Card ────────────────────────────────────────────────────────────
function LinkedInCard() {
  // LinkedIn has no public API — update this number manually
  // Go to your LinkedIn profile → followers count
  const FOLLOWER_COUNT = "5.3k+"; // ← update this manually

  return (
    <StatCard
      icon={<FaLinkedin className="text-[#0A66C2]" size={16} />}
      title="LinkedIn"
      href="https://www.linkedin.com/in/-pranav--sharma-/"
    >
      <p className="text-2xl font-bold text-white">{FOLLOWER_COUNT}</p>
      <p className="text-xs text-gray-400">Followers · Open to connect</p>
    </StatCard>
  );
}

// ─── Reusable Card Shell ──────────────────────────────────────────────────────
function StatCard({ icon, title, children, href }) {
  const inner = (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2 w-full transition-all duration-300 group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        {href && (
          <span className="ml-auto text-[10px] text-gray-600 group-hover:text-[#1CD8D2] transition-colors">
            ↗
          </span>
        )}
      </div>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="w-full block">
        {inner}
      </a>
    );
  }
  return <div className="w-full">{inner}</div>;
}

// ─── Small metric pill ────────────────────────────────────────────────────────
function Metric({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1 text-gray-400">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-base font-bold text-white">{value ?? "—"}</span>
    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Neon background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

        {/* ── LEFT — existing about content ─────────────────────────────── */}
        <motion.div
          className="flex-1 flex flex-col gap-10 min-w-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Profile header */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
            {/* Avatar */}
            <motion.div
              className="relative w-[160px] h-[160px] md:w-[190px] md:h-[220px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25 shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              aria-hidden="true"
            >
              <img src={p} alt="Pranav Sharma" className="w-full h-full object-cover" />
            </motion.div>

            {/* Name + Role + Bio + CTAs */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
                Pranav Sharma
              </h2>
              <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
                Full Stack Developer
              </p>
              <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl">
                I build scalable, modern applications with a strong focus on clean architecture,
                delightful UX, and performance. My toolkit spans Java, React, Spring, SQL, and
                REST API—bringing ideas to life from concept to production with robust APIs and
                smooth interfaces.
              </p>

              {/* Quick stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                {[
                  { label: "Experience", value: "1+ years" },
                  { label: "Specialty", value: "Backend" },
                  { label: "Focus", value: "Performance & UX" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="text-sm text-gray-400">{item.label}</div>
                    <div className="text-base font-semibold text-white">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <button
                  onClick={() =>
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition cursor-pointer border-none outline-none"
                  aria-label="View my projects"
                >
                  View Projects
                </button>
                <button
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition cursor-pointer outline-none"
                  aria-label="Get in touch"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          {/* About Me body */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">About Me</h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              I'm a Software Developer, Freelancer, and Tutor — passionate about building fast,
              resilient applications and sharing coding insights to students globally.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I love turning ideas into scalable, user‑friendly products that make an impact.
            </p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Live Stats Panel ───────────────────────────────────── */}
        <motion.div
          className="w-full lg:w-[300px] xl:w-[320px] flex flex-col gap-3 shrink-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Panel header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1CD8D2] animate-pulse" />
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              Live Stats
            </span>
          </div>

          <NowPlayingWidget />
          <LinkedInCard />
          <PreplyCard />
          <LiveClock />
        </motion.div>
      </div>

      {/* Reuse music bar keyframes */}
      <style>{`
        @keyframes musicBar1 { from { height: 3px; } to { height: 14px; } }
        @keyframes musicBar2 { from { height: 6px; } to { height: 10px; } }
        @keyframes musicBar3 { from { height: 4px; } to { height: 14px; } }
      `}</style>
    </section>
  );
}
