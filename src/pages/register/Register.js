
import React from 'react'
import './/regis.css'
import { useNavigate,Router,Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Register() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await axios.post(
        "http://localhost:4000/users/register",
        user
      );

      alert("Success", "Register Success", "success");
      Navigate("/");
    } catch (err) {
      console.log(err.response.status);
      alert("Warning", "Email Already Registered", "error");
      Navigate("/login");
    }
  };


  return (
    <div className='luar'>
        <div className="dalam">
        <p className='judull'>Register</p>
        <p className='judulll'>Let's create your account!</p>
        <form onSubmit={handleSubmit}>
        <p className='abu'>Name</p>
        <input className='isian' type="text"      
                name="fullname"
                // className={style.inputauth}
                onChange={handleChange}/>
        <hr />
        <p className='abu'>Email</p>
        <input className='isian' 
        type="email"
        name="email"
        // className={style.inputauth}
        onChange={handleChange} />
        <hr />
        <p className='abu'>Password</p>
        <input className='isian' type="password" name="password"
                onChange={handleChange}/>
        <hr />
        
        <div> 
        <button className='pencet'>Register</button>
        </div>
        </form>

        <p>Register with</p>
        <button className='pencett'>Google</button>
        </div>


    </div>
  )
}

export default Register;
