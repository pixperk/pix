
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");
  const relatedPosts = getRelatedPosts(slug || "", 2);
  
  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-4">Blog Post Not Found</h1>
        <p className="mb-8 text-foreground/70">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <GlowButton to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </GlowButton>
      </div>
    );
  }

  // Format date string
  const formattedDate = post.date ? formatDistanceToNow(new Date(post.date), { addSuffix: true }) : "";

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/blog" 
        className="inline-flex items-center font-serif text-foreground/70 hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all posts
      </Link>
      
      <div className="mb-12">
        <div className="animate-fade-in opacity-0 text-center" style={{ animationDelay: "0.2s" }}>
          <AnimatedHeading className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
            {post.title}
          </AnimatedHeading>
        </div>
        
        {/* Post metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/70 mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80" />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">Yashaswi Mishra</p>
              {post.date && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-foreground/80"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Image - Optional */}
      {post.coverImage && (
        <div className="w-full h-[400px] mb-16 rounded-2xl overflow-hidden border border-border shadow-lg animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Blog Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
        <ReactMarkdown>
          {post.content || ''}
        </ReactMarkdown>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-8 mt-16 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
          <h3 className="font-serif text-2xl mb-6 text-center">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.slug} className="border border-border rounded-lg overflow-hidden group hover:border-primary transition-colors">
                <Link to={`/blog/${relatedPost.slug}`} className="flex flex-col h-full">
                  {relatedPost.coverImage && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-grow">
                    <h4 className="font-serif text-lg mb-2 group-hover:text-primary transition-colors">{relatedPost.title}</h4>
                    <p className="text-sm text-foreground/70 line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center mt-12">
        <GlowButton to="/blog" variant="outline">
          Read More Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </GlowButton>
      </div>
    </div>
  );
};

export default BlogPost;
