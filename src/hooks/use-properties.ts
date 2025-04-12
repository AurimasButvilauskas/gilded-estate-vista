import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Tipai
export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  is_primary: boolean | null;
  caption: string | null;
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  feature: string;
}

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: number | null;
  year_built: number | null;
  property_type: string | null;
  status: string | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
  agent_id: string | null;
  images?: PropertyImage[];
  features?: PropertyFeature[];
}

interface PropertyFilters {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
  city?: string;
  featured?: boolean;
  limit?: number;
}

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Pradėti užklausą
        let query = supabase
          .from('properties')
          .select(`
            *,
            images:property_images(*),
            features:property_features(*)
          `);

        // Pridėti filtrus, jei jie yra
        if (filters) {
          if (filters.propertyType) {
            query = query.eq('property_type', filters.propertyType);
          }
          
          if (filters.minPrice !== undefined) {
            query = query.gte('price', filters.minPrice);
          }
          
          if (filters.maxPrice !== undefined) {
            query = query.lte('price', filters.maxPrice);
          }
          
          if (filters.bedrooms !== undefined) {
            query = query.gte('bedrooms', filters.bedrooms);
          }
          
          if (filters.bathrooms !== undefined) {
            query = query.gte('bathrooms', filters.bathrooms);
          }
          
          if (filters.status) {
            query = query.eq('status', filters.status);
          }
          
          if (filters.city) {
            query = query.eq('city', filters.city);
          }
          
          if (filters.featured !== undefined) {
            query = query.eq('featured', filters.featured);
          }
        }

        // Vykdyti užklausą
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Konvertuoti duomenis į Property tipą
        const propertiesData = data as unknown as Property[];
        
        // Taikyti limitą, jei jis nurodytas
        const limitedData = filters?.limit 
          ? propertiesData.slice(0, filters.limit) 
          : propertiesData;
        
        setProperties(limitedData);
      } catch (err) {
        console.error("Klaida gaunant nekilnojamojo turto duomenis:", err);
        setError(err instanceof Error ? err : new Error("Įvyko nežinoma klaida"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [
    filters?.propertyType,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.bedrooms,
    filters?.bathrooms,
    filters?.status,
    filters?.city,
    filters?.featured,
    filters?.limit
  ]);

  return { properties, isLoading, error };
}

// Hook'as gauti vieną nekilnojamojo turto objektą pagal ID
export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            images:property_images(*),
            features:property_features(*)
          `)
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setProperty(data as unknown as Property);
      } catch (err) {
        console.error("Klaida gaunant nekilnojamojo turto objektą:", err);
        setError(err instanceof Error ? err : new Error("Įvyko nežinoma klaida"));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, isLoading, error };
}
