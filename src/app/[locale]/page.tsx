import { Header } from "@/components/layout/Header";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { HeroSection } from "@/components/landing/HeroSection";
import { TechStack } from "@/components/landing/TechStack";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SocialShare } from "@/components/ui/SocialShare";
import { Footer } from "@/components/layout/Footer";
import { RedirectIfLoggedIn } from "@/components/auth/RedirectIfLoggedIn";

export default function HomePage() {
  return (
    <main>
      <HomeStructuredData />
      <RedirectIfLoggedIn />
      <Header />
      <HeroSection />
      <TechStack />
      <FeaturesSection />
      <ModulesSection />
      <PricingSection />

      {/* Social Share CTA */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Share with your network
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Know someone who wants to learn AI agent development? Spread the word.
          </p>
          <SocialShare />
        </div>
      </section>

      <Footer />
    </main>
  );
}
