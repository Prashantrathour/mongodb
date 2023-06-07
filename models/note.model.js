const mongoose=require("mongoose");


const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    userId:String,
    category:String,
    user:String

},{versionKey:false})


const noteModel=mongoose.model("notes",noteSchema)


module.exports=noteModel