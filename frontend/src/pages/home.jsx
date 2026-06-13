import { useState } from "react";
import ChatArea from "../components/chat-area";
import PromptInput from "../components/prompt-input";

function Home() {
  const [chat, setChat] = useState([]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900 flex flex-col">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">
            PromptShield
          </h1>
          <a
            href="/logs"
            className="text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            Logs
          </a>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-3 sm:px-5">
          <ChatArea chat={chat} />
        </div>

        <div className="border-t border-slate-200/80 bg-[#f7f8fa]/90 px-3 py-3 backdrop-blur-xl sm:px-5">
          <div className="mx-auto w-full max-w-3xl">
            <PromptInput setChat={setChat} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
