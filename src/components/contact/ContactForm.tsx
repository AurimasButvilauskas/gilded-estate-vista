
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Vardas turi būti bent 2 simbolių ilgio",
  }),
  email: z.string().email({
    message: "Neteisingas el. pašto formatas",
  }),
  phone: z.string().optional(),
  inquiryType: z.string({
    required_error: "Pasirinkite užklausos tipą",
  }),
  preferredContact: z.string({
    required_error: "Pasirinkite pageidaujamą kontaktavimo būdą",
  }),
  message: z.string().min(10, {
    message: "Žinutė turi būti bent 10 simbolių ilgio",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      preferredContact: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        inquiry_type: data.inquiryType, 
        preferred_contact: data.preferredContact,
        message: data.message,
        status: "new",
      });

      if (error) throw error;

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successMessage'),
      });

      form.reset();
    } catch (error) {
      console.error("Klaida siunčiant kontaktinę formą:", error);
      toast({
        variant: "destructive",
        title: t('contact.form.error'),
        description: t('contact.form.errorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-playfair font-bold text-luxury-navy mb-6">{t('contact.form.title')}</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.form.phone')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('contact.form.phonePlaceholder')} {...field} />
                </FormControl>
                <FormMessage className="text-xs">{t('contact.form.phoneOptional')}</FormMessage>
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
                    <SelectItem value="propertyViewing">{t('contact.form.inquiryTypes.propertyViewing')}</SelectItem>
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
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};
