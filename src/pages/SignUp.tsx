
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up submitted:", formData);
    
    // Example registration validation - in real app would connect to Supabase
    if (formData.name && formData.email && formData.password && formData.acceptTerms) {
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Welcome to GildedEstate!",
      });
      
      // Redirect to home after successful registration
      navigate("/");
    } else {
      // Show error toast
      toast({
        title: "Registration Failed",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join our community of luxury property enthusiasts" 
      type="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-luxury-navy mb-2 font-medium">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-luxury-navy mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-luxury-navy mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                placeholder="Create a strong password"
                minLength={8}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-luxury-navy focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 8 characters long.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="text-luxury-charcoal">
                I agree to the <a href="#" className="text-luxury-gold hover:underline">Terms of Service</a> and <a href="#" className="text-luxury-gold hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 py-3">
          Create Account
        </Button>
        
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="absolute bg-white px-4 text-sm text-gray-500">or sign up with</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex justify-center items-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex justify-center items-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.488 5.168h3.604l-4.058 4.835 4.782 6.364h-3.739l-2.933-3.837-3.357 3.837h-3.604l4.317-4.93-4.524-6.269h3.74l2.673 3.555 3.099-3.555zm.412 9.643h1.006l-6.471-9.284h-1.071l6.536 9.284z" />
            </svg>
            Twitter/X
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
