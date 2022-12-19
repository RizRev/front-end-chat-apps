
import React from 'react'
import './/login.css'

export default function login() {
  return (
    <div className="luar">
      <div className='dalam'>
      <p className='judull'>Login</p>
      <p className='judulll'>Hi, Welcome back!</p>
        <p className='abu'>Email</p>
        <input className='isian' type="email" />
        <hr />
        <p className='abu'>Password</p>
        <input className='isian' type="password" />
        <hr />
    
        <a href="" className='forgot'>Forgot password?</a>
      
      <div >
        <button className="pencet">Login</button>
      </div>
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
