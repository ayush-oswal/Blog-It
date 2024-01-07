import './login.css'
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserContext } from './UserContext';
const Login = () => {
    const [clicked,setClicked] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {setUserInfo} = useContext(UserContext);
    const Navigate = useNavigate();
    function toggle(){
        setClicked(!clicked)
        setPasswordVisible(!passwordVisible)
    }
    async function login(e){
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`,{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-type' : 'application/json'},
        })
        if(response.ok===false) alert('Wrong credentials')
        else{
            response.json()
            .then(userinfo =>{
                console.log(userinfo);
                setUserInfo(userinfo);
                localStorage.setItem("Authtoken",userinfo.token)
            })
            return Navigate("/")
        }
    }
    return(
        <div className='Login'>
            <h1>LOGIN</h1>
            <form onSubmit={login}>
                <input onChange={(e)=>{setUsername(e.target.value)}} className='username' type='text' value={username} placeholder='Username' />
                <div className='container'>
                <input onChange={(e)=>{setPassword(e.target.value)}} className='password' type={passwordVisible ? 'text' : 'password'} value={password} placeholder='Password' />
                <div className='icon' onClick={toggle}>
                {clicked ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
                </div>
                <button className='btn'>Login</button>
            </form>
        </div>
    )
}

export default Login