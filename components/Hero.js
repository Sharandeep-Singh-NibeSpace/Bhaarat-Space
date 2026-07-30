"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { value: "2026", label: "Launch Year" },
  { value: "100%", label: "Domestic Investment" },
  { value: "35cm", label: "Image Resolution" },
  { value: ">90min", label: "Revisit Time, Primary AOI" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Video background — slightly zoomed out on mobile so more of Earth is visible.
          Section stays transparent so SiteBackground shows around the scaled video
          and through the bottom fade (no hard black seam before About). */}
      <video
        className="absolute inset-0 w-full h-full object-cover origin-center max-sm:scale-[0.86] sm:scale-100"
        src="/videos/earth_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
        }}
      />

      {/* Same navy gradient as before, now layered on top of the video for legibility */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 " />
      <div className="absolute opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-6 sm:pb-16 text-left">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="inline-flex gap-2 text-xs sm:text-[13px] tracking-[0.12em] sm:tracking-[0.18em] uppercase text-sky-300 border border-sky-700/50 bg-sky-900/30 rounded-full px-3.5 sm:px-4 py-2 mb-6 sm:mb-8 max-w-full"
        >
          <span className="text-sky-400">★</span>
          India&apos;s first multi-mission EO &amp; SAR constellation
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white text-left"
        >
          Sub-90
          <br />
          minute revisit,{" "}
          <span className="text-sky-400">
            <br className="hidden sm:block" />
            across primary AOI.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-slate-400 mt-6 text-base sm:text-lg leading-relaxed text-left max-w-xl"
        >
          High-resolution Earth Observation and SAR satellites, purpose-built
          for strategic defense and national resilience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          <a
            href="#solution"
            className="bg-sky-500 hover:bg-sky-400 transition-colors text-white text-center text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-md"
          >
            Explore the Constellation
          </a>
          <Link
            href="/contact"
            className="border backdrop-blur border-slate-600 hover:border-slate-400 transition-colors text-slate-200 text-center text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-md"
          >
            Talk to Us
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-4 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, delay: 1 }}
          className="grid grid-cols-2 sm:grid-cols-4 rounded-xl border backdrop-blur overflow-hidden"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className={`px-3 sm:px-6 py-5 sm:py-7 text-center ${
                i !== 0
                  ? "border-t sm:border-t-0 sm:border-l border-white/10"
                  : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-xs sm:text-[13px] uppercase tracking-wide text-slate-500 mt-1.5 leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
