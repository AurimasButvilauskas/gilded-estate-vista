
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";
import { useLanguageMeta } from "@/hooks/use-language-meta";
import { ContactForm } from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import ContactInfo from "@/components/contact/ContactInfo";
import PersonalConcierge from "@/components/contact/PersonalConcierge";
import ContactFAQ from "@/components/contact/ContactFAQ";

const ContactPage = () => {
  const { t } = useTranslation();
  
  useLanguageMeta({
    title: t('contact.pageTitle'),
    description: t('contact.pageDescription'),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/70 to-luxury-navy/50 z-10"></div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4 animate-fade-in">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="md:col-span-2">
                <ContactForm />
              </div>
              
              {/* Contact Info */}
              <div className="md:col-span-3">
                <ContactMap />
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
        
        {/* Concierge Section */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <PersonalConcierge />
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ContactFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
