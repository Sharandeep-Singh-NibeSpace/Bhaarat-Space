import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";

const GalaxyScroll = dynamic(() => import("@/components/GalaxyScroll"), {
  ssr: false,
});

export const metadata = {
  title: "Test | Bharat Space",
  description: "Scroll-driven particle galaxy background.",
};

export default function TestPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavBar />
      <GalaxyScroll />
    </main>
  );
}
