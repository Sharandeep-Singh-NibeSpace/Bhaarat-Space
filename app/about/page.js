import NavBar from "@/components/NavBar";
import AboutTopHero from "@/components/AboutTopHero";
import AboutHero from "@/components/AboutHero";
import WhoWeAre from "@/components/WhoWeAre";
import OurFocus from "@/components/OurFocus";
import Leadership from "@/components/Leadership";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import About from "@/components/About";

export const metadata = {
  title: "About Us | Bharat Space",
  description:
    "Building India's sovereign eyes in orbit. Learn about Bharat Space's mission, leadership, and strategic partners.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <AboutTopHero />
      <AboutHero />
      <WhoWeAre />
      <OurFocus />
      <Leadership />
      <Partners />
      <Team />
      <Footer />
    </main>
  );
}
