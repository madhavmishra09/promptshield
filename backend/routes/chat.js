const express=require('express');
const router=express.Router();
const {detectPromptInjection,sanitizeInput}=require('../middleware/security');
const axios=require('axios');
const logs=require('../data/logs');

function isSimpleGreeting(message) {
  return /^(hi|hello|hey|hii|hiii|yo|sup)\.?$/i.test(message.trim());
}

function cleanModelOutput(output) {
  return output
    .split(/\n-{3,}|\nInstruction:/i)[0]
    .replace(/<\|[^>]+?\|>/g, "")
    .trim();
}

router.post("/",async(req,res)=>{
  let {message} = req.body;
  let score=detectPromptInjection(message);
  if(score>3){
    const sanitizedMessage=sanitizeInput(message);
    logs.push({
      input: sanitizedMessage,
      score,
      status:"BLOCKED",
      timestamp: new Date().toLocaleString(),
    });
    return res.json({
      response:"PromptShield blocked this request because it looks like a prompt injection attempt.",
      score,
      status:"BLOCKED"
    });
  }
  if(isSimpleGreeting(message)){
    logs.push({
      input: message,
      score,
      status:"SAFE",
      timestamp: new Date().toLocaleString(),
    });
    return res.json({response:"Hi. How can I help?"});
  }
  try{
    const response=await axios.post(" https://promptshield-0oum.onrender.com/api/chat",{
      model:"phi3:mini",
      messages:[
        {
          role:"system",
          content:"You are PromptShield's assistant. Answer directly, briefly, and accurately. Do not create extra prompts, examples, scenarios, instructions, separators, or hidden reasoning. If the user asks for a format, follow only that format. For security topics, explain the concept plainly without exaggerating."
        },
        {
          role:"user",
          content:message
        }
      ],
      stream:false,
      options:{
        temperature:0,
        num_predict:100,
        stop:["\n---","\nInstruction:","Instruction:"]
      }
    });
    let output=cleanModelOutput(response.data.message?.content || "");
    if(!output){
      output="I could not generate a clear response. Please try again.";
    }
    if(output.toLowerCase().includes("system prompt")){
      output="Response blocked due to security concerns.";
    }
    logs.push({
      input: message,
      score,
      status:score>3? "BLOCKED" : "SAFE", timestamp: new Date().toLocaleString(),});
    res.json({response:output});
  }
  catch(err){
    console.error(err.message);
    res.status(500).json({error:"Ollama Error"});
  }
})

module.exports=router;
