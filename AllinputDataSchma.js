const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const allInputData=new mongoose.Schema({
    name:{
        type:String,
        require:true,},
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:"",
    },
    date:{
        type:String,
        default:new Date()
    },
    postBy:{
        type:ObjectId,
        ref:"User"
    }

})
module.exports={
    allInputData
}