import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Terminal, FolderOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CodePanel = () => {
  return (
    <div className="editor-panel h-full flex flex-col">
      <div className="flex-none p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Code Editor</h2>
          <Button variant="secondary" size="sm">
            <FolderOpen className="h-4 w-4 mr-2" />
            Files
          </Button>
        </div>
        <Button variant="secondary" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
      </div>
      
      <Tabs defaultValue="code" className="flex-grow flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="flex-grow p-4 m-0">
          <ScrollArea className="h-full">
            <pre className="text-sm font-mono">
              <code>{`// Your code will appear here
function greeting() {
  console.log("Welcome to the next-gen dev platform!");
}
`}</code>
            </pre>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="preview" className="flex-grow p-4 m-0">
          <div className="h-full bg-white/5 rounded-lg flex items-center justify-center">
            <p className="text-sm text-gray-400">Preview will appear here</p>
          </div>
        </TabsContent>
      </Tabs>

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