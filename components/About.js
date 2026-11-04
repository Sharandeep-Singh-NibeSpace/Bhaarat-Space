"use client";

// import { Eyebrow, Pill, SatelliteGlyph } from "./ui";
import BgVideo from "./BgVideo";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Eyebrow, Pill, AnimatedText, EASE_SMOOTH } from "./ui";
import { publicPath } from "@/lib/publicPath";

const LERP = 0.08;

export default function About() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const earthWrapRef = useRef(null);
  const satRef = useRef(null);
  const progress = useRef(0);
  const smoothed = useRef(0);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onScroll = () => {
      const el = earthWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const start = vh * 0.78;
      const end = vh * 0.22;
      const raw = (start - center) / Math.max(1, start - end);
      progress.current = Math.min(1, Math.max(0, raw));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let raf = 0;
    const tick = () => {
      const target = motionMq.matches ? 0.12 : progress.current;
      smoothed.current += (target - smoothed.current) * LERP;
      const t = smoothed.current;
      const angle = t * Math.PI * 2;
      const rx = 38;
      const ry = 16;
      const tilt = -0.38;
      const x0 = rx * Math.cos(angle);
      const y0 = ry * Math.sin(angle);
      const x = 50 + x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
      const y = 50 + x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
      const depth = Math.sin(angle);
      const dist = Math.hypot(x - 50, y - 50);
      const earthR = 33;
      let opacity = 1;
      if (depth < 0 && dist < earthR) {
        opacity = Math.max(0, 1 - (earthR - dist) / 7);
      }
      const scale = 0.62 + 0.38 * (depth * 0.5 + 0.5);

      if (satRef.current) {
        satRef.current.style.left = `${x}%`;
        satRef.current.style.top = `${y}%`;
        satRef.current.style.opacity = String(opacity);
        satRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <section
        ref={sectionRef}
        className="py-12 sm:py-20 px-4 sm:px-6 relative"
      >
        <Eyebrow>About Us</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-14 tracking-tight"
        >
          Building a self-reliant India in space
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Earth Video */}
          <motion.div
            ref={earthWrapRef}
            className="relative flex aspect-square items-center justify-center"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={publicPath("/videos/earth.webm")}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-b " />
            </div>
            <img
              ref={satRef}
              src={publicPath("/images/SAR_2.svg")}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute z-20 h-auto w-[32%] max-w-[200px] origin-center will-change-transform"
              style={{
                left: "91%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(0.7)",
                mixBlendMode: "lighten",
              }}
            />
          </motion.div>

          {/* Text Content */}
          <div className="relative z-10 space-y-8 text-white">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_SMOOTH }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            >
              Pioneers in Earth Observation for national security and defense
            </motion.h3>

            <AnimatedText
              className="text-white leading-relaxed"
              delay={0.25}
              stagger={0.012}
            >
              {
                "Bharat Space Private Limited is engineering India's first all-weather, multi-sensor Earth Observation constellation — built to give strategic and civil agencies a clearer, faster picture of the ground that matters."
              }
            </AnimatedText>

            <AnimatedText
              className="text-white text-base leading-relaxed"
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
