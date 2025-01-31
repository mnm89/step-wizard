"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { createHighlighter } from "shiki";

export function CopyCommandLine({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex items-center bg-muted rounded-lg p-4">
      <pre className="truncate text-sm">
        <code className="whitespace-pre">{code}</code>
      </pre>
      <Button onClick={handleCopy} size="sm" variant="ghost" className="">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}
export function CopyCodeBlock({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: [lang],
      });
      setHighlightedCode(
        highlighter.codeToHtml(code, { lang, theme: "github-dark" })
      );
    };
    loadHighlighter();
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative">
      <pre className="min-w-full overflow-x-auto p-4">
        <code
          className="block min-w-full text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
        />
      </pre>
      <Button
        onClick={handleCopy}
        size="sm"
        variant="ghost"
        className="absolute bg-muted top-2 right-2"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}
