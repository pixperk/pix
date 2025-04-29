
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import GlowButton from "@/components/GlowButton";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");
  
  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-4">Post Not Found</h1>
        <p className="mb-8 text-foreground/70">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/blog"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link 
        to="/blog" 
        className="inline-flex items-center font-serif text-foreground/70 hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all posts
      </Link>
      
      <article>
        <header className="mb-12 text-center">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            <AnimatedHeading className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              {post.title}
            </AnimatedHeading>
          
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary text-foreground/90 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="w-full aspect-[21/9] rounded-xl overflow-hidden mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <img 
              src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center justify-center text-sm text-foreground/70 border-t border-b border-border py-4 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center mr-8">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback className="bg-primary/10 text-primary">YM</AvatarFallback>
              </Avatar>
              <span className="font-serif text-base">Yashaswi Mishra</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
          </div>
        </header>
        
        {/* Blog content with custom styling */}
        <div className={cn(
          "prose prose-lg md:prose-xl dark:prose-invert max-w-none font-serif",
          // Add drop cap for first letter
          "first-letter:font-serif first-letter:text-7xl first-letter:font-bold",
          "first-letter:mr-3 first-letter:float-left first-letter:text-primary",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: "0.8s" }}
        >
          <ReactMarkdown>
            {post.content || ''}
          </ReactMarkdown>
        </div>
        
        {/* Related posts navigation */}
        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="font-serif text-2xl mb-6 text-center">Continue Reading</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <GlowButton to="/blog/the-future-of-frontend" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Post
            </GlowButton>
            <GlowButton to="/blog">
              All Posts
            </GlowButton>
            <GlowButton to="/blog/rust-performance-patterns" variant="outline">
              Next Post
              <ArrowRight className="ml-2 h-4 w-4" />
            </GlowButton>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
