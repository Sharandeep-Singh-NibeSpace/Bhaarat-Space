"use client";

import { useContactForm } from "@/lib/useContactForm";

const CONTACT_CARDS = [
  {
    label: "You can email us here",
    value: "info@bharatspace.co",
    href: "mailto:info@bharatspace.co",
    icon: "mail",
  },
  {
    label: "Or give us a call",
    value: "+91 02135-637999",
    href: "tel:+9102135637999",
    icon: "phone",
  },
  {
    label: "Locations",
    value:
      "6th-8th Floor, The Melange, Fugewadi, Seva Nagar, Dapodi, Pimpri-Chinchwad, Pune, Maharashtra 411012",
    href: "https://maps.app.goo.gl/bWEppUcTMsMdYVKM6",
    icon: "pin",
  },
];

function CardIcon({ icon }) {
  if (icon === "mail")
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  if (icon === "phone")
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path
          d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path
        d="M12 22s7-7.1 7-12a7 7 0 0 0-14 0c0 4.9 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ContactPage() {
  const { form, update, handleSubmit, status, error } = useContactForm();
  const sending = status === "sending";

  const inputClasses =
    "w-full bg-space-500 border border-white/10 focus:border-sky-500 outline-none rounded-md px-4 py-3.5 text-base text-white placeholder:text-slate-500 transition-colors";

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <p className="flex items-center gap-2 text-xs sm:text-[13px] tracking-[0.22em] uppercase text-sky-400 font-semibold mb-4">
            <span aria-hidden>☏</span> Contact Us
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Get in Touch <span className="text-sky-400">with Us</span>
          </h1>
          <p className="text-white text-base leading-relaxed mb-10 max-w-md">
            Reach out to us for inquiries, support, or partnership
            opportunities. We&apos;re here to assist you.
          </p>

          <div className="space-y-4">
            {CONTACT_CARDS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.icon === "pin" ? "_blank" : undefined}
                rel={c.icon === "pin" ? "noreferrer" : undefined}
                className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-xl border border-white/10 backdrop-blur hover:border-sky-700/50 transition-colors p-4 sm:p-6"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                  <span className="w-11 h-11 shrink-0 rounded-lg bg-sky-900/40 border border-sky-700/40 flex items-center justify-center text-sky-300">
                    <CardIcon icon={c.icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-white text-sm mb-1">{c.label}</p>
                    <p className="text-white font-semibold text-base leading-snug break-words">
                      {c.value}
                    </p>
                  </div>
                </div>
                <span className="w-9 h-9 shrink-0 rounded-full border border-sky-700/50 flex items-center justify-center text-sky-300">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 backdrop-blur p-5 sm:p-9 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Send Us a Message
          </h2>
          <p className="text-white text-base leading-relaxed mb-7">
            Use our convenient contact form to reach out with questions,
            feedback, or collaboration inquiries.
          </p>

          <form onSubmit={handleSubmit} className="relative space-y-4">
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
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Full Name"
                value={form.name}
                onChange={update("name")}
                disabled={sending}
                className={inputClasses}
              />
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={update("phone")}
                disabled={sending}
                className={inputClasses}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={update("email")}
                disabled={sending}
                className={inputClasses}
              />
              <input
                name="website"
                type="text"
                autoComplete="url"
                placeholder="Website"
                value={form.website}
                onChange={update("website")}
                disabled={sending}
                className={inputClasses}
              />
            </div>
            <textarea
              required
              name="message"
              minLength={10}
              maxLength={4000}
              placeholder="Describe Your Requirement"
              rows={5}
              value={form.message}
              onChange={update("message")}
              disabled={sending}
              className={`${inputClasses} break-words`}
            />

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:hover:bg-sky-500 transition-colors text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-md"
            >
              {sending ? "Sending…" : "Submit"} <span>→</span>
            </button>

            {status === "sent" && (
              <p className="text-sky-400 text-sm pt-1">
                Thanks — we&apos;ve received your message and will be in touch
                soon.
              </p>
            )}
            {status === "error" && error && (
              <p className="text-red-400 text-sm pt-1">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
