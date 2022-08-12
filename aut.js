const mongoose =require('mongoose')
const express=require('express')
const{signup}=require('./userSchma')
const bcrypt=require('bcrypt')
const route=express.Router();
const UserModel=new mongoose.model("User",signup);
const jwt=require('jsonwebtoken')
const {Jawt_SECRET}=require('./Keys');
const userLogin = require('./Middleware/userLogin');
//---------------------------signup logic ---------------------
route.post('/signup',(req,res)=>{
    const{name,email,password}=req.body;
  UserModel.find({email}).then((e)=>{
    if(e.length!==0){
        res.status(444).json({err:'user allready register'});
       }else{
        bcrypt.hash(password,12).then(haspassword=>{
            const user= new UserModel({
                name,
                email,
                password:haspassword,
            })
            user.save().then(()=>{
                res.status(200).json({success:'user successfully register'});
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{console.log(err)});
       }
   });
})
//---------------------------sign in logic ---------------------
route.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email}).then((e)=>{
        if(e===null){
            res.status(444).json({err:'enter valid details'});
        }else{
            bcrypt.compare(password,e.password).then((isvalid)=>{
                if(isvalid){
                    const token=jwt.sign({_id:e._id},Jawt_SECRET)
                    res.status(200).json({success:'successfully log in',token});
                }else{
                    res.status(444).json({err:'enter valid details'});
                }
            })
        }
    }).catch((err)=>{
        console.log(err)
    })
   
    
})

module.exports=route
