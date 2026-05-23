const express=require("express");
const route=express.Router();
const logs=require("../data/logs");
router.get("/",(req,res)=>{
    res.json(logs);
});
module.exports=router;