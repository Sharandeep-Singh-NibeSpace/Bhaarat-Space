import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solution from "@/components/Solution";
import Sensors from "@/components/Sensors";
import Roadmap from "@/components/Roadmap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FooterIndexPage from "@/components/FooterIndexPage";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <Hero />
      <About />
      <Solution />
      <Sensors />
      <Roadmap />
      <ContactForm />
      <FooterIndexPage />
    </main>
  );
}
