"use client";

import { motion } from "framer-motion";
import { EASE_SMOOTH } from "./ui";

const TEAM = [
  {
    initials: "RS",
    name: "Dnyaneshwar Nibe",
    role: "Chief Strategy Officer",
    image: "/images/Team/Dnyaneshwar_Nibe.avif",
  },
  {
    initials: "RS",
    name: "Rishi Siwach",
    role: "Chief Strategy Officer",
    image: "/images/Team/Rishi.png",
  },
  {
    initials: "SJ",
    name: "Siram Sai Mani Shanmukha Jayasheel",
    role: "Deputy Manager - Mission Design Engineer",
    image: "/images/Team/Jayasheel.jpeg",
  },
  {
    initials: "SS",
    name: "Sharandeep Singh",
    role: "Senior Officer - Software Developer",
    image: "/images/Team/Sharandeep.jpg",
  },
  {
    initials: "AP",
    name: "Akiv Noah Pingle",
    role: "Senior Officer - Data Scientist",
    image: "/images/Team/Akiv.png",
  },
];

export default function Team() {
  return (
    <section className="py-12 px-6 relative">
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
          className="text-slate-400 text-center max-w-2xl mx-auto mb-8 text-sm md:text-base"
        >
          Passionate experts committed to building India&apos;s future in space
          technology
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: EASE_SMOOTH,
              }}
              className="group border border-white/10 rounded-2xl overflow-hidden hover:border-sky-400/50 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-sm"
            >
              {/* Smaller image height */}
              <div className="h-52 md:h-56 overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-400/20 to-sky-900/40">
                    <span className="text-3xl font-bold text-sky-300">
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 text-center">
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
