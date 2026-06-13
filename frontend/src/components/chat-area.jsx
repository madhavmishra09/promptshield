import Message from "./message-bubble";
export default function ChatArea({chat}){
    return(
        <div className="min-h-0 flex-1 overflow-y-auto glass-scrollbar px-1 py-6 sm:px-4">
            {chat.length === 0 && (
                <div className="h-full flex items-center justify-center text-center text-slate-500">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                            How can PromptShield help?
                        </h2>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6">
                            Send a prompt to scan it before it reaches the model.
                        </p>
                    </div>
                </div>
            )}

            {chat.map((msg,index)=>(
                <Message
                    key={index}
                    role={msg.role}
                    text={msg.text}
                    status={msg.status}
                    score={msg.score}
                />
            ))}
        </div>
    );
}
