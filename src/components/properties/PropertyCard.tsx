import { useState } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property } from "@/hooks/use-properties";
import { supabase } from "@/integrations/supabase/client";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic UI update
    setIsLiked(!isLiked);
    
    // In a real implementation, you would check if user is authenticated
    // and then add/remove the property from their likes
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        // If not logged in, revert the optimistic update
        setIsLiked(isLiked);
        return;
      }
      
      // Logic to add/remove like would go here
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(isLiked);
      console.error("Klaida bandant pažymėti patikusį objektą", error);
    }
  };
  
  // Get primary image or fallback
  const primaryImage = property.images && property.images.length > 0
    ? property.images.find(img => img.is_primary)?.url || property.images[0].url
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop";
    
  // Format price with Lithuanian currency format
  const formattedPrice = new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(property.price);
  
  // Determine status label and style
  const getStatusLabel = () => {
    switch (property.status) {
      case 'active':
        return { text: 'Parduodama', className: 'bg-luxury-gold/90 text-luxury-navy' };
      case 'pending':
        return { text: 'Rezervuota', className: 'bg-amber-500/90 text-white' };
      case 'sold':
        return { text: 'Parduota', className: 'bg-red-500/90 text-white' };
      case 'for_rent':
        return { text: 'Nuomojama', className: 'bg-luxury-navy/90 text-white' };
      default:
        return { text: 'Parduodama', className: 'bg-luxury-gold/90 text-luxury-navy' };
    }
  };
  
  const statusInfo = getStatusLabel();
  
  return (
    <div className="group property-card h-full">
      {/* Property Image */}
      <div className="relative overflow-hidden h-64 rounded-t-lg">
        <img 
          src={primaryImage} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Property Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            statusInfo.className
          )}>
            {statusInfo.text}
          </span>
        </div>
        
        {/* Like Button */}
        <button 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          onClick={toggleLike}
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
      <div className="p-6 bg-white rounded-b-lg border border-gray-100 h-full flex flex-col">
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-luxury-gold mr-2" />
          <span className="text-sm text-luxury-charcoal">
            {[property.city, property.state, property.country].filter(Boolean).join(", ")}
          </span>
        </div>
        
        <h3 className="text-xl font-playfair font-semibold text-luxury-navy mb-2 group-hover:text-luxury-gold transition-colors">
          <Link to={`/properties/${property.id}`}>
            {property.title}
          </Link>
        </h3>
        
        <p className="text-xl font-playfair text-luxury-gold font-semibold mb-4">
          {formattedPrice}
        </p>
        
        {property.description && (
          <p className="text-sm text-luxury-charcoal/80 mb-4 line-clamp-2">
            {property.description}
          </p>
        )}
        
        <div className="flex justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center">
            <Bed size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">{property.bedrooms || 0}</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">{property.bathrooms || 0}</span>
          </div>
          <div className="flex items-center">
            <Square size={18} className="text-luxury-charcoal mr-1" />
            <span className="text-sm text-luxury-charcoal">
              {property.square_feet ? property.square_feet.toLocaleString('lt-LT') : 0} m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
