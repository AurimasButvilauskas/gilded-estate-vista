import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

interface PropertyFiltersProps {
  currentFilters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    status?: string;
    city?: string;
  };
  onFilterChange: (filters: Record<string, string | number | undefined>) => void;
}

const PropertyFilters = ({ currentFilters, onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState(currentFilters);
  const [cities, setCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0, 
    filters.maxPrice || 10000000
  ]);
  
  // Fetch available cities for the filter
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('city')
          .not('city', 'is', null)
          .order('city');
          
        if (error) throw error;
        
        // Extract unique cities
        const uniqueCities = Array.from(
          new Set(data.map(item => item.city).filter(Boolean))
        ) as string[];
        
        setCities(uniqueCities);
      } catch (error) {
        console.error("Klaida gaunant miestų sąrašą:", error);
      }
    };
    
    fetchCities();
  }, []);
  
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    
    // Update filters with debounce
    setFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
  };
  
  const resetFilters = () => {
    const defaultFilters = {
      type: "all",
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      status: "all",
      city: undefined
    };
    
    setFilters(defaultFilters);
    setPriceRange([0, 10000000]);
    onFilterChange(defaultFilters);
  };
  
  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-playfair text-luxury-navy">Filtrai</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Type */}
        <div className="space-y-2">
          <Label htmlFor="property-type" className="text-luxury-navy">Nekilnojamojo turto tipas</Label>
          <Select 
            value={filters.type || "all"} 
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Visi tipai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi tipai</SelectItem>
              <SelectItem value="house">Namas</SelectItem>
              <SelectItem value="condo">Butas</SelectItem>
              <SelectItem value="penthouse">Penthauzas</SelectItem>
              <SelectItem value="villa">Vila</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-luxury-navy">Kaina</Label>
            <span className="text-sm text-luxury-navy">
              {new Intl.NumberFormat('lt-LT', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0
              }).format(priceRange[0])} - {new Intl.NumberFormat('lt-LT', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0
              }).format(priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={[0, 10000000]}
            value={priceRange}
            min={0}
            max={10000000}
            step={50000}
            onValueChange={handlePriceRangeChange}
            className="my-4"
          />
        </div>
        
        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-luxury-navy">Miegamieji</Label>
          <Select 
            value={filters.bedrooms?.toString() || "any"} 
            onValueChange={(value) => handleFilterChange("bedrooms", value === "any" ? undefined : parseInt(value))}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Bet koks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Bet koks</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms" className="text-luxury-navy">Vonios kambariai</Label>
          <Select 
            value={filters.bathrooms?.toString() || "any"} 
            onValueChange={(value) => handleFilterChange("bathrooms", value === "any" ? undefined : parseInt(value))}
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Bet koks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Bet koks</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-luxury-navy">Statusas</Label>
          <Select 
            value={filters.status || "all"} 
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Visi statusai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi statusai</SelectItem>
              <SelectItem value="active">Parduodama</SelectItem>
              <SelectItem value="for_rent">Nuomojama</SelectItem>
              <SelectItem value="pending">Rezervuota</SelectItem>
              <SelectItem value="sold">Parduota</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-luxury-navy">Miestas</Label>
          <Select 
            value={filters.city || "any"} 
            onValueChange={(value) => handleFilterChange("city", value === "any" ? undefined : value)}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder="Visi miestai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Visi miestai</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-col space-y-2 pt-2">
          <Button 
            onClick={applyFilters}
            className="bg-luxury-navy hover:bg-luxury-navy/90 text-white"
          >
            Taikyti filtrus
          </Button>
          <Button 
            onClick={resetFilters}
            variant="outline"
            className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10"
          >
            Išvalyti filtrus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
