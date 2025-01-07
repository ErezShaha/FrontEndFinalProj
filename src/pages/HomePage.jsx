import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import PublicChat from "../components/PublicChat.jsx";
import DirectMessage from "../components/DirectMessage.jsx";
import OnlineUserList from "../components/OnlineUserList.jsx";
import "../styles/HomePage.css";

// http://localhost:5173/

const HomePage = () => {
  const { mainUser } = useGlobalContext();
  const navigate = useNavigate();

  const logout = async () => {
    console.log("byebye");
    navigate("/");
  };

  useEffect(() => {
    axios
      .post("/api/v1/users/verifyToken", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  return (
    <div className="Theme">
      <div>
        <h1>Home Page</h1>
        <h1> hello! {mainUser.username}</h1>
        <button onClick={() => navigate("/test")}>Go Testing</button>
        <button onClick={logout}>Logout</button>
      </div>
      <PublicChat />
      <OnlineUserList />
      <DirectMessage />
    </div>
  );
};

export default HomePage;
