
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

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
        className="inline-flex items-center font-serif text-foreground/70 hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all posts
      </Link>
      
      <article>
        <header className="mb-10">
          <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
            {post.title}
          </AnimatedHeading>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary text-foreground/90 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-foreground/70 border-t border-b border-border py-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback>YM</AvatarFallback>
              </Avatar>
              <span>Yashaswi Mishra</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
          </div>
        </header>
        
        {/* Blog content */}
        <div className={cn(
          "prose prose-lg dark:prose-invert max-w-none",
          // Add drop cap for first letter
          "first-letter:font-serif first-letter:text-5xl first-letter:font-bold",
          "first-letter:mr-2 first-letter:float-left first-letter:text-primary"
        )}>
          <ReactMarkdown>
            {post.content || ''}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
