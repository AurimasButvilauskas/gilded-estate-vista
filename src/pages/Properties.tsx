import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { useProperties } from "@/hooks/use-properties";
import { Loader2 } from "lucide-react";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const propertyType = searchParams.get("type") || "all";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined;
  const bathrooms = searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : undefined;
  const status = searchParams.get("status") || "all";
  const city = searchParams.get("city") || undefined;

  const { properties, isLoading, error } = useProperties({
    propertyType: propertyType !== "all" ? propertyType : undefined,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    status: status !== "all" ? status : undefined,
    city,
  });

  const updateFilters = (filters: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "all" && value !== "") {
        newParams.set(key, String(value));
      }
    });
    
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-luxury-navy py-16 md:py-24">
          <div className="luxury-container text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">
              Mūsų <span className="text-luxury-gold">Nekilnojamasis Turtas</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Atraskite išskirtines prabangaus nekilnojamojo turto pasiūlas, kurios atitiks jūsų lūkesčius ir gyvenimo būdą
            </p>
          </div>
        </section>

        {/* Filters and Properties Section */}
        <section className="py-16 bg-gray-50">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters */}
              <div className="lg:col-span-1">
                <PropertyFilters 
                  currentFilters={{
                    type: propertyType,
                    minPrice,
                    maxPrice,
                    bedrooms,
                    bathrooms,
                    status,
                    city,
                  }}
                  onFilterChange={updateFilters}
                />
              </div>
              
              {/* Properties Grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
                    <span className="ml-2 text-luxury-navy">Kraunami nekilnojamojo turto objektai...</span>
                  </div>
                ) : error ? (
                  <div className="text-center p-8 bg-red-50 rounded-lg">
                    <p className="text-red-600">Įvyko klaida bandant gauti nekilnojamojo turto duomenis. Bandykite dar kartą vėliau.</p>
                  </div>
                ) : properties.length === 0 ? (
                  <div className="text-center p-8 bg-gray-100 rounded-lg">
                    <p className="text-luxury-navy">Pagal jūsų pasirinktus filtrus nekilnojamojo turto objektų nerasta.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-luxury-navy">Rasta {properties.length} objektų</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
