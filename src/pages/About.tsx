
import AnimatedHeading from "@/components/AnimatedHeading";
import TechStack from "@/components/TechStack";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-fade-in opacity-0">
        <AnimatedHeading className="text-4xl md:text-5xl mb-4">
          About Me
        </AnimatedHeading>
        <p className="text-lg text-foreground/70">
          The journey, the tools, and the philosophy that shapes my work and life.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
        <div className="col-span-1 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="sticky top-24">
            <div className="aspect-square rounded-full border-2 border-border bg-muted/50 mb-6 overflow-hidden animate-float">
              {/* Placeholder for profile image - replace with actual image */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-glow-lavender/10 to-glow-pink/10">
                <img 
                  src="/assets/avatar.jpg" 
                  alt="Yashaswi Mishra" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="space-y-1 text-sm">
              <h3 className="font-medium">pixperk / Yashaswi Mishra</h3>
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
                I actually never wanted to make a career in  programming until I was in 11th grade. I enjoyed learnig OOPS concepts in C++ and was fascinated by how I could create something from nothing.
                I started with C++ but then went on to prepare for JEE. Cut short to 2023, my first year in college, where I learn C++.
                I quickly got into webdev and built small projects. In the vacations of first year, I learnt nodejs and kept diving deep into backend development.
                I started building full-stack projects and delved deeper and deeper into systems, architecture, and design patterns.
                
              </p>
              <p className="mb-4">
              I learnt Rust and Go, and started building projects in them. I also started learning about distributed systems and databases.
                I built a Redis clone in Rust and a monitoring system in Go. I also started writing blogs about my learnings and projects.
                Currently, I am building some GOOD projects in Rust and Go, and I can't wait  to share them with you.
                I enjoy reading docs and learning about new technologies. I also enjoy writing about my learnings and projects.
                I believe in sharing knowledge and helping others learn. I am always open to feedback and suggestions.
              </p>
              <p>
                I am currently looking for internships and freelance opportunities. If you are interested in working with me, feel free to reach out! 
                I am always open to new opportunities and collaborations.
                I am also open to feedback and suggestions. I believe in continuous learning and improvement.
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
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Frontend</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>Next.js & React</li>
                  <li>TypeScript</li>
                  <li>TailwindCSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Backend</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>Node.js</li>
                  <li>Rust</li>
                  <li>Go</li>
                  <li>GraphQL</li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Data</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>PostgreSQL</li>
                  <li>Redis</li>
                  <li>Kafka</li>
                  <li>Elasticsearch</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
            <h2 className="font-serif text-2xl mb-4 glow-text">Philosophy</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
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
                <li>I learnt Next.js before diving into react first.</li>
                <li>I am addicted to note taking by hand.</li>
                <li>I hate laptop stickers.</li>
                <li>I have a habit of writing down my thoughts and ideas on my desk.</li>
                <li>I made this portfolio in under 2 days.</li>
                <li>I document everything I learn.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
