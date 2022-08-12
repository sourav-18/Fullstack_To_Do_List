const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors')
const app=express();
const port=5000;
mongoose.connect("mongodb://localhost:27017/msDas").then(()=>{
    console.log("databse connected successfully.........")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(cors())
app.use(require('./aut'));
app.use(require('./HomeAuth'))
app.use(require('./Allinput'))
app.listen(port,()=>{
    console.log("app listen ",port);
})