import { ChatPanel } from "@/components/ChatPanel";
import { CodePanel } from "@/components/CodePanel";
import { Preview } from "@/components/Preview";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const handleFileSelect = (content: string) => {
    setPreviewContent(content);
  };

  const handleClosePreview = () => {
    setPreviewContent(null);
  };

  if (previewContent !== null) {
    return <Preview content={previewContent} onClose={handleClosePreview} />;
  }

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="min-h-screen rounded-lg"
      >
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <div className="h-full">
            <ChatPanel />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="h-full">
            <CodePanel onFileSelect={handleFileSelect} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;