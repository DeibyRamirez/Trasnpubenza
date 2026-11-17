import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContextSection } from "@/components/ContextSection";
import { KpiGrid } from "@/components/KpiGrid";
import { AnalysisBlocks } from "@/components/AnalysisBlocks";
import { PowerBIEmbed } from "@/components/PowerBIEmbed";
import { Footer } from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReveal } from "@/hooks/useReveal";

export default function App() {
  useSmoothScroll();
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ContextSection />
        <KpiGrid />
        <AnalysisBlocks />
        <PowerBIEmbed />
      </main>
      <Footer />
    </>
  );
}
