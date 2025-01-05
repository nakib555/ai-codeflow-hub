import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PreviewProps {
  content: string;
  onClose: () => void;
}

export const Preview = ({ content, onClose }: PreviewProps) => {
  return (
    <div className="h-screen w-full bg-background p-4">
      <div className="mb-4">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)] w-full rounded-lg border">
        <div className="p-4">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code>{content}</code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
};