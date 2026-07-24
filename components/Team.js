"use client";

import { motion } from "framer-motion";
import { EASE_SMOOTH } from "./ui";

const TEAM = [
  {
    initials: "DN",
    name: "Dnyaneshwar Nibe",
    role: "Chief Strategy Officer",
    image: "/images/Team/Dnyaneshwar_Nibe.avif",
  },
  {
    initials: "RS",
    name: "Rishi Siwach",
    role: "Chief Strategy Officer",
    image: "/images/Team/Rishi.avif",
  },
];

export default function Team() {
  return (
    <section className="py-14 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-2"
        >
          Meet the Team
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_SMOOTH }}
          className="text-slate-400 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base"
        >
          Passionate experts committed to building India&apos;s future in space
          technology
        </motion.p>

        {/* Centered equal cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          style={{ width: "fit-content" }}
        >
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: EASE_SMOOTH,
              }}
              className="group border border-white/10 rounded-2xl overflow-hidden hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-sm flex flex-col"
            >
              {/* Image height fits content */}
              <div className="overflow-hidden" style={{ width: "fit-content" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Name + Role */}
              <div className="p-4 text-center bg-black/50 mt-auto">
                <h3 className="text-white text-lg font-semibold mb-0.5">
                  {member.name}
                </h3>
                <p className="text-sky-400 text-xs font-medium">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
