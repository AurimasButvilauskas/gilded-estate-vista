
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Working with GildedEstate to find our dream home was an exceptional experience. Their attention to detail and understanding of our needs made the process seamless.",
    author: "Alexandra Reynolds",
    position: "CEO, Luxe Industries",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "As an international buyer, I was impressed by GildedEstate's ability to guide me through the complex process of acquiring a property abroad. Their expertise is unmatched.",
    author: "Jonathan Chen",
    position: "Investment Banker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "GildedEstate helped us sell our family estate for well above market value. Their marketing strategy and network of high-net-worth clients made all the difference.",
    author: "Isabella Martinez",
    position: "Art Collector",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <section className="py-20 bg-luxury-navy text-white">
      <div className="luxury-container">
        <div className="flex justify-center mb-12">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              What Our <span className="text-luxury-gold">Clients</span> Say
            </h2>
            <p className="text-white/80">
              Discover why our clients trust us with their most important investments
            </p>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={goToPrevious}
              className="bg-luxury-navy text-white p-3 rounded-full shadow-lg hover:bg-luxury-gold hover:text-luxury-navy transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3">
                        <div className="relative">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-luxury-gold">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-4 -left-4 text-luxury-gold">
                            <Quote size={32} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 text-center md:text-left">
                        <p className="text-white/90 text-lg mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <h4 className="text-luxury-gold font-playfair text-xl font-semibold">
                            {testimonial.author}
                          </h4>
                          <p className="text-white/70">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={goToNext}
              className="bg-luxury-navy text-white p-3 rounded-full shadow-lg hover:bg-luxury-gold hover:text-luxury-navy transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-luxury-gold w-10" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
