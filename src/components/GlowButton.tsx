
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  to?: string;
  isExternal?: boolean;
  showArrow?: boolean;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "default", to, isExternal, children, showArrow = false, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4";
    
    let variantStyles = "";
    switch (variant) {
      case "outline":
        variantStyles = "border border-input bg-background/60 hover:bg-accent/30 hover:text-accent-foreground glow-border hover:scale-105";
        break;
      case "ghost":
        variantStyles = "hover:bg-accent/30 hover:text-accent-foreground hover:scale-105";
        break;
      default:
        variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90 animate-glow hover:shadow-lg hover:shadow-primary/20 hover:scale-105";
        break;
    }
    
    const buttonClasses = cn(baseStyles, variantStyles, className);
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    const Content = () => (
      <>
        {children}
        {(showArrow || isHovered) && (
          <ArrowRight 
            className={cn(
              "ml-2 h-4 w-4 transition-all duration-300", 
              isHovered ? "translate-x-0.5 opacity-100" : "opacity-70"
            )} 
          />
        )}
      </>
    );
    
    if (to) {
      if (isExternal) {
        return (
          <a 
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Content />
          </a>
        );
      }
      
      return (
        <Link 
          to={to} 
          className={buttonClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Content />
        </Link>
      );
    }
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <Content />
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
