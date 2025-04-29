
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  to?: string;
  isExternal?: boolean;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "default", to, isExternal, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4";
    
    let variantStyles = "";
    switch (variant) {
      case "outline":
        variantStyles = "border border-input bg-background hover:bg-accent hover:text-accent-foreground glow-border";
        break;
      case "ghost":
        variantStyles = "hover:bg-accent hover:text-accent-foreground";
        break;
      default:
        variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90 animate-glow";
        break;
    }
    
    const buttonClasses = cn(baseStyles, variantStyles, className);
    
    if (to) {
      if (isExternal) {
        return (
          <a 
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link to={to} className={buttonClasses}>
          {children}
        </Link>
      );
    }
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
