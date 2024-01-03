import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Summary:{
        type:String,
        required:true
    },
    Cover:String,
    Content:{
        type:String,
        required:true
    },   
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    }, 
    Comments: [{
        user: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
},{
    timestamps:true
})

const Post = mongoose.model('Post',PostSchema);

export default Post;