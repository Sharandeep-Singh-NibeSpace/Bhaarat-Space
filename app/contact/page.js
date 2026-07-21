import NavBar from "@/components/NavBar";
import ContactPageContent from "@/components/ContactPageContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Bharat Space",
  description:
    "Get in touch with Bharat Space for inquiries, support, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
