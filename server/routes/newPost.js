import express  from "express";
import NewPost from '../controllers/newPost.js'
import upload from "../middleware/multer.js";

const router = express.Router();

router.post('/',upload,NewPost);

export default router