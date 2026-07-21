"use client";

import { motion } from "framer-motion";
import BgVideo from "./BgVideo";
import { EASE_SMOOTH } from "./ui";

export default function AboutTopHero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[420px] max-h-[720px] overflow-hidden flex items-center justify-center">
      {/* Full-bleed Earth video background */}
      <BgVideo
        className="w-full h-full object-cover"
        src="/videos/about_page_video.mp4"
        poster="/videos/posters/about_page_video.jpg"
        priority
      />

      {/* Contrast overlay so the heading stays readable over the bright video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-space-500" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Centered heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: EASE_SMOOTH }}
        className="relative z-10 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white px-6 leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
      >
        About Bharat Space
      </motion.h1>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_SMOOTH }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
