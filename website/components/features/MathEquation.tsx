'use client';

import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';

interface MathEquationProps {
  children: string;
  inline?: boolean;
}

export default function MathEquation({ children, inline = false }: MathEquationProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const renderMath = async () => {
      const katex = (await import('katex')).default;
      try {
        const rendered = katex.renderToString(children, {
          displayMode: !inline,
          throwOnError: false,
          trust: true,
        });
        setHtml(rendered);
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        setHtml(children);
      }
    };

    renderMath();
  }, [children, inline]);

  if (inline) {
    return (
      <span
        className="inline-block align-middle mx-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="my-6 overflow-x-auto">
      <div
        className="text-center py-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
