
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  const { t } = useTranslation();
  
  const departments = [
    {
      id: 1,
      name: t('contact.departments.sales.name'),
      email: "sales@gildededstate.com",
      phone: "+370 5 123 4568"
    },
    {
      id: 2,
      name: t('contact.departments.customerService.name'),
      email: "support@gildededstate.com",
      phone: "+370 5 123 4569"
    },
    {
      id: 3,
      name: t('contact.departments.investments.name'),
      email: "invest@gildededstate.com",
      phone: "+370 5 123 4570"
    }
  ];

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-playfair font-bold text-luxury-navy mb-6">
        {t('contact.departmentsTitle')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="border border-luxury-gold/20 hover:border-luxury-gold transition-all duration-300">
            <CardContent className="p-6">
              <h4 className="text-xl font-playfair font-semibold text-luxury-navy mb-4">
                {dept.name}
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href={`mailto:${dept.email}`} className="text-luxury-charcoal hover:text-luxury-gold transition-colors">
                    {dept.email}
                  </a>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-3">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href={`tel:${dept.phone}`} className="text-luxury-charcoal hover:text-luxury-gold transition-colors">
                    {dept.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
