"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Eyebrow, Pill, AnimatedText, EASE_SMOOTH } from "./ui";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  return (
    <div className="relative overflow-hidden">
      <section ref={sectionRef} className="py-20 px-6 relative">
        <Eyebrow>About Us</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-14"
        >
          Building a self-reliant India in space
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Earth Video */}
          <motion.div
            className="rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/earth.webm"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b " />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_SMOOTH }}
              className="text-xl sm:text-2xl font-bold text-white"
            >
              Pioneers in Earth Observation for national security and defense
            </motion.h3>

            <AnimatedText
              className="text-slate-400 text-sm leading-relaxed"
              delay={0.25}
              stagger={0.012}
            >
              {
                "Bharat Space Private Limited is engineering India's first all-weather, multi-sensor Earth Observation constellation — built to give strategic and civil agencies a clearer, faster picture of the ground that matters."
              }
            </AnimatedText>

            <AnimatedText
              className="text-slate-400 text-sm leading-relaxed"
              delay={0.1}
              stagger={0.012}
            >
              {
                "From optical and SAR imaging to electronic intelligence, every system is designed and integrated domestically, reducing dependency on foreign satellite data for time-critical national missions."
              }
            </AnimatedText>

            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 },
                },
              }}
            >
              {["Optical Imaging", "SAR", "ELINT", "Image Analytics"].map(
                (text, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.85 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.5, ease: EASE_SMOOTH },
                      },
                    }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <Pill>{text}</Pill>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
