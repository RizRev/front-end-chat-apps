import React from 'react'
import './/home.css'
import gambar from '../../asset/muka1.jpg'
import gambarr from '../../asset/JavaScript-logo.png'
import gmbrnext from '../../asset/nextjs.png'
import gmbrreact from '../../asset/react.png'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState();
  const [login, setLogin] = useState({});
  const [list, setList] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState({});
  const [activeChat, setActiveChat] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const self = user;
  const friend = JSON.parse(localStorage.getItem("receiver"));

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = user.data;
    setLogin(user);
    axios
      .get(`http://localhost:4000/users/all`)
      .then((response) => {
        console.log("ini get user all",response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:4000/");
    socket.on("send-message-response", (response) => {
      // set receiver
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      console.log("ini response 1",response)
      setHistory(response)

      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        // setListchat(response);
        console.log("ini response 2",response)
      }
    });
    setSocketIo(socket);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        let result = await axios.get(
          `http://localhost:4000/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(result.data.data);
        console.log("result profile",result.data.data );
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  console.log("profileku",profile );
  const SubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));

    // list history saat submit message
    const payload = {
      sender: user.fullname,
      receiver: receiver.fullname,
      message,
    };

    setListchat([...listchat, payload]);
    console.log("ini list chat",payload)

    const data = {
      sender: user.id,
      receiver: activeReceiver.id,
      message,
    };

    socketio.emit("send-message", data);

    setMessage("");
  };

  const selectReceiver = (item) => {
    setListchat([]);
    setActiveReceiver(item);
    setActiveChat(2);

    //set receiver
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login);
    console.log("data login",login)
    console.log("sender",login.id)
    console.log("receiver",item.id)
    const data = {
      sender: login.id,
      receiver: item.id,
    };
    socketio.emit("chat-history", data);
    // const history = socketio.emit("chat-history", data);
    console.log("ini data history",data)
  };
  // console.log("ini self");
  // console.log(activeReceiver.)
  const handleLeaveChat = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div className='d-flex'>
        <div className='navkir'>
        <p className='judul'>Telegram</p> 
        <img className='gambar' src={gambar} alt="" />
        <h5 className='nama'>{profile.fullname}</h5> 
        <p className='tag'>{profile.email}</p>
        <input className='isiann' type="text" placeholder='Type your message....' />
        <div className="tandaplus"></div>
        <div className="tandaplus2"></div>
        <br />
        <div className='d-flex'>
        <a className='navlink' href="">All</a>
        <a className='navlink' href="">Important</a>
        <a className='navlink' href="">Unread</a>
        </div>
        {/* list users */}
        <div>
          {list.map((user)=> (
            <div
            className="daftar"
            onClick={()=> selectReceiver(user)}
            key={user.id}>
              {/* <p>{user.id}</p> */}
              <p  style={{textAlign: "center"}}>{user.fullname}</p>
            </div>
          ))}
        </div>
        {/* <div className='card'>
        <Link>
          <div className='isi'>
          <img className='gambarr' src={gambarr} alt="" />
          <p className='namegrup'>Javascript Group</p>
          </div>
          </Link>
        </div>
        <div className='card'>
        <Link>
          <div className='isi'>
          <img className='gambarr' src={gmbrreact} alt="" />
          <p className='namegrup'>ReactJS Group</p>
          </div>
          </Link>
        </div>
        <div className='card'>
        <Link>
          <div className='isi'>
          <img className='gambarr' src={gmbrnext} alt="" />
          <p className='namegrup'>NextJS Group</p>
          </div>
          </Link>
        </div> */}

        </div>
        <div className='kanan'>
          <div className="header">

            <p className='isiheader'>
            {activeReceiver.fullname
              ? activeReceiver.fullname
              : "Tap Friend to Start Chat"}
            </p>
          </div>
    {/* <input type="text" /> */}

      {/* <ul>
        {messages.map((item,index)=>(
        <li key={index+1}>{item.sender} : {item.message}  - {item.date}</li>
        ))}
      </ul> */}
      <div className='lembar'>
          {history.map((item) => (
            <div key={item.id}>
              {item.sender === login.fullname ? (
                <div className='lebih'>
                  <div className="dalam">
                    <p>You</p>
                    <div>
                      <p  className="sendiri">{item.message}</p>
                      {/* <h5>{item.sender}</h5>
                      <h4>{item.receiver}</h4> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="lebih2">
                    <div className="dalam">
                    <p className='teman'>{item.sender}</p>
                      <p className='sendiri'>{item.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      <form onSubmit={SubmitMessage}>
      <div className='footer'>
            <input className='message' type="text" value={message} name="message"
      onChange={(e)=>setMessage(e.target.value)} placeholder='Type your message...'/>
            <button className='tombol' type='submit' >Send</button>
        </div>
      </form>
        
        </div>
        </div>
      
  )
}

export default Home

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// // import ChatBar from "../components/chat/ChatBar/ChatBar";
// // import Profile from "../../assets/Profile2.jpg";
// import { io } from "socket.io-client";
// // import sidebar from "../components/chat/ChatBar/style.module.css";
// // import right from "../components/chat/ChatBody/style.module.css";
// // import footer from "../components/chat/ChatFooter/style.module.css";
// // import { Image } from "react-bootstrap";
// // import ChatBody from "../components/chat/ChatBody/ChatBody";
// // import Profile2 from "../../assets/Profile2.jpg";
// // import Hover from "../../assets/Hover.png";
// import { useNavigate } from "react-router-dom";
// // import { data } from "autoprefixer";
// // import Modal from "../components/Modal";
// // import Edit from "../../assets/Edit.svg";
// const Home = () => {
//   const [socketio, setSocketIo] = useState(null);
//   const [listchat, setListchat] = useState([]);
//   const [message, setMessage] = useState();
//   const [login, setLogin] = useState({});
//   const [list, setList] = useState([]);
//   const [activeReceiver, setActiveReceiver] = useState({});
//   const [activeChat, setActiveChat] = useState(1);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const self = user.data;
//   const friend = JSON.parse(localStorage.getItem("receiver"));

//   const [profile, setProfile] = useState([]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const data = user.data;
//     setLogin(user);
//     axios
//       .get(`http://localhost:4000/users/all`)
//       .then((response) => {
//         console.log(response);
//         setList(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     const socket = io(process.env.REACT_APP_BACKEND_API_HOST);
//     socket.on("send-message-response", (response) => {
//       // set receiver
//       const receiver = JSON.parse(localStorage.getItem("receiver"));
//       // Kondisi nampilkan data receiver
//       if (
//         receiver.username === response[0].sender ||
//         receiver.username === response[0].receiver
//       ) {
//         setListchat(response);
//       }
//     });
//     setSocketIo(socket);
//   }, []);

//   useEffect(() => {
//     const getProfile = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const token = user.token;
//         let result = await axios.get(
//           `http://localhost:4000/users/profile`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProfile(result.data.data);
//         console.log(result.data.data, "result");
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getProfile();
//   }, []);
//   // useEffect(() => {
//   //   const user = JSON.parse(localStorage.getItem("user"));
//   //   const token = user.token;

//   //   axios
//   //     .get(`http://localhost:3009/users/profile`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then((response) => {
//   //       console.log(response, "res");
//   //       setProfile(response.data.data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // }, []);
//   console.log(profile, "profile asasa");
//   const SubmitMessage = (e) => {
//     e.preventDefault();
//     const user = JSON.parse(localStorage.getItem("user"));
//     const receiver = JSON.parse(localStorage.getItem("receiver"));

//     // list history saat submit message
//     const payload = {
//       sender: user.fullname,
//       receiver: receiver.fullname,
//       message,
//     };

//     setListchat([...listchat, payload]);

//     const data = {
//       sender: user.data.id,
//       receiver: activeReceiver.id,
//       message,
//     };

//     socketio.emit("send-message", data);

//     setMessage("");
//   };

//   const selectReceiver = (item) => {
//     setListchat([]);
//     setActiveReceiver(item);
//     setActiveChat(2);

//     //set receiver
//     localStorage.setItem("receiver", JSON.stringify(item));
//     socketio.emit("join-room", login.data);

//     const data = {
//       sender: login.data.id,
//       receiver: item.id,
//     };

//     socketio.emit("chat-history", data);
//   };
//   console.log(self);

//   const handleLeaveChat = () => {
//     localStorage.clear();
//     navigate("/");
//     window.location.reload();
//   };
//   return (
//     <div className="flex">
//       {/* //sidebar */}
//       {/* <div className={sidebar.sidebar}> */}
//         <div className="h-screen overflow-y-auto">
//           <h2 style={{ color: "#7e98df", fontWeight: "700" }}>Chat App</h2>
//           <div className="row">
//             <div className="row">
//               <div className="row flex justify-center mt-5">
//                 <img
//                   className="rounded-lg shadow-sm"
//                   src={profile.photo}
//                   style={{ height: "100px", width: "120px" }}
//                 ></img>

//                 <p className="text-2xl font-semibold text-center mt-10">
//                   {profile.username}
//                 </p>

//                 <p className="text-2xl font-light text-center mt-10">Bio:</p>
//                 <p className="text-1xl font-light text-center mt-10">
//                   {profile.bio}
//                 </p>
//                 {/* <Modal /> */}
//               </div>
//             </div>
//           </div>
//           <div className="grid">
//             <h4>Friend List</h4>
//             <div>
//               <div className="col-auto">
//                 <div className="input-group">
//                   <button className="btn btn-square">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                     </svg>
//                   </button>
//                   <input
//                     type="text"
//                     placeholder="Search…"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </div>
//               {list.map((user) => (
//                 <div
//                   className="card w-96 bg-base-100 shadow-sm rounded-lg"
//                   onClick={() => selectReceiver(user)}
//                   key={user.id}
//                 >
//                   <div className="card-body flex flex-row ">
//                     <div>
//                       <img
//                         className="rounded-lg"
//                         src={user.photo}
//                         style={{ height: "50px", width: "50px" }}
//                       />
//                     </div>
//                     <div>
//                       <p>{user.username}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       ,{/* chat body */},

//       <div className="grow h-14">
//         <header>
//           <h3 className="text-[#7e98df] font-semibold">
//             {activeReceiver.username
//               ? activeReceiver.username
//               : "Tap Friend to Start Chat"}
//           </h3>
//           <div className="dropdown dropdown-bottom dropdown-end">
//             <label tabIndex={0} className="btn m-1">
//               {/* <img src={} /> */}
//             </label>
//             <ul
//               tabIndex={0}
//               className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
//             >
//               <li>
//                 <button
//                   type="button"
//                   className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//                   onClick={handleLeaveChat}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </header>
//         <div>
//           {listchat.map((item) => (
//             <div key={item.id}>
//               {item.sender === login.data.fullname ? (
//                 <div>
//                   <div className="chat chat-end">
//                     <p>You</p>
//                     <div className="chat-bubble chat-bubble-info">
//                       <p>{item.message}</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <p>{item.username}</p>
//                   <div className="chat chat-start">
//                     <div className="chat-bubble chat-bubble-primary">
//                       <p>{item.message}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div >
//           <form  onSubmit={SubmitMessage}>
//             <input
//               type="text"
//               placeholder="Type your messages...."
              
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//             >
//               SEND
//             </button>
//           </form>
//         </div>
//       </div>
//   )
// }
// export default Home;

