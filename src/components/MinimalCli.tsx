
import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MinimalCli = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([
    { type: "output", content: "Welcome to Pixperk Terminal! Type 'help' to see available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when history updates
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (command: string): string => {
    let response = "";
    
    switch (command.toLowerCase()) {
      case 'help':
        response = `
Available commands:
- whoami: Display information about me
- projects: List my projects
- blog: Show recent blog posts
- skills: List my technical skills
- contact: How to get in touch
- clear: Clear the terminal
- exit: Return to homepage
`;
        break;
      
      case 'whoami':
        response = `
Yashaswi Mishra (Pixperk)
Full Stack Developer based in India
Backend specialist with a love for elegant system design
`;
        break;
      
      case 'projects':
        response = `
Recent projects:
1. EventBridge - Distributed event processing system
2. DevNote - Markdown-first note taking app
3. DataVis Explorer - Interactive data visualization tool
4. MicroCache - Lightweight Redis-compatible caching server
5. CloudWatch - Real-time monitoring dashboard

Type 'open projects' to view the projects page.
`;
        break;
      
      case 'blog':
        response = `
Recent posts:
1. Building Resilient Systems: Lessons from Outages
2. The Art of Technical Writing
3. Rust vs. Go: When to Choose Which
4. Event-Driven Architecture Patterns
5. The Future of Web Development

Type 'open blog' to view the blog page.
`;
        break;
      
      case 'skills':
        response = `
Technical skills:
- Languages: TypeScript, JavaScript, Rust, Go
- Frontend: React, Next.js, TailwindCSS
- Backend: Node.js, Express, Actix
- Databases: PostgreSQL, MongoDB, Redis
- Tools: Docker, Kafka, Git
`;
        break;
      
      case 'contact':
        response = `
Get in touch:
- Email: hello@pixperk.dev
- Twitter: @pixperk
- GitHub: github.com/pixperk
- LinkedIn: linkedin.com/in/pixperk

Type 'open contact' to view the contact page.
`;
        break;
      
      case 'clear':
        setHistory([]);
        setInput("");
        return "";
      
      case 'exit':
        response = "Redirecting to homepage...";
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        break;
      
      case 'open projects':
        response = "Opening projects page...";
        setTimeout(() => {
          window.location.href = "/projects";
        }, 1000);
        break;
      
      case 'open blog':
        response = "Opening blog page...";
        setTimeout(() => {
          window.location.href = "/blog";
        }, 1000);
        break;
      
      case 'open contact':
        response = "Opening contact page...";
        setTimeout(() => {
          window.location.href = "/contact";
        }, 1000);
        break;
      
      case 'summon("kafka_cluster")':
        response = "🧙‍♂️ Kafka cluster summoned! Three brokers appear in a puff of distributed smoke.";
        break;
      
      case 'summon("bug_fix")':
        response = "🧙‍♂️ The bug fix spell was cast... but it created two new bugs! Such is the way of programming magic.";
        break;
      
      case 'summon("coffee")':
        response = "☕ A steaming cup of developer fuel appears! +10 to coding speed, -5 to sleep quality.";
        break;
        
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    return response;
  };

  return (
    <div 
      className={cn(
        "bg-gray-950 text-green-400 p-3 sm:p-4 rounded-lg border border-gray-800",
        "font-mono text-sm sm:text-base relative"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex gap-2 mb-3 md:mb-4 border-b border-gray-800 pb-2">
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"></div>
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500"></div>
        <div className="flex-grow text-center text-xs text-gray-400">pixperk@terminal</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-48 sm:h-60 pr-2 sm:pr-4 overflow-y-auto terminal-scrollbar terminal-content"
      >
        {history.map((item, i) => (
          <div key={i} className="mb-1">
            {item.type === "input" ? (
              <div className="flex">
                <span className="text-blue-400 mr-1">$</span>
                <span>{item.content}</span>
              </div>
            ) : (
              <div className="text-gray-300 ml-2 sm:ml-3 whitespace-pre-wrap text-xs sm:text-sm">{item.content}</div>
            )}
          </div>
        ))}
        
        <div className="flex">
          <span className="text-blue-400 mr-1">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() !== "") {
                setHistory([
                  ...history,
                  { type: "input", content: input },
                  { type: "output", content: handleCommand(input.trim()) }
                ]);
                setInput("");
              }
            }}
            className="bg-transparent outline-none border-none flex-grow text-green-400 text-xs sm:text-sm"
            spellCheck={false}
            autoComplete="off"
            placeholder={isMobile ? "Type command..." : ""}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MinimalCli;
