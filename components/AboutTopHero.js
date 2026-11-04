"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const GalaxyBackground = dynamic(() => import("./GalaxyBackground"), {
  ssr: false,
});

export default function AboutTopHero() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <GalaxyBackground scrollRef={scrollRef} />
      </div>

      <section className="relative z-10 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="#about-content"
              className="relative pointer-events-auto px-10 sm:px-12 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-xl text-white/80 tracking-wide"
              style={{
                background:
                  "linear-gradient(180deg, rgba(48,48,54,0.92), rgba(10,10,14,0.96))",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.16), 0 10px 40px rgba(0,0,0,0.45)",
              }}
            >
              About Bharat Space
              <span className="absolute -top-1 right-3 h-2 w-2 rounded-full bg-white animate-pulse" />
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.38em] text-white/40">
              SCROLL
            </span>
            <span className="h-8 w-px bg-white/30" />
          </div>
        </div>
      </section>
    </>
  );
}
