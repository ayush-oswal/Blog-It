import Post from "../models/post.js";

const updatedPost = async(req,res) =>{
    try{
        const {id,Title,Summary,Content} = req.body;
        const Cover = req.filename;
        await Post.updateOne(
            { _id: id },
            { $set: { Title, Summary, Cover, Content } }
        );
        res.json('ok');
    }
    catch(err){
        res.json('error')
    }
}

export default updatedPost;