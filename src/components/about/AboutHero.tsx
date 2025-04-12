
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";

const AboutHero = () => {
  const { t } = useTranslation();
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {/* Parallax background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120%', // Extra height for parallax effect
          top: '-10%', // Start slightly above
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/60 to-luxury-navy/30 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 animate-fade-in">
          {t('about.hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t('about.hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
