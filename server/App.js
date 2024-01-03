import express from 'express'
import cors from "cors"
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoutes from './routes/auth.js';
import postRoute from './routes/newPost.js';
import getPostsRoute from './routes/getPosts.js';
import deletePostRoute from './routes/deletePost.js'
import updatePostRoute from './routes/updatePost.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser());
dotenv.config()

app.use('/uploads', express.static('uploads'));
  
app.use('/auth',authRoutes)

app.use('/newpost',postRoute)

app.use('/getPosts',getPostsRoute)

app.use('/deletePost',deletePostRoute)

app.use('/updatePost',updatePostRoute)


app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`MongoDB Atlas Connected !!`)
})
.catch(err=>{console.log(err)})