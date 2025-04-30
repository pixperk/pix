
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of page
      const x = (e.clientX - window.innerWidth / 2) / 25;
      const y = (e.clientY - window.innerHeight / 2) / 25;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Automatic rotation animation
    const intervalId = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.2,
        y: prev.y + 0.2
      }));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  const calculateTransform = () => {
    const x = rotation.x + mousePosition.y;
    const y = rotation.y + mousePosition.x;
    
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Floating cube */}
      <div 
        className="absolute w-full h-full flex items-center justify-center"
        style={{ perspective: "800px" }} // 3D perspective
      >
        <div
          className="w-64 h-64 relative transition-transform"
          style={{ 
            transformStyle: "preserve-3d",
            transform: calculateTransform()
          }}
        >
          {/* Front face */}
          <div 
            className="absolute w-full h-full bg-primary/10 border border-primary/30 flex items-center justify-center"
            style={{ transform: "translateZ(32px)" }}
          >
            <span className="text-6xl font-serif text-primary/60">404</span>
          </div>
          
          {/* Back face */}
          <div 
            className="absolute w-full h-full bg-primary/10 border border-primary/30 flex items-center justify-center"
            style={{ transform: "rotateY(180deg) translateZ(32px)" }}
          >
            <span className="text-6xl font-serif text-primary/60">404</span>
          </div>
          
          {/* Right face */}
          <div 
            className="absolute w-full h-full bg-accent/10 border border-accent/30 flex items-center justify-center"
            style={{ transform: "rotateY(90deg) translateZ(32px)" }}
          >
            <span className="text-3xl font-mono text-accent/60">Not Found</span>
          </div>
          
          {/* Left face */}
          <div 
            className="absolute w-full h-full bg-accent/10 border border-accent/30 flex items-center justify-center"
            style={{ transform: "rotateY(-90deg) translateZ(32px)" }}
          >
            <span className="text-3xl font-mono text-accent/60">Not Found</span>
          </div>
          
          {/* Top face */}
          <div 
            className="absolute w-full h-full bg-foreground/10 border border-foreground/30 flex items-center justify-center"
            style={{ transform: "rotateX(90deg) translateZ(32px)" }}
          >
            <span className="transform rotate-180 text-xl font-mono text-foreground/40">System Error</span>
          </div>
          
          {/* Bottom face */}
          <div 
            className="absolute w-full h-full bg-foreground/10 border border-foreground/30 flex items-center justify-center"
            style={{ transform: "rotateX(-90deg) translateZ(32px)" }}
          >
            <span className="text-xl font-mono text-foreground/40">System Error</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="z-10 relative">
        <div 
          className="font-serif text-6xl md:text-8xl font-bold mb-8 glow-text animate-fade-in opacity-0" 
          style={{ animationDelay: "0.2s" }}
        >
          404
        </div>
        
        <div className="max-w-md space-y-4 backdrop-blur-sm bg-background/50 p-8 rounded-xl">
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
    </div>
  );
};

export default NotFound;
