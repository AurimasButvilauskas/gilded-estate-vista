
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type: "signin" | "signup";
}

const AuthLayout = ({ children, title, subtitle, type }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="mb-6">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold">
              <span className="text-luxury-navy">Gilded</span>
              <span className="text-luxury-gold">Estate</span>
            </h1>
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-luxury-navy mb-2">{title}</h2>
          <p className="text-luxury-charcoal mb-8">{subtitle}</p>
          
          {children}
          
          <div className="mt-8 text-center">
            {type === "signin" ? (
              <p className="text-luxury-charcoal">
                Don't have an account?{" "}
                <Link to="/signup" className="text-luxury-gold hover:underline">
                  Register here
                </Link>
              </p>
            ) : (
              <p className="text-luxury-charcoal">
                Already have an account?{" "}
                <Link to="/signin" className="text-luxury-gold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-luxury-navy/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-8 max-w-xl">
            <h3 className="text-4xl font-playfair font-bold text-white mb-4">
              Experience Luxury Living
            </h3>
            <p className="text-white/90 text-lg">
              Discover exceptional properties that redefine elegance and sophistication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
