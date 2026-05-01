id="chat01"
const express=require('express');
const axios=require('axios');
const router=express.Router();
const[detectPromptInjection,sanitizeInput]=require('../middleware/security');
router.post('/',async(req,res)=>{
    let {message}=req.body;
    let score=detectPromptInjection(message);
    if(score>3){
        message=sanitizeInput(message);
    }
    try{
        const response=await axios.post('https://api.openai.com/v1/chat/completions',{
            model:'gpt-5.5',
            messages:[{role:'user',content:message}]
        },{
            headers:{
                Authorization:`Bearer ${process.env.OPENAI_API_KEY}`
               }
            });
            let output=response.data.choices[0].message.content;
            if(output.toLowerCase().includes("system prompt")){
                output="Response blocked for security reasons.";
            }
            res.json({reply:output});
    }
    catch(err){
        res.status(500).json({error:"API Error"});
    }
});
module.exports=router;