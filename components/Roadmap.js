"use client";

import { motion } from "framer-motion";
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

function RoadmapColumn({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="rounded-xl border border-white/10 p-7 backdrop-blur hover:border-sky-700/50 transition-colors group"
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

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2  gap-6">
          {ROADMAP.map((data, index) => (
            <RoadmapColumn key={data.year} data={data} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
