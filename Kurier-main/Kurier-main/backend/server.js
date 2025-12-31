// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'         // to get dotenv configuration 
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/messageRoute.js'
import userRoutes from './routes/userRoutes.js'
import connectToMongoDB from './db/connectMongoDB.js';
import path from 'path'

import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js';




// instead of using object of express here we will get it from socket.js file where we wrap it with socket server 

const PORT = process.env.PORT || 5000;

// getting absolute path to root folder 
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());                // to get and parse details form POST req body into json 
app.use(cookieParser());

//  using middleware for auth purpose 
// whenever someone tries to hit anything with '/api/auth' as prefix in route then navigate them to -> authRoutes MW
app.use('/api/auth', authRoutes );              
app.use('/api/messages', messageRoutes );              
app.use('/api/users', userRoutes );              


// dist folder will be created when build is done 
app.use(express.static(path.join(__dirname, 'frontend/dist')))
// we told our app to assume above path will serve as static files


// now we want any route user hit other than above ones should got to FE ->
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})
// by doing this we can run FE with our BE server too (this means PORT of BE will be used for FE too) -(we are doing so, bsc we dont want to deploy 2 projects FE & BE )



// app.get('/', (req,res)=>{
//     res.send('HEYY THERE !!! ')
// })


// instead of listening with express  server app will listen with socket server

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`app listening to port ${PORT}`);
})

