
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Set loaded after slight delay for entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navbarClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300 transform",
    isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
    isScrolled 
      ? "shadow-md backdrop-blur-lg bg-background/70 border-b border-border/30" 
      : "bg-transparent"
  );

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={cn(
                "font-serif text-2xl font-bold tracking-tight transition-all duration-300",
                isScrolled ? "text-foreground hover:text-primary" : "text-foreground hover:text-primary"
              )}
            >
              <span className="relative inline-block">
                <span className="glow-text">Pixperk</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/80 via-glow-pink to-glow-blue/80 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "font-serif transition-all duration-200 relative group",
                  location.pathname === item.href 
                    ? "text-primary font-medium" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-primary/70 transform scale-x-0 transition-transform duration-300 origin-left",
                  location.pathname === item.href ? "scale-x-100" : "group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 rounded-full ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/70">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" />
              <AvatarFallback className="bg-primary/10 text-primary">YM</AvatarFallback>
            </Avatar>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110",
                theme === "light" ? "bg-secondary/50" : "bg-secondary/30"
              )}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={18} className="transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun size={18} className="transition-transform duration-300 hover:rotate-12" />
              )}
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-md glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full glass backdrop-blur-lg shadow-lg border-t border-border transition-all duration-300 ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "block py-3 text-lg font-serif transition-colors relative group",
                location.pathname === item.href
                  ? "text-primary font-medium"
                  : "text-foreground/80 hover:text-primary"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                location.pathname === item.href ? "w-1/4" : "group-hover:w-1/4"
              )}></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
