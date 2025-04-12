
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect, useState } from "react";

interface Value {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PhilosophyValues = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const values: Value[] = [
    {
      id: 1,
      title: t('about.values.value1.title'),
      description: t('about.values.value1.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold">
          <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 5.7a4.5 4.5 0 0 1 6.36 6.37" />
          <path d="m3.64 20.33 1.46-1.46" />
          <path d="m7.37 18.5 1.46-1.46" />
          <path d="m4.56 15.7 1.46-1.46" />
        </svg>
      )
    },
    {
      id: 2,
      title: t('about.values.value2.title'),
      description: t('about.values.value2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: t('about.values.value3.title'),
      description: t('about.values.value3.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m7 10 2 2 6-6" />
          <path d="m7 16 2 2 6-6" />
        </svg>
      )
    },
    {
      id: 4,
      title: t('about.values.value4.title'),
      description: t('about.values.value4.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold">
          <rect width="16" height="13" x="4" y="3" rx="1" ry="1" />
          <path d="m8 21 4-4 4 4" />
          <path d="M19 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
          <path d="M5 10H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
          <path d="M12 4v16" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-6">
            {t('about.values.title')}
          </h2>
          <p className="text-lg text-luxury-charcoal">
            {t('about.values.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card 
              key={value.id}
              className={`border border-luxury-gold/20 hover:border-luxury-gold transition-all duration-500 transform ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-luxury-cream">
                  {value.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold text-luxury-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-luxury-charcoal">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophyValues;
