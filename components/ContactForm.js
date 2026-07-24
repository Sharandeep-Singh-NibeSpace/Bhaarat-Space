"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClasses =
    "w-full backdrop-blur bg-space-500 border border-white/10 focus:border-sky-500 outline-none rounded-md px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors";

  return (
    <div className="relative">
      <section className="py-20 px-6 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-sky-400 font-semibold mb-3">
              About Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-5">
              Connect for excellence: your gateway to exceptional solutions.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Reach out with questions, feedback, or collaboration inquiries.
              Our team responds within 1–2 business days.
            </p>

            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
              Head Office
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              6th-8th Floor, The Melange, Fugewadi, Seva Nagar,
              <br />
              Dapodi, Pimpri-Chinchwad, Pune, Maharashtra 411012
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="rounded-2xl border border-white/10 backdrop-blur p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4" style={{ ZIndex: -1 }}>
              <motion.input
                required
                placeholder="Full name"
                value={form.name}
                onChange={update("name")}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.input
                placeholder="Phone number"
                value={form.phone}
                onChange={update("phone")}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={update("email")}
              className={inputClasses}
              whileFocus={{ scale: 1.02 }}
            />

            <motion.textarea
              placeholder="Describe your requirement"
              rows={4}
              value={form.message}
              onChange={update("message")}
              className={inputClasses}
              whileFocus={{ scale: 1.02 }}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 transition-colors text-white text-sm font-semibold px-6 py-3 rounded-md"
            >
              Submit <span>→</span>
            </motion.button>

            {sent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sky-400 text-xs pt-1"
              >
                Thanks — we&apos;ve received your message and will be in touch
                soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
