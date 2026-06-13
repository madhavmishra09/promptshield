import { useState } from "react";
import axios from "axios";

export default function PromptInput({ setChat }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    const userMessage = {
      role: "user",
      text: trimmedMessage,
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setIsSending(true);

    try {
      const res = await axios.post(
        "http://localhost:11434/api/chat",
        { message: trimmedMessage }
      );

      const botMessage = {
        role: "bot",
        text: res.data.response,
        status: res.data.status,
        score: res.data.score,
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        {
          role: "error",
          text: "Could not reach the backend. Make sure the server is running on port 5000.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-[26px] border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
      <textarea
        rows="1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your prompt..."
        disabled={isSending}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        className="max-h-36 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-70 sm:text-base"
      />

      <button
        onClick={sendMessage}
        disabled={isSending || !message.trim()}
        aria-label={isSending ? "Scanning prompt" : "Send message"}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-950 text-lg font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:h-12 sm:w-12"
      >
        {isSending ? "..." : "↑"}
      </button>
    </div>
  );
}
