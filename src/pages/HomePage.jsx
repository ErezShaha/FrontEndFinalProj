import { useEffect, useState } from "react";
import '../styles/HomePage.css';
import { socket } from "../utils/socket.js";
import { useNavigate } from 'react-router';
import axios from 'axios';
//import { useGlobalContext } from '../contexts/GlobalContext';

// http://localhost:5173/

const HomePage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post('/api/v1/users/logout',null,{withCredentials: true})
    .then((res) => {
      console.log("byebye");
      socket.emit("UserLogout");
      navigate('/')
    })
    .catch((err) => {
       console.log(err);
    })
  }

  const lookAtOnlineUsers = async () => {
    socket.emit("lookAtOnlineUsers");
    console.log("looked");
  }

  useEffect(() => {
    axios.post('/api/v1/users/verifyToken',null,{withCredentials: true})
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/')
      });
    
    socket.on("hereTakeYourUser", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  
  //const {mainUser} = useGlobalContext();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate('/test')}>Go Testing</button>
      <button onClick= {logout}>Logout</button>
      <button onClick= {lookAtOnlineUsers}>Online Users</button>
      <ul>
        {onlineUsers.map((user) => (
            <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>

  )
}

export default HomePage