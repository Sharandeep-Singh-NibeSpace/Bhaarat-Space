import "./globals.css";
import SiteBackground from "@/components/SiteBackground";
import PageShutter from "@/components/PageShutter";

export const metadata = {
  title: "Bharat Space | India's First Multi-Mission EO & SAR Constellation",
  description:
    "High-resolution Earth Observation and SAR satellites, purpose-built for strategic defense and national resilience. Sub-90 minute revisit, across all of India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteBackground />
        <PageShutter />
        {children}
      </body>
    </html>
  );
}
