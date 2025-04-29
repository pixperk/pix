
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import GlowButton from "@/components/GlowButton";

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in opacity-0">
        <AnimatedHeading className="font-serif text-5xl mb-4">
          Resume
        </AnimatedHeading>
        <p className="text-xl text-foreground/70">
          My professional experience and qualifications
        </p>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <Button size="lg" className="font-serif flex gap-2">
          <Download className="h-5 w-5" />
          Download Resume PDF
        </Button>
      </div>

      {/* Summary */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
        <h2 className="font-serif text-3xl mb-6 text-center glow-text">Summary</h2>
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <p className="text-lg leading-relaxed">
            Backend-heavy full stack developer with expertise in distributed systems and real-time applications.
            Passionate about building scalable, maintainable software with elegant architectures. Experienced
            in event-driven design patterns, microservices, and high-performance computing.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
        <h2 className="font-serif text-3xl mb-6 text-center glow-text">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border">Programming Languages</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-lg mr-2">🟦</span>
                <span>TypeScript</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🐹</span>
                <span>Go</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">⚙️</span>
                <span>Rust</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🟨</span>
                <span>JavaScript</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔧</span>
                <span>C/C++</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">☕</span>
                <span>Java</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border">Backend Frameworks</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-lg mr-2">🚂</span>
                <span>Express.js</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔥</span>
                <span>Hono.js</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🦀</span>
                <span>Actix, Axum</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🍸</span>
                <span>Gin</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">◼️</span>
                <span>GraphQL</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔄</span>
                <span>tRPC</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border">Databases & ORMs</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-lg mr-2">🐘</span>
                <span>PostgreSQL</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🍃</span>
                <span>MongoDB</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔴</span>
                <span>Redis</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🐬</span>
                <span>MySQL</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🗃️</span>
                <span>SQLite</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔌</span>
                <span>Prisma ORM, Drizzle ORM</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border">Infrastructure & Tools</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-lg mr-2">🐳</span>
                <span>Docker</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">📊</span>
                <span>Kafka</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔄</span>
                <span>gRPC</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🌐</span>
                <span>REST APIs</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">🔌</span>
                <span>WebSockets</span>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">📝</span>
                <span>Git</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
        <h2 className="font-serif text-3xl mb-6 text-center glow-text">Education</h2>
        
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm hover:border-primary/30 transition-colors">
          <div className="flex flex-wrap justify-between mb-4">
            <h3 className="font-serif text-xl">Manipal Institute of Technology</h3>
            <span className="text-foreground/70">July 2023 - Present</span>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p className="font-medium">B.Tech. in Computer Science and Engineering</p>
            <p className="text-primary font-medium">CGPA: 9.63/10</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Relevant Coursework</h4>
            <p className="text-foreground/70">Object Oriented Programming, Databases, Discrete Mathematics, Data Structures and Algorithms</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
        <h2 className="font-serif text-3xl mb-6 text-center glow-text">Featured Projects</h2>
        
        {/* Redis Server from Scratch */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6 shadow-sm hover:border-primary/30 transition-colors">
          <h3 className="font-serif text-2xl mb-4">Redis Server from Scratch</h3>
          <ul className="space-y-2 mb-4 list-disc pl-5 text-foreground/80">
            <li>Engineered a Redis-compatible server in Rust with custom TCP networking and low-level RESP protocol parsing.</li>
            <li>Supported data types (String, List, Hash, Set) with expiry logic, in-memory storage, and persistent models.</li>
            <li>Designed future-proof architecture for pub/sub channels.</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Rust</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Tokio</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Custom Protocols</span>
          </div>
        </div>
        
        {/* UptimeX */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6 shadow-sm hover:border-primary/30 transition-colors">
          <h3 className="font-serif text-2xl mb-4">UptimeX - Real-Time Server Monitoring Platform</h3>
          <ul className="space-y-2 mb-4 list-disc pl-5 text-foreground/80">
            <li>Developed a full-stack SaaS to monitor server uptime (HTTP, TCP, Databases) and send instant real-time alerts via WebSockets.</li>
            <li>Integrated GraphQL Subscriptions for sub-second alerting, SSL expiry tracking, and live trend analytics.</li>
            <li>Enabled self-serve public status pages for transparent server monitoring.</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Node.js</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Next.js</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">PostgreSQL</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">GraphQL</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">Sequelize</span>
            <span className="px-2 py-1 bg-secondary/70 rounded-full text-xs">WebSockets</span>
          </div>
        </div>
        
        {/* View more projects button */}
        <div className="flex justify-center mt-8">
          <GlowButton to="/projects">
            View All Projects
          </GlowButton>
        </div>
      </section>
    </div>
  );
};

export default Resume;
