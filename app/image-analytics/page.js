import NavBar from "@/components/NavBar";
import AnalyticsHero from "@/components/AnalyticsHero";
import AnalyticsFeatures from "@/components/AnalyticsFeatures";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Image Analytics | Bharat Space",
  description:
    "Turning orbit data into operational insight — temporal comparison, heatmaps, land cover classification, object detection, and change detection.",
};

export default function ImageAnalyticsPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <AnalyticsHero />
      <AnalyticsFeatures />
      <Footer />
    </main>
  );
}
