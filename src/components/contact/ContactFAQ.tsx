
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactFAQ = () => {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: t('contact.faq.question1'),
      answer: t('contact.faq.answer1')
    },
    {
      question: t('contact.faq.question2'),
      answer: t('contact.faq.answer2')
    },
    {
      question: t('contact.faq.question3'),
      answer: t('contact.faq.answer3')
    },
    {
      question: t('contact.faq.question4'),
      answer: t('contact.faq.answer4')
    },
    {
      question: t('contact.faq.question5'),
      answer: t('contact.faq.answer5')
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-playfair font-bold text-luxury-navy mb-6 text-center">
        {t('contact.faq.title')}
      </h3>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-luxury-gold/20">
              <AccordionTrigger className="text-luxury-navy hover:text-luxury-gold transition-colors text-left font-medium py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-luxury-charcoal pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ContactFAQ;
