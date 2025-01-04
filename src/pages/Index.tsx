import { ChatPanel } from "@/components/ChatPanel";
import { CodePanel } from "@/components/CodePanel";

const Index = () => {
  return (
    <div className="split-view">
      <div className="fade-enter">
        <ChatPanel />
      </div>
      <div className="slide-enter">
        <CodePanel />
      </div>
    </div>
  );
};

export default Index;