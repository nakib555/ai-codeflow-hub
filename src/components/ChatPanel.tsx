import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

export const ChatPanel = () => {
  return (
    <div className="chat-panel h-full flex flex-col">
      <div className="flex-none p-4 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          <div className="bg-secondary p-3 rounded-lg">
            <p className="text-sm">Welcome! I'm your AI assistant. How can I help you today?</p>
          </div>
        </div>
      </ScrollArea>

      <div className="flex-none p-4 border-t">
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input 
            placeholder="Type your message..." 
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
