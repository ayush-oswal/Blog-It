import { useEffect, useState } from "react";
import Post from "./post";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './IndexPage.css';

export default function IndexPage() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();    
    
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Loading state for spinner

    useEffect(() => {
        setIsLoading(true); // Start loading when fetching starts
        fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(Posts => {
            setPosts(Posts);
            setIsLoading(false); // Stop loading once posts are fetched
        });
    }, []);

    function handleSearch(search) {
        const searchResults = posts.filter(post =>
            post.Title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(searchResults);
    }

    function start() {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
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

    if (isLoading) {
        return (
            <div className="spinner-container">
            <div className="spinner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                        <stop offset="0" stop-color="#0008FF"></stop>
                        <stop offset=".3" stop-color="#0008FF" stop-opacity=".9"></stop>
                        <stop offset=".6" stop-color="#0008FF" stop-opacity=".6"></stop>
                        <stop offset=".8" stop-color="#0008FF" stop-opacity=".3"></stop>
                        <stop offset="1" stop-color="#0008FF" stop-opacity="0"></stop>
                    </radialGradient>
                    <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
                        <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                    </circle>
                    <circle transform-origin="center" fill="none" opacity=".2" stroke="#0008FF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
                </svg>
            </div>
            </div>
        );
    }

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="Search (if no results match, it shows all posts)" 
                    value={searchText} 
                    onChange={(e) => { 
                        setSearchText(e.target.value); 
                        handleSearch(e.target.value);
                    }} 
                />
                {
                    browserSupportsSpeechRecognition &&
                    <div>
                        {listening 
                            ? <button className="speech" onClick={speechSearch}>Stop</button> 
                            : <button className="speech" onClick={start}>Voice search</button>
                        }
                    </div>
                }
            </div>
            <p>{listening && transcript}</p>
            <div>
                {(searchResults.length > 0 ? searchResults : posts).map(post => 
                    <Post key={post._id} {...post} />
                )}
            </div>
        </div>
    );
}
