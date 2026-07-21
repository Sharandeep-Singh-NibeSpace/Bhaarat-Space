import { Eyebrow, Pill, SatelliteGlyph } from "./ui";
import BgVideo from "./BgVideo";

export default function About() {
  return (
    <div className="relative">
      {/* <BgVideo
        className="w-full h-full object-cover"
        src="/videos/bg.mp4"
        poster="/videos/posters/bg.jpg"
      /> */}

      <section
        className="py-20 px-6"
        style={{ zIndex: 1, position: "relative" }}
      >
        <Eyebrow>About Us</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-14">
          Building a self-reliant India in space
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="w-3/3 h-1/3 rounded-full" />
            <video
              className="absolute inset-0 w-full h-full object-cover "
              src="/videos/earth.webm"
              // poster="/videos/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* <SatelliteGlyph className="absolute w-12 h-12 text-sky-300" /> */}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">
              Pioneers in Earth Observation for national security and defense
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Bharat Space Private Limited is engineering India&apos;s first
              all-weather, multi-sensor Earth Observation constellation — built
              to give strategic and civil agencies a clearer, faster picture of
              the ground that matters.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              From optical and SAR imaging to electronic intelligence, every
              system is designed and integrated domestically, reducing
              dependency on foreign satellite data for time-critical national
              missions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Pill>Optical Imaging</Pill>
              <Pill>SAR</Pill>
              <Pill>ELINT</Pill>
              <Pill>Image Analytics</Pill>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
