import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Validacijos schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Vardas turi būti bent 2 simbolių ilgio" }),
  email: z.string().email({ message: "Neteisingas el. pašto formatas" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Žinutė turi būti bent 10 simbolių ilgio" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyContactForm = ({ propertyId, propertyTitle }: PropertyContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `Sveiki, norėčiau gauti daugiau informacijos apie "${propertyTitle}".`,
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        property_id: propertyId,
        status: "new",
      });
      
      if (error) throw error;
      
      toast({
        title: "Žinutė išsiųsta",
        description: "Netrukus su jumis susisieks mūsų agentas.",
      });
      
      reset({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Klaida siunčiant kontaktinę formą:", error);
      toast({
        variant: "destructive",
        title: "Klaida",
        description: "Nepavyko išsiųsti žinutės. Bandykite dar kartą vėliau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-playfair font-semibold text-luxury-navy mb-4">
        Susisiekite dėl šio objekto
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            placeholder="Jūsų vardas"
            {...register("name")}
            className={errors.name ? "border-red-300" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <Input
            placeholder="El. paštas"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-300" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <Input
            placeholder="Telefono numeris (neprivaloma)"
            {...register("phone")}
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Jūsų žinutė"
            rows={4}
            {...register("message")}
            className={errors.message ? "border-red-300" : ""}
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Siunčiama..." : "Siųsti užklausą"}
        </Button>
      </form>
    </div>
  );
};

export default PropertyContactForm;
