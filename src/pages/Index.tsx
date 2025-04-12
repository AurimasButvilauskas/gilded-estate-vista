
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProperty from "@/components/home/FeaturedProperty";
import PropertyShowcase from "@/components/home/PropertyShowcase";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperty />
        <PropertyShowcase />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
