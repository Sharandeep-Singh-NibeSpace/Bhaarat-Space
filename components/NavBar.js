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
    <header className="sticky top-0 z-50">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <BgVideo
          className="w-full h-full object-cover"
          src="/videos/test2.mp4"
          poster="/videos/posters/test2.jpg"
          priority
        />
      </div>

      {/* Top Navigation Bar */}
      <div className="relative bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          {/* Logo */}
          <img
            src="/images/Bharat Space2.svg"
            style={{ height: "50px" }}
            alt="Bharat Space Logo"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-slate-300">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href.includes("#") && pathname === "/");
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
            className="hidden sm:inline-flex transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-white/10"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="px-5 py-6 flex flex-col gap-4 text-lg text-slate-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-md text-center mt-2"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
