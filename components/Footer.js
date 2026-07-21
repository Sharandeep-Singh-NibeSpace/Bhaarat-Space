"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "./ui";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Image Analytics", href: "/image-analytics" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIALS = [
  { label: "in", href: "#" },
  { label: "f", href: "#" },
  { label: "ig", href: "#" },
  { label: "x", href: "#" },
  { label: "yt", href: "#" },
];

export default function Footer() {
  return (
    <div className="relative">
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="border-t border-white/5 pt-10 pb-6 px-6"
        style={{ zIndex: 1, position: "relative" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
          >
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/Bharat Space2.svg" style={{ height: "70px" }} />
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.15 },
              },
            }}
          >
            {FOOTER_LINKS.map((l) => (
              <motion.div
                key={l.label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.3 },
              },
            }}
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[11px] text-slate-400 hover:text-white hover:border-sky-500 transition-colors"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_SMOOTH }}
          className="max-w-6xl mx-auto border-t border-white/5 mt-8 pt-6 text-center"
        >
          <p className="text-xs text-slate-600">
            © 2026 Bharat Space Private Limited
          </p>
        </motion.div>
      </motion.footer>
    </div>
  );
}
