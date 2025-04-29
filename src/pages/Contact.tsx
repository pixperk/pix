
import { useState } from "react";
import { z } from "zod";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      contactSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Extract and set validation errors
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-fade-in opacity-0">
        <AnimatedHeading className="text-4xl md:text-5xl mb-4">
          Get in Touch
        </AnimatedHeading>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Let's build something purposeful together. Whether you have a project in mind or 
          just want to connect, I'd love to hear from you.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact form */}
        <div 
          className="animate-fade-in opacity-0 bg-card border border-border p-6 rounded-xl shadow-sm"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="font-serif text-2xl mb-6 glow-text">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or just say hello!"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-destructive text-xs mt-1">{errors.message}</p>
              )}
            </div>
            
            <GlowButton
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </GlowButton>
          </form>
        </div>
        
        {/* Contact info */}
        <div 
          className="animate-fade-in opacity-0 flex flex-col"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="font-serif text-2xl mb-6 glow-text">Connect</h2>
          
          <div className="mb-8">
            <p className="text-foreground/80 mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision.
            </p>
            
            <p className="text-foreground/80">
              Based in <span className="font-medium">India</span>, but working with clients worldwide.
            </p>
          </div>
          
          <div className="space-y-4 mb-12">
            <div>
              <h3 className="text-sm font-medium mb-1">Email</h3>
              <a 
                href="mailto:hello@pixperk.dev" 
                className="text-primary hover:opacity-80 transition-opacity"
              >
                hello@pixperk.dev
              </a>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Follow Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/pixperk" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://twitter.com/pixperk" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href="https://linkedin.com/in/pixperk" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-auto bg-muted/50 rounded-xl p-6 border border-border">
            <p className="italic text-foreground/70 mb-4">
              "The best way to predict the future is to invent it."
            </p>
            <p className="text-right text-sm">— Alan Kay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
