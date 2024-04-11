import { useContext, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
const Header = () =>{
    const {userInfo,setUserInfo} = useContext(UserContext)
    useEffect(()=>{
        const token = localStorage.getItem("Authtoken");
        if(token){
            fetch(`${process.env.REACT_APP_SERVER_URL}/auth/check`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            .then(response=>{
                response.json().then(UserInfo=>{
                    setUserInfo(UserInfo);
                })
            })
        }
    },[setUserInfo])
    function logout(){
        localStorage.setItem("Authtoken","");
        setUserInfo(null);
    }
    const username = userInfo?.username
    return(
        <div className='header'>
            <Link to="/"><span className='logo'>BLOG IT</span></Link>
            {username && (
                <div>
                    <Link to="/create"><span className='btn'>Create Post</span></Link> &nbsp; &nbsp;
                    <span className='btn' onClick={logout}>Logout</span>
                </div>
            )}
            {!username && (
                <div>
                    <Link to="/login"><span className='btn'>Login</span></Link> &nbsp; &nbsp;
                    <Link to="/register"><span className='btn'>Register</span></Link>
                </div>
            )}    
        </div>
    )
}
export default Header