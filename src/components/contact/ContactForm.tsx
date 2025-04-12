
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define the form schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Vardas turi būti bent 2 simbolių ilgio.",
  }),
  email: z.string().email({
    message: "Įveskite teisingą el. pašto adresą.",
  }),
  phone: z.string().optional(),
  inquiryType: z.string({
    required_error: "Pasirinkite užklausos tipą.",
  }),
  preferredContact: z.enum(["email", "phone", "any"], {
    required_error: "Pasirinkite pageidaujamą kontakto būdą.",
  }),
  message: z.string().min(10, {
    message: "Žinutė turi būti bent 10 simbolių ilgio.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      preferredContact: "email",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase contact_messages table
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            inquiry_type: data.inquiryType,
            preferred_contact: data.preferredContact,
            message: data.message,
            status: 'new'
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successMessage'),
      });
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t('contact.form.error'),
        description: t('contact.form.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-luxury-gold/20">
      <h3 className="text-2xl font-playfair font-bold text-luxury-navy mb-6">
        {t('contact.form.title')}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contact.form.emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contact.form.phonePlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('contact.form.phoneOptional')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.inquiryType')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.form.inquiryTypePlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="property_viewing">{t('contact.form.inquiryTypes.propertyViewing')}</SelectItem>
                      <SelectItem value="investment">{t('contact.form.inquiryTypes.investment')}</SelectItem>
                      <SelectItem value="consultation">{t('contact.form.inquiryTypes.consultation')}</SelectItem>
                      <SelectItem value="partnership">{t('contact.form.inquiryTypes.partnership')}</SelectItem>
                      <SelectItem value="other">{t('contact.form.inquiryTypes.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.form.preferredContact')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact.form.preferredContactPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">{t('contact.form.contactMethods.email')}</SelectItem>
                    <SelectItem value="phone">{t('contact.form.contactMethods.phone')}</SelectItem>
                    <SelectItem value="any">{t('contact.form.contactMethods.any')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.form.message')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('contact.form.messagePlaceholder')} 
                    {...field} 
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-luxury-navy hover:bg-luxury-navy/90 text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
