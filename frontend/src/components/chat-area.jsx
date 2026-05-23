import Message from "./message-bubble";
export default function ChatArea({chat}){
    return(
        <div className="h-[500px] overflow-y-auto bg-slate-900 p-5 rounded-2xl border border-slate-700">
            {chat.map((msg,index)=>(<Message key={index} role={msg.role} text={msg.text}/>))}
        </div>
    );
}