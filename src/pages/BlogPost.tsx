
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotFound from "./NotFound";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");
  
  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all posts
      </Link>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-10 not-prose">
          <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
            {post.title}
          </AnimatedHeading>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary/70 text-foreground/80 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" />
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
            
            {/* External reading options */}
            <div className="flex gap-2 mt-4 sm:mt-0">
              {post.externalLinks?.medium && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={post.externalLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Read on Medium
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              )}
              {post.externalLinks?.devTo && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={post.externalLinks.devTo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Read on DEV
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </header>
        
        <ReactMarkdown>{post.content}</ReactMarkdown>
        
        <div className="border-t border-border mt-10 pt-6">
          <div className="flex justify-between">
            <Link 
              to="/blog" 
              className="inline-flex items-center hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
