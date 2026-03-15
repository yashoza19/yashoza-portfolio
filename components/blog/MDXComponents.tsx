import CodeBlock from './CodeBlock';
import Callout from './Callout';
import BlogImage from './BlogImage';

const MDXComponents = {
  pre: ({ children, ...props }: any) => {
    // Extract code content from pre > code
    const code = children?.props?.children;
    const className = children?.props?.className;
    const filename = children?.props?.filename;

    if (typeof code === 'string') {
      return (
        <CodeBlock className={className} filename={filename}>
          {code}
        </CodeBlock>
      );
    }

    return <pre {...props}>{children}</pre>;
  },
  code: ({ children, className, ...props }: any) => {
    // Inline code (not in a pre block)
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-[#f0ece2]/10 text-accent text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    // Block code (handled by pre above)
    return <code className={className} {...props}>{children}</code>;
  },
  Callout,
  Image: BlogImage,
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl md:text-5xl font-bold text-[#f0ece2] mb-6 mt-12" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl md:text-4xl font-bold text-[#f0ece2] mb-4 mt-10" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl md:text-3xl font-semibold text-[#f0ece2] mb-3 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl md:text-2xl font-semibold text-[#f0ece2] mb-3 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-[#f0ece2]/80 leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-accent hover:underline transition-all duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside text-[#f0ece2]/80 mb-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside text-[#f0ece2]/80 mb-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-accent pl-6 py-2 my-6 italic text-[#f0ece2]/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: ({ ...props }: any) => (
    <hr className="border-t border-[#f0ece2]/10 my-12" {...props} />
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-[#f0ece2]/20 px-4 py-2 bg-[#f0ece2]/5 text-left font-semibold text-[#f0ece2]" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-[#f0ece2]/20 px-4 py-2 text-[#f0ece2]/80" {...props}>
      {children}
    </td>
  ),
};

export default MDXComponents;
