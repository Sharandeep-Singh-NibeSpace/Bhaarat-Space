"use client";

import { motion } from "framer-motion";
import { Eyebrow, AnimatedText, EASE_SMOOTH } from "./ui";

const TEAM = [
  {
    initials: "GN",
    role: "Founder & Managing Director",
    name: "Mr. Ganesh Ramesh Nibe",
    image: "/images/GaneshSir.avif",
    bio: "Chairman and Managing Director of the Nibe Group, Mr. Nibe began as a small entrepreneur in the sugar cane juice and furnace oil distribution businesses. After completing his engineering education, he entered the electrical substation sector, founding his own contracting business in 2013. In 2021 he moved into critical heavy defence component fabrication, establishing Nibe Limited with four plants across Pune and Bengaluru — a track record of vision and strategic acquisitions that continues to drive the growth of the Nibe Family.",
  },
  {
    initials: "MN",
    role: "Director",
    name: "Mrs. Manjusha Ganesh Nibe",
    image: "/images/.avif",
    bio: "A Director of Bharat Space Pvt. Ltd. with extensive experience in corporate governance, business strategy, and operational leadership, Mrs. Nibe has played a key role in growing the group across manufacturing, infrastructure, and the space and defence sectors. A seasoned promoter and business leader, she previously served as Executive Director of Nibe Limited, contributing significantly to its expansion into defence component manufacturing, and continues to champion the group's commitment to innovation and India's Atmanirbhar Bharat initiatives.",
  },
];

export default function Leadership() {
  return (
    <section className="py-20 px-6">
      <Eyebrow>Leadership</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-14"
      >
        Our Leadership
      </motion.h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {TEAM.map((m, index) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: index * 0.15,
              ease: EASE_SMOOTH,
            }}
            className="rounded-xl border border-white/10 backdrop-blur p-7 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-7"
            style={{ borderRadius: "80px" }}
          >
            {/* Avatar / Photo */}
            <div className="shrink-0 flex justify-center sm:justify-start">
              {m.image && m.image !== "/images/.avif" ? (
                <div className="relative w-24 h-24 sm:w-44 sm:h-48 rounded-full overflow-hidden ring-2 ring-sky-400/60 ring-offset-2 ring-offset-space-500 shadow-lg">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center text-white font-bold text-xl sm:text-2xl ring-2 ring-sky-400/40 ring-offset-2 ring-offset-space-500">
                  {m.initials}
                </div>
              )}
            </div>

            {/* Text content */}
            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-wide text-sky-400 font-semibold mb-2">
                {m.role}
              </p>
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-3">
                {m.name}
              </h3>
              <AnimatedText
                className="text-slate-400 text-sm leading-relaxed"
                stagger={0.006}
                once
              >
                {m.bio}
              </AnimatedText>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
