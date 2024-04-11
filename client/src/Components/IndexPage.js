import { useEffect, useState } from "react"
import Post from "./post"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './IndexPage.css'

export default function IndexPage(){
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();    
    const [posts , setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText,setSearchText] = useState("")
    
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

    function start(){
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true })
    }
    function speechSearch() {
        SpeechRecognition.stopListening();
        if (transcript === "") return;
        setSearchText(prevSearchText => {
            const updatedText = prevSearchText === "" ? transcript : prevSearchText + " " + transcript;
            handleSearch(updatedText);
            return updatedText; 
        });
        resetTranscript();
    }
    

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="Search (if no results match, it shows all posts)" value={searchText} onChange={(e)=>{ setSearchText(e.target.value); handleSearch(e.target.value)}} />
                {
                    browserSupportsSpeechRecognition &&
                    <div>
                        {listening ? <button className="speech" onClick={speechSearch}>stop</button> : <button className="speech" onClick={start}>Voice search</button>}
                    </div>
                }
            </div>
            <p>{listening&&transcript}</p>
            <div>
                {(searchResults.length > 0 ? searchResults : posts).map(post => <Post key={post._id} {...post} />)}
            </div>
        </div>
    )
}
