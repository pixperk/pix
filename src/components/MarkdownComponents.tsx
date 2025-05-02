import { CustomCode } from '@/components/CustomeCode';

// Type for markdown component props
type MarkdownComponentProps = {
  node?: any;
  [key: string]: any;
};

export const MarkdownComponents = {
  h1: ({ node, ...props }: MarkdownComponentProps) => (
    <h1 className="font-serif text-3xl font-bold mt-10 mb-6 text-purple-900 dark:text-purple-100 glow-text-subtle" {...props} />
  ),
  h2: ({ node, ...props }: MarkdownComponentProps) => (
    <h2 className="font-serif text-2xl font-bold mt-8 mb-5 text-purple-900 dark:text-purple-100 glow-text-subtle" {...props} />
  ),
  h3: ({ node, ...props }: MarkdownComponentProps) => (
    <h3 className="font-serif text-xl font-bold mt-6 mb-4 text-purple-800 dark:text-purple-200" {...props} />
  ),
  h4: ({ node, ...props }: MarkdownComponentProps) => (
    <h4 className="font-serif text-lg font-bold mt-5 mb-3 text-purple-800 dark:text-purple-200" {...props} />
  ),
  p: ({ node, ...props }: MarkdownComponentProps) => (
    <p className="mt-6 mb-6 leading-relaxed text-base text-gray-900 dark:text-gray-200" {...props} />
  ),
  a: ({ node, href, ...props }: MarkdownComponentProps) => (
    <a
      href={href}
      className="text-purple-700 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-200 glow-text-subtle transition-colors underline"
      {...props}
    />
  ),
  ul: ({ node, ...props }: MarkdownComponentProps) => (
    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
  ),
  ol: ({ node, ...props }: MarkdownComponentProps) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
  ),
  li: ({ node, ...props }: MarkdownComponentProps) => (
    <li className="mb-2" {...props} />
  ),
  blockquote: ({ node, ...props }: MarkdownComponentProps) => (
    <blockquote className="border-l-4 border-purple-400 pl-4 py-2 my-6 bg-purple-100/40 dark:bg-purple-900/20 text-gray-700 dark:text-gray-300 italic" {...props} />
  ),
  hr: ({ node, ...props }: MarkdownComponentProps) => (
    <hr className="my-10 border-purple-500/30" {...props} />
  ),
  img: ({ node, alt, ...props }: MarkdownComponentProps) => (
    <img
      alt={alt}
      className="rounded-lg my-8 w-full shadow-[0_0_15px_rgba(149,76,233,0.15)] dark:shadow-[0_0_15px_rgba(149,76,233,0.25)]"
      {...props}
    />
  ),
  table: ({ node, ...props }: MarkdownComponentProps) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  tr: ({ node, ...props }: MarkdownComponentProps) => (
    <tr className="border-b border-purple-200 dark:border-purple-800/30" {...props} />
  ),
  th: ({ node, ...props }: MarkdownComponentProps) => (
    <th className="py-3 px-5 font-semibold text-purple-900 dark:text-purple-300 bg-purple-100/60 dark:bg-purple-900/30" {...props} />
  ),
  td: ({ node, ...props }: MarkdownComponentProps) => (
    <td className="py-3 px-5 text-gray-800 dark:text-gray-200" {...props} />
  ),
  code: CustomCode,
  pre: ({ node, ...props }: MarkdownComponentProps) => (
    <pre className="bg-transparent" {...props} />
  ),
};

// Additional option to create themed variants
export const createThemedMarkdownComponents = (theme: 'default' | 'minimal' | 'project') => {
  if (theme === 'minimal') {
    return {
      ...MarkdownComponents,
      // Override specific components for minimal theme
      h1: ({ node, ...props }: MarkdownComponentProps) => (
        <h1 className="font-serif text-2xl font-bold mt-8 mb-4" {...props} />
      ),
      blockquote: ({ node, ...props }: MarkdownComponentProps) => (
        <blockquote className="border-l-2 border-gray-300 pl-4 py-1 my-4 text-gray-600 dark:text-gray-400 italic" {...props} />
      ),
    };
  }
  
  if (theme === 'project') {
    return {
      ...MarkdownComponents,
      // Override specific components for project theme
      h1: ({ node, ...props }: MarkdownComponentProps) => (
        <h1 className="font-sans text-3xl font-bold mt-10 mb-6 text-blue-800 dark:text-blue-300 glow-text-subtle" {...props} />
      ),
      h2: ({ node, ...props }: MarkdownComponentProps) => (
        <h2 className="font-sans text-2xl font-bold mt-8 mb-5 text-blue-700 dark:text-blue-400" {...props} />
      ),
      blockquote: ({ node, ...props }: MarkdownComponentProps) => (
        <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic" {...props} />
      ),
    };
  }
  
  // Return default components
  return MarkdownComponents;
};