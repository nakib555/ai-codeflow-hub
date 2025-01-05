import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Terminal, FolderOpen, ChevronRight, ChevronDown, File, Folder } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type FileType = "file" | "folder";

interface FileStructureItem {
  name: string;
  type: FileType;
  children?: FileStructureItem[];
}

// Mock file structure - in a real app this would come from your backend
const fileStructure: FileStructureItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Button.tsx', type: 'file' },
          { name: 'Input.tsx', type: 'file' },
        ]
      },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.tsx', type: 'file' },
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file' },
      { name: 'favicon.ico', type: 'file' },
    ]
  },
];

interface FileItemProps {
  item: FileStructureItem;
  level?: number;
}

const FileItem: React.FC<FileItemProps> = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.type === 'folder' && item.children?.length;

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 hover:bg-gray-800 rounded cursor-pointer text-sm",
          { 'ml-4': level > 0 }
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
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
        <FileItem key={`${child.name}-${index}`} item={child} level={level + 1} />
      ))}
    </div>
  );
};

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
      
      <Tabs defaultValue="files" className="flex-grow flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="flex-grow p-4 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {fileStructure.map((item, index) => (
                <FileItem key={`${item.name}-${index}`} item={item} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

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