const express=require("express")
const mongoose=require("mongoose")
const { allInputData } = require("./AllinputDataSchma")
const userLogin = require("./Middleware/userLogin")
const AllInputData=new mongoose.model("AllinputData",allInputData)
const route=express.Router()
route.post("/create",userLogin,(req,res)=>{
   const {title,name,body,description,_id,date}= req.body;
   if(_id.length!==0){
       AllInputData.updateOne({_id},{
        $set:{
            name,
            description,
            title,
            body,
            date
        }
    }).then((e)=>{
            res.status(200).json({e});
    }).catch((err)=>{
        console.log(err)
    })
   }else{
    const alldata= new AllInputData({
        title,
        name,
        body,
        description,
        date,
        postBy:req.user,
       })
       alldata.save().then((e)=>{
        res.status(200).json({e})
        // res.status(200).json({success:"Data is save"})
       }).catch((err)=>{
        console.log(err)
       })
   }
})
route.get("/alldata",userLogin,(req,res)=>{
    AllInputData.find({postBy:req.user._id}).then((data)=>{
        res.status(200).json({data})
    })
})
route.delete("/deletedata",userLogin,(req,res)=>{
    const {_id}=req.body;
    AllInputData.findByIdAndDelete({_id}).then((e)=>{
        res.status(200).json({_id});
    }).catch((err)=>{
        console.log(err)
    })
})
console.log(new Date('2022-08-11T07:50:24.812Z').getMinutes())
module.exports=route;