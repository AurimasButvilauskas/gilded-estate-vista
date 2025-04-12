
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const ContactMap = () => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If we had a real Google Maps integration, we would initialize it here
    // This is a placeholder for demonstration purposes
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Create a static map image as placeholder
      const mapImage = document.createElement('img');
      mapImage.src = 'https://maps.googleapis.com/maps/api/staticmap?center=54.6872,25.2797&zoom=14&size=800x400&markers=color:gold%7C54.6872,25.2797&style=feature:all|element:labels|visibility:on&style=feature:all|element:labels.text.fill|color:0x000000&style=feature:all|element:labels.text.stroke|color:0xffffff&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x000000&style=feature:landscape|element:geometry|color:0x000000&style=feature:poi|element:geometry.fill|color:0x000000&style=feature:road|element:geometry.fill|color:0x000000&style=feature:road|element:geometry.stroke|color:0x000000&style=feature:transit|element:geometry|color:0x000000&style=feature:water|element:geometry|color:0x000000&key=';
      mapImage.alt = "GildedEstate Office Location";
      mapImage.className = "w-full h-full object-cover rounded-lg";
      
      mapElement.appendChild(mapImage);
      
      // Add a luxury styled overlay with location pin
      const overlay = document.createElement('div');
      overlay.className = "absolute inset-0 pointer-events-none";
      overlay.innerHTML = `
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      `;
      
      mapElement.appendChild(overlay);
    }
  }, []);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-playfair font-bold text-luxury-navy mb-6">
        {t('contact.officeLocation')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div 
            ref={mapRef} 
            className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-luxury-gold/20"
          >
            {/* Map will be rendered here */}
          </div>
        </div>
        
        <div>
          <Card className="h-full border border-luxury-gold/20">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h4 className="text-xl font-playfair font-bold text-luxury-navy mb-4">
                {t('contact.mainOffice')}
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-luxury-charcoal">
                      Gedimino pr. 35<br />
                      Vilnius, LT-01109<br />
                      Lithuania
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-luxury-charcoal">
                      +370 5 123 4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p className="text-luxury-charcoal">
                      info@gildededstate.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <p className="text-luxury-charcoal">
                      {t('contact.workingHours.weekdays')}<br />
                      {t('contact.workingHours.weekend')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
