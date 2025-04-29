
import { ArrowRight } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import AnimatedHeading from "@/components/AnimatedHeading";

const Home = () => {
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-16 md:py-24">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
          <AnimatedHeading className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight">
            Hey, I'm Yashaswi Mishra — aka Pixperk.
          </AnimatedHeading>
          <AnimatedHeading 
            element="h2" 
            className="text-2xl md:text-3xl lg:text-4xl mb-8 text-foreground/80"
            delay={150}
          >
            I build for the web, I write for the curious, and I break things till they work beautifully.
          </AnimatedHeading>
        </div>
        
        <div 
          className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" 
          style={{ animationDelay: '0.6s' }}
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
          className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" 
          style={{ animationDelay: '0.9s' }}
        >
          <GlowButton to="/projects" className="px-6">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
          <GlowButton to="/contact" variant="outline" className="px-6">
            Get in Touch
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
