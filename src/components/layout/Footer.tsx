
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-luxury-navy text-white">
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6">
              <span className="text-white">Gilded</span>
              <span className="text-luxury-gold">Estate</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Exceptional properties for those who seek the extraordinary. Since 2010, we have been connecting discerning clients with the world's most remarkable homes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6 text-luxury-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-luxury-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-luxury-gold transition-colors">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-luxury-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-luxury-gold transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6 text-luxury-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-luxury-gold flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Luxury Avenue, Manhattan, New York, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-luxury-gold flex-shrink-0" />
                <span className="text-gray-300">+1 (212) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-luxury-gold flex-shrink-0" />
                <span className="text-gray-300">info@gildedrealty.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6 text-luxury-gold">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive property updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-luxury-navy/50 text-white placeholder:text-gray-400 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-luxury-gold"
              />
              <button 
                type="submit" 
                className="bg-luxury-gold text-luxury-navy font-medium px-4 py-2 rounded hover:bg-luxury-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GildedEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
