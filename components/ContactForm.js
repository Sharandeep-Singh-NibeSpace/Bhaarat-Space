"use client";

import { motion } from "framer-motion";
import { useContactForm } from "@/lib/useContactForm";

export default function ContactForm() {
  const { form, update, handleSubmit, status, error } = useContactForm();
  const sending = status === "sending";

  const inputClasses =
    "w-full backdrop-blur bg-space-500 border border-white/10 focus:border-sky-500 outline-none rounded-md px-4 py-3.5 text-base text-white placeholder:text-slate-500 transition-colors";

  return (
    <div className="relative">
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs sm:text-[13px] tracking-[0.22em] uppercase text-sky-400 font-semibold mb-4">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-5 tracking-tight">
              Connect for excellence: your gateway to exceptional solutions.
            </h2>
            <p className="text-white text-base leading-relaxed mb-8">
              Reach out with questions, feedback, or collaboration inquiries.
              Our team responds within 1–2 business days.
            </p>

            <p className="text-xs uppercase text-white tracking-wide font-semibold mb-2">
              Head Office
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              6th-8th Floor, The Melange, Fugewadi, Seva Nagar, Dapodi,
              Pimpri-Chinchwad, Pune, Maharashtra 411012
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative rounded-2xl border border-white/10 backdrop-blur p-5 sm:p-7 space-y-4 min-w-0"
          >
            <div className="absolute overflow-hidden w-px h-px -m-px" aria-hidden="true">
              <input
                tabIndex={-1}
                autoComplete="off"
                name="company"
                value={form.company ?? ""}
                onChange={update("company")}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.input
                required
                name="name"
                autoComplete="name"
                placeholder="Full name"
                value={form.name}
                onChange={update("name")}
                disabled={sending}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={update("phone")}
                disabled={sending}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={update("email")}
                disabled={sending}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                name="website"
                type="text"
                autoComplete="url"
                placeholder="Website"
                value={form.website}
                onChange={update("website")}
                disabled={sending}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.textarea
              required
              name="message"
              minLength={10}
              maxLength={4000}
              placeholder="Describe your requirement"
              rows={4}
              value={form.message}
              onChange={update("message")}
              disabled={sending}
              className={`${inputClasses} break-words`}
              whileFocus={{ scale: 1.02 }}
            />

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { scale: 1.03 }}
              whileTap={sending ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:hover:bg-sky-500 transition-colors text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-md"
            >
              {sending ? "Sending…" : "Submit"} <span>→</span>
            </motion.button>

            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sky-400 text-sm pt-1"
              >
                Thanks — we&apos;ve received your message and will be in touch
                soon.
              </motion.p>
            )}
            {status === "error" && error && (
              <p className="text-red-400 text-sm pt-1">{error}</p>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
