const jwt=require("jsonwebtoken")
const {Jawt_SECRET}=require("../Keys")
const mongoose=require('mongoose')
const User=mongoose.model("User")
module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({err:'You must be logged in'})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,Jawt_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({err:'You must be logged in'})
        }
        const {_id}=payload;
        User.findById(_id).then(userdata=>{
            // console.log(userdata)
            req.user={name:userdata.name,
                    email:userdata.email,
                    _id:userdata._id
                    };
            next()
        })
        
    })
}