'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export default function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const language = className ? className.replace(/language-/, '') : 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-[#1e1e1e] text-[#f0ece2]/60 px-4 py-2 text-sm font-mono border-b border-[#f0ece2]/10 rounded-t-lg">
          {filename}
        </div>
      )}
      <div className={`relative ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 bg-[#f0ece2]/10 hover:bg-[#f0ece2]/20 text-[#f0ece2] text-xs rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="bg-[#1e1e1e] text-[#f0ece2] p-4 overflow-x-auto">
          <code className={className}>{children}</code>
        </pre>
      </div>
    </div>
  );
}
