import { useState } from "react";
import ChatArea from "../components/chat-area";
import PromptInput from "../components/prompt-input";
function Home() {
  const [chat, setChat] = useState([]);
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-center">
            PromptShield
          </h1>
          <p className="text-slate-400 text-center mt-2">
            Secure AI Chat System with Prompt Injection Protection
          </p>
        </div>
        <ChatArea chat={chat} />
        <PromptInput setChat={setChat} />

      </div>
    </div>
  );
}

export default Home;