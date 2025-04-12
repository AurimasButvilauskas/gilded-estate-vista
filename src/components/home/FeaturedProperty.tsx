
import { ArrowRight, Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedProperty = () => {
  return (
    <section className="py-20 bg-luxury-cream">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-2">
              Featured <span className="text-luxury-gold">Property</span>
            </h2>
            <p className="text-luxury-charcoal max-w-xl">
              Experience unparalleled luxury in our handpicked signature property
            </p>
          </div>
          <Button asChild variant="ghost" className="text-luxury-navy hover:text-luxury-gold mt-4 md:mt-0">
            <Link to="/properties" className="flex items-center">
              View All Properties <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Property Images */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Villa" 
                className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4">
                <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                  <Heart size={20} className="text-luxury-navy" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex justify-between items-center">
                  <span className="bg-luxury-gold/90 text-luxury-navy font-semibold px-4 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="bg-white/90 text-luxury-navy font-semibold px-4 py-1 rounded-full">
                    For Sale
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1609347744417-149e9d5c2b0f?q=80&w=1974&auto=format&fit=crop" 
                  alt="Property Interior" 
                  className="w-full h-24 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae405b9a?q=80&w=1932&auto=format&fit=crop" 
                  alt="Property Interior" 
                  className="w-full h-24 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=1974&auto=format&fit=crop" 
                  alt="Property Interior" 
                  className="w-full h-24 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          <div className="lg:pl-8">
            <div className="flex items-center mb-4">
              <MapPin size={18} className="text-luxury-gold mr-2" />
              <span className="text-luxury-charcoal">Beverly Hills, California</span>
            </div>
            
            <h3 className="text-3xl font-playfair font-bold text-luxury-navy mb-2">
              Villa Eleganza
            </h3>
            
            <p className="text-2xl font-playfair text-luxury-gold font-semibold mb-6">
              $12,500,000
            </p>
            
            <p className="text-luxury-charcoal mb-6">
              Nestled in the prestigious Beverly Hills neighborhood, Villa Eleganza offers the epitome of luxury living. This architectural masterpiece spans 8,500 square feet of meticulously designed space, featuring breathtaking views of the Los Angeles skyline.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
                <Bed size={24} className="text-luxury-gold mb-2" />
                <span className="text-lg font-semibold text-luxury-navy">5</span>
                <span className="text-sm text-luxury-charcoal">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
                <Bath size={24} className="text-luxury-gold mb-2" />
                <span className="text-lg font-semibold text-luxury-navy">6</span>
                <span className="text-sm text-luxury-charcoal">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
                <Square size={24} className="text-luxury-gold mb-2" />
                <span className="text-lg font-semibold text-luxury-navy">8,500</span>
                <span className="text-sm text-luxury-charcoal">Sq Ft</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
                <Link to="/properties/villa-eleganza">
                  View Details
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white">
                <Link to="/contact">
                  Schedule Viewing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
