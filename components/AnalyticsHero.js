"use client";

import { motion } from "framer-motion";
import { AnimatedText, EASE_SMOOTH } from "./ui";

export default function AnalyticsHero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background - Starry Space Theme */}
      {/* Subtle Stars Overlay */}
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="inline-flex items-center gap-2 text-xs tracking-[0.125em] uppercase text-sky-300 border border-sky-600/60 backdrop-blur-md rounded-full px-5 py-2 mb-10"
        >
          <motion.span
            className="text-sky-400 text-base"
            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ★
          </motion.span>
          IMAGE ANALYTICS
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_SMOOTH }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight"
        >
          Turning <span className="text-sky-400">orbit data</span> into
          <br className="hidden sm:block" /> operational insight
        </motion.h1>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto mt-8">
          <AnimatedText
            className="text-slate-400 text-base md:text-lg leading-relaxed"
            delay={0.55}
            stagger={0.02}
          >
            {
              "High-resolution Earth observation for strategic defense and national progress — processed, classified, and visualized."
            }
          </AnimatedText>
        </div>
      </div>

      {/* Optional subtle bottom fade */}
    </section>
  );
}
