import { useEffect, useState } from "react"
import Post from "./post"

export default function IndexPage(){
    const [posts , setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts`,{
            method:'GET'
        })
        .then(response => {
            response.json().then(Posts=>{setPosts(Posts)});
        })
    },[])
    function handleSearch(search){
        const searchResults = posts.filter(post =>
            post.Title.toLowerCase().includes(search.toLowerCase())
          );
        setSearchResults(searchResults);
    }
    return (
        <div>
            <input type="text" placeholder="Search (if no results match , it shows all posts)" onChange={(e)=>{handleSearch(e.target.value)}} />
            <div>
                {(searchResults.length > 0 ? searchResults : posts).map(post => <Post key={post._id} {...post} />)}
            </div>
        </div>
    )
}