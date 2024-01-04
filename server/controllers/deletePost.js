import Post from "../models/post.js";
import fs from 'fs';

export const deletePost = async(req,res) =>{
    const id = req.params.id;
    const {Cover: cover} = await Post.findById(id);
    // console.log(post)
    if (cover) {
        const cwd = process.cwd();
        // console.log(cover)
        fs.rmSync(cwd + "/uploads/" + cover);
    }
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
    else{
        res.json('ok')
    }
}