"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Eyebrow } from "./ui";

const ROADMAP = [
  {
    year: "2026",
    rows: [
      { label: "EO Satellites", value: 2, max: 40 },
      { label: "Ground Stations", value: 0, max: 4 },
      { label: "Image Processing Centre", value: 1, max: 2 },
      { label: "Data Centres", value: 1, max: 2 },
      { label: "Experience Centre", value: 0, max: 1 },
    ],
  },
  {
    year: "2036",
    rows: [
      { label: "SAR / EO / IR / ELINT", value: 22, max: 40 },
      { label: "Ground Stations", value: 3, max: 4 },
      { label: "Data Centres", value: 2, max: 2 },
      { label: "Image Processing Centre", value: 1, max: 2 },
      { label: "Experience Centre", value: 1, max: 1 },
    ],
  },
];

const CATEGORIES = [
  { key: "eo", label: "EO Satellites", color: "#0ea5e9" },
  { key: "sar", label: "SAR Satellites", color: "#06b6d4" },
  { key: "ir", label: "IR Satellites", color: "#3b82f6" },
  { key: "elint", label: "ELINT", color: "#8b5cf6" },
  { key: "dc", label: "Data Centres", color: "#a855f7" },
  { key: "exp", label: "Experience Centre", color: "#d946ef" },
  { key: "ipc", label: "Image Processing Centre", color: "#f43f5e" },
  { key: "gs", label: "Ground Stations", color: "#f97316" },
];

const YEARLY_DATA = {
  2025: { eo: 2, sar: 0, ir: 0, elint: 0, dc: 0, exp: 0, ipc: 0, gs: 0 },
  2026: { eo: 2, sar: 0, ir: 0, elint: 0, dc: 1, exp: 0, ipc: 1, gs: 0 },
  2027: { eo: 3, sar: 1, ir: 0, elint: 0, dc: 1, exp: 0, ipc: 1, gs: 1 },
  2028: { eo: 4, sar: 1, ir: 0, elint: 0, dc: 1, exp: 1, ipc: 1, gs: 1 },
  2029: { eo: 5, sar: 2, ir: 1, elint: 0, dc: 1, exp: 1, ipc: 1, gs: 1 },
  2030: { eo: 6, sar: 3, ir: 1, elint: 1, dc: 1, exp: 1, ipc: 1, gs: 2 },
  2031: { eo: 8, sar: 4, ir: 1, elint: 1, dc: 2, exp: 1, ipc: 1, gs: 2 },
  2032: { eo: 10, sar: 5, ir: 2, elint: 1, dc: 2, exp: 1, ipc: 1, gs: 2 },
  2033: { eo: 12, sar: 6, ir: 2, elint: 2, dc: 2, exp: 1, ipc: 1, gs: 3 },
  2034: { eo: 14, sar: 7, ir: 3, elint: 2, dc: 2, exp: 1, ipc: 1, gs: 3 },
  2035: { eo: 16, sar: 8, ir: 3, elint: 3, dc: 2, exp: 1, ipc: 1, gs: 3 },
  2036: { eo: 10, sar: 6, ir: 3, elint: 3, dc: 2, exp: 1, ipc: 1, gs: 3 },
};

function RoadmapColumn({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="rounded-xl border border-white/10 p-7 backdrop-blur hover:border-sky-700/50 transition-colors"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-sky-400 mb-6"
      >
        {data.year}
      </motion.h3>

      <div className="space-y-5">
        {data.rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>{row.label}</span>
              <span className="text-white font-semibold">{row.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-sky-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{
                  width: `${Math.max((row.value / row.max) * 100, 4)}%`,
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.4 + i * 0.1,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AnimatedVisionChart() {
  const years = Object.keys(YEARLY_DATA)
    .map(Number)
    .sort((a, b) => a - b);

  const [yearIndex, setYearIndex] = useState(0);
  const currentYear = years[yearIndex];
  const currentData = YEARLY_DATA[currentYear];

  const maxValue = Math.max(...Object.values(currentData), 1) * 1.18;

  const sorted = CATEGORIES.map((c) => ({
    ...c,
    value: currentData[c.key] ?? 0,
  })).sort((a, b) => b.value - a.value);

  useEffect(() => {
    const id = setInterval(() => {
      setYearIndex((i) => (i + 1) % years.length);
    }, 2000);
    return () => clearInterval(id);
  }, [years.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="mt-16 rounded-xl border border-white/10 p-8 backdrop-blur relative overflow-hidden"
    >
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 text-xs text-slate-400">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            {c.label}
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-3.5 relative z-10">
        <AnimatePresence mode="popLayout">
          {sorted.map((item) => (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <span className="w-44 shrink-0 text-sm text-slate-300 truncate">
                {item.label}
              </span>

              <div className="relative flex-1 h-5">
                <div className="absolute inset-0 rounded-full bg-white/5" />
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full origin-left"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0, scaleY: 0.6 }}
                  animate={{
                    width: `${(item.value / maxValue) * 100}%`,
                    scaleY: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 0.8,
                  }}
                />
                <motion.span
                  key={`${item.key}-${item.value}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="absolute top-1/2 -translate-y-1/2 text-xs font-bold text-white ml-2"
                  style={{
                    left: `calc(${(item.value / maxValue) * 100}% + 6px)`,
                  }}
                >
                  {item.value}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Large year number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentYear}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.15, y: -10 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 18,
          }}
          className="absolute bottom-6 right-8 text-7xl sm:text-8xl font-bold text-white/10 select-none pointer-events-none"
        >
          {currentYear}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Roadmap() {
  return (
    <div className="relative">
      <section className="py-20 px-6 relative">
        <Eyebrow>Vision for the Next 10 Years</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-14"
        >
          From first launch to a sovereign constellation
        </motion.h2>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {ROADMAP.map((data, index) => (
            <RoadmapColumn key={data.year} data={data} index={index} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <AnimatedVisionChart />
        </div>
      </section>
    </div>
  );
}
