const cookieParser = require("cookie-parser"); //way to store json tokens in that
const express = require("express");

require('dotenv').config()
const app = express();

//regular middleware
app.use(express.json()) //parses incoming requests with JSON payloads and is based on body-parser. 
app.use(express.urlencoded({extended:true}))

//cooke middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')
app.use('/api',userRouter)

const postRouter = require('./routes/postRoutes')
app.use('/api',postRouter)

app.get('/',(req,res)=>{
    res.send("hi from tan tan")
})

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})