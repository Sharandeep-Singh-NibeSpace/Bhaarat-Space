"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./ui";

const EASE_SMOOTH = [0.22, 1, 0.36, 1];
const LERP = 0.06;
const ZOOM_START = 0.1;
const ZOOM_END = 1.2;

const SENSORS = [
  {
    tag: "IR, PAN, Multi",
    title: "Electro Optical Satellite",
    image: "/images/SAR.png",
    heading: "Multispectral",
    className: "text-white",
    points: [
      "Combining advanced optical imaging with cutting-edge infrared sensors, these satellites offer unparalleled capabilities in missile detection, including hypersonic missiles.",
      "The optical component provides high-resolution imagery, while the infrared sensors detect heat signatures, enabling early warning of missile launches and tracking of their trajectories.",
      "This dual-sensor approach significantly enhances India's space-based Ballistic Missile Defense (BMD) capabilities, contributing to national security and strategic deterrence.",
    ],
    imageLeft: false,
  },
  {
    tag: "SAR",
    title: "Synthetic Aperture Radar (SAR) Satellites",
    image: "/images/SAR_2.svg",
    heading: "Synthetic Aperture Radar Satellites",
    points: [
      "Our SAR satellites, featuring a 100 km swath width, excel in all-weather, day-and-night Earth observation. The wide swath ensures extensive coverage, crucial for monitoring India's vast coastlines and maritime interests.",
      "Unlike optical sensors, SAR technology uses radar to create detailed images, penetrating cloud cover, darkness, and even light vegetation.",
      "This makes them ideal for continuous maritime surveillance, disaster monitoring, and change detection in any weather condition.",
    ],
    imageLeft: true,
  },
  {
    tag: "ELINT",
    title: "ELINT — Electronic Intelligence Satellites",
    image: "/images/RF.png",
    heading: "Electronic Intelligence (ELINT) Satellites",
    points: [
      "Modeled after the Kautilya project, our ELINT satellites are designed for sophisticated signals intelligence gathering. This capability significantly enhances India's strategic intelligence gathering and situational awareness.",
      "These satellites intercept and analyze electronic signals from various sources, providing crucial intelligence when combined with visual Earth observation data.",
      "By detecting and characterizing radar and communication signals, ELINT satellites play a vital role in electronic warfare, threat assessment, and maintaining technological superiority in the space domain.",
    ],
    imageLeft: false,
  },
];

function SensorVisual({ kind, image, zoomRef }) {
  const isVideo = image?.endsWith(".mp4") || image?.endsWith(".webm");

  return (
    <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
      <div
        ref={zoomRef}
        className="absolute inset-0 origin-center will-change-transform"
      >
        {isVideo ? (
          <video
            src={image}
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={image}
            alt={`${kind} satellite`}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </div>

      <span className="absolute top-4 left-4 z-10 rounded border border-sky-700/50 bg-sky-900/60 px-2.5 py-1 text-xs uppercase tracking-wide text-sky-300">
        {kind}
      </span>
    </div>
  );
}

function SensorRow({ sensor, index }) {
  const sectionRef = useRef(null);
  const zoomRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const pointsRef = useRef([]);
  const scrollRef = useRef(0);
  const zoomT = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionMq.matches);
    const onMotion = (e) => setReduceMotion(e.matches);
    motionMq.addEventListener("change", onMotion);

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (el.offsetHeight > vh * 1.15) {
        const max = Math.max(1, el.offsetHeight - vh);
        scrollRef.current = Math.min(1, Math.max(0, -rect.top / max));
      } else {
        const start = vh * 0.8;
        const end = vh * 0.15;
        const p = (start - rect.top) / (start - end + el.offsetHeight * 0.4);
        scrollRef.current = Math.min(1, Math.max(0, p));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const clamp = (v) => Math.min(1, Math.max(0, v));

    let raf = 0;
    const tick = () => {
      const target = motionMq.matches ? 1 : scrollRef.current;
      zoomT.current += (target - zoomT.current) * LERP;
      const t = zoomT.current;
      const scale = ZOOM_START + (ZOOM_END - ZOOM_START) * t;
      if (zoomRef.current) {
        zoomRef.current.style.transform = `scale(${scale})`;
      }
      if (textRef.current) {
        const textOpacity = clamp((t - 0.12) / 0.38);
        textRef.current.style.opacity = String(textOpacity);
        textRef.current.style.transform = `translate3d(0, ${(1 - textOpacity) * 28}px, 0)`;
        textRef.current.style.pointerEvents = textOpacity < 0.2 ? "none" : "auto";
      }
      if (headingRef.current) {
        headingRef.current.style.opacity = String(clamp((t - 0.08) / 0.32));
      }
      pointsRef.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.28 + i * 0.12;
        el.style.opacity = String(clamp((t - start) / 0.22));
        el.style.transform = `translate3d(${(1 - clamp((t - start) / 0.22)) * -16}px, 0, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      motionMq.removeEventListener("change", onMotion);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const text = (
    <div ref={textRef} className="opacity-0 will-change-transform">
      <div ref={headingRef}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-400">
          {sensor.heading || sensor.tag}
        </p>
        <h3 className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {sensor.title}
        </h3>
      </div>
      <ul className="space-y-3.5">
        {sensor.points.map((p, i) => (
          <li
            key={i}
            ref={(el) => {
              pointsRef.current[i] = el;
            }}
            className="flex gap-3 text-base leading-relaxed text-white opacity-0"
          >
            <span className="mt-0.5 text-sky-400">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const visual = (
    <SensorVisual kind={sensor.tag} image={sensor.image} zoomRef={zoomRef} />
  );

  return (
    <div
      ref={sectionRef}
      className={reduceMotion ? "relative" : "relative md:h-[170vh]"}
    >
      <div
        className={
          reduceMotion
            ? "max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-10"
            : "max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-10 md:sticky md:top-24"
        }
      >
        {sensor.imageLeft ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>
    </div>
  );
}

export default function Sensors() {
  return (
    <div className="relative">
      <section
        id="sensors"
        className="relative scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20"
      >
        <Eyebrow>Our Multi-Mission Satellite Constellation</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.2, ease: EASE_SMOOTH }}
          className="mx-auto mb-6 max-w-3xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Diverse satellite types for varied missions
        </motion.h2>

        <div className="divide-y divide-white/5">
          {SENSORS.map((sensor, index) => (
            <SensorRow key={sensor.tag} sensor={sensor} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
