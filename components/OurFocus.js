"use client";

import { motion } from "framer-motion";
import { Eyebrow, AnimatedText, EASE_SMOOTH } from "./ui";

const FOCUS = [
  {
    eyebrow: "Earth Observation",
    title: "High-performance EO satellites",
    desc: "Bharat Space's Earth observation constellation delivers precision imagery for strategic defense and environmental monitoring, refreshed on a sub-90-minute revisit cycle.",
    image: "/images/EO.avif",
  },
  {
    eyebrow: "Atma Nirbhar Bharat",
    title: "Empowering India with sovereign imagery",
    desc: "Advanced satellite imagery for critical decision-making in defense, infrastructure, and environmental sustainability — designed, built, and operated entirely within India.",
    image: "/images/Atma-Nirbhar-Bharat.avif",
  },
];

export default function OurFocus() {
  return (
    <section className="py-20 px-6">
      <Eyebrow>Our Focus</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-14"
      >
        Where we point our satellites
      </motion.h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
        {FOCUS.map((f, index) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: EASE_SMOOTH }}
            whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE_SMOOTH } }}
            className="rounded-xl border border-white/10 bg-space-500 overflow-hidden"
          >
            {/* Image Container */}
            <div className="h-48 flex items-center justify-center bg-gradient-to-b from-space-200 to-space-500 overflow-hidden">
              <img
                src={f.image}
                alt={f.eyebrow}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7">
              <p className="text-[10px] uppercase tracking-wide text-sky-400 font-semibold mb-2">
                {f.eyebrow}
              </p>
              <h3 className="text-white font-semibold text-lg mb-2">
                {f.title}
              </h3>
              <AnimatedText
                className="text-slate-400 text-sm leading-relaxed"
                stagger={0.012}
              >
                {f.desc}
              </AnimatedText>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
