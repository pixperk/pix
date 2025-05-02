import AnimatedHeading from "@/components/AnimatedHeading";
import Metadata from "@/components/Metadata";
import { motion, useInView } from "framer-motion";
import { BookOpen, Code, Database, Server } from "lucide-react";
import { useRef } from "react";

const Section = ({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="mb-12 md:mb-16"
    >
      <h2 className="font-serif text-2xl md:text-3xl mb-4 md:mb-6 glow-text relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-primary to-transparent"></span>
      </h2>
      {children}
    </motion.section>
  );
};

const About = () => {
  return (
    <>
      <Metadata
        title="About Me | Yashaswi Mishra"
        description="Learn about my journey as a full stack developer, my technical skills, and my philosophy towards software development."
        keywords="Yashaswi Mishra, Pixperk, About, Full Stack Developer, Software Engineer, TypeScript, React, Rust, Go"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12 md:mb-16">
        <AnimatedHeading className="font-serif text-4xl md:text-6xl mb-6 relative z-10">
            About Me
          </AnimatedHeading>
          <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto">
            The journey, the tools, and the philosophy that shapes my work and life.
          </p>
        </div>
        
        {/* Mobile and tablet layout - different from desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Profile section - Full width on mobile, sidebar on desktop */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:sticky md:top-24">
              <div className="flex flex-col items-center md:items-start gap-6">
                {/* Avatar with animation */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-full md:max-w-[240px] md:h-auto aspect-square rounded-full border-2 border-border bg-muted/50 overflow-hidden animate-float mx-auto md:mx-0">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-glow-lavender/10 to-glow-pink/10">
                    <img 
                      src="/assets/avatar.jpg" 
                      alt="Yashaswi Mishra" 
                      className="w-full h-full object-cover" 
                      loading="eager"
                    />
                  </div>
                </div>
                
                {/* About details - centered on mobile/tablet, left-aligned on desktop */}
                <div className="space-y-1 text-sm text-center md:text-left">
                  <h3 className="font-medium">pixperk / Yashaswi Mishra</h3>
                  <p className="text-foreground/70">Full Stack Developer</p>
                  <p className="text-foreground/70">Based in India</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Main content - Stacked sections */}
          <div className="md:col-span-8 lg:col-span-9 space-y-12 md:space-y-16 mt-8 md:mt-0">
            <Section title="My Journey" delay={1}>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <p className="mb-4">
                  I actually never wanted to make a career in programming until I was in 11th grade. I enjoyed learning OOPS concepts in C++ and was fascinated by how I could create something from nothing. I started with C++ but then went on to prepare for JEE. Cut short to 2023, my first year in college, where I learn C++. I quickly got into webdev and built small projects. In the vacations of first year, I learnt NodeJS and kept diving deep into backend development.
                </p>
                <p className="mb-4">
                  I learnt Rust and Go, and started building projects in them. I also started learning about distributed systems and databases. I built a Redis clone in Rust and a monitoring system in Go. I also started writing blogs about my learnings and projects. Currently, I am building some GOOD projects in Rust and Go, and I can't wait to share them with you. I enjoy reading docs and learning about new technologies. I also enjoy writing about my learnings and projects.
                </p>
                <p>
                  I am currently looking for internships and freelance opportunities. If you are interested in working with me, feel free to reach out! I am always open to new opportunities and collaborations. I am also open to feedback and suggestions. I believe in continuous learning and improvement.
                </p>
              </div>
            </Section>
            
            <Section title="Stack & Style" delay={2}>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mb-6">
                <p>
                  I believe in choosing the right tool for the job, but these are the technologies I'm 
                  currently most excited about and experienced with:
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 md:p-5 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Frontend</h3>
                  </div>
                  <ul className="text-sm md:text-base text-foreground/80 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Next.js & React
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      TailwindCSS
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Framer Motion
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 md:p-5 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Backend</h3>
                  </div>
                  <ul className="text-sm md:text-base text-foreground/80 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Node.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Rust
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Go
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      GraphQL
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 md:p-5 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Data</h3>
                  </div>
                  <ul className="text-sm md:text-base text-foreground/80 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      PostgreSQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Redis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Kafka
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      Elasticsearch
                    </li>
                  </ul>
                </div>
              </div>
            </Section>
            
            <Section title="Philosophy" delay={3}>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <p className="mb-4">
                  I approach software development as a craft that requires both technical precision and 
                  creative problem-solving. While I deeply appreciate elegant code and efficient algorithms, 
                  I never lose sight of the humans who will ultimately use what I build.
                  I am addicted to improving and refactoring my code. I believe in writing clean, maintainable code that is easy to read and understand.
                  I also love breaking stuff, make mistakes, fail and then pick up the pieces and learn from them.
                </p>
                <p className="mb-4">
                  I believe in:
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  <li className="flex gap-3 items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <strong>Deep Understanding:</strong> Knowing not just how to use a technology, but how it works underneath.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded mt-0.5">
                      <Code className="w-4 h-4" />
                    </span>
                    <div>
                      <strong>Pragmatic Solutions:</strong> Choosing clarity over cleverness, simplicity over complexity.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <strong>Continuous Learning:</strong> Staying curious and humble in a field that never stops evolving.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded mt-0.5">
                      <Server className="w-4 h-4" />
                    </span>
                    <div>
                      <strong>Ethical Development:</strong> Building technology that respects user privacy and well-being.
                    </div>
                  </li>
                </ul>
              </div>
            </Section>
            
            <Section title="Fun Facts" delay={4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I learnt Next.js before diving into React first.</p>
                </div>
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I am addicted to note taking by hand.</p>
                </div>
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I hate laptop stickers.</p>
                </div>
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I have a habit of writing down my thoughts and ideas on my desk.</p>
                </div>
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I made this portfolio in under 2 days.</p>
                </div>
                <div className="bg-muted/40 border border-border rounded-lg p-4 hover:bg-muted/60 transition-all">
                  <p className="text-sm md:text-base">I document everything I learn.</p>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;