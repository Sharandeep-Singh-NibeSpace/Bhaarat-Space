"use client";

import { motion } from "framer-motion";

export function SatelliteGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <rect x="14" y="2" width="8" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="42" y="2" width="8" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="26" y="24" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="38" x2="32" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="56" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function RadarGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none">
      <ellipse cx="60" cy="40" rx="50" ry="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="22" x2="60" y2="46" stroke="currentColor" strokeWidth="1.5" />
      <rect x="52" y="46" width="16" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ElintGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 70 90" className={className} fill="none">
      <rect x="28" y="38" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="35"
          y1="40"
          x2={10 + i * 17}
          y2="8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
      <line x1="35" y1="56" x2="35" y2="80" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Shared smooth easing curve (a soft "expo-out" feel) used across the site
// so every scroll animation moves with the same buttery, consistent motion.
export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// Reusable fade/slide-up variant for whileInView animations.
export function fadeUp(delay = 0, distance = 40) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: EASE_SMOOTH },
  };
}

// Word-by-word text reveal animation. Splits `children` (a string) into
// words and staggers them in on scroll for a smooth, editorial feel.
// Falls back gracefully for non-string children.
export function AnimatedText({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  stagger = 0.03,
  once = false,
}) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = children.split(" ");
  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: "0.6em", filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: EASE_SMOOTH },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="text-[11px] tracking-[0.25em] uppercase text-sky-400 font-semibold mb-3 text-center">
      {children}
    </p>
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-block text-[11px] uppercase tracking-wide text-sky-300 border border-sky-700/60 bg-sky-900/30 rounded-full px-3 py-1">
      {children}
    </span>
  );
}
