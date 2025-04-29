
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlowButton from "@/components/GlowButton";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div 
        className="font-serif text-6xl md:text-8xl font-bold mb-8 glow-text animate-fade-in opacity-0" 
        style={{ animationDelay: "0.2s" }}
      >
        404
      </div>
      
      <div className="max-w-md space-y-4">
        <h1 
          className="font-serif text-2xl md:text-3xl animate-fade-in opacity-0" 
          style={{ animationDelay: "0.4s" }}
        >
          Page not found
        </h1>
        
        <p 
          className="text-foreground/70 animate-fade-in opacity-0" 
          style={{ animationDelay: "0.6s" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div 
          className="pt-8 animate-fade-in opacity-0" 
          style={{ animationDelay: "0.8s" }}
        >
          <GlowButton to="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
