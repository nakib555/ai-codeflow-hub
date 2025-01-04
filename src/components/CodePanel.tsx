import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Terminal } from "lucide-react";

export const CodePanel = () => {
  return (
    <div className="editor-panel h-full flex flex-col">
      <div className="flex-none p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Code Editor</h2>
        <Button variant="secondary" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <pre className="text-sm font-mono">
          <code>{`// Your code will appear here
function greeting() {
  console.log("Welcome to the next-gen dev platform!");
}
`}</code>
        </pre>
      </ScrollArea>

      <div className="flex-none p-4 border-t border-gray-800">
        <div className="bg-black/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Terminal className="h-4 w-4" />
            <span>Terminal ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};