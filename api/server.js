import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
//import path from 'path';
config();

//routers
import authRoute from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRoute from './routes/user.routes.js';

import { connnectToMongoDB } from './db/connnectToMongoDB.js';
import { app, server } from './socket/socket.js';
const PORT = process.env.PORT || 5000;

//const __dirname = path.resolve();
 

app.use(express.json())   //to parse the incoming requests with SON   payloads (from req.body)
app.use(cookieParser());

//test
app.get("/",(req,res)=>{
    res.send("hello from server :)");
})

app.use('/api/auth',authRoute);
app.use('/api/messages',messageRoute);
app.use('/api/users',userRoute);

//app.use(express.static(path.join(__dirname,"/client/dist")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"client","dist","index.html"))
// })

server.listen(PORT,()=>{
    connnectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})