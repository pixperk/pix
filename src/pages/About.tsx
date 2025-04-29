
import AnimatedHeading from "@/components/AnimatedHeading";

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
              {/* Placeholder for profile image - replace with actual image */}
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
    </div>
  );
};

export default About;
