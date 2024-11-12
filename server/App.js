import express, { request, response } from 'express'
import cors from "cors"
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cloudinary from 'cloudinary'
import authRoutes from './routes/auth.js';
import postRoute from './routes/newPost.js';
import getPostsRoute from './routes/getPosts.js';
import deletePostRoute from './routes/deletePost.js'
import updatePostRoute from './routes/updatePost.js'

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/uploads', express.static('uploads'));
  
app.use('/auth',authRoutes)

app.use('/newpost',postRoute)

app.use('/getPosts',getPostsRoute)

app.use('/deletePost',deletePostRoute)

app.use('/updatePost',updatePostRoute)

app.get('/ping',(request,response)=>{
    return response.json({message : "pingged"})
})


app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`MongoDB Atlas Connected !!`)
})
.catch(err=>{console.log(err)})