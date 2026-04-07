import { HeroSection } from "@/src/modules/landing/ui/HeroSection";
import { ClientsLogosSection } from "@/src/modules/landing/ui/ClientsLogosSection";
import { ServicesSection } from "@/src/modules/landing/ui/ServicesSection";
import { StatsSection } from "@/src/modules/landing/ui/StatsSection";
import { VacantesPreviewSection } from "@/src/modules/landing/ui/VacantesPreviewSection";
import { TestimonialsSection } from "@/src/modules/landing/ui/TestimonialsSection";
import { ApplicationSection } from "@/src/modules/landing/ui/ApplicationSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ClientsLogosSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <VacantesPreviewSection />
      <ApplicationSection />
    </>
  );
}
