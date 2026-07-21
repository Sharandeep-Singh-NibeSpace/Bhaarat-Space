import Link from "next/link";
import BgVideo from "./BgVideo";

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

export default function FooterIndexPage() {
  return (
    <div className="relative">
      {/* <BgVideo
        className="w-full h-full object-cover "
        src="/videos/bg.mp4"
        poster="/videos/posters/bg-invert-down.jpg"
      /> */}
      <footer
        className="border-t border-white/5 pt-10 pb-6 px-6"
        style={{ zIndex: 1, position: "relative" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/Bharat Space2.svg" style={{ height: "70px" }} />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[11px] text-slate-400 hover:text-white hover:border-sky-500 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-xs text-slate-600">
            © 2026 Bharat Space Private Limited
          </p>
        </div>
      </footer>
    </div>
  );
}
