import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Share2, Eye, Clock, BookmarkPlus } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotFound from "./NotFound";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState, useRef } from "react";
import { MarkdownComponents } from "@/components/MarkdownComponents";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import Metadata from "@/components/Metadata";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [timeToRead, setTimeToRead] = useState("5 min");

  if (!post) {
    return <NotFound />;
  }

  // Generate description for SEO
  const generateDescription = () => {
    if (post.excerpt) return post.excerpt;
    return post.content?.substring(0, 160).replace(/[#*`]/g, '') + '...';
  };

  // Scroll to top when navigating to a new blog post
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Calculate reading time
    if (post.content) {
      const wordCount = post.content.trim().split(/\s+/).length;
      const readingTimeMinutes = Math.ceil(wordCount / 200);
      setTimeToRead(`${readingTimeMinutes} min read`);
    }
  }, [slug, post.content]);

  // Handle scroll events for parallax effect and reading progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate reading progress
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and transform based on scroll position
  const coverImageOpacity = Math.max(1 - scrollY / 500, 0);
  const coverImageTransform = `translateY(${scrollY * 0.3}px)`;
  
  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this post: ${post.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The post URL has been copied to your clipboard",
      });
    }
  };

  // Current URL for Open Graph tags
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = currentUrl;
  const description = generateDescription();
  
  return (
    <>
          <Metadata 
        title={`${post.title} | Yashaswi Mishra`}
        description={ description || `${post.title} - Read this article by Yashaswi Mishra`}
        keywords={`${post.tags.join(', ')}, Yashaswi Mishra, Pixperk, Blog`}
        image={post.coverImage || '/assets/thumbnail.jpg'}
        type="article"
        datePublished={post.date}
        dateModified={post.date}
      />

      {/* Reading progress bar - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 w-full bg-secondary/30" />
      </div>

      {/* Cover Image with enhanced overlay */}
      {post.coverImage && (
        <div
          className="w-full h-[60vh] relative overflow-hidden -mt-8 mb-8"
          ref={coverImageRef}
        >
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/50 via-background/60 to-background z-10"
            style={{ opacity: 0.95 }}
          />
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${post.coverImage})`,
              transform: coverImageTransform,
              opacity: coverImageOpacity,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-3xl mx-auto px-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 drop-shadow-lg animate-fade-in">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 justify-center mb-8 animate-fade-in-up delay-100">
                {post.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-primary/80 text-white text-sm font-medium 
                             hover:bg-primary transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg
                             transform hover:-translate-y-0.5"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-200">
                <div className="flex items-center gap-2 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full shadow-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-white/90">{post.date}</span>
                </div>
                <div className="flex items-center gap-2 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full shadow-lg">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-white/90">{timeToRead}</span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button with improved styling */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to all posts
          </Link>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share this post</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <article className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-lg prose-headings:scroll-mt-24" ref={articleRef}>
          <header className="mb-10 not-prose">
            {!post.coverImage && (
              <>
                <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
                  {post.title}
                </AnimatedHeading>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary/70 text-secondary-foreground text-sm hover:bg-secondary transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Additional metadata for non-cover images */}
                <div className="flex gap-4 text-sm text-foreground/60 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {timeToRead}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {Math.floor(Math.random() * 1000) + 100} views
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center justify-between border-b border-border pb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
                  <AvatarImage src="/assets/avatar.jpg" />
                  <AvatarFallback>YM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Yashaswi Mishra</div>
                  <div className="text-sm text-foreground/60 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>

              {/* External reading options with improved styling */}
              <div className="flex gap-2 mt-4 sm:mt-0">
                {post.externalLinks?.medium && (
                  <Button size="sm" variant="outline" className="dark:hover:bg-[#02b875]/10 hover:bg-[#02b875]/20" asChild>
                    <a
                      href={post.externalLinks.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 group"
                    >
                      Read on Medium
                      <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                )}
                {post.externalLinks?.devTo && (
                  <Button size="sm" variant="outline" className="dark:hover:bg-[#5B21B6]/10 hover:bg-[#5B21B6]/20" asChild>
                    <a
                      href={post.externalLinks.devTo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 group"
                    >
                      Read on DEV
                      <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Markdown Content with elegant styling */}
          <div className="markdown-content dark:prose-pre:bg-gray-900 prose-pre:bg-gray-100 prose-pre:text-gray-800 dark:prose-pre:text-gray-200 prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-serif">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={MarkdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer with enhanced styling and share buttons */}
          <div className="border-t border-border mt-10 pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                Back to all posts
              </Link>
              
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleShare} className="flex items-center gap-1">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;