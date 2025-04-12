
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    email?: string;
  };
}

const TeamSection = () => {
  const { t } = useTranslation();
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: t('about.team.member1.name'),
      position: t('about.team.member1.position'),
      bio: t('about.team.member1.bio'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "#",
        email: "victoria@gildededstate.com"
      }
    },
    {
      id: 2,
      name: t('about.team.member2.name'),
      position: t('about.team.member2.position'),
      bio: t('about.team.member2.bio'),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "#",
        email: "alexander@gildededstate.com"
      }
    },
    {
      id: 3,
      name: t('about.team.member3.name'),
      position: t('about.team.member3.position'),
      bio: t('about.team.member3.bio'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "#",
        email: "sophia@gildededstate.com"
      }
    },
    {
      id: 4,
      name: t('about.team.member4.name'),
      position: t('about.team.member4.position'),
      bio: t('about.team.member4.bio'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "#",
        email: "marcus@gildededstate.com"
      }
    }
  ];

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-6">
            {t('about.team.title')}
          </h2>
          <p className="text-lg text-luxury-charcoal">
            {t('about.team.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card 
              key={member.id}
              className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredMember === member.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/80 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-playfair font-bold">{member.name}</h3>
                  <p className="text-luxury-gold font-medium">{member.position}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-luxury-charcoal mb-4">{member.bio}</p>
                <div className="flex items-center justify-start gap-4">
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="text-luxury-navy hover:text-luxury-gold transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-luxury-navy hover:text-luxury-gold transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
