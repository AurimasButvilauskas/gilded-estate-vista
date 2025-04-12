
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

const Achievements = () => {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [stats, setStats] = useState({
    properties: 0,
    satisfied: 0,
    countries: 0,
    awards: 0
  });
  
  const testimonials = [
    {
      id: 1,
      quote: t('about.achievements.testimonials.testimonial1.quote'),
      author: t('about.achievements.testimonials.testimonial1.author'),
      position: t('about.achievements.testimonials.testimonial1.position')
    },
    {
      id: 2,
      quote: t('about.achievements.testimonials.testimonial2.quote'),
      author: t('about.achievements.testimonials.testimonial2.author'),
      position: t('about.achievements.testimonials.testimonial2.position')
    },
    {
      id: 3,
      quote: t('about.achievements.testimonials.testimonial3.quote'),
      author: t('about.achievements.testimonials.testimonial3.author'),
      position: t('about.achievements.testimonials.testimonial3.position')
    }
  ];
  
  const finalStats = {
    properties: 500,
    satisfied: 98,
    countries: 15,
    awards: 42
  };
  
  const awards = [
    {
      id: 1,
      name: t('about.achievements.awards.award1.name'),
      year: "2023",
      description: t('about.achievements.awards.award1.description')
    },
    {
      id: 2,
      name: t('about.achievements.awards.award2.name'),
      year: "2022",
      description: t('about.achievements.awards.award2.description')
    },
    {
      id: 3,
      name: t('about.achievements.awards.award3.name'),
      year: "2021",
      description: t('about.achievements.awards.award3.description')
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Animate stats counting up
  useEffect(() => {
    if (isStatsVisible) {
      const duration = 2000; // ms
      const interval = 20; // ms
      const steps = duration / interval;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          properties: Math.floor(progress * finalStats.properties),
          satisfied: Math.floor(progress * finalStats.satisfied),
          countries: Math.floor(progress * finalStats.countries),
          awards: Math.floor(progress * finalStats.awards)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isStatsVisible]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-6">
            {t('about.achievements.title')}
          </h2>
          <p className="text-lg text-luxury-charcoal">
            {t('about.achievements.description')}
          </p>
        </div>
        
        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <span className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold block mb-2">
                {stats.properties}+
              </span>
              <span className="text-luxury-navy font-medium">
                {t('about.achievements.stats.properties')}
              </span>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <span className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold block mb-2">
                {stats.satisfied}%
              </span>
              <span className="text-luxury-navy font-medium">
                {t('about.achievements.stats.satisfaction')}
              </span>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <span className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold block mb-2">
                {stats.countries}
              </span>
              <span className="text-luxury-navy font-medium">
                {t('about.achievements.stats.countries')}
              </span>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <span className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold block mb-2">
                {stats.awards}
              </span>
              <span className="text-luxury-navy font-medium">
                {t('about.achievements.stats.awards')}
              </span>
            </CardContent>
          </Card>
        </div>
        
        {/* Awards */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-navy text-center mb-10">
            {t('about.achievements.awardsTitle')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award) => (
              <Card key={award.id} className="border border-luxury-gold/30 hover:border-luxury-gold transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-playfair font-bold text-luxury-navy">{award.name}</h4>
                    <span className="bg-luxury-gold text-white text-sm px-3 py-1 rounded-full">{award.year}</span>
                  </div>
                  <p className="text-luxury-charcoal">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="relative max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-navy text-center mb-10">
            {t('about.achievements.testimonialsTitle')}
          </h3>
          
          <div className="relative h-[280px] md:h-[240px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-700 ${
                  activeTestimonial === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20 pointer-events-none'
                }`}
              >
                <Card className="border-0 shadow-lg bg-white p-8">
                  <CardContent className="p-0">
                    <div className="flex items-start mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-luxury-gold/20 -translate-x-2">
                        <path d="M10.7 20.7c-2.2 0-3.8-0.5-5-1.5C4.4 18.2 3.8 16.8 3.8 15c0-1.5 0.5-2.8 1.4-4.1c0.9-1.3 2.4-2.8 4.6-4.6l2 2.2c-1.9 1.3-3.3 2.4-4.1 3.5c-0.8 1-1.2 2-1 3.1c0.9-0.5 1.9-0.8 3-0.8c1.1 0 2.1 0.4 2.9 1.1c0.8 0.8 1.2 1.8 1.2 3C13.8 19.6 12.8 20.7 10.7 20.7zM21.5 20.7c-2.2 0-3.8-0.5-5-1.5c-1.2-1-1.8-2.4-1.8-4.2c0-1.5 0.5-2.8 1.4-4.1c0.9-1.3 2.4-2.8 4.6-4.6l2 2.2c-1.9 1.3-3.3 2.4-4.1 3.5c-0.8 1-1.2 2-1 3.1c0.9-0.5 1.9-0.8 3-0.8c1.1 0 2.1 0.4 2.9 1.1c0.8 0.8 1.2 1.8 1.2 3C24.7 19.6 23.6 20.7 21.5 20.7z" />
                      </svg>
                    </div>
                    <p className="text-lg text-luxury-charcoal mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col">
                      <span className="font-playfair font-bold text-luxury-navy">{testimonial.author}</span>
                      <span className="text-sm text-luxury-gold">{testimonial.position}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index
                    ? 'bg-luxury-gold w-6'
                    : 'bg-luxury-gold/20'
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
