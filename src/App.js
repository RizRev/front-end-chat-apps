import { useState } from 'react';
import './App.css'; 
import { io } from 'socket.io-client';
// import { useState } from 'react';

function App() {
  const [message,setMessage] = useState("")
  const socket = io("http://localhost:4000")
  const handleMessage = () => {
    socket.emit('message',message)
    setMessage("")
  }
  return (
    <div className="App">
      <input type="text" value={message} name="message"
      onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={handleMessage}>tes</button>
    </div>
  );
}

export default App;
