import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Terminal, FolderOpen } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { FileExplorer } from "./FileExplorer";
import { CodePreview } from "./CodePreview";
import { fileStructure } from "@/data/fileStructure";

export const CodePanel = () => {
  const [selectedFileContent, setSelectedFileContent] = useState<string>('// Click on a file to view its contents');

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
      
      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <FileExplorer 
              fileStructure={fileStructure}
              onFileSelect={setSelectedFileContent}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={75}>
            <div className="h-full flex flex-col">
              <div className="flex-none p-2 border-b border-gray-800">
                <h3 className="text-sm font-medium">Code Preview</h3>
              </div>
              <CodePreview content={selectedFileContent} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

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