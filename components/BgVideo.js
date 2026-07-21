"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video that:
 *  - shows a lightweight poster frame immediately (no layout shift, instant paint)
 *  - only starts downloading the actual video once it's near the viewport
 *  - pauses playback while scrolled off-screen (saves CPU/battery/bandwidth
 *    when a page has several autoplaying background videos)
 *
 * Drop-in replacement for a raw <video autoPlay muted loop playsInline src=.../>
 */
export default function BgVideo({
  src,
  poster,
  className = "",
  priority = false, // set true for above-the-fold videos (Hero, NavBar)
}) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [loaded, setLoaded] = useState(false);

  // Lazy-load: only attach a src once the video is within ~600px of the viewport
  useEffect(() => {
    if (priority) return; // already loading
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  // Play/pause based on visibility so off-screen videos don't burn CPU/battery
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    const el = wrapperRef.current;
    if (!video || !el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`${className} transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ position: "absolute", inset: 0 }}
        />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          className={`${className} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ position: "absolute", inset: 0 }}
          src={src}
          poster={poster}
          autoPlay={priority}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          onCanPlay={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
