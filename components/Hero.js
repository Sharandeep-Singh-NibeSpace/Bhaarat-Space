"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { value: "2026", label: "Launch Year" },
  { value: "100%", label: "Domestic Investment" },
  { value: "99cm", label: "Image Resolution" },
  { value: "120min", label: "Revisit Time, Primary AOI" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Video background — above the fold, so it loads immediately (priority) */}
      <video
        className="absolute inset-0 w-full h-full object-none"
        src="/videos/earth_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Same navy gradient as before, now layered on top of the video for legibility */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 " />
      <div className="absolute opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-left">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="inline-flex gap-2 text-[11px] tracking-[0.2em] uppercase text-sky-300 border border-sky-700/50 bg-sky-900/30 rounded-full px-4 py-1.5 mb-8"
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
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white text-left"
        >
          Sub-90
          <br />
          minute revisit,{" "}
          <span className="text-sky-400">
            <br />
            across all of India.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-slate-400  mx-auto mt-6 text-sm sm:text-base leading-relaxed text-left"
        >
          High-resolution Earth Observation and SAR satellites, purpose-built
          <br />
          for strategic defense and national resilience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-left text-left justify-left gap-4 mt-10"
        >
          <a
            href="#solution"
            className="bg-sky-500 hover:bg-sky-400 transition-colors text-white text-left text-sm font-semibold px-6 py-3 rounded-md"
          >
            Explore the Constellation
          </a>
          <Link
            href="/contact"
            className="border backdrop-blur border-slate-600 hover:border-slate-400 transition-colors text-slate-200 text-sm font-semibold px-6 py-3 rounded-md"
          >
            Talk to Us
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
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
              className={`px-6 py-7 text-center ${
                i !== 0
                  ? "border-t sm:border-t-0 sm:border-l border-white/10"
                  : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500 mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
