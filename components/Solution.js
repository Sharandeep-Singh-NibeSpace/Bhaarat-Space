"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "./ui";
import { SatelliteGlyph } from "./ui"; // if needed

const SOLUTION_CARDS = [
  {
    eyebrow: "Resolution",
    title: "SUB-METER RESOLUTION",
    desc: "Capture ultra-clear images with resolutions less than 0.5 meters, ensuring detailed analysis for strategic operations.",
    image: "/images/Pune.png",
    icon: "satellite",
  },
  {
    eyebrow: "All-Weather",
    title: "ALL-WEATHER SURVEILLANCE",
    desc: "Ensure uninterrupted visibility with a combination of optical, radar, and infrared sensors, offering reliable data in all weather conditions.",
    image: "/images/2.avif",
    icon: "dot",
  },
  {
    eyebrow: "Constellation",
    title: "18-22 SATELLITE CONSTELLATION",
    desc: "Leverage a robust satellite network designed for high revisit rates and extensive coverage across strategic areas of interest.",
    image: "/images/3.avif",
    icon: "radar",
  },
  {
    eyebrow: "Analytics",
    title: "AI-Driven Image Analytics",
    desc: "Empowering users with advanced geospatial imagery analysis to uncover insights through interactive visualization and precise data filtering.",
    image: "/images/4.avif",
    icon: "grid",
  },
];

function SolutionIcon({ icon }) {
  if (icon === "satellite")
    return <SatelliteGlyph className="w-9 h-9 text-sky-300" />;
  if (icon === "dot")
    return (
      <div className="w-9 h-9 rounded-full border border-sky-400/60 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-sky-400" />
      </div>
    );
  if (icon === "radar")
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 text-sky-300" fill="none">
        <path
          d="M6 26C6 26 10 14 18 14C26 14 30 26 30 26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9 text-sky-300" fill="none">
      <rect
        x="6"
        y="6"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="20"
        y="6"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="6"
        y="20"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="20"
        y="20"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Solution() {
  return (
    <div className="relative">
      <section className="py-20 px-6 relative">
        <Eyebrow>Our Solution</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center max-w-2xl mx-auto mb-14"
        >
          India&apos;s first multi-sensor, all-weather, high-revisit Earth
          Observation constellation
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOLUTION_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1, // Stagger effect
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="rounded-xl border border-white/10 bg-space-500 hover:border-sky-700/50 transition-colors overflow-hidden group"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: "220px" }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <SolutionIcon icon={card.icon} />
                  <p className="text-[10px] uppercase tracking-widest text-sky-400 font-semibold">
                    {card.eyebrow}
                  </p>
                </div>

                <h3 className="text-white font-semibold text-lg mb-3 leading-tight">
                  {card.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
