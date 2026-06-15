import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const playlist = [
    "/Chronicles of Me (My Original Creation).mp3",
    "/Daylight.mp3",
    "/Perfect.mp3",
    "/Dusk Till Dawn.mp3",
    "/7 Years.mp3",
  ];

  // Clean display names matching playlist order
  const trackNames = [
    "Chronicles of Me (My Original Creation)",
    "Daylight",
    "Perfect",
    "Dusk Till Dawn",
    "7 Years",
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoText, setInfoText] = useState("🎵 Optional Background Music");
  const audioRef = useRef(null);
  const lastTapTime = useRef(0);
  const clickTimeout = useRef(null);
  const isPlayingRef = useRef(false); // mirror of isPlaying to use inside callbacks

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Helper: reliably set src and optionally play
  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set source, force reload, apply volume
    audio.src = src;
    audio.load();

    // Always ensure not muted and reasonable volume
    audio.muted = false;
    if (audio.volume === 0) audio.volume = 0.5;

    if (!shouldPlay) return;

    // Wait for canplay before calling play to avoid errors
    const onCanPlay = () => {
      // Try play in the same user gesture frame if possible
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // If blocked, reflect paused state
          setIsPlaying(false);
          setInfoText("🎵 Optional Background Music");
        });
      }
      audio.removeEventListener("canplay", onCanPlay);
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  // Play a specific track (called by click gestures)
  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setInfoText(`🎵 Now Playing: ${trackNames[index]}`);
    setSourceAndMaybePlay(playlist[index], true);
  };

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      setInfoText("🎵 Optional Background Music");
    } else {
      // Ensure current src is set correctly before playing
      setSourceAndMaybePlay(playlist[currentTrackIndex], true);
      setIsPlaying(true);
      setInfoText(`🎵 Now Playing: ${trackNames[currentTrackIndex]}`);
    }
  };

  // Shuffle to next random track, preserve play/pause state
  const shuffleNextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlayingRef.current;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentTrackIndex && playlist.length > 1);

    setCurrentTrackIndex(nextIndex);
    if (wasPlaying) setInfoText(`🎵 Now Playing: ${trackNames[nextIndex]}`);

    // If paused, only switch source; if playing, switch and continue
    setSourceAndMaybePlay(playlist[nextIndex], wasPlaying);
  };

  // Auto shuffle on track end
  const handleTrackEnd = () => {
    shuffleNextTrack();
  };

  // Initial setup: volume, preload
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio.muted = false;

    // Dev-time diagnostics (optional; remove in prod)
    const onError = () => {
      // eslint-disable-next-line no-console
      console.warn("Audio error loading/playing:", audio.error);
    };
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  // Volume with up/down keys (desktop)
  useEffect(() => {
    const handleVolumeKeys = (e) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        audio.volume = Math.min(1, Math.round((audio.volume + 0.05) * 100) / 100);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        audio.volume = Math.max(0, Math.round((audio.volume - 0.05) * 100) / 100);
      }
    };
    window.addEventListener("keydown", handleVolumeKeys, { passive: false });
    return () => window.removeEventListener("keydown", handleVolumeKeys);
  }, []);

  // Mobile double tap to change music
  const handleDoubleTapMobile = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 400) {
      shuffleNextTrack();
    }
    lastTapTime.current = now;
  };

  // Unified single vs double click on desktop
  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      // Double click → change track, preserve play state
      shuffleNextTrack();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {/* Now Playing pill — visible when playing */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(28,216,210,0.3)",
          boxShadow: "0 0 12px rgba(28,216,210,0.15)",
          opacity: isPlaying ? 1 : 0,
          transform: isPlaying ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {/* Animated music bars */}
        <span className="flex items-end gap-[2px]" style={{ height: "12px" }}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "3px",
                borderRadius: "2px",
                background: "linear-gradient(to top, #1cd8d2, #00bf8f)",
                animation: isPlaying ? `musicBar${i} 0.${5 + i}s ease-in-out infinite alternate` : "none",
                height: isPlaying ? undefined : "4px",
              }}
            />
          ))}
        </span>
        <span style={{ color: "#e2e8f0" }}>
          Now Playing:&nbsp;
          <span style={{ color: "#1cd8d2", fontWeight: 600 }}>
            {trackNames[currentTrackIndex]}
          </span>
        </span>
      </div>

      {/* Idle hint — visible when paused */}
      {!isPlaying && (
        <p className="text-xs text-gray-400 italic text-right">🎵 Optional Background Music</p>
      )}

      {/* Double tap hint — visible when playing */}
      {isPlaying && (
        <p
          className="text-xs text-right"
          style={{
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.02em",
            animation: "fadeInHint 0.5s ease forwards",
          }}
        >
          Double tap to play next
        </p>
      )}

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
        preload="auto"
      />

      <button
        onClick={handleClick}
        onTouchStart={handleDoubleTapMobile}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110 self-end"
        style={{
          background: "linear-gradient(135deg, #1cd8d2, #00bf8f)",
          boxShadow: isPlaying
            ? "0 0 20px rgba(28,216,210,0.7), 0 0 40px rgba(0,191,143,0.4)"
            : "0 0 10px rgba(28,216,210,0.3)",
          color: "white",
          transition: "box-shadow 0.3s ease",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>

      {/* Keyframes for music bars + hint fade */}
      <style>{`
        @keyframes musicBar1 { from { height: 3px; } to { height: 12px; } }
        @keyframes musicBar2 { from { height: 6px; } to { height: 10px; } }
        @keyframes musicBar3 { from { height: 4px; } to { height: 12px; } }
        @keyframes fadeInHint { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
