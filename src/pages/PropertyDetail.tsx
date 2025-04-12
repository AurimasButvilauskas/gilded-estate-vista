import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useProperty } from "@/hooks/use-properties";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Home, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import PropertyContactForm from "../components/properties/PropertyContactForm";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { property, isLoading, error } = useProperty(id || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-luxury-gold mx-auto mb-4" />
            <p className="text-luxury-navy text-lg">Kraunama nekilnojamojo turto informacija...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="luxury-container py-16 text-center">
            <h1 className="text-2xl font-playfair text-luxury-navy mb-4">
              Nekilnojamojo turto objektas nerastas
            </h1>
            <p className="text-luxury-charcoal mb-8">
              Atsiprašome, tačiau ieškomas nekilnojamojo turto objektas neegzistuoja arba buvo pašalintas.
            </p>
            <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
              <Link to="/properties">Grįžti į nekilnojamojo turto sąrašą</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const images = property.images || [];
  const currentImage = images.length > 0 
    ? images[currentImageIndex].url 
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop";
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Property Header */}
        <section className="bg-luxury-navy py-8">
          <div className="luxury-container">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <Link 
                  to="/properties" 
                  className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Grįžti į nekilnojamojo turto sąrašą
                </Link>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-white/80">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {[property.address, property.city, property.state, property.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-semibold mb-2",
                  statusInfo.className
                )}>
                  {statusInfo.text}
                </span>
                <p className="text-2xl md:text-3xl font-playfair text-luxury-gold font-bold">
                  {formattedPrice}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Gallery */}
        <section className="py-8 bg-gray-50">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Image and Gallery */}
              <div className="lg:col-span-2">
                <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
                  <img 
                    src={currentImage} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                        aria-label="Ankstesnis vaizdas"
                      >
                        <ChevronLeft size={24} className="text-luxury-navy" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                        aria-label="Kitas vaizdas"
                      >
                        <ChevronRight size={24} className="text-luxury-navy" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                      onClick={() => setIsLiked(!isLiked)}
                      aria-label="Patinka"
                    >
                      <Heart 
                        size={20} 
                        className={cn(
                          "transition-colors",
                          isLiked ? "fill-red-500 text-red-500" : "text-luxury-navy"
                        )} 
                      />
                    </button>
                    <button 
                      className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                      aria-label="Dalintis"
                    >
                      <Share2 size={20} className="text-luxury-navy" />
                    </button>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex overflow-x-auto space-x-2 mt-4 pb-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2",
                          currentImageIndex === index 
                            ? "border-luxury-gold" 
                            : "border-transparent hover:border-luxury-navy/50"
                        )}
                      >
                        <img 
                          src={image.url} 
                          alt={`${property.title} - vaizdas ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Property Quick Info */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-playfair font-semibold text-luxury-navy mb-4">
                    Pagrindinė informacija
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Bed size={20} className="text-luxury-gold mr-2" />
                      <div>
                        <p className="text-sm text-luxury-charcoal/70">Miegamieji</p>
                        <p className="font-semibold text-luxury-navy">{property.bedrooms || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Bath size={20} className="text-luxury-gold mr-2" />
                      <div>
                        <p className="text-sm text-luxury-charcoal/70">Vonios kambariai</p>
                        <p className="font-semibold text-luxury-navy">{property.bathrooms || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Square size={20} className="text-luxury-gold mr-2" />
                      <div>
                        <p className="text-sm text-luxury-charcoal/70">Plotas</p>
                        <p className="font-semibold text-luxury-navy">
                          {property.square_feet ? property.square_feet.toLocaleString('lt-LT') : 0} m²
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Home size={20} className="text-luxury-gold mr-2" />
                      <div>
                        <p className="text-sm text-luxury-charcoal/70">Tipas</p>
                        <p className="font-semibold text-luxury-navy capitalize">
                          {property.property_type || "Namas"}
                        </p>
                      </div>
                    </div>
                    {property.year_built && (
                      <div className="flex items-center">
                        <Calendar size={20} className="text-luxury-gold mr-2" />
                        <div>
                          <p className="text-sm text-luxury-charcoal/70">Statybos metai</p>
                          <p className="font-semibold text-luxury-navy">{property.year_built}</p>
                        </div>
                      </div>
                    )}
                    {property.lot_size && (
                      <div className="flex items-center">
                        <Square size={20} className="text-luxury-gold mr-2" />
                        <div>
                          <p className="text-sm text-luxury-charcoal/70">Sklypo dydis</p>
                          <p className="font-semibold text-luxury-navy">
                            {property.lot_size.toLocaleString('lt-LT')} m²
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <PropertyContactForm propertyId={property.id} propertyTitle={property.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Details Tabs */}
        <section className="py-12 bg-white">
          <div className="luxury-container">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                <TabsTrigger value="description">Aprašymas</TabsTrigger>
                <TabsTrigger value="features">Ypatybės</TabsTrigger>
                <TabsTrigger value="location">Vieta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-playfair font-semibold text-luxury-navy mb-4">
                    Nekilnojamojo turto aprašymas
                  </h2>
                  <div className="prose prose-luxury max-w-none">
                    <p className="text-luxury-charcoal whitespace-pre-line">
                      {property.description || "Aprašymas nepateiktas."}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-playfair font-semibold text-luxury-navy mb-4">
                    Ypatybės ir patogumai
                  </h2>
                  
                  {property.features && property.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {property.features.map((feature) => (
                        <div key={feature.id} className="flex items-center">
                          <div className="w-2 h-2 bg-luxury-gold rounded-full mr-2"></div>
                          <span className="text-luxury-charcoal">{feature.feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-luxury-charcoal">Ypatybių sąrašas nepateiktas.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="mt-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-playfair font-semibold text-luxury-navy mb-4">
                    Vieta
                  </h2>
                  
                  <div className="mb-4">
                    <p className="text-luxury-charcoal">
                      <strong>Adresas:</strong> {property.address || "Nepateikta"}
                    </p>
                    <p className="text-luxury-charcoal">
                      <strong>Miestas:</strong> {property.city || "Nepateikta"}
                    </p>
                    <p className="text-luxury-charcoal">
                      <strong>Šalis:</strong> {property.country || "Nepateikta"}
                    </p>
                    <p className="text-luxury-charcoal">
                      <strong>Pašto kodas:</strong> {property.zip_code || "Nepateikta"}
                    </p>
                  </div>
                  
                  {(property.latitude && property.longitude) ? (
                    <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-luxury-charcoal">Žemėlapio komponentas būtų rodomas čia.</p>
                    </div>
                  ) : (
                    <p className="text-luxury-charcoal">Tikslios koordinatės nepateiktos.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Similar Properties Section */}
        <section className="py-12 bg-gray-50">
          <div className="luxury-container">
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-luxury-navy text-center mb-8">
              Panašūs nekilnojamojo turto objektai
            </h2>
            
            <div className="text-center">
              <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
                <Link to="/properties">Peržiūrėti visus objektus</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
