import { useState } from "react";
import axios from "axios";

export default function PromptInput({ setChat }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message }
      );

      const botMessage = {
        role: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div className="flex gap-3 mt-5">
      <textarea
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your prompt..."
        className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl p-4 outline-none resize-none"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl transition"
      >
        Send
      </button>
    </div>
  );
}