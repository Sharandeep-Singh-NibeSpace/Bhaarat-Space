"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// How long the shutter stays fully closed (logo visible) before opening
const HOLD_MS = 500;
// How long the opening slide animation takes
const ANIM_MS = 850;

/**
 * Full-screen "camera shutter" intro: two panels meet in the middle with the
 * logo centered on the seam, hold briefly, then slide apart (top up, bottom
 * down) to reveal the page. Re-plays on every route change since it reads
 * the current pathname and resets on change.
 */
export default function PageShutter() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("closed"); // 'closed' | 'opening' | 'open'
  const timeoutsRef = useRef([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);

    setPhase("closed");

    const t1 = setTimeout(() => setPhase("opening"), HOLD_MS);
    const t2 = setTimeout(() => setPhase("open"), HOLD_MS + ANIM_MS);
    timeoutsRef.current = [t1, t2];

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [pathname]);

  const isOpening = phase === "opening" || phase === "open";
  const isOpen = phase === "open";
  // Critical: only animate while opening. When we reset back to "closed" on
  // a route change, the panels must SNAP into place instantly (no
  // transition) — otherwise they visibly slide back together first, then
  // hold, then slide open again, which looks broken on every page after
  // the first.
  const slideTransition =
    phase === "closed"
      ? "none"
      : "transform 850ms cubic-bezier(0.76, 0, 0.24, 1)";
  const fadeTransition =
    phase === "closed" ? "none" : "opacity 450ms ease, transform 450ms ease";
  const seamTransition = phase === "closed" ? "none" : "opacity 300ms ease";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[999] overflow-hidden"
      style={{ pointerEvents: isOpen ? "none" : "auto" }}
    >
      {/* Top panel */}
      <div
        className="absolute top-0 left-0 w-full h-1/2"
        style={{
          background: "linear-gradient(180deg, #0a1224 0%, #060a16 100%)",
          transform: isOpening ? "translateY(-100%)" : "translateY(0)",
          transition: slideTransition,
        }}
      />
      {/* Bottom panel */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{
          background: "linear-gradient(0deg, #0a1224 0%, #060a16 100%)",
          transform: isOpening ? "translateY(100%)" : "translateY(0)",
          transition: slideTransition,
        }}
      />
      {/* Seam hairline for a crisp "doors" edge while closed */}
      <div
        className="absolute left-0 w-full"
        style={{
          top: "50%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.5) 50%, transparent 100%)",
          opacity: isOpening ? 0 : 1,
          transition: seamTransition,
        }}
      />
      {/* Logo, centered on the seam */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center"
        style={{
          transform: `translate(-50%, -50%) scale(${isOpening ? 0.85 : 1})`,
          opacity: isOpening ? 0 : 1,
          transition: fadeTransition,
        }}
      >
        <img
          src="/images/Bharat Space2.svg"
          alt="Bharat Space"
          style={{ height: "45/videos/about_page_video.mp40px", width: "auto" }}
        />
      </div>
    </div>
  );
}
