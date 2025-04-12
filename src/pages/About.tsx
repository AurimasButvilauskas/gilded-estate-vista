
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import TeamSection from "@/components/about/TeamSection";
import PhilosophyValues from "@/components/about/PhilosophyValues";
import Achievements from "@/components/about/Achievements";
import { useLanguageMeta } from "@/hooks/use-language-meta";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  useLanguageMeta({
    title: t('about.pageTitle'),
    description: t('about.pageDescription'),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <CompanyStory />
        <TeamSection />
        <PhilosophyValues />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
};

export default About;
