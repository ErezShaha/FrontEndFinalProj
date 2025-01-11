import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useNavigate } from 'react-router';
import axios from 'axios';

// http://localhost:5173/

const TestPage = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const navigate = useNavigate();

    const logout = async () => {
        console.log("byebye");
        navigate("/");
      };

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
        
        socket.on("OnlineUsersChange", (users) => {
            setOnlineUsers(users);
        });
        }, []);
    return (
    <div>
        <h1>Test Page</h1>
        <button onClick={() => navigate('/home')}>Go Home</button>
        <button onClick={logout}>Logout</button>
        <button onClick= {lookAtOnlineUsers}>Online Users</button>
        <ul>
            {onlineUsers.map((user) => (
                <li key={user.username}>{user.username}</li>
            ))}
        </ul>
    </div>
  )
}

export default TestPage