
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/common/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="luxury-container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-playfair font-bold">
            <span className="text-luxury-navy">Gilded</span>
            <span className="text-luxury-gold">Estate</span>
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-inter text-luxury-navy hover:text-luxury-gold transition-colors">
            {t('common.navigation.home')}
          </Link>
          <Link to="/properties" className="font-inter text-luxury-navy hover:text-luxury-gold transition-colors">
            {t('common.navigation.properties')}
          </Link>
          <Link to="/about" className="font-inter text-luxury-navy hover:text-luxury-gold transition-colors">
            {t('common.navigation.about')}
          </Link>
          <Link to="/contact" className="font-inter text-luxury-navy hover:text-luxury-gold transition-colors">
            {t('common.navigation.contact')}
          </Link>
          
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="hover:text-luxury-gold">
              <Link to="/signin">
                <User size={18} className="mr-1" /> {t('common.navigation.signin')}
              </Link>
            </Button>
            <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
              <Link to="/signup">{t('common.navigation.register')}</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          <button 
            className="text-luxury-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="font-inter text-luxury-navy hover:text-luxury-gold p-2"
              onClick={() => setIsOpen(false)}
            >
              {t('common.navigation.home')}
            </Link>
            <Link 
              to="/properties" 
              className="font-inter text-luxury-navy hover:text-luxury-gold p-2"
              onClick={() => setIsOpen(false)}
            >
              {t('common.navigation.properties')}
            </Link>
            <Link 
              to="/about" 
              className="font-inter text-luxury-navy hover:text-luxury-gold p-2"
              onClick={() => setIsOpen(false)}
            >
              {t('common.navigation.about')}
            </Link>
            <Link 
              to="/contact" 
              className="font-inter text-luxury-navy hover:text-luxury-gold p-2"
              onClick={() => setIsOpen(false)}
            >
              {t('common.navigation.contact')}
            </Link>
            
            <div className="pt-4 flex flex-col space-y-3 border-t border-gray-200">
              <Button asChild variant="ghost" className="justify-start">
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <User size={18} className="mr-2" /> {t('common.navigation.signin')}
                </Link>
              </Button>
              <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  {t('common.navigation.register')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
