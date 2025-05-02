import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { blogPosts, getRecentPosts } from "@/data/blog";
import { Project, projects } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Code,
  Coffee,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Hash,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Search,
  Twitter,
  User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Define command types for better organization
type CommandType = {
  name: string;
  description: string;
  aliases?: string[];
  hidden?: boolean;
  handler: (args?: string[]) => string | JSX.Element | Promise<string | JSX.Element>;
};

// Define history item types with enhanced properties
type HistoryItem = {
  id: number;
  type: 'input' | 'output' | 'error' | 'info' | 'success' | 'warning';
  content: string | JSX.Element;
  timestamp: Date;
};

// ASCII art for banner - optimized for both dark and light themes
const ASCII_BANNER = `
██████╗ ██╗██╗  ██╗██████╗ ███████╗██████╗ ██╗  ██╗
██╔══██╗██║╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║ ██╔╝
██████╔╝██║ ╚███╔╝ ██████╔╝█████╗  ██████╔╝█████╔╝ 
██╔═══╝ ██║ ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██╔═██╗ 
██║     ██║██╔╝ ██╗██║     ███████╗██║  ██║██║  ██╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const Cli = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [idCounter, setIdCounter] = useState(0);
  const welcomeAdded = useRef(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  // Execute a command programmatically
  const executeCommand = async (commandString: string) => {

    const trimmedCommand = commandString.trim();
    if (!trimmedCommand) return;
    
    // Add command to history
    addToHistory('input', trimmedCommand);
    
    // Add to command history for up/down navigation
    setCommandHistory(prev => [trimmedCommand, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    
    // Process command directly
    await processCommand(trimmedCommand);
  };

 
 // Helper to add items to history
 const addToHistory = (type: HistoryItem['type'], content: HistoryItem['content']) => {
  const newId = idCounter + 1;
  setIdCounter(newId);
  
  setHistory(prev => [
    ...prev, 
    { 
      id: newId, 
      type, 
      content, 
      timestamp: new Date() 
    }
  ]);
};

  useEffect(() => {
    if (!welcomeAdded.current) {
      const welcomeMessage = (
        <div className="space-y-2 animate-fade-in">
          <pre className={cn(
            "text-primary font-mono text-xs sm:text-sm leading-tight whitespace-pre overflow-x-auto",
            theme === "dark" ? "text-primary/90" : "text-primary/80"
          )}>
            {ASCII_BANNER}
          </pre>
          <p className="mb-1">Welcome to Pixperk's Terminal v2.0</p>
          <p className="mb-2 text-foreground/80">Type <span className="text-primary font-bold">help</span> for available commands</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => executeCommand("whoami")}>
              <User className="h-3 w-3 mr-1" /> whoami
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => executeCommand("projects")}>
              <Code className="h-3 w-3 mr-1" /> projects
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => executeCommand("blog")}>
              <FileText className="h-3 w-3 mr-1" /> blog
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => executeCommand('summon coffee')}>
              <Coffee className="h-3 w-3 mr-1" /> summon coffee
            </Button>
          </div>
        </div>
      );
      addToHistory('info', welcomeMessage);
      welcomeAdded.current = true; // <-- Set the ref so it never adds again
      setIsInitialized(true);
    }
  // Only run on mount and theme change (if you want theme to affect banner)
  // eslint-disable-next-line
  }, [theme]);

  // ...rest of your component...
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

 

  

  // Handle command execution
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    // Add user input to history
    addToHistory('input', trimmedInput);
    
    // Add to command history for up/down navigation
    setCommandHistory(prev => [trimmedInput, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    
    // Process command
    processCommand(trimmedInput);
    
    // Clear input
    setInput("");
  };

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
        return;
      }
      
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
    // Tab completion (simple version)
    else if (e.key === 'Tab') {
      e.preventDefault();
      
      const currentInput = input.toLowerCase();
      if (!currentInput) return;
      
      // Find a command that starts with the current input
      const matchingCommand = commands.find(cmd => 
        cmd.name.startsWith(currentInput) || 
        cmd.aliases?.some(alias => alias.startsWith(currentInput))
      );
      
      if (matchingCommand) {
        setInput(matchingCommand.name);
      }
    }
  };

  // Process the command and arguments
  const processCommand = async (commandString: string) => {
    // Split the input into command and arguments
    const args = commandString.split(' ');
    const commandName = args.shift()?.toLowerCase() || '';
    
    // Special case for summon function which might include spaces inside the parentheses
    if (commandName === 'summon' && commandString.includes('(') && commandString.includes(')')) {
      const match = commandString.match(/summon\(["'](.+)["']\)/i);
      if (match && match[1]) {
        processSummonCommand(match[1]);
        return;
      }
    }
    
    // Find command by name or alias
    const command = commands.find(cmd => 
      cmd.name === commandName || 
      cmd.aliases?.includes(commandName)
    );
    
    if (command) {
      try {
        const result = await command.handler(args.length > 0 ? args : undefined);
        if (result) {
          addToHistory('output', result);
        }
      } catch (error) {
        addToHistory('error', `Error executing command: ${error}`);
      }
    } else {
      addToHistory('error', `Command not found: ${commandName}. Type 'help' for available commands.`);
    }
  };

  // Special handler for summon commands
  const processSummonCommand = (item: string) => {
    const lowerItem = item.toLowerCase();
    
    switch(lowerItem) {
      case 'coffee':
        addToHistory('success', '☕ A steaming cup of developer fuel appears! +10 to coding speed, -5 to sleep quality.');
        break;
      case 'kafka_cluster':
        addToHistory('success', '🧙‍♂️ Kafka cluster summoned! Three brokers appear in a puff of distributed smoke.');
        break;
      case 'bug_fix':
        addToHistory('warning', '🧙‍♂️ The bug fix spell was cast... but it created two new bugs! Such is the way of programming magic.');
        break;
      
      default:
        addToHistory('error', `Cannot summon "${item}". Try coffee, bug_fix, kafka_cluster`);
    }
  };

  // Command definitions
  const commands: CommandType[] = [
    {
      name: "help",
      description: "Display available commands",
      handler: () => {
        const visibleCommands = commands.filter(cmd => !cmd.hidden);
        return (
          <div className="space-y-1">
            <p className="font-bold text-primary mb-2">Available commands:</p>
            {visibleCommands.map((cmd) => (
              <div key={cmd.name} className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-bold">{cmd.name}</span>
                <span className="text-foreground/80">{cmd.description}</span>
              </div>
            ))}
            <p className="mt-3 text-secondary-foreground">Tip: Try using arrows ↑↓ to navigate command history</p>
          </div>
        );
      }
    },
    {
      name: "whoami",
      description: "Display information about me",
      handler: () => (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              YM
            </div>
            <div>
              <p className="font-bold">Yashaswi Mishra (Pixperk)</p>
              <p className="text-xs text-foreground/70">Full Stack Developer</p>
            </div>
          </div>
          
          <p>Backend specialist with a love for elegant system design based in India.</p>
          
          <div className="mt-3 pt-2 border-t border-border">
            <p className="text-secondary-foreground">Quick links:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => executeCommand("github")}
              >
                <Github className="h-3 w-3 mr-1" /> GitHub
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => executeCommand("twitter")}
              >
                <Twitter className="h-3 w-3 mr-1" /> Twitter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => executeCommand("linkedin")}
              >
                <Linkedin className="h-3 w-3 mr-1" /> LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => executeCommand("contact")}
              >
                <Mail className="h-3 w-3 mr-1" /> Contact
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      name: "projects",
      description: "List my projects",
      handler: () => (
        <div className="space-y-4">
          <p className="font-bold text-primary mb-2">Recent projects:</p>
          
          {projects.slice(0, 5).map((project, idx) => (
            <div key={idx} className={cn(
              "p-2 rounded-md",
              theme === "dark" ? "hover:bg-muted/30" : "hover:bg-muted/50",
              "transition-colors"
            )}>
              <div className="flex justify-between">
                <h3 className="font-bold">{project.title}</h3>
                <div className="flex items-center text-xs text-foreground/60">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded",
                    project.type === "backend" ? "bg-blue-500/10 text-blue-500" : 
                    project.type === "frontend" ? "bg-pink-500/10 text-pink-500" : 
                    "bg-purple-500/10 text-purple-500"
                  )}>
                    {project.type}
                  </span>
                </div>
              </div>
              <p className="text-foreground/80">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-2 text-secondary-foreground flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => executeCommand("project 1")}
            >
              <Search className="h-3 w-3 mr-1" /> View EventBridge
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => executeCommand("project 2")}
            >
              <Search className="h-3 w-3 mr-1" /> View DevNote
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => executeCommand("open projects")}
            >
              <ArrowRight className="h-3 w-3 mr-1" /> View All Projects
            </Button>
          </div>
        </div>
      )
    },
    {
      name: "project",
      description: "View details about a specific project",
      handler: (args) => {
        if (!args || args.length === 0) {
          return "Usage: project [number or name]";
        }
        
        let project: Project | undefined;
        
        // Try to find by number
        const projectNumber = parseInt(args[0]);
        if (!isNaN(projectNumber)) {
          project = projects.find(p => p.id === projectNumber);
        } 
        // Try to find by partial name match
        else {
          const searchTerm = args.join(' ').toLowerCase();
          project = projects.find(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.slug.toLowerCase().includes(searchTerm)
          );
        }
        
        if (!project) {
          return `Project not found. Use 'projects' to see available projects.`;
        }
        
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-primary">{project.title}</h3>
              <span className={cn(
                "px-2 py-0.5 rounded text-xs",
                project.type === "backend" ? "bg-blue-500/10 text-blue-500" : 
                project.type === "frontend" ? "bg-pink-500/10 text-pink-500" : 
                "bg-purple-500/10 text-purple-500"
              )}>
                {project.type}
              </span>
            </div>
            
            <p className="text-foreground/90">{project.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-foreground/60 mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {project.languages.map((lang, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 text-xs rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-foreground/60 mb-1">Frameworks:</p>
                <div className="flex flex-wrap gap-1">
                  {project.frameworks.map((framework, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-purple-500/10 text-purple-500 text-xs rounded">
                      {framework}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              <p className="text-xs text-foreground/60 mr-1">Tags:</p>
              {project.tags.map((tag, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="h-3 w-3 mr-1" /> GitHub Repo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => window.open(project.liveUrl, "_blank")}
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Live Demo
              </Button>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-7"
                onClick={() => executeCommand(`open project ${project?.slug}`)}
              >
                <ArrowRight className="h-3 w-3 mr-1" /> View Full Details
              </Button>
            </div>
          </div>
        );
      }
    },
    {
      name: "blog",
      description: "Show recent blog posts",
      handler: () => {
        const recentBlogPosts = getRecentPosts(5);
        
        return (
          <div className="space-y-4">
            <p className="font-bold text-primary mb-2">Recent blog posts:</p>
            
            {recentBlogPosts.map((post, idx) => (
              <div key={idx} className={cn(
                "p-2 rounded-md",
                theme === "dark" ? "hover:bg-muted/30" : "hover:bg-muted/50", 
                "transition-colors"
              )}>
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-foreground/80 mt-1 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <div className="flex items-center text-xs text-foreground/60">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  
                  {post.externalLinks && (
                    <div className="flex items-center gap-2">
                      {post.externalLinks.medium && (
                        <a 
                          href={post.externalLinks.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-foreground/60 hover:text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3 mr-0.5" />
                          Medium
                        </a>
                      )}
                      {post.externalLinks.devTo && (
                        <a 
                          href={post.externalLinks.devTo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-foreground/60 hover:text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3 mr-0.5" />
                          DEV
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-foreground/60 text-xs">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-2 text-secondary-foreground flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => executeCommand(`post "${blogPosts[0].slug}"`)}
              >
                <Search className="h-3 w-3 mr-1" /> View Post
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => executeCommand("tags")}
              >
                <Hash className="h-3 w-3 mr-1" /> Browse Tags
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => executeCommand("open blog")}
              >
                <ArrowRight className="h-3 w-3 mr-1" /> View All Posts
              </Button>
            </div>
          </div>
        );
      }
    },
    {
      name: "post",
      description: "View a specific blog post",
      aliases: ["article"],
      handler: (args) => {
        if (!args || args.length === 0) {
          return "Usage: post [slug or title]";
        }
        
        // Try to extract slug from quotes if present
        let searchTerm = args.join(' ');
        if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
          searchTerm = searchTerm.slice(1, -1);
        }
        
        // Search for post by slug or title
        const post = blogPosts.find(p => 
          p.slug === searchTerm || 
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (!post) {
          return `Post not found. Use 'blog' to see available posts.`;
        }
        
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary">{post.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </div>
            
            <p className="text-foreground/90">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="pt-2 flex flex-wrap gap-2">
              {post.externalLinks && (
                <>
                  {post.externalLinks.medium && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => window.open(post.externalLinks?.medium, "_blank")}
                    >
                      <LinkIcon className="h-3 w-3 mr-1" /> Read on Medium
                    </Button>
                  )}
                  
                  {post.externalLinks.devTo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => window.open(post.externalLinks?.devTo, "_blank")}
                    >
                      <LinkIcon className="h-3 w-3 mr-1" /> Read on DEV
                    </Button>
                  )}
                </>
              )}
              
              <Button
                variant="default"
                size="sm"
                className="text-xs h-7"
                onClick={() => executeCommand(`open post ${post.slug}`)}
              >
                <ArrowRight className="h-3 w-3 mr-1" /> Read Full Article
              </Button>
            </div>
            
            <div className="mt-2 pt-3 border-t border-border">
              <p className="text-sm text-foreground/70">Related commands:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => executeCommand("blog")}
                >
                  <FileText className="h-3 w-3 mr-1" /> View all posts
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => executeCommand(`tag "${post.tags[0]}"`)}
                >
                  <Hash className="h-3 w-3 mr-1" /> View posts with tag "{post.tags[0]}"
                </Button>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      name: "tags",
      description: "List all blog tags",
      handler: () => {
        // Get all unique tags across blog posts
        const allTags = Array.from(
          new Set(blogPosts.flatMap(post => post.tags))
        ).sort();
        
        // Count posts per tag
        const tagCounts: Record<string, number> = {};
        allTags.forEach(tag => {
          tagCounts[tag] = blogPosts.filter(post => post.tags.includes(tag)).length;
        });
        
        return (
          <div className="space-y-3">
            <p className="font-bold text-primary mb-2">Available tags:</p>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => executeCommand(`tag "${tag}"`)}
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {tag} <span className="ml-1 text-foreground/60">({tagCounts[tag]})</span>
                </Button>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      name: "tag",
      description: "Show posts with a specific tag",
      handler: (args) => {
        if (!args || args.length === 0) {
          return "Usage: tag [tagname]";
        }
        
        // Extract tag name from arguments
        let tagName = args.join(' ');
        if (tagName.startsWith('"') && tagName.endsWith('"')) {
          tagName = tagName.slice(1, -1);
        }
        
        // Find posts with this tag
        const matchingPosts = blogPosts.filter(post => 
          post.tags.some(tag => tag.toLowerCase() === tagName.toLowerCase())
        );
        
        if (matchingPosts.length === 0) {
          return `No posts found with tag "${tagName}".`;
        }
        
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="font-bold text-primary">Posts tagged with:</p>
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-sm rounded">
                {tagName}
              </span>
              <span className="text-xs text-foreground/60">
                ({matchingPosts.length} post{matchingPosts.length !== 1 ? 's' : ''})
              </span>
            </div>
            
            <div className="space-y-2">
              {matchingPosts.map((post, idx) => (
                <div key={idx} className="p-2 rounded-md hover:bg-muted/30 transition-colors">
                  <h3 className="font-bold">{post.title}</h3>
                  <div className="flex items-center text-xs text-foreground/60 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 mt-1 p-0"
                    onClick={() => executeCommand(`post "${post.slug}"`)}
                  >
                    <ArrowRight className="h-3 w-3 mr-1" /> View post
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm" 
              className="text-xs h-7 mt-2"
              onClick={() => executeCommand("tags")}
            >
              <Hash className="h-3 w-3 mr-1" /> Back to all tags
            </Button>
          </div>
        );
      }
    },
    {
      name: "skills",
      description: "List my technical skills",
      handler: () => (
        <div className="space-y-3">
          <p className="font-bold text-primary mb-2">Technical skills:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="font-medium">Languages</p>
              <div className="flex flex-wrap gap-1">
                {["TypeScript", "JavaScript", "Rust", "Go", "Python"].map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">Frontend</p>
              <div className="flex flex-wrap gap-1">
                {["React", "Next.js", "TailwindCSS", "Framer Motion", "Redux"].map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">Backend</p>
              <div className="flex flex-wrap gap-1">
                {["Node.js", "Express", "Actix", "GraphQL", "REST"].map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">DevOps & Tools</p>
              <div className="flex flex-wrap gap-1">
                {["Docker", "Kubernetes", "CI/CD", "AWS", "Git"].map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mt-3 pt-3 border-t border-border">
            <p className="font-medium">Databases</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "PostgreSQL", level: 90 },
                { name: "MongoDB", level: 85 },
                { name: "Redis", level: 80 },
                { name: "Elasticsearch", level: 75 },
                { name: "SQLite", level: 70 }
              ].map((db, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span className="text-xs">{db.name}</span>
                  <div className="w-24 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        theme === "dark" ? "bg-primary" : "bg-primary/80"
                      }`}
                      style={{ width: `${db.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      name: "contact",
      description: "How to get in touch",
      handler: () => (
        <div className="space-y-4">
          <p className="font-bold text-primary mb-2">Contact information:</p>
          
          <div className="space-y-3">
            <div className="flex gap-3 items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="bg-primary/10 text-primary p-1.5 rounded">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-foreground/80">hello@pixperk.dev</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => {
                  navigator.clipboard.writeText("hello@pixperk.dev");
                  addToHistory('success', 'Email copied to clipboard!');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-3 items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="bg-[#1DA1F2]/10 text-[#1DA1F2] p-1.5 rounded">
                <Twitter className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Twitter</p>
                <p className="text-foreground/80">@pixperk</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => executeCommand("twitter")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-3 items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="bg-[#181717]/10 text-foreground p-1.5 rounded">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-foreground/80">github.com/pixperk</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => executeCommand("github")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-3 items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="bg-[#0A66C2]/10 text-[#0A66C2] p-1.5 rounded">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">LinkedIn</p>
                <p className="text-foreground/80">linkedin.com/in/pixperk</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => executeCommand("linkedin")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <Button 
              variant="default" 
              className="gap-2"
              onClick={() => executeCommand("open contact")}
            >
              <Mail className="h-4 w-4" />
              Open Contact Page
            </Button>
          </div>
        </div>
      )
    },
    {
      name: "clear",
      aliases: ["cls"],
      description: "Clear the terminal",
      handler: () => {
        setHistory([]);
        return "";
      }
    },
    {
      name: "exit",
      description: "Return to homepage",
      handler: () => {
        addToHistory('info', "Redirecting to homepage...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return "";
      }
    },
    {
      name: "github",
      description: "Open my GitHub profile",
      handler: () => {
        window.open("https://github.com/pixperk", "_blank");
        return "Opening GitHub profile in a new tab...";
      }
    },
    {
      name: "twitter",
      description: "Open my Twitter profile",
      handler: () => {
        window.open("https://twitter.com/pixperk", "_blank");
        return "Opening Twitter profile in a new tab...";
      }
    },
    {
      name: "linkedin",
      description: "Open my LinkedIn profile",
      handler: () => {
        window.open("https://linkedin.com/in/pixperk", "_blank");
        return "Opening LinkedIn profile in a new tab...";
      }
    },
    {
      name: "open",
      description: "Open a page or URL",
      handler: (args) => {
        if (!args || args.length === 0) {
          return "Please specify what to open: open [projects|blog|contact|project <slug>|post <slug>]";
        }
        
        const target = args[0].toLowerCase();
        
        switch (target) {
          case "projects":
            addToHistory('info', "Opening projects page...");
            setTimeout(() => { window.location.href = "/projects"; }, 800);
            break;
          case "blog":
            addToHistory('info', "Opening blog page...");
            setTimeout(() => { window.location.href = "/blog"; }, 800);
            break;
          case "contact":
            addToHistory('info', "Opening contact page...");
            setTimeout(() => { window.location.href = "/contact"; }, 800);
            break;
          case "project":
            if (args.length > 1) {
              const slug = args.slice(1).join('-');
              addToHistory('info', `Opening project: ${slug}...`);
              setTimeout(() => { window.location.href = `/projects/${slug}`; }, 800);
            } else {
              return "Please specify a project slug: open project <slug>";
            }
            break;
          case "post":
            if (args.length > 1) {
              const slug = args.slice(1).join('-');
              addToHistory('info', `Opening blog post: ${slug}...`);
              setTimeout(() => { window.location.href = `/blog/${slug}`; }, 800);
            } else {
              return "Please specify a post slug: open post <slug>";
            }
            break;
          default:
            return `Unknown target: ${target}. Try projects, blog, contact, project <slug>, or post <slug>.`;
        }
        return "";
      }
    },
    {
      name: "summon",
      description: "Summon something using developer magic",
      handler: (args) => {
        if (!args || args.length === 0) {
          return 'Usage: summon("item"). Try coffee, bug_fix, kafka_cluster, dark_theme, or light_theme.';
        }
        
        const item = args.join(' ');
        processSummonCommand(item);
        return "";
      }
    },
    {
      name: "echo",
      description: "Display a line of text",
      handler: (args) => {
        if (!args || args.length === 0) {
          return "";
        }
        return args.join(' ');
      }
    },
    
    {
      name: "about",
      description: "About this terminal",
      handler: () => (
        <div className="space-y-3">
          <p className="font-bold text-primary">About This Terminal</p>
          <p>
            This interactive CLI was built using React, TypeScript, and Tailwind CSS.
            It provides a fun way to explore my portfolio and projects.
          </p>
          <p className="text-foreground/80 text-sm">
            Built with 💙 using modern web technologies and a sprinkle of developer magic.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">React</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">TypeScript</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">Tailwind CSS</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">Framer Motion</span>
          </div>
          <p className="text-xs text-foreground/60 mt-2">
            Type <code className="bg-muted px-1 rounded">help</code> to see available commands.
          </p>
        </div>
      )
    },
    {
      name: "version",
      description: "Show terminal version",
      handler: () => "Pixperk Terminal v2.0.0"
    }
  ];

  // Render different history item types
  const renderHistoryItem = (item: HistoryItem) => {
    switch (item.type) {
      case 'input':
        return (
          <div className="group">
            <span className="text-primary">pixperk@terminal</span>
            <span className="text-foreground/70">:~$</span> {item.content}
            <span className="invisible group-hover:visible text-foreground/40 text-xs ml-2">
              {item.timestamp.toLocaleTimeString()} 
            </span>
          </div>
        );
      case 'error':
        return (
          <div className="text-red-400">
            {typeof item.content === 'string' ? item.content : item.content}
          </div>
        );
      case 'info':
        return (
          <div className="text-blue-400">
            {typeof item.content === 'string' ? item.content : item.content}
          </div>
        );
      case 'success':
        return (
          <div className="text-green-400">
            {typeof item.content === 'string' ? item.content : item.content}
          </div>
        );
      case 'warning':
        return (
          <div className="text-yellow-400">
            {typeof item.content === 'string' ? item.content : item.content}
          </div>
        );
      case 'output':
      default:
        return (
          <div className="text-foreground/90 whitespace-pre-wrap">
            {typeof item.content === 'string' ? item.content : item.content}
          </div>
        );
    }
  };

  return (
    <div className="min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center px-2">
      <div 
        className={`w-full max-w-3xl h-[60vh] sm:h-[70vh] rounded-lg border overflow-hidden flex flex-col ${
          theme === "dark" 
            ? "bg-black/90 border-foreground/20" 
            : "bg-slate-100/95 border-foreground/10"
        }`}
      >
        {/* Terminal header */}
        <div className={`p-2 flex items-center ${theme === "dark" ? "bg-foreground/10" : "bg-foreground/5"}`}>
          <div className="flex space-x-2 mr-3 sm:mr-4">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-foreground/70">pixperk ~ terminal</span>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="flex-grow p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-y-auto terminal-scrollbar terminal-content"
        >
          <AnimatePresence>
            {history.map((entry) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                {renderHistoryItem(entry)}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} className="flex mt-2">
            <span className="text-primary">pixperk@terminal</span>
            <span className="text-foreground/70">:~$</span>&nbsp;
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-none outline-none text-foreground text-xs sm:text-sm"
              autoFocus
              aria-label="Terminal input"
              placeholder={isMobile ? "Type command..." : ""}
            />
          </form>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-center text-foreground/60 px-2">
        <p>Type 'help' for available commands or 'exit' to return to homepage.</p>
        <p className="mt-1.5 sm:mt-2 text-xs">Try <code className={`px-1.5 py-0.5 rounded ${theme === "dark" ? "bg-secondary/40" : "bg-secondary/20"}`}>summon coffee</code> for a surprise! 🧙‍♂️</p>
      </div>

      {/* Add some custom styles to make scrollbar match the theme */}
      <style>
        {`
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"};
          border-radius: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"};
          border-radius: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"};
        }
        .terminal-content a {
          color: ${theme === "dark" ? "#60a5fa" : "#2563eb"};
          text-decoration: underline;
          text-decoration-thickness: 1px;
        }
        `}
      </style>
    </div>
  );
};

export default Cli;