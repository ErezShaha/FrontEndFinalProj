import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { socket } from "../utils/socket.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CardBody, CardTitle } from "react-bootstrap";
import OnlineUsers from "../components/OnlineUsers.jsx";

// http://localhost:5173/

const HomePage = () => {
  const { mainUser } = useGlobalContext();
  const [online, setOnline] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    console.log("byebye");
    navigate("/");
  };

  const lookAtOnlineUsers = async () => {
    socket.emit("lookAtOnlineUsers");
    console.log("looked");
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

    socket.on("hereTakeYourUser", (users) => {
      setOnline(users);
    });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h1> hello! {mainUser.username}</h1>
      <button onClick={() => navigate("/test")}>Go Testing</button>
      <button onClick={logout}>Logout</button>

      <Card className="onlineCard">
        <CardBody>
          <CardTitle>Online</CardTitle>
          {online.map((user) => (
            <OnlineUsers key={user.username} user={user} />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default HomePage;
