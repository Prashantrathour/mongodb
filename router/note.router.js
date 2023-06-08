const express = require("express");
const noteModel = require("../models/note.model");
const auth = require("../middlewares/auth.middleware");

const noterouter = express.Router();
noterouter.use(auth)
noterouter.post('/create',async(req,res)=>{
    try {
       
        const note = new noteModel(req.body);
        const noteregister = await note.save();
        res.json({ message: "note registed", noteregister });
      } catch (error) {
        res.status(404).json({ message: error });
      } 
})
noterouter.get('/',async(req,res)=>{
    try {
      const note=await noteModel.find()
      res.json({data:note})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
})
noterouter.patch('/update/:id',async(req,res)=>{
  const {id}=req.params
  const usersideId=req.body.userId
  try {
    const note = await noteModel.findOne({_id:id})
    if(usersideId==note.userId) {
      const update=await noteModel.findByIdAndUpdate({_id:id},req.body)
      console.log(usersideId,note.userId)
      res.json(update)
    }else{
      res.status(404).send({msg:"error updating becouse not authorized"})
    }

  } catch (error) {
    res.status(404).send({msg:error.message})
  }

})
noterouter.delete('/delete/:id',async(req,res)=>{
  const {id}=req.params
  const usersideId=req.body.userId
  try {
    const note = await noteModel.findOne({_id:id})
    if(usersideId==note.userId) {
      const update=await noteModel.findByIdAndDelete({_id:id})
      console.log(usersideId,note.userId)
      res.json({msg:"deleted"})
    }else{
      res.status(404).send({msg:"error delete becouse not authorized"})
    }

  } catch (error) {
    res.status(404).send({msg:error.message})
  }
})
module.exports=noterouter