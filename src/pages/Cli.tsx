
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Cli = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{type: 'input' | 'output', content: string}[]>([
    {type: 'output', content: "Welcome to Pixperk's Terminal. Type 'help' for available commands."}
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the input field when component mounts
    inputRef.current?.focus();
    
    // Add event listener for click to focus input
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Scroll to bottom of terminal when history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user input to history
    setHistory(prev => [...prev, {type: 'input', content: input}]);
    
    // Process command
    const command = input.trim().toLowerCase();
    let response = "";
    
    switch (command) {
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
        return;
      
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
    
    // Add response to history
    setTimeout(() => {
      setHistory(prev => [...prev, {type: 'output', content: response}]);
    }, 100);
    
    // Clear input
    setInput("");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div 
        className="w-full max-w-3xl h-[70vh] bg-black/90 rounded-lg border border-foreground/20 overflow-hidden flex flex-col"
      >
        {/* Terminal header */}
        <div className="bg-foreground/10 p-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-foreground/70">pixperk ~ terminal</span>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="flex-grow p-4 font-mono text-sm overflow-y-auto"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' ? (
                <div>
                  <span className="text-primary">pixperk@terminal</span>
                  <span className="text-foreground/70">:~$</span> {entry.content}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-foreground/90">{entry.content}</pre>
              )}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex mt-2">
            <span className="text-primary">pixperk@terminal</span>
            <span className="text-foreground/70">:~$</span>&nbsp;
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent border-none outline-none text-foreground"
              autoFocus
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-foreground/60">
        <p>Type 'help' for available commands or 'exit' to return to homepage.</p>
        <p className="mt-2 text-xs">Try <code>summon("kafka_cluster")</code> for a surprise! 🧙‍♂️</p>
      </div>
    </div>
  );
};

export default Cli;
