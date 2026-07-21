"use client";

import { motion } from "framer-motion";
import { Eyebrow, AnimatedText, EASE_SMOOTH } from "./ui";
import { useState, useEffect } from "react";

const PARTNERS = [
  { name: "Dhruva Space", logo: "/images/partners/DS.avif" },
  { name: "Centum Electronics", logo: "/images/partners/Centum.avif" },
  { name: "Azista Aerospace", logo: "/images/partners/Azista.svg" },
  { name: "Pixxel", logo: "/images/partners/Pixxel.avif" },
];

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PARTNERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6">
      <Eyebrow>Partners</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-14"
      >
        Strategic Partners
      </motion.h2>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="relative rounded-3xl border border-white/10 backdrop-blur-sm px-8 py-16 overflow-hidden"
        >
          {/* Slideshow */}

          <div className="relative h-14 flex items-center justify-center overflow-hidden">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x:
                    index === currentIndex
                      ? 0
                      : index < currentIndex
                        ? -40
                        : 40,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute w-full flex justify-center items-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
