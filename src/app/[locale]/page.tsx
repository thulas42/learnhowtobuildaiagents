import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
