export default function MessageBubble({role,text,status,score}){
    const isUser = role === "user";
    const isError = role === "error";
    const isBlocked = status === "BLOCKED";
    const bubbleStyle = isUser
        ? "bg-blue-600 text-white"
        : isError
            ? "bg-red-50 text-red-800 border border-red-200"
            : isBlocked
                ? "bg-red-50 text-slate-900 border border-red-200"
                : "bg-white text-slate-900 border border-slate-200";

    return(
        <div className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] px-4 py-3 text-sm shadow-sm sm:max-w-[76%] sm:px-5 sm:py-4 sm:text-base ${isUser ? "rounded-[22px] rounded-br-md" : "rounded-[22px] rounded-bl-md"} ${bubbleStyle}`}>
                {isBlocked && (
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                        Blocked by PromptShield {typeof score === "number" ? `- Score ${score}` : ""}
                    </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
