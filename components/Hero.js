"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "2026", label: "Launch Year" },
  { value: "100%", label: "Domestic Investment" },
  { value: "35cm", label: "Image Resolution" },
  { value: ">90min", label: "Revisit Time, Primary AOI" },
];

const ZOOM_START = 1;
const ZOOM_END = 1.18;
const LERP = 0.06;

export default function Hero() {
  const sectionRef = useRef(null);
  const earthRef = useRef(null);
  const overlayRef = useRef(null);
  const statsRef = useRef(null);
  const logoRef = useRef(null);
  const scrollRef = useRef(0);
  const zoomT = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [earthSrc, setEarthSrc] = useState(
    process.env.NEXT_PUBLIC_HERO_VIDEO || "/videos/earth_bg.mp4",
  );
  const [earthPoster, setEarthPoster] = useState(
    process.env.NEXT_PUBLIC_HERO_POSTER || "/videos/posters/earth_bg.jpg",
  );
  const [revisitMin, setRevisitMin] = useState(180);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionMq.matches);
    const onMotion = (e) => setReduceMotion(e.matches);
    motionMq.addEventListener("change", onMotion);

    if (window.matchMedia("(max-width: 767px)").matches) {
      setEarthSrc("/videos/earth_bg.mp4");
      setEarthPoster("/videos/posters/earth_bg.jpg");
    }

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const max = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = -el.getBoundingClientRect().top;
      scrollRef.current = Math.min(1, Math.max(0, scrolled / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const mobileMq = window.matchMedia("(max-width: 639px)");

    let raf = 0;
    const tick = () => {
      const target = motionMq.matches ? 0 : scrollRef.current;
      zoomT.current += (target - zoomT.current) * LERP;
      const t = zoomT.current;
      const start = ZOOM_START;
      const end = mobileMq.matches ? 1.14 : ZOOM_END;
      const scale = start + (end - start) * t;

      if (earthRef.current) {
        const pct = (scale * 100).toFixed(3);
        const x = (((1 - scale) / 2) * 100).toFixed(3);
        const y = ((1 - scale) * 0.48 * 100).toFixed(3);
        earthRef.current.style.transform = "none";
        earthRef.current.style.width = `${pct}%`;
        earthRef.current.style.height = `${pct}%`;
        earthRef.current.style.left = `${x}%`;
        earthRef.current.style.top = `${y}%`;
      }
      const overlayOpacity = Math.max(0, 1 - t * 1.45);
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(overlayOpacity);
        overlayRef.current.style.pointerEvents =
          overlayOpacity < 0.2 ? "none" : "auto";
      }
      if (statsRef.current) {
        statsRef.current.style.opacity = String(overlayOpacity);
        statsRef.current.style.pointerEvents =
          overlayOpacity < 0.2 ? "none" : "auto";
      }
      // Official logo only after the hero copy has faded off.
      const logoT = Math.max(0, Math.min(1, (t - 0.62) / 0.38));
      const logoOpacity = Math.max(0, Math.min(1, logoT / 0.12));
      const logoScale = 0.2 + 0.8 * logoT;
      if (logoRef.current) {
        logoRef.current.style.opacity = String(logoOpacity);
        const img = logoRef.current.querySelector("img");
        if (img) {
          img.style.transform = `scale(${logoScale})`;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      motionMq.removeEventListener("change", onMotion);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevisitMin(90);
      return;
    }

    const from = 180;
    const to = 90;
    const duration = 4200;
    const delay = 900;
    let raf = 0;
    let startAt = 0;

    const tick = (now) => {
      if (!startAt) startAt = now;
      const p = Math.min(1, (now - startAt) / duration);
      const eased = p * p * (3 - 2 * p);
      setRevisitMin(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={reduceMotion ? "relative" : "relative h-[600vh]"}
    >
      <div
        className={
          reduceMotion
            ? "relative overflow-hidden bg-black"
            : "sticky top-0 h-screen overflow-hidden bg-black"
        }
      >
        <div className="absolute inset-0">
          <div
            ref={earthRef}
            className="absolute inset-0 will-change-[width,height,left,top]"
          >
            <video
              key={earthSrc}
              className="absolute inset-0 h-full w-full object-cover"
              src={earthSrc}
              poster={earthPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                filter: "contrast(1.12) saturate(1.1) brightness(1.04)",
                backfaceVisibility: "hidden",
              }}
            />
          </div>
        </div>

        <div
          ref={logoRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 pt-16 sm:px-8 sm:pt-20"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <img
            src="/images/Bharat Space2.svg"
            alt=""
            className="h-auto w-[min(86vw,920px)] origin-center will-change-transform"
            style={{ transform: "scale(0.2)" }}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-6 sm:gap-8">
          <div
            ref={overlayRef}
            className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-20 sm:px-6 sm:pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex w-fit max-w-full self-start gap-2 rounded-full border border-sky-700/50 bg-sky-900/30 px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-sky-300 sm:mb-8 sm:px-4 sm:text-[13px] sm:tracking-[0.18em]"
            >
              <span className="text-sky-400">★</span>
              India&apos;s first multi-mission EO &amp; SAR constellation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-left text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Sub-90
              <br />
              minute revisit,{" "}
              <span className="text-sky-400">
                <br className="hidden sm:block" />
                across primary AOI.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, delay: 1 }}
              className="mt-6 max-w-xl text-left text-base leading-relaxed text-white sm:text-lg"
            >
              High-resolution Earth Observation and SAR satellites,
              purpose-built for strategic defense and national resilience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-5"
            >
              <a
                href="#solution"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-sky-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-400 sm:min-h-[52px] sm:px-7 sm:text-base"
              >
                Explore the Constellation
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-slate-600/70 bg-slate-950/40 px-6 py-3 text-center text-sm font-semibold text-slate-200 backdrop-blur-md transition-colors hover:border-slate-400 hover:bg-slate-950/55 sm:min-h-[52px] sm:px-7 sm:text-base"
              >
                Talk to Us
              </Link>
            </motion.div>
          </div>

          <div
            ref={statsRef}
            className="relative z-10 mx-auto mt-8 w-full max-w-6xl px-4 pb-28 sm:mt-10 sm:px-6 sm:pb-28"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, delay: 1 }}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="grid grid-cols-2 bg-white/5 backdrop-blur-xl sm:grid-cols-4">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`px-3 py-5 text-center sm:px-6 sm:py-7 ${
                      i !== 0
                        ? "border-t border-white/10 sm:border-t-0 sm:border-l"
                        : ""
                    }`}
                  >
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                      {s.label === "Revisit Time, Primary AOI"
                        ? `>${revisitMin}min`
                        : s.value}
                    </div>
                    <div className="mt-1.5 text-xs uppercase leading-snug tracking-wide text-slate-500 sm:text-[13px]">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
