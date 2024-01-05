import express  from "express";
import updatedPost from "../controllers/updatePost.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.put('/',upload,updatedPost);

export default router