"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "./ui";

const SENSORS = [
  {
    tag: "IR, PAN, Multi",
    title: "Electro Optical Satellite",
    image: "/images/SAR.png",
    heading: "Multispectral",
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

function SensorVisual({ kind, image }) {
  const isVideo = image?.endsWith(".mp4") || image?.endsWith(".webm");

  return (
    <motion.div
      className="rounded-2xl border-sky-900/40 overflow-hidden aspect-[4/3] relative"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {isVideo ? (
        <video
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={image}
          alt={`${kind} satellite`}
          className="absolute inset-0 w-full h-auto object-cover "
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b " />

      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wide text-sky-300 border border-sky-700/50 bg-sky-900/60 rounded px-2 py-1 z-10">
        {kind}
      </span>
    </motion.div>
  );
}

function SensorRow({ sensor, index }) {
  const text = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <p className="text-[10px] uppercase tracking-wide text-sky-400 font-semibold mb-3">
        {sensor.heading || sensor.tag}
      </p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">
        {sensor.title}
      </h3>
      <ul className="space-y-3">
        {sensor.points.map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex gap-3 text-slate-400 text-sm leading-relaxed"
          >
            <span className="text-sky-400 mt-0.5">✓</span>
            <span>{p}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  const visual = <SensorVisual kind={sensor.tag} image={sensor.image} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15 }}
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-10"
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
    </motion.div>
  );
}

export default function Sensors() {
  return (
    <div className="relative">
      <section id="sensors" className="py-20 px-6 scroll-mt-20 relative">
        <Eyebrow>Our Multi-Mission Satellite Constellation</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center max-w-2xl mx-auto mb-6"
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
