
import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedHeading from "@/components/AnimatedHeading";
import { blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  ).sort();
  
  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = activeTag === null || post.tags.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in opacity-0">
        <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
          Blog
        </AnimatedHeading>
        <p className="text-lg text-foreground/70">
          Thoughts, insights, and deep dives on code and creativity
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 bg-secondary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Blog posts */}
      <div className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={cn(
                "block p-6 rounded-lg border border-border",
                "transition-all duration-300 hover:shadow-md hover:border-primary/30",
                "group relative bg-card"
              )}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-primary/5 to-transparent" />
              
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <h2 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-foreground/70 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-secondary/70 text-foreground/80 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80" />
                        <AvatarFallback className="text-xs">YM</AvatarFallback>
                      </Avatar>
                      <span>Yashaswi Mishra</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-foreground/60">
            No posts found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
