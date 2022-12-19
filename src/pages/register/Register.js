
import React from 'react'
import './/regis.css'

function register() {
  return (
    <div className='luar'>
        <div className="dalam">
        <p className='judull'>Register</p>
        <p className='judulll'>Let's create your account!</p>
        
        <p className='abu'>Name</p>
        <input className='isian' type="text" />
        <hr />
        <p className='abu'>Email</p>
        <input className='isian' type="email" />
        <hr />
        <p className='abu'>Password</p>
        <input className='isian' type="password" />
        <hr />
        
        <div> 
        <button className='pencet'>Register</button>
        </div>
        <p>Register with</p>
        <button className='pencett'>Google</button>
        </div>


    </div>
  )
}

export default register;
