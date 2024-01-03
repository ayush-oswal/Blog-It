import  express from "express";
import { addComment, getPost, getPosts, getUserPosts } from "../controllers/getPosts.js";

const router = express.Router();

router.get('/',getPosts);

router.get('/:id',getPost);

router.post('/:id',addComment);

router.get('/userposts/:username',getUserPosts);

export default router