const express =require("express");
const userLogin = require("./Middleware/userLogin");
const route=express.Router();
route.get("/home",userLogin,(req,res)=>{
    res.status(200).json({user:req.user})
})
module.exports=route;