"use client";

import { motion } from "framer-motion";
import { Eyebrow, AnimatedText, EASE_SMOOTH } from "./ui";
import { publicPath } from "@/lib/publicPath";

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
    image: "/images/Manjusha.avif", // ← update this path if different
    bio: "A Director of Bharat Space Pvt. Ltd. with extensive experience in corporate governance, business strategy, and operational leadership, Mrs. Nibe has played a key role in growing the group across manufacturing, infrastructure, and the space and defence sectors. A seasoned promoter and business leader, she previously served as Executive Director of Nibe Limited, contributing significantly to its expansion into defence component manufacturing, and continues to champion the group's commitment to innovation and India's Atmanirbhar Bharat initiatives.",
  },
];

export default function Leadership() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <Eyebrow>Leadership</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-14 tracking-tight"
      >
        Our Leadership
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-8">
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
            className="rounded-3xl sm:rounded-[80px] border border-white/10 backdrop-blur p-5 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-10"
          >
            {/* Leadership photos — larger than Meet the Team images */}
            <div className="shrink-0 flex justify-center">
              {m.image && !m.image.includes("/images/.avif") ? (
                <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-2 ring-sky-400/70 ring-offset-2 sm:ring-offset-4 ring-offset-[#0a0f1c] shadow-xl">
                  <img
                    src={publicPath(m.image)}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl ring-2 ring-sky-400/50 ring-offset-2 sm:ring-offset-4 ring-offset-[#0a0f1c]">
                  {m.initials}
                </div>
              )}
            </div>

            {/* Text content */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="text-xs sm:text-[13px] uppercase tracking-widest text-sky-400 font-semibold mb-2">
                {m.role}
              </p>
              <h3 className="text-white font-semibold text-2xl sm:text-3xl mb-4 tracking-tight">
                {m.name}
              </h3>
              <AnimatedText
                className="text-white text-base sm:text-lg leading-relaxed"
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
