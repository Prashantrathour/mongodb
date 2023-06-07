const express=require("express")
const connection = require("./db")
const userrouter = require("./router/user.router")
const noterouter = require("./router/note.router")
const app = express()
const cors=require("cors")
app.use(express.json())

app.use(cors())
app.use("/user",userrouter)
app.use("/notes",noterouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connection established")
    } catch (error) {
      console.log(error)  
    }
    console.log("server listening")
})