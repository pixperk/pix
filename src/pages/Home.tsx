
import { ArrowRight, ArrowDown, Terminal } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import AnimatedHeading from "@/components/AnimatedHeading";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import TechStack from "@/components/TechStack";
import MinimalCli from "@/components/MinimalCli";
import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col">
      {/* Full-height hero section */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] py-8 md:py-12 relative px-4 md:px-0">
        <div className="animate-fade-in opacity-0 space-y-4 md:space-y-8" style={{ animationDelay: '0.05s', animationDuration: '0.3s' }}>
          <AnimatedHeading className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 leading-tight tracking-tight max-w-4xl mx-auto text-center">
            Hey, I'm Yashaswi Mishra — aka Pixperk.
          </AnimatedHeading>
          
          <h2 
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 text-foreground/80 max-w-3xl mx-auto text-center animate-fade-in opacity-0"
            style={{ animationDelay: '0.3s', animationDuration: '0.5s' }}
          >
            I build for the web, I write for the curious, and I break things till they work beautifully.
          </h2>
        </div>
        
        <div 
          className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in opacity-0 text-center px-4 sm:px-6" 
          style={{ animationDelay: '0.5s', animationDuration: '0.5s' }}
        >
          <p className="mb-3 md:mb-4">
            I'm a backend-heavy full stack developer with a passion for elegant systems design and thoughtful architecture. 
            I believe code should read like poetry - clear, purposeful, and occasionally surprising.
          </p>
          <p>
            Currently crafting scalable solutions with Next.js, Rust, and event-driven architectures, 
            while exploring the beauty of distributed systems.
          </p>
        </div>
        
        <div 
          className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in opacity-0 mb-12" 
          style={{ animationDelay: '0.7s', animationDuration: '0.5s' }}
        >
          <GlowButton to="/projects" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto px-6" showArrow>
            View Projects
          </GlowButton>
          <GlowButton to="/blog" variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto px-6">
            Read Blog
          </GlowButton>
        </div>

        {/* Scroll down indicator */}
        <a 
          href="#cli" 
          className="absolute bottom-4 md:bottom-8 animate-bounce text-foreground/70 hover:text-primary transition-colors"
          aria-label="Scroll to CLI section"
        >
          <ArrowDown className="h-5 w-5 md:h-6 md:w-6" />
        </a>
      </div>

      {/* CLI section (auto-scroll target) */}
      <div id="cli" className="py-10 md:py-20 px-4 md:px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4 glow-text">
            <Terminal className="inline h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 mb-1" />
            Terminal
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mb-4 md:mb-6 px-2">
            Try out commands like <code className="bg-secondary/40 px-1.5 py-0.5 rounded">whoami</code>, <code className="bg-secondary/40 px-1.5 py-0.5 rounded">projects</code>, <code className="bg-secondary/40 px-1.5 py-0.5 rounded">blog</code>, or <code className="bg-secondary/40 px-1.5 py-0.5 rounded">summon("coffee")</code>
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <MinimalCli />
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <GlowButton to="/cli" variant="outline" showArrow size={isMobile ? "sm" : "default"}>
            Open Full Terminal
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
