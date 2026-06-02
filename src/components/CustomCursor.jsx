import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide default system cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Snap the dot instantly to mouse
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Detect hover over interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], label"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    addHoverListeners();

    // Re-run when DOM changes (new elements added dynamically)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Smooth lagging ring using rAF lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.10);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.10);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringSize = hovering ? 48 : clicking ? 16 : 36;
  const dotSize = clicking ? 3 : 5;

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
          marginLeft: `-${dotSize / 2}px`,
          marginTop: `-${dotSize / 2}px`,
        }}
      >
        <div
          style={{
            width: `${dotSize * 2}px`,
            height: `${dotSize * 2}px`,
            borderRadius: "50%",
            background: hovering
              ? "linear-gradient(135deg, #1cd8d2, #00bf8f)"
              : "#ffffff",
            boxShadow: hovering
              ? "0 0 10px rgba(28,216,210,0.9), 0 0 20px rgba(0,191,143,0.6)"
              : "0 0 6px rgba(255,255,255,0.8)",
            transition: "width 0.2s ease, height 0.2s ease, background 0.3s ease, box-shadow 0.3s ease",
          }}
        />
      </div>

      {/* Ring — lags behind with lerp for smooth trail */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
        }}
      >
        <div
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            borderRadius: "50%",
            border: hovering
              ? "2px solid #1cd8d2"
              : clicking
              ? "2px solid #00bf8f"
              : "1.5px solid rgba(28, 216, 210, 0.7)",
            background: hovering
              ? "rgba(28, 216, 210, 0.08)"
              : "transparent",
            boxShadow: hovering
              ? "0 0 16px rgba(28,216,210,0.4), inset 0 0 10px rgba(28,216,210,0.05)"
              : "0 0 8px rgba(28,216,210,0.2)",
            backdropFilter: hovering ? "blur(2px)" : "none",
            transition:
              "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          }}
        />
      </div>

      {/* Ambient glow blob that loosely follows cursor */}
      <div
        ref={null}
        className="pointer-events-none fixed top-0 left-0 z-[99990]"
        style={{
          opacity: visible ? 0.12 : 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
