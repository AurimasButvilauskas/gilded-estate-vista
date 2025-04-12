
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPlaceholder = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-luxury-navy rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-playfair font-bold text-luxury-navy mb-2">
          Admin Access Required
        </h2>
        
        <p className="text-luxury-charcoal mb-6">
          To access the admin panel, you need to connect the app to Supabase for authentication and database functionality.
        </p>
        
        <p className="text-sm text-luxury-charcoal mb-6">
          The admin panel will include features for:
          <ul className="text-left list-disc pl-5 mt-2 space-y-1">
            <li>Content management</li>
            <li>Property listing administration</li>
            <li>User management</li>
            <li>Comment moderation</li>
            <li>Analytics and reporting</li>
          </ul>
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90">
            <Link to="/signin">
              Sign In
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
