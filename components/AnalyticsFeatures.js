"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Eyebrow, AnimatedText, EASE_SMOOTH } from "./ui";

// Add your image paths here (public/images/ or any folder)
const FEATURE_IMAGES = {
  "Temporal Image Comparison": "/images/Temporal_Image.avif",
  "Heatmap Visualization": "/images/Heatmap.avif",
  "Land Cover Classification": "/images/Land_Cover_Classification.avif",
  "Analytics Dashboard Mockup": "/images/Analytics_Dashboard_Mockup.avif",
  "Object Detection": "/images/Object_Detection.avif",
  "Change Detection": "/images/Change_Detection.avif",
};

const FEATURES = [
  {
    tag: "Change Detection",
    title: "Quantify what moved on the ground",
    description:
      "A comparative analysis of satellite images captured at different time intervals, highlighting critical changes such as new constructions, infrastructure damage, land shifts, or deforestation.",
    purpose:
      "Demonstrates the platform's ability to automatically detect and quantify temporal changes — from urban expansion tracking and disaster response to military surveillance and strategic defense monitoring.",
    points: [
      "Clearly highlighted change zones — red for new objects, blue for removed areas",
      "Timestamp overlays and change heatmap visualization",
    ],
    note: "Defense use: spot unauthorized construction, airbase expansion, or terrain alterations in border-sensitive zones.",
    imageLeft: false,
  },
  {
    tag: "Temporal Image Comparison",
    title: "See exactly what changed, and when",
    description:
      "A side-by-side comparison of two satellite images of the same area captured at different times, visually highlighting changes such as urban expansion or environmental shifts like deforestation.",
    purpose:
      "Demonstrates the platform's ability to analyze and display temporal changes in geospatial data — critical for tracking development or natural phenomena over time.",
    points: [
      'Two images labeled "Before" and "After," with differences like new buildings or altered landscapes clearly visible',
    ],
    imageLeft: true,
  },
  // ... rest of your features remain the same
  {
    tag: "Heatmap Visualization",
    title: "Spot patterns and hotspots instantly",
    description:
      "A heatmap overlaid on a geographic map, using color gradients to represent data intensity — population density, pollution levels, or vegetation cover.",
    purpose:
      "Showcases the platform's capability to visualize complex geospatial data patterns intuitively, helping users identify trends or hotspots.",
    points: [
      "Vibrant color scale — red for high intensity, blue for low — applied to a recognizable region for context",
    ],
    imageLeft: false,
  },
  {
    tag: "Land Cover Classification",
    title: "Every pixel, classified and labeled",
    description:
      "A processed satellite image where distinct land cover types — water, forest, and urban areas — are color-coded for easy differentiation.",
    purpose:
      "Illustrates the platform's ability to classify and analyze imagery data, enabling detailed insights into land use or environmental conditions.",
    points: [
      "A satellite view with color blocks — blue for water, green for forest, gray for urban — paired with a simple legend for clarity",
    ],
    imageLeft: true,
  },
  {
    tag: "Analytics Dashboard Mockup",
    title: "Imagery metrics, structured for action",
    description:
      "A mockup of an analytics dashboard displaying metrics tied to imagery data, such as cloud cover percentages, image resolution stats, or sensor performance.",
    purpose:
      "Highlights the platform's analytical tools and how it presents actionable insights to users in a structured format.",
    points: [
      "A clean layout featuring graphs, pie charts, and data tables designed to reflect real-world analytics outputs",
    ],
    imageLeft: false,
  },
  {
    tag: "Object Detection",
    title: "Find what matters, automatically",
    description:
      "Processed satellite imagery overlaid with bounding boxes that pinpoint objects of interest such as aircraft, vehicles, ships, or infrastructure.",
    purpose:
      "Showcases the system's capability to automatically detect and classify strategic objects in satellite images — ideal for defense monitoring, logistics tracking, or critical infrastructure protection.",
    points: [
      "High-resolution satellite view with color-coded bounding boxes, labels and confidence scores",
      "A compact legend (e.g. red = Aircraft, yellow = Truck)",
    ],
    imageLeft: true,
  },
];

function FeatureRow({ feature, index }) {
  const { tag, title, description, purpose, points, note, imageLeft } = feature;
  const staticImageSrc = FEATURE_IMAGES[tag];

  const text = (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE_SMOOTH }}
        className="text-[10px] uppercase tracking-wide text-sky-400 font-semibold mb-3"
      >
        {tag}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE_SMOOTH }}
        className="text-xl sm:text-2xl font-bold text-white mb-5"
      >
        {title}
      </motion.h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        <span className="text-slate-200 font-semibold">Description: </span>
        <AnimatedText as="span" delay={0.1} stagger={0.01}>
          {description}
        </AnimatedText>
      </p>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">
        <span className="text-slate-200 font-semibold">Purpose: </span>
        <AnimatedText as="span" delay={0.05} stagger={0.01}>
          {purpose}
        </AnimatedText>
      </p>

      <ul className="space-y-2.5">
        {points.map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_SMOOTH }}
            className="flex gap-3 text-slate-400 text-sm leading-relaxed"
          >
            <span className="text-sky-400 mt-0.5">✓</span>
            <span>{p}</span>
          </motion.li>
        ))}
      </ul>

      {note && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
          className="mt-6 border-l-2 border-sky-500 bg-sky-900/20 rounded-r-md px-4 py-3 text-sm text-slate-300"
        >
          <span className="text-white font-semibold">Defense use: </span>
          {note.replace(/^Defense use:\s*/i, "")}
        </motion.div>
      )}
    </div>
  );

  const imageSection = staticImageSrc ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_SMOOTH }}
      whileHover={{ scale: 1.015 }}
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    >
      <Image
        src={staticImageSrc}
        alt={title}
        width={800}
        height={500}
        className="w-full h-auto object-cover"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </motion.div>
  ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE_SMOOTH }}
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-12"
    >
      {imageLeft ? (
        <>
          {imageSection}
          {text}
        </>
      ) : (
        <>
          {text}
          {imageSection}
        </>
      )}
    </motion.div>
  );
}

export default function AnalyticsFeatures() {
  return (
    <section className="py-20 px-6">
      <Eyebrow>Coming Soon</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-4"
      >
        Analytics features in development
      </motion.h2>

      <div className="max-w-xl mx-auto mb-12">
        <AnimatedText
          className="text-slate-400 text-sm text-center"
          delay={0.15}
          stagger={0.015}
        >
          {
            "A preview of the detection, classification, and visualization capabilities being built into the Bharat Space imagery platform."
          }
        </AnimatedText>
      </div>

      <div className="divide-y divide-white/5">
        {FEATURES.map((feature, index) => (
          <FeatureRow key={feature.tag} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
