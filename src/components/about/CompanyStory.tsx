
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

const CompanyStory = () => {
  const { t } = useTranslation();
  const [visibleMilestone, setVisibleMilestone] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Timeline milestones data
  const milestones = [
    { year: "2005", title: t('about.story.milestone1.title'), description: t('about.story.milestone1.description') },
    { year: "2010", title: t('about.story.milestone2.title'), description: t('about.story.milestone2.description') },
    { year: "2015", title: t('about.story.milestone3.title'), description: t('about.story.milestone3.description') },
    { year: "2019", title: t('about.story.milestone4.title'), description: t('about.story.milestone4.description') },
    { year: "2023", title: t('about.story.milestone5.title'), description: t('about.story.milestone5.description') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineTop = timelineRef.current.getBoundingClientRect().top;
        const timelineBottom = timelineRef.current.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        
        // Check if timeline is in viewport
        if (timelineTop < viewportHeight && timelineBottom > 0) {
          // Determine which milestone should be visible based on scroll position
          const visibleIndex = Math.floor((viewportHeight - timelineTop) / 200);
          if (visibleIndex >= 0 && visibleIndex < milestones.length) {
            setVisibleMilestone(visibleIndex);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestones.length]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-6">
            {t('about.story.title')}
          </h2>
          <p className="text-lg text-luxury-charcoal">
            {t('about.story.description')}
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-luxury-gold/20 hover:border-luxury-gold transition-colors duration-300">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-playfair font-semibold text-luxury-navy mb-4">
                {t('about.story.mission.title')}
              </h3>
              <p className="text-luxury-charcoal">
                {t('about.story.mission.description')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-luxury-gold/20 hover:border-luxury-gold transition-colors duration-300">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-playfair font-semibold text-luxury-navy mb-4">
                {t('about.story.vision.title')}
              </h3>
              <p className="text-luxury-charcoal">
                {t('about.story.vision.description')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto my-12">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-luxury-gold"></div>
          
          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`relative flex items-center mb-12 transition-opacity duration-500 ${
                visibleMilestone !== null && index <= visibleMilestone ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className={`w-1/2 pr-8 text-right ${index % 2 === 0 ? 'md:block' : 'md:hidden'}`}>
                <h4 className="text-2xl font-playfair font-bold text-luxury-gold">{milestone.year}</h4>
                <h5 className="text-xl font-semibold text-luxury-navy mt-2">{milestone.title}</h5>
                <p className="mt-2 text-luxury-charcoal">{milestone.description}</p>
              </div>
              
              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-luxury-gold border-4 border-white z-10"></div>
              
              <div className={`w-1/2 pl-8 ${index % 2 === 1 ? 'md:block' : 'md:hidden'} md:text-left`}>
                <h4 className="text-2xl font-playfair font-bold text-luxury-gold md:hidden">{milestone.year}</h4>
                <h5 className="text-xl font-semibold text-luxury-navy mt-2 md:mt-0">{index % 2 === 1 ? milestone.title : ''}</h5>
                <p className="mt-2 text-luxury-charcoal">{index % 2 === 1 ? milestone.description : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
