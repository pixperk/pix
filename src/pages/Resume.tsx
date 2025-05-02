import AnimatedHeading from "@/components/AnimatedHeading";
import GlowButton from "@/components/GlowButton";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Briefcase, Cloud, Code, Database, Download, ExternalLink, Server } from "lucide-react";

// Import additional tech icons
import {
  SiApachekafka,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiGit,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiRust,
  SiSqlite,
  SiTrpc,
  SiTypescript
} from "react-icons/si";

const Resume = () => {
  // Function to handle PDF download
  const handleDownloadResume = () => {
    // Create a link to the PDF file
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf'; 
    link.download = 'Yashaswi_Mishra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in opacity-0">
        <AnimatedHeading className="font-serif text-5xl mb-4">
          Resume
        </AnimatedHeading>
        <p className="text-xl text-foreground/70">
          My professional experience and qualifications
        </p>
      </div>

      {/* Download Button - Enhanced with animation and styling */}
      <div className="flex justify-center mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <Button 
          size="lg" 
          onClick={handleDownloadResume}
          className="font-serif flex gap-2 bg-primary hover:bg-primary/90 px-6 py-6 relative group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
          <span>Download Resume PDF</span>
          <span className="absolute inset-0 w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
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

      {/* Skills - Updated with professional icons */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
        <h2 className="font-serif text-3xl mb-6 text-center glow-text">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Programming Languages */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl">Programming Languages</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-500">
                  <SiTypescript className="w-5 h-5" />
                </span>
                <span>TypeScript</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-400">
                  <SiGo className="w-5 h-5" />
                </span>
                <span>Go</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-orange-600">
                  <SiRust className="w-5 h-5" />
                </span>
                <span>Rust</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-yellow-400">
                  <SiJavascript className="w-5 h-5" />
                </span>
                <span>JavaScript</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-600">
                  <SiCplusplus className="w-5 h-5" />
                </span>
                <span>C/C++</span>
              </li>
            </ul>
          </div>
          
          {/* Backend Frameworks */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <Server className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl">Backend Frameworks</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-gray-500">
                  <SiExpress className="w-5 h-5" />
                </span>
                <span>Express.js</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-red-500">
                  <svg viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
                    <path d="M256 42.667L45.333 170.667v170.667L256 469.333l210.667-128V170.667L256 42.667zm0 42.666l169.333 102.4L256 290.133 86.667 187.733 256 85.333z"/>
                  </svg>
                </span>
                <span>Hono.js</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-orange-600">
                  <SiRust className="w-5 h-5" />
                </span>
                <span>Actix, Axum</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-400">
                  <SiGo className="w-5 h-5" />
                </span>
                <span>Gin</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-pink-600">
                  <SiGraphql className="w-5 h-5" />
                </span>
                <span>GraphQL</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-500">
                  <SiTrpc className="w-5 h-5" />
                </span>
                <span>tRPC</span>
              </li>
            </ul>
          </div>
          
          {/* Databases & ORMs */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl">Databases & ORMs</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-600">
                  <SiPostgresql className="w-5 h-5" />
                </span>
                <span>PostgreSQL</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-green-600">
                  <SiMongodb className="w-5 h-5" />
                </span>
                <span>MongoDB</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-red-500">
                  <SiRedis className="w-5 h-5" />
                </span>
                <span>Redis</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-500">
                  <SiMysql className="w-5 h-5" />
                </span>
                <span>MySQL</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-400">
                  <SiSqlite className="w-5 h-5" />
                </span>
                <span>SQLite</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-indigo-600">
                  <SiPrisma className="w-5 h-5" />
                </span>
                <span>Prisma ORM, Drizzle ORM</span>
              </li>
            </ul>
          </div>
          
          {/* Infrastructure & Tools */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <Cloud className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl">Infrastructure & Tools</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-500">
                  <SiDocker className="w-5 h-5" />
                </span>
                <span>Docker</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-black dark:text-white">
                  <SiApachekafka className="w-5 h-5" />
                </span>
                <span>Kafka</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-blue-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>gRPC</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-green-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3h18v18H3z M7 7h10v10H7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>REST APIs</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-purple-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>WebSockets</span>
              </li>
              <li className="flex items-center">
                <span className="w-7 h-7 flex items-center justify-center mr-3 text-red-500">
                  <SiGit className="w-5 h-5" />
                </span>
                <span>Git</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="font-serif text-3xl text-center glow-text">Education</h2>
        </div>
        
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
        <div className="flex items-center justify-center gap-3 mb-6">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="font-serif text-3xl text-center glow-text">Featured Projects</h2>
        </div>
        
        {/* Redis Server from Scratch */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6 shadow-sm hover:border-primary/30 transition-colors">
          <h3 className="font-serif text-2xl mb-4 flex items-center">
            <span>Redis Server from Scratch</span>
            <Award className="ml-2 h-5 w-5 text-yellow-500" />
          </h3>
          <ul className="space-y-2 mb-4 list-disc pl-5 text-foreground/80">
            <li>Engineered a Redis-compatible server in Rust with custom TCP networking and low-level RESP protocol parsing.</li>
            <li>Supported data types (String, List, Hash, Set) with expiry logic, in-memory storage, and persistent models.</li>
            <li>Designed future-proof architecture for pub/sub channels.</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <SiRust className="h-3 w-3 text-orange-600" />
              Rust
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-blue-500" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Tokio
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
              </svg>
              Custom Protocols
            </span>
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
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg className="h-3 w-3 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.186-.277-.066-.317.487-.169.582-.21 1.102-.502.056-.028.129-.018.185.015l1.873 1.115c.068.037.166.037.232 0l7.308-4.217c.07-.04.113-.122.113-.206v-8.435c0-.087-.043-.167-.113-.206l-7.308-4.219c-.068-.036-.166-.036-.232 0l-7.305 4.222c-.073.041-.113.122-.113.207v8.433c0 .084.043.164.113.204l2.002 1.157c1.079.541 1.741-.096 1.741-.737v-8.324c0-.116.092-.211.208-.211h.928c.116 0 .211.093.211.211v8.321c0 1.438-.783 2.263-2.146 2.263-.419 0-.75 0-1.673-.456l-1.913-1.107c-.475-.261-.769-.756-.769-1.279v-8.429c0-.524.294-1.019.769-1.28l7.304-4.222c.461-.258 1.077-.258 1.538 0l7.303 4.222c.477.263.771.756.771 1.28v8.429c0 .522-.294 1.016-.771 1.279l-7.304 4.222c-.238.132-.503.204-.786.204"/>
              </svg>
              Node.js
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg className="h-3 w-3 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.1128.0594-.1721.0689-.3389.0689-.2537 0-.3638-.0477-.4608-.2007-.0986-.1577-.1054-.21-.1054-3.9947v-3.8266l.067-.0949c.0376-.0516.1096-.1188.1721-.1618.1096-.0689.1637-.0812.329-.0812.1721 0 .2159.0123.3237.0689.0752.0406.1721.1336.2159.2132.016.0283 1.1311 1.6877 2.4776 3.6885 2.5939 3.872 2.7376 4.0786 2.7674 4.0786.0188 0 .0282-.0186 4.8067-7.2156l.8174-1.2077c.0469-.0689.1304-.1577.1869-.1999.0942-.0689.1216-.0764.2997-.0764.1796 0 .2043.0075.3036.0813.0726.0538.1612.1507.1963.2159.0519.0954.0541.1101.0541 1.8679 0 1.5368.0035 1.7853.0329 1.9003.0141.061.0376.1101.0519.1101.0752 0 1.0322-.7826 1.1161-.9139.3201-.4988.5883-1.0552.8035-1.6643.3106-.8735.4324-1.4857.4606-2.3312.0094-.3265.0047-.6339-.0141-.8181-.0798-1.0662-.3412-1.9776-.8221-2.9457-1.6464-3.3362-5.021-5.4338-8.8043-5.4429-.2512-.0013-.4629-.0013-.5895.0014z"/>
              </svg>
              Next.js
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <SiPostgresql className="h-3 w-3 text-blue-600" />
              PostgreSQL
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <SiGraphql className="h-3 w-3 text-pink-600" />
              GraphQL
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg className="h-3 w-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.89 15.672L6.255 17.5h11.49l2.365-1.828V8.5l-2.366-1.828H6.255L3.89 8.5v7.172zm17.45 1.9l-2.366 1.83H5.026l-2.366-1.83v-9.57l2.366-1.83h13.948l2.366 1.83v9.57z"/>
              </svg>
              Sequelize
            </span>
            <span className="px-3 py-1.5 bg-secondary/70 rounded-md text-xs flex items-center gap-1">
              <svg className="h-3 w-3 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              WebSockets
            </span>
          </div>
        </div>
        
        {/* View more projects button */}
        <div className="flex justify-center mt-8">
          <GlowButton to="/projects" className="flex items-center gap-2">
            <span>View All Projects</span>
            <ExternalLink className="h-4 w-4" />
          </GlowButton>
        </div>
      </section>
    </div>
  );
};

export default Resume;