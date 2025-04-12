
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseLanguageMetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export function useLanguageMeta({ title, description, ogImage }: UseLanguageMetaProps = {}) {
  const { currentLanguage, languages } = useLanguage();
  
  useEffect(() => {
    // Set the html lang attribute
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Set title and meta description if provided
    if (title) {
      document.title = title;
    }
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
    
    // Update or add hreflang meta tags for all supported languages
    // Remove existing hreflang tags first
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    const url = window.location.href.split('?')[0]; // Base URL without parameters
    
    // Add hreflang tags for all supported languages
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.code;
      link.href = url + (url.includes('?') ? '&' : '?') + `lang=${lang.code}`;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = url;
    document.head.appendChild(defaultLink);
    
    // Add Open Graph meta tags if provided
    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      } else {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        ogImageMeta.setAttribute('content', ogImage);
        document.head.appendChild(ogImageMeta);
      }
    }
    
  }, [currentLanguage, title, description, ogImage, languages]);
}
