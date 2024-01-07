import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./post";
export default function UserPosts(){
    const {username} = useParams();
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts/userposts/${username}`,{
            method:'GET'
        })
        .then(response=>{response.json().then(result=>{setPosts(result)})});
    },[username])

    const H1Style = {
        textAlign: 'center',
    };

    return (
        <div>
            <h1 style={H1Style}>Posts by @{username}</h1>
            {posts.length > 0 && posts.map(post => <Post key={post._id} {...post} />)}
        </div>
    )
}