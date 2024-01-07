import { useState , useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './CreatePost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditPost(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState(null);
    const Navigate = useNavigate();
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts/${id}`,{
            method:'GET'
        })
        .then(response=>{response.json().then(PostInfo=>{
            setTitle(PostInfo.Title);
            setSummary(PostInfo.Summary);
            setContent(PostInfo.Content);

        })})
    },[id])
    async function updatePost(e){
        e.preventDefault();
        alert('If you dont attach any image , the post will still have the previous image')
        const formData = new FormData();
        formData.set('Title',title);
        formData.set('Summary',summary);
        formData.set('Content',content);
        formData.set('id',id);
        if(file){
            formData.set('File',file);
        }
        else{
            formData.set('File','');
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/updatePost`,{
            method:'PUT',
            body:formData,
             
        });
        if(await response.json()==='ok'){
            Navigate(`/${id}`)
        }
        else{
            alert('Error! fill all fields')
        }
    }
    return(
        <div className='createpost'>
            <div>
                <h1>Edit Post</h1>
            </div>
            <form>
                <input type='text' required='true' onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title' value={title} />
                <input type='text' onChange={(e)=>{setSummary(e.target.value)}} placeholder='Summary' value={summary} />
                <input type='file' onChange={(e)=>{setFile(e.target.files[0])}}/>
                <h3>Content</h3>
                <ReactQuill onChange={(Content)=>{setContent(Content)}} className='QuillContent' theme="snow" value={content} />
                <button onClick={updatePost} className='Btn'>Update Post</button>
            </form>
        </div>
    )
}