import GlowButton from "@/components/GlowButton";
import Metadata from "@/components/Metadata";
import { useTheme } from "@/components/ThemeProvider";
import { getRecentPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Calendar, ChevronDown, Code, Coffee, Lightbulb, Mail, Music, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const recentBlog = getRecentPosts(1)[0];
  const recentProject = projects[0]
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" }
    })
  };

  // Rough highlight colors based on theme
  const highlightStyle = {
    position: 'relative',
    display: 'inline-block',
    zIndex: 1
  } as React.CSSProperties;

  const highlightBefore = {
    position: 'absolute',
    content: '""',
    left: '-5px',
    right: '-5px',
    top: '60%',
    height: '30%',
    zIndex: -1,
    transform: 'rotate(-1deg)',
    borderRadius: '2px',
    background: theme === 'dark' ? 'rgba(155, 135, 245, 0.25)' : 'rgba(155, 135, 245, 0.2)'
  } as React.CSSProperties;

  return (
    <>
     <Metadata 
        title="Yashaswi Mishra | Pixperk" 
        description="Backend-heavy full stack developer specializing in distributed systems, real-time applications, and innovative solutions. Welcome to my portfolio."
      />
    <div className="flex flex-col">
      {/* Hero section with improved spacing */}
      <section className="min-h-[90vh] flex flex-col justify-center relative px-4 pt-12 pb-20">
        <motion.div 
          className="container mx-auto max-w-5xl flex flex-col items-center justify-center h-full"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-8 w-full"
            variants={fadeInUp}
            custom={1}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-2">
              <span className="font-light text-foreground/70">Hey, I am </span>
              <span className="font-medium">Yashaswi</span>
              <span className="text-primary font-light"> — </span>
              <span className="font-light italic text-foreground/90">aka </span>
              <span className="relative">
          <span className="text-primary font-medium">Pixperk</span>
          <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary/30 rounded-full"></span>
              </span>
            </h1>
          </motion.div>

          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl mb-16 text-foreground/80 max-w-3xl mx-auto text-center font-light leading-relaxed"
            variants={fadeInUp}
            custom={2}
          >
            I build for the web, I write for the curious, and I <span style={{...highlightStyle}}>
              <span style={{position: 'relative', zIndex: 2}}>break things</span>
              <span style={{...highlightBefore}}></span>
            </span> till they work beautifully.
          </motion.h2>

          <motion.div 
            className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-14 text-center sm:px-6"
            variants={fadeInUp}
            custom={3}
          >
            <p className="mb-4">
              I'm a <span style={{...highlightStyle, marginLeft: '6px', marginRight: '6px'}}>
          <span style={{position: 'relative', zIndex: 2}}>backend heavy full stack</span>
          <span style={{...highlightBefore, background: theme === 'dark' ? 'rgba(200, 70, 200, 0.25)' : 'rgba(217, 70, 239, 0.2)'}}></span>
              </span>  developer with a passion for 
              <span style={{...highlightStyle, marginLeft: '6px', marginRight: '6px'}}>
          <span style={{position: 'relative', zIndex: 2}}>elegant systems design</span>
          <span style={{...highlightBefore, background: theme === 'dark' ? 'rgba(217, 70, 239, 0.25)' : 'rgba(217, 70, 239, 0.2)'}}></span>
              </span> 
              and thoughtful architecture.
            </p>
            <p>
              Currently crafting scalable solutions with Next.js, Rust, and event-driven architectures, 
              while exploring the beauty of distributed systems.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full"
            variants={fadeInUp}
            custom={4}
          >
            <GlowButton to="/projects" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto px-6">
              View Projects
            </GlowButton>
            <GlowButton showArrow={true} to="/blog" variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto px-6">
              Read Blog
            </GlowButton>
          </motion.div>

          {/* Scroll indicator with improved animation */}
          <motion.a 
  href="#now-section"
  className="absolute bottom-8 left-0 right-0 mx-auto w-fit text-foreground/60 hover:text-primary transition-colors flex flex-col items-center"
  aria-label="Scroll to Now section"
  initial={{ opacity: 0, y: -10 }}
  animate={{ 
    opacity: 1, 
    y: [0, 10, 0],
    transition: {
      delay: 1.2,
      y: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }}
>
  <span className="text-sm mb-1 opacity-70">What I'm up to</span>
  <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
</motion.a>
        </motion.div>
      </section>

      {/* Now Section with Beautiful Sticky Notes */}
      <section id="now-section" className="py-16 md:py-24 rounded-xl px-4 bg-transparent relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
        <span className="text-primary font-medium">/</span>
        <span className="font-serif font-light">now</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
        A snapshot of what I'm focused on at this moment in time, 
        random thoughts, and digital sticky notes from my workspace.
          </p>
        </motion.div>

        {/* Sticky Notes Row - Enhanced with better animations */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          {/* Current Project - Yellow Note */}
          <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          y: -5, 
          boxShadow: theme === "dark" 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)" 
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
        }}
        viewport={{ once: true }}
        className={cn(
          "p-6 rounded-lg shadow-md transform -rotate-2 relative",
          theme === "dark" ? "bg-amber-400/90 text-black" : "bg-amber-300"
        )}
          >
        {/* Pin decoration */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-slate-800 shadow-md border border-slate-700 z-10" />
        
        <div className="font-serif italic text-lg mb-2 flex items-center">
          <Code className="h-4 w-4 mr-2" />
          Current Project
        </div>
        <h3 className="text-xl font-medium mb-2">{recentProject.title}</h3>
        <p className="mb-4 font-medium">{recentProject.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {recentProject.frameworks.map((framework) => (<span id={framework} className="px-2 py-1 text-xs rounded-full bg-black/10 font-mono">{framework}</span>))}
          {recentProject.tags.map((framework) => (<span id={framework} className="px-2 py-1 text-xs rounded-full bg-black/10 font-mono">{framework}</span>))}
          {recentProject.languages.map((framework) => (<span id={framework} className="px-2 py-1 text-xs rounded-full bg-black/10 font-mono">{framework}</span>))}
        
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-black/30 rounded-full" style={{ width: `${recentProject.completionPercent}%` }}></div>
          </div>
          <span className="text-sm font-medium whitespace-nowrap">{recentProject.completionPercent}% complete</span>
        </div>
        
        <Link to={`/projects/${recentProject.slug}`} className="absolute inset-0 w-full h-full z-0" aria-label="View EventBridge project">
          <span className="sr-only">View project details</span>
        </Link>
          </motion.div>

          {/* Reading List - Blue Note */}
          <motion.div
        initial={{ opacity: 0, y: 40, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          y: -5,
          boxShadow: theme === "dark" 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)" 
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
        }}
        viewport={{ once: true }}
        className={cn(
          "p-6 rounded-lg shadow-md transform rotate-1 relative",
          theme === "dark" ? "bg-blue-300/90 text-black" : "bg-blue-200"
        )}
          >
        {/* Pin decoration */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-slate-800 shadow-md border border-slate-700 z-10" />
        
        <div className="font-serif italic text-lg mb-2 flex items-center">
          <Bookmark className="h-4 w-4 mr-2" />
          Reading List
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="min-w-[16px] mt-1">📕</div>
            <div>
          <p className="font-medium">Designing Data-Intensive Applications</p>
          <p className="text-sm opacity-70">by Martin Kleppmann</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-[16px] mt-1">📰</div>
            <div>
          <p className="font-medium">How Discord Stores Trillions of Messages</p>
          <p className="text-sm opacity-70">Discord Engineering Blog</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-[16px] mt-1">📘</div>
            <div>
          <p className="font-medium">Rust for Rustaceans</p>
          <p className="text-sm opacity-70">by Jon Gjengset</p>
            </div>
          </li>
        </ul>
          </motion.div>

          {/* Thoughts Note - Pink Note */}
          <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          y: -5,
          boxShadow: theme === "dark" 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)" 
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
        }}
        viewport={{ once: true }}
        className={cn(
          "p-6 rounded-lg shadow-md transform -rotate-1 relative",
          theme === "dark" ? "bg-rose-300/90 text-black" : "bg-rose-200"
        )}
          >
        {/* Pin decoration */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-slate-800 shadow-md border border-slate-700 z-10" />
        
        <div className="font-serif italic text-lg mb-2 flex items-center">
          <Lightbulb className="h-4 w-4 mr-2" />
          Random Thoughts
        </div>
        <p className="mb-3 font-medium">Why are monitoring systems so complex yet so critical?</p>
        <p className="mb-3 text-sm">The best architecture decisions are usually the boring ones. Flashy tech rarely equals stable production.</p>
        <p className="text-sm flex items-center">
          <span className="inline-block w-4 h-4 mr-2 border border-black/20 rounded-sm"></span>
          Write that article about Rust async patterns I've been putting off...
        </p>
          </motion.div>
        </div>

        {/* Status Cards Row - Animated better */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10">
          {/* Cards with staggered animations */}
          {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2 + (index * 0.1),
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ y: -3 }}
          viewport={{ once: true }}
          className={cn(
            "p-4 rounded-lg border",
            theme === "dark" 
          ? "bg-foreground/5 border-foreground/10 backdrop-blur-sm" 
          : "bg-white border-foreground/5 shadow-sm"
          )}
        >
          {index === 0 && (
            <>
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">Learning</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  theme === "dark" ? "bg-green-400" : "bg-green-600"
                )}></span>
                <span className="font-medium">Distributed Systems</span>
              </div>
              <p className="text-sm text-foreground/70 pl-4">Consensus algorithms & CAP theorem</p>
            </>
          )}

          {index === 1 && (
            <>
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">
                <div className="flex items-center">
                  <Music className="h-3.5 w-3.5 mr-1.5" />
                  Now Playing
                </div>
              </h3>
          <p className="font-medium mb-1">Lofi Beats to Code To</p>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className={cn(
            "h-full rounded-full",
            theme === "dark" ? "bg-primary" : "bg-primary/80"
              )}
              initial={{ width: 0 }}
              animate={{ width: "35%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-foreground/60">
            <span>1:25</span>
            <span>4:10</span>
          </div>
            </>
          )}

          {index === 2 && (
            <>
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Latest Activity
                </div>
              </h3>
          <p className="font-medium mb-1">Endsem Exams</p>
          <p className="text-sm text-foreground/70">Prepping currently for the 4th sem exams</p>
          <p className="text-xs text-foreground/50 mt-2">Currently</p>
            </>
          )}

          {index === 3 && (
            <>
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">Coffee Stats</h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
              <motion.div 
            className="text-3xl font-medium mb-1 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10,
              delay: 0.5
            }}
            viewport={{ once: true }}
              >
            <Coffee className="h-5 w-5 mr-1" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              847
            </motion.span>
              </motion.div>
              <p className="text-sm text-foreground/70">Cups this year</p>
                </div>
              </div>
            </>
          )}
        </motion.div>
          ))}
        </div>

        {/* Latest Blog Post + Contact CTA */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
          {/* Latest Blog */}
          <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={cn(
          "p-6  border rounded-xl",
          
          theme === "dark" 
            ? "bg-muted/50 border-muted backdrop-blur-sm" 
            : "bg-white/90 border-foreground/5 shadow-sm"
        )}
          >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-foreground/60">Latest Blog Post</h3>
            <h4 className="text-xl font-medium mt-1">
          {recentBlog?.title || "Building Resilient Systems with Event Sourcing"}
            </h4>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">New</span>
        </div>
        
        <p className="text-foreground/80 mb-4">
          {recentBlog?.excerpt || 
            "Event sourcing provides a unique approach to data architecture, where instead of storing current state, we record every change as an immutable event..."}
        </p>
        
        <Link 
          to={recentBlog ? `/blog/${recentBlog.slug}` : "/blog/event-sourcing"} 
          className="inline-flex items-center text-primary hover:underline"
        >
          Continue reading
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={cn(
          "p-6 rounded-lg border",
          theme === "dark" 
            ? "bg-gradient-to-br from-muted/60 to-muted/20 border-muted backdrop-blur-sm" 
            : "bg-gradient-to-br from-muted/60 to-white border-foreground/5 shadow-sm"
        )}
          >
        <div className="flex items-center mb-4 gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            theme === "dark" ? "bg-primary/20" : "bg-primary/10"
          )}>
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Get In Touch</h3>
        </div>
        
        <p className="text-foreground/80 mb-5">
          Have an exciting project in mind or just want to chat about tech? I'm always open to new opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <GlowButton showArrow={true} 
            to="/contact" 
            className="flex items-center justify-center"
            
          >
            Contact Me
          </GlowButton>
            <Link 
            to="mailto:mishrayashaswikumar@gmail.com" 
            className={cn(
              "px-3 sm:px-4 py-2 rounded-md text-center transition-colors w-full sm:w-auto",
              "truncate overflow-hidden text-sm sm:text-base flex items-center justify-center",
              theme === "dark" 
              ? "bg-foreground/10 hover:bg-foreground/20 text-foreground" 
              : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
            )}
            title="mishrayashaswikumar@gmail.com"
            >
            <span className="hidden sm:inline">mishrayashaswikumar@gmail.com</span>
            <span className="sm:hidden">Email Me</span>
            </Link>
        </div>
          </motion.div>
        </div>
        
        {/* CLI Link */}
        <motion.div 
          className="max-w-5xl mx-auto mt-12 text-center relative z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link 
        to="/cli" 
        className={cn(
          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all",
          theme === "dark" 
            ? "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-primary" 
            : "bg-white hover:bg-foreground/5 text-foreground/70 hover:text-primary shadow-sm"
        )}
          >
        <Terminal className="h-4 w-4" />
        <span>Open the interactive CLI to explore more</span>
        <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default Home;