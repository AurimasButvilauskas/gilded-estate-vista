
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const consultationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Vardas turi būti bent 2 simbolių ilgio.",
  }),
  email: z.string().email({
    message: "Įveskite teisingą el. pašto adresą.",
  }),
  phone: z.string().min(6, {
    message: "Įveskite teisingą telefono numerį.",
  }),
  date: z.date({
    required_error: "Pasirinkite datą.",
  }),
  concierge: z.string({
    required_error: "Pasirinkite konsultantą.",
  }),
});

type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

const PersonalConcierge = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const concierges = [
    {
      id: 1,
      name: t('contact.concierge.member1.name'),
      position: t('contact.concierge.member1.position'),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      expertise: t('contact.concierge.member1.expertise'),
    },
    {
      id: 2,
      name: t('contact.concierge.member2.name'),
      position: t('contact.concierge.member2.position'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      expertise: t('contact.concierge.member2.expertise'),
    }
  ];
  
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      concierge: "",
    },
  });
  
  async function onSubmit(data: ConsultationFormValues) {
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase consultation_requests table
      const { error } = await supabase
        .from('consultation_requests')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            concierge_id: parseInt(data.concierge),
            requested_date: data.date.toISOString(),
            status: 'pending'
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: t('contact.concierge.form.success'),
        description: t('contact.concierge.form.successMessage'),
      });
      
      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t('contact.concierge.form.error'),
        description: t('contact.concierge.form.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mb-12">
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-navy mb-4">
          {t('contact.concierge.title')}
        </h3>
        <p className="text-luxury-charcoal max-w-3xl mx-auto">
          {t('contact.concierge.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {concierges.map((concierge) => (
          <Card key={concierge.id} className="overflow-hidden border-0 shadow-lg">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <img 
                  src={concierge.image} 
                  alt={concierge.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="col-span-2 p-6">
                <h4 className="text-xl font-playfair font-semibold text-luxury-navy mb-2">
                  {concierge.name}
                </h4>
                <p className="text-luxury-gold font-medium mb-3">{concierge.position}</p>
                <p className="text-luxury-charcoal mb-4">{concierge.expertise}</p>
                <Button 
                  variant="outline" 
                  className="border-luxury-gold text-luxury-navy hover:bg-luxury-gold hover:text-white"
                  onClick={() => {
                    form.setValue('concierge', concierge.id.toString());
                    setIsDialogOpen(true);
                  }}
                >
                  {t('contact.concierge.scheduleButton')}
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-luxury-navy">
              {t('contact.concierge.form.title')}
            </DialogTitle>
            <DialogDescription>
              {t('contact.concierge.form.description')}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.concierge.form.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('contact.concierge.form.namePlaceholder')} {...field} />
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
                    <FormLabel>{t('contact.concierge.form.email')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('contact.concierge.form.emailPlaceholder')} {...field} />
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
                    <FormLabel>{t('contact.concierge.form.phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('contact.concierge.form.phonePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('contact.concierge.form.date')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('contact.concierge.form.datePlaceholder')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="concierge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.concierge.form.concierge')}</FormLabel>
                    <FormControl>
                      <select
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        {...field}
                      >
                        <option value="">{t('contact.concierge.form.conciergePlaceholder')}</option>
                        {concierges.map((concierge) => (
                          <option key={concierge.id} value={concierge.id}>
                            {concierge.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {t('contact.concierge.form.cancel')}
                </Button>
                <Button 
                  type="submit"
                  className="bg-luxury-navy hover:bg-luxury-navy/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.concierge.form.submitting') : t('contact.concierge.form.submit')}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <div className="mt-12 text-center">
        <Card className="border border-luxury-gold bg-luxury-navy/5 max-w-3xl mx-auto">
          <CardContent className="p-6">
            <h4 className="text-xl font-playfair font-bold text-luxury-navy mb-4">
              {t('contact.concierge.guarantee.title')}
            </h4>
            <p className="text-luxury-charcoal mb-6">
              {t('contact.concierge.guarantee.description')}
            </p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span className="text-luxury-charcoal">{t('contact.concierge.guarantee.point1')}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-gold mr-2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span className="text-luxury-charcoal">{t('contact.concierge.guarantee.point2')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalConcierge;
