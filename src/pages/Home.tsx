import { ArrowRight, ArrowDown } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import TechStack from "@/components/TechStack";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Full-height hero section */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] py-12 relative">
        <div className="flex flex-col items-center mb-10">
          <Avatar className={cn(
            "w-28 h-28 md:w-32 md:h-32 mb-8 ring-4 ring-primary/20",
            "transition-all duration-500 hover:ring-primary/40",
            "animate-float shadow-xl"
          )}>
            <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=90" alt="Profile" />
            <AvatarFallback className="bg-primary/10 text-primary text-4xl font-serif">YM</AvatarFallback>
          </Avatar>
        </div>

        <div className="animate-fade-in opacity-0 text-center" style={{ animationDelay: '0.3s' }}>
          <AnimatedHeading className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight max-w-4xl mx-auto">
            Hey, I'm Yashaswi Mishra <span className="block mt-2">— aka Pixperk.</span>
          </AnimatedHeading>
          <AnimatedHeading 
            element="h2" 
            className="font-serif text-2xl md:text-3xl lg:text-4xl mb-10 text-foreground/80 max-w-3xl mx-auto"
            delay={150}
          >
            I build for the web, I write for the curious, and I break things till they work beautifully.
          </AnimatedHeading>
        </div>
        
        <div 
          className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0 text-center" 
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
          className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0 mb-12" 
          style={{ animationDelay: '0.9s' }}
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
          href="#about" 
          className="absolute bottom-8 animate-bounce text-foreground/70 hover:text-primary transition-colors"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>

      {/* About section (auto-scroll target) */}
      <div id="about" className="py-20">
        <About />
      </div>
    </div>
  );
};

// About section component embedded in Home
const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-fade-in opacity-0">
        <AnimatedHeading className="text-4xl md:text-5xl mb-4">
          About Me
        </AnimatedHeading>
        <p className="text-lg text-foreground/70">
          The journey, the tools, and the philosophy that shapes my work
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
        <div className="col-span-1 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="sticky top-24">
            <div className="aspect-square rounded-full border-2 border-border bg-muted/50 mb-6 overflow-hidden animate-float">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-glow-lavender/10 to-glow-pink/10">
                <span className="text-6xl font-serif">YM</span>
              </div>
            </div>
            
            <div className="space-y-1 text-sm">
              <h3 className="font-medium">Yashaswi Mishra</h3>
              <p className="text-foreground/70">Full Stack Developer</p>
              <p className="text-foreground/70">Based in India</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 space-y-16">
          <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-serif text-2xl mb-4 glow-text">My Journey</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="mb-4">
                My path to software development began with a curiosity about how things work. As a child, 
                I would take apart electronics just to understand their inner workings, rarely succeeding in putting 
                them back together correctly. This natural inclination to explore and understand systems led me to programming.
              </p>
              <p className="mb-4">
                I studied Computer Science at university, but found my most valuable education came from 
                late-night coding sessions and collaborative open source projects. The blend of formal education 
                and self-directed learning shaped my approach to development: methodical yet creative, 
                technical yet human-centered.
              </p>
              <p>
                Over the years, I've worked with startups and established companies alike, building 
                everything from real-time data processing systems to user-friendly web applications. 
                Each project has taught me something new about code, design, and the delicate art of 
                translating human needs into digital solutions.
              </p>
            </div>
          </section>
          
          <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-serif text-2xl mb-4 glow-text">Stack & Style</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
              <p>
                I believe in choosing the right tool for the job, but these are the technologies I'm 
                currently most excited about and experienced with:
              </p>
            </div>
            
            <TechStack />
          </section>
          
          <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
            <h2 className="font-serif text-2xl mb-4 glow-text">Philosophy</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="mb-4">
                I approach software development as a craft that requires both technical precision and 
                creative problem-solving. While I deeply appreciate elegant code and efficient algorithms, 
                I never lose sight of the humans who will ultimately use what I build.
              </p>
              <p className="mb-4">
                I believe in:
              </p>
              <ul>
                <li><strong>Deep Understanding:</strong> Knowing not just how to use a technology, but how it works underneath.</li>
                <li><strong>Pragmatic Solutions:</strong> Choosing clarity over cleverness, simplicity over complexity.</li>
                <li><strong>Continuous Learning:</strong> Staying curious and humble in a field that never stops evolving.</li>
                <li><strong>Ethical Development:</strong> Building technology that respects user privacy and well-being.</li>
              </ul>
            </div>
          </section>
          
          <section className="animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
            <h2 className="font-serif text-2xl mb-4 glow-text">Fun Facts</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ul>
                <li>I have a collection of over 20 mechanical keyboards.</li>
                <li>I've written and published a technical book on distributed systems.</li>
                <li>I once debugged a production issue while hiking at 14,000 feet.</li>
                <li>My most used keyboard shortcut is Ctrl+Z.</li>
                <li>I maintain a garden where I grow vegetables and coding bugs.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      
      <div className="text-center">
        <GlowButton to="/about" variant="outline">
          Learn More About Me
          <ArrowRight className="ml-2 h-4 w-4" />
        </GlowButton>
      </div>
    </div>
  );
};

export default Home;
