import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";
import tablet1 from "../assets/tablet1.png";

const MH3 = motion.h3;

// ── Breakpoint hook ────────────────────────────────────────────────────────
// Returns the current breakpoint name and three boolean helpers.
// Listens to MediaQueryList change events so it updates on resize.

const MQ = {
  mobile: "(max-width: 639px)",
  tablet: "(min-width: 640px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

function getBreakpoint() {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MQ.desktop).matches) return "desktop";
  if (window.matchMedia(MQ.tablet).matches) return "tablet";
  return "mobile";
}

function useBreakpoint() {
  const [bp, setBp] = React.useState(getBreakpoint);

  React.useEffect(() => {
    const entries = Object.values(MQ).map((query) => {
      const mql = window.matchMedia(query);
      const handler = () => setBp(getBreakpoint());
      mql.addEventListener?.("change", handler) ?? mql.addListener(handler);
      return { mql, handler };
    });
    return () => {
      entries.forEach(({ mql, handler }) => {
        mql.removeEventListener?.("change", handler) ??
          mql.removeListener(handler);
      });
    };
  }, []);

  return {
    breakpoint: bp,
    isMobile: bp === "mobile",
    isTablet: bp === "tablet",
    isDesktop: bp === "desktop",
  };
}

// ── Per-breakpoint layout config ───────────────────────────────────────────
const LAYOUT = {
  mobile: {
    containerWidth: "85%",
    containerMaxWidth: "100%",
    imageHeight: "h-[62vh]",
    buttonBottom: "bottom-20",
    headingMt: "mt-4",
    wrapperMt: "-mt-4",
  },
  tablet: {
    containerWidth: "78%",
    containerMaxWidth: "860px",
    imageHeight: "h-[56vh]",
    buttonBottom: "bottom-14",
    headingMt: "mt-6",
    wrapperMt: "",
  },
  desktop: {
    containerWidth: "85%",
    containerMaxWidth: "1200px",
    imageHeight: "h-[66vh]",
    buttonBottom: "bottom-10",
    headingMt: "mt-8",
    wrapperMt: "",
  },
};

// ── Project data ───────────────────────────────────────────────────────────
// Each project carries three image variants.
// imageTablet falls back to imageDesktop when no tablet-specific asset exists.
const PROJECTS = [
  {
    title: "PS Linky",
    link: "/projects/ps-linky",
    bgColor: "#0c0f1f",
    imageDesktop: img1,
    imageTablet: tablet1,
    imageMobile: photo1,
  },
  // {
  //   title:         "Gamily",
  //   link:          "https://gamilyapp.com/",
  //   bgColor:       "#3884d3",
  //   imageDesktop:  img2,
  //   imageTablet:   img2,
  //   imageMobile:   photo2,
  // },
  // {
  //   title:         "Hungry Tiger",
  //   link:          "https://www.eathungrytiger.com/",
  //   bgColor:       "#dc9317",
  //   imageDesktop:  img3,
  //   imageTablet:   img3,
  //   imageMobile:   photo3,
  // },
];

// ── Image selector ─────────────────────────────────────────────────────────
function pickImage(project, breakpoint) {
  if (breakpoint === "mobile") return project.imageMobile;
  if (breakpoint === "tablet") return project.imageTablet;
  return project.imageDesktop;
}

// ── Title position styles per breakpoint ───────────────────────────────────
const TITLE_STYLE = {
  mobile: {
    display: "block",
    textAlign: "center",
    zIndex: 5,
  },
  tablet: {
    position: "absolute",
    top: "-4.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    whiteSpace: "nowrap",
    zIndex: 5,
  },
  desktop: {
    position: "absolute",
    top: "-5.25rem",
    left: "-5%",
    textAlign: "left",
    zIndex: 5,
  },
};

// ── Component ──────────────────────────────────────────────────────────────
export default function Projects() {
  const { breakpoint, isMobile } = useBreakpoint();
  const layout = LAYOUT[breakpoint];

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = PROJECTS.map((_, i) => (i + 1) / PROJECTS.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * PROJECTS.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Section heading */}
        <motion.h2
          className="text-4xl mt-5 sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My Work
        </motion.h2>

        {/* Project cards */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${layout.wrapperMt}`}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{
                width: layout.containerWidth,
                maxWidth: layout.containerMaxWidth,
              }}
            >
              {/* Animated project title */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`text-[clamp(2rem,6vw,5rem)] text-white/95 font-bangers italic font-semibold ${
                      isMobile ? "-mt-25 block" : "sm:mb-0"
                    }`}
                    style={TITLE_STYLE[breakpoint]}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Project image */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } ${layout.imageHeight}`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
              >
                <img
                  src={pickImage(project, breakpoint)}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                {/* Subtle top vignette */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className={`absolute ${layout.buttonBottom}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}

// // ── Coming Soon placeholder ──────────────────────────────────
// import { motion } from "framer-motion";

// export default function Projects() {
//   return (
//     <section
//       id="projects"
//       className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden text-white"
//     >
//       {/* Ambient glow blobs */}
//       <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600 opacity-10 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600 opacity-10 blur-[120px] pointer-events-none" />

//       {/* Section label */}
//       <motion.p
//         initial={{ opacity: 0, y: -10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="uppercase tracking-[0.3em] text-xs text-white/40 mb-4"
//       >
//         My Work
//       </motion.p>

//       {/* Main heading */}
//       <motion.h2
//         initial={{ opacity: 0, scale: 0.85 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400 text-center"
//       >
//         Coming Soon
//       </motion.h2>

//       {/* Subtitle */}
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className="mt-5 text-white/50 text-base sm:text-lg text-center max-w-md px-6"
//       >
//         Exciting projects are currently in the works. <br />
//         Check back soon!
//       </motion.p>

//       {/* Animated dots */}
//       <motion.div
//         className="flex gap-2 mt-10"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         {[0, 1, 2].map((i) => (
//           <motion.span
//             key={i}
//             className="w-2.5 h-2.5 rounded-full bg-blue-400"
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
//           />
//         ))}
//       </motion.div>
//     </section>
//   );
// }
