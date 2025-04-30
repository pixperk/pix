
import { ArrowRight, ArrowDown, Terminal } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import AnimatedHeading from "@/components/AnimatedHeading";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import TechStack from "@/components/TechStack";
import MinimalCli from "@/components/MinimalCli";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Full-height hero section */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] py-12 relative">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.05s', animationDuration: '0.2s' }}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight max-w-4xl mx-auto text-center">
            Hey, I'm Yashaswi Mishra — aka Pixperk.
          </h1>
          <h2 
            className="font-serif text-2xl md:text-3xl lg:text-4xl mb-10 text-foreground/80 max-w-3xl mx-auto text-center"
          >
            I build for the web, I write for the curious, and I break things till they work beautifully.
          </h2>
        </div>
        
        <div 
          className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0 text-center" 
          style={{ animationDelay: '0.1s', animationDuration: '0.2s' }}
        >
          <p className="mb-4">
            I'm a backend-heavy full stack developer with a passion for elegant systems design and thoughtful architecture. 
            I believe code should read like poetry - clear, purposeful, and occasionally surprising.
          </p>
          <p>
            Currently crafting scalable solutions with Next.js, Rust, and event-driven architectures, 
            while exploring the beauty of distributed systems.
          </p>
        </div>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0 mb-12" 
          style={{ animationDelay: '0.15s', animationDuration: '0.2s' }}
        >
          <GlowButton to="/projects" className="px-6">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
          <GlowButton to="/blog" variant="outline" className="px-6">
            Read Blog
          </GlowButton>
        </div>

        {/* Scroll down indicator */}
        <a 
          href="#cli" 
          className="absolute bottom-8 animate-bounce text-foreground/70 hover:text-primary transition-colors"
          aria-label="Scroll to CLI section"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>

      {/* CLI section (auto-scroll target) */}
      <div id="cli" className="py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl mb-4 glow-text">
            <Terminal className="inline h-8 w-8 mr-3 mb-1" />
            Terminal
          </h2>
          <p className="text-lg text-foreground/70 mb-6">
            Try out commands like <code>whoami</code>, <code>projects</code>, <code>blog</code>, <code>skills</code>, or <code>summon("coffee")</code>
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <MinimalCli />
        </div>
        
        <div className="text-center mt-12">
          <GlowButton to="/cli" variant="outline">
            Open Full Terminal
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
