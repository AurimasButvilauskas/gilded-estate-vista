
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail, Clock, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "buying"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save message to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          status: 'new',
        });
      
      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Show success toast
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        interest: "buying"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="bg-white py-20">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-luxury-cream p-8 md:p-10 rounded-xl shadow-sm">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-navy mb-2">
                Get in Touch
              </h3>
              <p className="text-luxury-charcoal mb-6">
                Interested in our properties? Fill out the form below and we'll get back to you shortly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-luxury-navy mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-luxury-navy mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-luxury-navy mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      placeholder="+1 (123) 456-7890"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-luxury-navy mb-2 font-medium">
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      disabled={isSubmitting}
                    >
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="investment">Property Investment</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-luxury-navy mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    placeholder="Tell us how we can help you..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} 
                    {!isSubmitting && <ChevronRight size={16} className="ml-2" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-navy mb-4">
              Contact <span className="text-luxury-gold">Information</span>
            </h2>
            <p className="text-luxury-charcoal mb-8 max-w-lg">
              Our team of experienced luxury real estate professionals is ready to assist you with all your property needs. Reach out to us through any of the following channels.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-luxury-cream p-3 rounded-lg mr-4">
                  <PhoneCall size={24} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-luxury-navy mb-1">Call Us</h4>
                  <p className="text-luxury-charcoal">+1 (212) 555-1234</p>
                  <p className="text-luxury-charcoal">+1 (310) 555-5678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-cream p-3 rounded-lg mr-4">
                  <Mail size={24} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-luxury-navy mb-1">Email Us</h4>
                  <p className="text-luxury-charcoal">info@gildedrealty.com</p>
                  <p className="text-luxury-charcoal">sales@gildedrealty.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-cream p-3 rounded-lg mr-4">
                  <Clock size={24} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-luxury-navy mb-1">Working Hours</h4>
                  <p className="text-luxury-charcoal">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-luxury-charcoal">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-luxury-charcoal">Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2155180480176!2d-73.97968372426181!3d40.76340083932721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f07d5da561%3A0x61f6aa300ba8339d!2sThe%20Plaza%20Hotel!5e0!3m2!1sen!2sus!4v1681341880144!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
