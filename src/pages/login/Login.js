
import React from 'react'
import './/login.css'
import { useNavigate,Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/actions/login'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginUser(data, navigate));
  };

  return (
    <div className="luar">
      <div className='dalam'>
      <p className='judull'>Login</p>
      <p className='judulll'>Hi, Welcome back!</p>
      <form onSubmit={postData}>
      <p className='abu'>Email</p>
        <input className='isian' type="email" onChange={(e) => setEmail(e.target.value)}
                value={email} name="email"/>
        <hr />
        <p className='abu'>Password</p>
        <input className='isian' type="password" 
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}/>
        <hr />
    
        <a href="" className='forgot'>Forgot password?</a>
      
      <div >
        <button className="pencet">Login</button>
      </div>
      </form>

      <div className="loginwith">
        Login with
      </div>
      <button className="pencett">Google</button>
      <div className='up'>
        <div className='d-flex mt-4'>
        <p>Don't have an account? <a className='forgot' href="">Sign Up</a></p>
        </div>
      
        
      </div>
      </div>
          </div>
  )
}
