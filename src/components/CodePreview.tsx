import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodePreviewProps {
  content: string;
}

export const CodePreview = ({ content }: CodePreviewProps) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <pre className="text-sm font-mono">
          <code>{content}</code>
        </pre>
      </div>
    </ScrollArea>
  );
};
