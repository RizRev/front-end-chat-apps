import React from 'react'
import './/home.css'
import gambar from '../../asset/muka1.jpg'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown'


function Home() {
    const [message, setMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])

  const [group, setGroup] = useState("global")
  const [name, setName] = useState("guest")

  useEffect(()=>{
    const resultSocket = io("http://localhost:4000")
    setSocket(resultSocket)
  },[])

  useEffect(()=>{
    if(socket){
      socket.emit('initialRoom',{room:group})
    }
    console.log(group)
    setMessages([])
  },[group])

  useEffect(()=>{
    if(socket){
      socket.on("messageBe",(data)=>{
        setMessages((current)=>[...current,data])
        console.log(data)
      })
      console.log(socket)
    }
  },[socket])

  const handleMessage = () => {
    let data = {message,name,group}
    console.log(data)
    socket.emit('message',data)
    setMessage("")
  }
  return (
    <div className='d-flex'>
        <div className='navkir'>
        <p className='judul'>Telegram</p> 
        <img className='gambar' src={gambar} alt="" />
        <h5 className='nama'>Revan</h5> 
        <p className='tag'>@RizRevan_</p>
        <input className='isiann' type="text" placeholder='Type your message....' />
        <br />
        <div className='d-flex'>
        <a className='navlink' href="">All</a>
        <a className='navlink' href="">Important</a>
        <a className='navlink' href="">Unread</a>
        </div>
        <div className='card'>
        <p>Theresa Webb</p>
        <p>Why did you do that?</p> 
        <p>15.20</p>
        </div>
        
        </div>
        <div className="profil">
        
        </div>
        <div>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {group}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setGroup("javascript")}>javascript</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("global")}>global</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("php")}>php</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <input type="text" value={name} name="name" onChange={(e)=>setName(e.target.value)} />

      <ul>
        {messages.map((item,index)=>(
        <li key={index+1}>{item.sender} : {item.message}  - {item.date}</li>
        ))}
      </ul>
      <input type="text"  />
      <br/>
      <button>send</button>
        <div className='footer'>
            <input className='message' type="text" value={message} name="message"
      onChange={(e)=>setMessage(e.target.value)} placeholder='Type your message...' />
            <button className='tombol' onClick={handleMessage} >Send</button>
        </div>
        </div>

    </div>
  )
}

export default Home
