import React, { useState } from 'react'
import './Login.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
const Login = () => {

    const [action,setAction] = useState("Sign Up");

  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password' />
            </div>
        </div>
        {action==="Sign Up"?<div></div>: <div className='forgot-password'>Lost password ? <span> Click here !</span></div>}
       
        <div className='submit-container'>
            <div className={action=="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign up</div>
            <div className={action=="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default Login