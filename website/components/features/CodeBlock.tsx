'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  children: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  language,
  children,
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-800 bg-[#282c34]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-gray-800">
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-sm text-text-secondary font-mono">{filename}</span>
          )}
          <span className="px-2 py-1 rounded text-xs font-medium bg-cyan/20 text-cyan">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded bg-primary-accent/20 hover:bg-primary-accent/30 text-cyan text-sm transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#282c34',
          fontSize: '0.9rem',
        }}
        lineNumberStyle={{
          minWidth: '3em',
          paddingRight: '1em',
          color: '#5c6370',
          userSelect: 'none',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
