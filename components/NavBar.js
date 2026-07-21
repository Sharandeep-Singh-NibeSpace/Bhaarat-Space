"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BgVideo from "./BgVideo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Solution", href: "/#solution" },
  { label: "Constellation", href: "/#sensors" },
  { label: "Image Analytics", href: "/image-analytics" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <BgVideo
        className="w-full h-full object-cover"
        src="/videos/test2.mp4"
        poster="/videos/posters/test2.jpg"
        priority
      />
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4"
        style={{ zIndex: 1, position: "relative" }}
      >
        {/* Logo */}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-slate-300">
          <img src="/images/Bharat Space2.svg" style={{ height: "50px" }} />

          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-white ${
                  active ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden sm:inline-flex transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-md"
        >
          Contact Us
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Added subtle background */}
      {open && (
        // <div className="lg:hidden px-5 pb-4 flex flex-col gap-3 text-sm text-slate-300 bg-black/80 backdrop-blur-md">
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-3 text-sm text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-sky-500 text-white text-sm font-semibold px-5 py-2.5 rounded-md mt-1 text-center"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
