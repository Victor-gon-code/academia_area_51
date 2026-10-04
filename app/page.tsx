import Header from "@/components/Header/Header";
import Intro from "@/components/Intro/Intro";
import HeroSection from "@/sections/HeroSection/HeroSection";
import HoursSection from "@/sections/HoursSection/HoursSection";
import TransitionSection from "@/sections/TransitionSection/TransitionSection";
import StructureSection from "@/sections/StructureSection/StructureSection";
import MovementSection from "@/sections/MovementSection/MovementSection";
import RoutineSection from "@/sections/RoutineSection/RoutineSection";
import PlansSection from "@/sections/PlansSection/PlansSection";
import SupplementsSection from "@/sections/SupplementsSection/SupplementsSection";
import ContactSection from "@/sections/ContactSection/ContactSection";
import FinalCTASection from "@/sections/FinalCTASection/FinalCTASection";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main id="conteudo">
        <HeroSection />
        <HoursSection />
        <TransitionSection />
        <StructureSection />
        <MovementSection />
        <RoutineSection />
        <PlansSection />
        <SupplementsSection />
        <ContactSection />
        <FinalCTASection />
      </main>
    </>
  );
}
