import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

// Project case study pages
import PSLinkyPage from "./projects/PSLinky";

// ── Main portfolio single-page layout ────────────────────────────────────────
function Portfolio() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Homepage always present (masked reveal) */}
      <Home introDone={introDone} />

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

// ── Root app with routing ─────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Project case studies */}
        <Route path="/projects/ps-linky" element={<PSLinkyPage />} />

        {/* Fallback → home */}
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
