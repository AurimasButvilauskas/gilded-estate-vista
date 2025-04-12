
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      title: "Waterfront Luxury Villa",
      subtitle: "Experience the pinnacle of coastal living",
      price: "$8,500,000",
      location: "Malibu, California"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop",
      title: "Modern Architectural Marvel",
      subtitle: "Where innovation meets elegance",
      price: "$12,750,000",
      location: "Beverly Hills, California"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
      title: "Penthouse with Panoramic Views",
      subtitle: "Redefining urban luxury living",
      price: "$9,250,000",
      location: "Manhattan, New York"
    }
  ];
  
  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hero Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="luxury-container">
          <div className="max-w-2xl animate-slide-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8">
              <span className="text-luxury-gold text-2xl font-playfair font-semibold">
                {slides[currentSlide].price}
              </span>
              <span className="text-white/80 flex items-center sm:pl-4 sm:border-l border-white/30">
                <span className="text-luxury-gold mr-2">●</span> {slides[currentSlide].location}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 text-base">
                <Link to="/properties">
                  View Property <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white/10 text-base">
                <Link to="/contact">
                  Schedule Viewing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-luxury-gold w-10" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
