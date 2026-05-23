const express=require('express');
const router=express.Router();
const {detectPromptInjection,sanitizeInput}=require('../middleware/security');
const axios=require('axios');
const logs=require('../data/logs');
router.post("/",async(req,res)=>{
  let {message} = req.body;
  let score=detectPromptInjection(message);
  if(score>3){
    message=sanitizeInput(message);
  }
  try{
    const response=await axios.post("http://localhost:11434/api/generate",{
      model:"mistral",
      prompt:message,
      stream:false
    });
    let output=response.data.response;
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