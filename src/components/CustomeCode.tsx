import { useState, ReactNode, useEffect } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

interface CustomCodeProps {
    inline?: boolean;
    className?: string;
    children: ReactNode;
    showLineNumbers?: boolean;
    [key: string]: any;
}

export const CustomCode = ({
    inline,
    className,
    children,
    showLineNumbers = false,
    ...props
}: CustomCodeProps) => {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1] || "text";
    
    // Extract code string from children
    const codeString = extractCodeString(children);
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(codeString.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Inline code rendering
    if (inline || !match) {
        return (
            <code className={cn(
                "font-mono text-sm px-2 py-1 rounded-md whitespace-pre-wrap mx-0.5 align-middle",
                theme === "dark" 
                    ? "bg-purple-900/20 text-purple-300" 
                    : "bg-purple-100/30 text-purple-700"
            )}>
                {children}
            </code>
        );
    }

    // Code block rendering with purple theme
    return (
        <div className={cn(
            "my-6 rounded-lg overflow-hidden shadow-sm", 
            theme === "dark"
                ? "border border-purple-700/40 bg-purple-950/30" 
                : "border border-purple-200 bg-purple-50"
        )}>
            {/* Header with language and copy button */}
            <div className={cn(
                "flex items-center justify-between px-4 py-2 border-b",
                theme === "dark"
                    ? "bg-purple-900/50 border-purple-700/40" 
                    : "bg-purple-100 border-purple-200"
            )}>
                <div className="flex items-center gap-2">
                    <Terminal size={14} className={theme === "dark" ? "text-purple-400" : "text-purple-500"} />
                    <span className={cn(
                        "text-xs font-serif font-medium",
                        theme === "dark" ? "text-purple-300" : "text-purple-700"
                    )}>
                        {language}
                    </span>
                </div>
                
                <button
                    onClick={copyToClipboard}
                    className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-serif", 
                        "transition-all duration-200 focus:outline-none",
                        theme === "dark"
                            ? "hover:bg-purple-800/50 text-purple-200 border border-purple-700/30" 
                            : "hover:bg-purple-200/70 text-purple-700 border border-purple-300/50",
                        copied && (theme === "dark" ? "text-green-400" : "text-green-600")
                    )}
                    aria-label="Copy code"
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
            </div>
            
            {/* Code content */}
            <SyntaxHighlighter
                style={theme === "dark" ? vscDarkPlus : oneLight}
                language={language}
                showLineNumbers={showLineNumbers}
                PreTag="pre"
                className="text-sm leading-relaxed"
                customStyle={{
                    margin: 0,
                    background: theme === "dark" ? "#1e1b2d" : "#f9f5ff",
                    padding: "1rem",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
                {...props}
            >
                {codeString.trim()}
            </SyntaxHighlighter>
        </div>
    );
};

// Helper function to extract code string from children
function extractCodeString(children: ReactNode): string {
    if (typeof children === "string") return children;
    
    if (Array.isArray(children)) {
        return children
            .map(child => {
                if (typeof child === "string") return child;
                if (typeof child === "object" && child && 'props' in child && 
                    typeof child.props.children === "string") {
                    return child.props.children;
                }
                return "";
            })
            .join("");
    }
    
    return "";
}