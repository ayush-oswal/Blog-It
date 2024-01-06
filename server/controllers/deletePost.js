import Post from "../models/post.js";

export const deletePost = async(req,res) =>{
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
    else{
        res.json('ok')
    }
}