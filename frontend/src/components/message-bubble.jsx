export default function MessageBubble({role,text}){
    return(
        <div className={`flex mb-4 ${role === 'user' ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-white ${role ==="user"? "bg-blue-600":"bg-slate-700"}`}>
                {text}
            </div>
        </div>
    );
}