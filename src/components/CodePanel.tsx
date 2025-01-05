import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Terminal, FolderOpen, ChevronRight, ChevronDown, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

type FileType = "file" | "folder";

interface FileStructureItem {
  name: string;
  type: FileType;
  content?: string;
  children?: FileStructureItem[];
}

// Mock file structure with content
const fileStructure: FileStructureItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { 
            name: 'Button.tsx', 
            type: 'file',
            content: `import React from 'react';

const Button = ({ children }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
};

export default Button;`
          },
          { 
            name: 'Input.tsx', 
            type: 'file',
            content: `import React from 'react';

const Input = ({ placeholder }) => {
  return (
    <input 
      className="border rounded px-3 py-2" 
      placeholder={placeholder}
    />
  );
};

export default Input;`
          },
        ]
      },
      { 
        name: 'App.tsx', 
        type: 'file',
        content: `import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div className="app">
      <h1>Welcome to My App</h1>
      <Button>Click me</Button>
    </div>
  );
}`
      },
      { 
        name: 'index.tsx', 
        type: 'file',
        content: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`
      },
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { 
        name: 'index.html', 
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
      },
    ]
  },
];

interface FileItemProps {
  item: FileStructureItem;
  level?: number;
  onFileSelect?: (content: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ item, level = 0, onFileSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.type === 'folder' && item.children?.length;

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    } else if (item.content && onFileSelect) {
      onFileSelect(item.content);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 hover:bg-gray-800 rounded cursor-pointer text-sm",
          { 'ml-4': level > 0 }
        )}
        onClick={handleClick}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />
        ) : <span className="w-5" />}
        {item.type === 'folder' ? (
          <Folder className="h-4 w-4 mr-2" />
        ) : (
          <File className="h-4 w-4 mr-2" />
        )}
        <span>{item.name}</span>
      </div>
      {isOpen && item.children?.map((child, index) => (
        <FileItem 
          key={`${child.name}-${index}`} 
          item={child} 
          level={level + 1} 
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
};

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
            <ScrollArea className="h-full">
              <div className="p-4 space-y-1">
                {fileStructure.map((item, index) => (
                  <FileItem 
                    key={`${item.name}-${index}`} 
                    item={item} 
                    onFileSelect={setSelectedFileContent}
                  />
                ))}
              </div>
            </ScrollArea>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={75}>
            <ScrollArea className="h-full">
              <div className="p-4">
                <pre className="text-sm font-mono">
                  <code>{selectedFileContent}</code>
                </pre>
              </div>
            </ScrollArea>
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