"use client";

import BgVideo from "./BgVideo";

/**
 * Fixed, full-viewport background using the same video as the homepage Hero.
 * Mounted once in the root layout, so it persists across client-side
 * navigations instead of being re-fetched/re-mounted on every page —
 * every page gets the home page's exact background for free, with no
 * extra tint layered on top.
 *
 * Sits at z-index -1: below all normal page content, but above the body's
 * own background color (so it still shows through any section that doesn't
 * paint its own opaque background).
 */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        // src="/videos/3.mp4"
        src="/videos/bg-invert.mp4"
        // poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
