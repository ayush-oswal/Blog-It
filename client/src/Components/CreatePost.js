import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CreatePost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () =>{
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState(null);
    const Navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('Title',title);
        formData.set('Summary',summary);
        formData.set('File',file);
        formData.set('Content',content);
        const token = localStorage.getItem("Authtoken");
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/newpost`,{
            method: 'POST',
            body: formData, 
            headers: {
                'Authorization': `Bearer ${token}`, 
            }   
        })
        if(await response.json()==='ok'){
            Navigate('/')
        }
        else{
            alert('Error! fill all fields')
        }
    }
    return (
        <div className='createpost'>
            <div>
                <h1>Create a Post</h1>
            </div>
            <form>
                <input type='text' required='true' onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title' value={title} />
                <input type='text' onChange={(e)=>{setSummary(e.target.value)}} placeholder='Summary' value={summary} />
                <input type='file' onChange={(e)=>{setFile(e.target.files[0])}}/>
                <h3>Content</h3>
                <ReactQuill onChange={(Content)=>{setContent(Content)}} className='QuillContent' theme="snow" value={content} />
                <button onClick={handleSubmit} className='Btn'>Create Post</button>
            </form>
        </div>
    )
}
export default CreatePost