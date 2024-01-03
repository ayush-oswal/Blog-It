import  express  from "express";
import { deletePost } from "../controllers/deletePost.js";

const router = express.Router();

router.get('/:id',deletePost);

export default router;
