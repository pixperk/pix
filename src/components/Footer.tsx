
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border py-6 bg-background/50 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/70">
              &copy; {currentYear} Yashaswi Mishra. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/pixperk" 
              target="_blank" 
              rel="noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com/PixPerk_" 
              target="_blank" 
              rel="noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://www.linkedin.com/in/yashaswi-kumar-mishra-459a53285/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
