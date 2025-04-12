
import { useState } from "react";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Property type
type Property = {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "sale" | "rent";
};

// Sample properties data
const properties: Property[] = [
  {
    id: 1,
    title: "Modern Beachfront Villa",
    price: "$7,850,000",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6200,
    type: "sale"
  },
  {
    id: 2,
    title: "Penthouse Apartment",
    price: "$5,200,000",
    location: "Manhattan, New York",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3500,
    type: "sale"
  },
  {
    id: 3,
    title: "Hillside Contemporary",
    price: "$4,750,000",
    location: "Hollywood Hills, California",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1925&auto=format&fit=crop",
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 4800,
    type: "sale"
  },
  {
    id: 4,
    title: "Waterfront Estate",
    price: "$18,500 /month",
    location: "Miami Beach, Florida",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    type: "rent"
  },
  {
    id: 5,
    title: "Urban Luxury Loft",
    price: "$9,500 /month",
    location: "San Francisco, California",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2200,
    type: "rent"
  },
  {
    id: 6,
    title: "Historic Mansion",
    price: "$11,250,000",
    location: "Boston, Massachusetts",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
    bedrooms: 8,
    bathrooms: 10,
    sqft: 12000,
    type: "sale"
  }
];

const PropertyShowcase = () => {
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all");
  
  const filteredProperties = properties.filter(property => {
    if (filter === "all") return true;
    return property.type === filter;
  });
  
  return (
    <section className="section-padding bg-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-4">
            Exclusive <span className="text-luxury-gold">Properties</span>
          </h2>
          <p className="text-luxury-charcoal max-w-2xl mx-auto">
            Discover our collection of exclusive properties that redefine luxury living
          </p>
          
          {/* Filter Controls */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  filter === "all" 
                    ? "bg-luxury-navy text-white" 
                    : "text-luxury-navy hover:bg-gray-200"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilter("sale")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  filter === "sale" 
                    ? "bg-luxury-navy text-white" 
                    : "text-luxury-navy hover:bg-gray-200"
                )}
              >
                For Sale
              </button>
              <button
                onClick={() => setFilter("rent")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  filter === "rent" 
                    ? "bg-luxury-navy text-white" 
                    : "text-luxury-navy hover:bg-gray-200"
                )}
              >
                For Rent
              </button>
            </div>
          </div>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/properties"
            className="inline-flex items-center text-luxury-navy border-b-2 border-luxury-gold pb-1 hover:text-luxury-gold transition-colors"
          >
            View All Properties 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="group property-card">
      {/* Property Image */}
      <div className="relative overflow-hidden h-64 rounded-t-lg">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            property.type === "sale" 
              ? "bg-luxury-gold/90 text-luxury-navy" 
              : "bg-luxury-navy/90 text-white"
          )}>
            For {property.type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>
        
        {/* Like Button */}
        <button 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            size={20} 
            className={cn(
              "transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-luxury-navy"
            )} 
          />
        </button>
      </div>
      
      {/* Property Details */}
      <div className="p-6 bg-white rounded-b-lg border border-gray-100">
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-luxury-gold mr-2" />
          <span className="text-sm text-luxury-charcoal">{property.location}</span>
        </div>
        
        <h3 className="text-xl font-playfair font-semibold text-luxury-navy mb-2 group-hover:text-luxury-gold transition-colors">
          <Link to={`/properties/${property.id}`}>
            {property.title}
          </Link>
        </h3>
        
        <p className="text-xl font-playfair text-luxury-gold font-semibold mb-4">
          {property.price}
        </p>
        
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Bed size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">{property.sqft.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;
