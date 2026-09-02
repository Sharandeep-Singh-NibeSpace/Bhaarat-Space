"use client";

import { motion } from "framer-motion";
import { AnimatedText, EASE_SMOOTH } from "./ui";

export default function WhoWeAre() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        >
          <p className="text-xs sm:text-[13px] tracking-[0.22em] uppercase text-sky-400 font-semibold mb-4">
            / Who We Are
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug tracking-tight">
            A self-reliant satellite manufacturer, built for India&apos;s
            defense and infrastructure needs.
          </h2>
        </motion.div>

        {/* Right Column - Text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_SMOOTH }}
        >
          <AnimatedText className="text-white text-base leading-relaxed" stagger={0.012}>
            {
              "With a core focus on strategic defense, environmental monitoring, and infrastructure management, Bharat Space supports India's mission for self-reliance through the Atma Nirbhar Bharat initiative and the Make in India movement."
            }
          </AnimatedText>
          <AnimatedText
            className="text-white text-base leading-relaxed"
            delay={0.1}
            stagger={0.012}
          >
            {
              "By designing, manufacturing, and deploying technology domestically, Bharat Space is strengthening India's position in the global space economy. Our satellite imagery service offers unparalleled clarity, helping clients make informed decisions about national security."
            }
          </AnimatedText>
        </motion.div>
      </div>

      {/* Bottom Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 mt-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_SMOOTH }}
          className="rounded-xl border border-white/10 bg-space-500 p-7"
        >
          <h3 className="text-white font-semibold text-lg sm:text-xl mb-3">Strategic Defense</h3>
          <p className="text-white text-base leading-relaxed">
            Precision Earth observation tailored to national security, border
            monitoring, and rapid-response defense operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE_SMOOTH }}
          className="rounded-xl border border-white/10 bg-space-500 p-7"
        >
          <h3 className="text-white font-semibold text-lg sm:text-xl mb-3">
            Infrastructure &amp; Environment
          </h3>
          <p className="text-white text-base leading-relaxed">
            High-revisit imagery supporting infrastructure planning,
            environmental monitoring, and disaster response across India.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
