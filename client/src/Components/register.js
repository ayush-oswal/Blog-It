import './register.css'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const Navigate = useNavigate();
    async function register(e){
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`,{
            method: 'POST',
            body : JSON.stringify({username,password}),
            headers: {'Content-type' : 'application/json'}
        })
        if(response.status===200) return Navigate('/login');
        else alert('Registration failed.')
    }
    return(
        <div className='Register' onSubmit={register}>
            <h1>REGISTER</h1>
            <form>
                <input onChange={(e)=>{setUsername(e.target.value)}} className='username' type='text' value={username} placeholder='Username' />
                <input onChange={(e)=>{setPassword(e.target.value)}} className='password' type='password' value={password} placeholder='Password' />
                <button className='btn'>Register</button>
            </form>
        </div>
    )
}

export default Register