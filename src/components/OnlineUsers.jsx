import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CardBody } from "react-bootstrap";
import HomePage from "../pages/HomePage";
import "../styles/OnlineUsers.css";
import { socket } from "../utils/socket";

// http://localhost:5173/

const OnlineUsers = ({ user }) => {
  const [room, setRoom] = useState();

  const chatRoom = () => {
    socket.emit("chatRoom", user.username);
  };

  const openChat = () => {
    socket.emit("LoadRoom", room);
  };

  useEffect(() => {
    socket.on("RoomNumberForUser", (username, roomNumber) => {
      if (user.username === username) {
        setRoom(roomNumber);
        socket.emit("JoinRoom", room);
      }
    });
  }, []);

  return (
    <Card className="userCard">
      <CardBody>
        <li>
          <span>{user.username}</span>
          <Button variant="warning" onClick={room ? openChat : chatRoom}>
            chat
          </Button>
          <Button variant="danger">game</Button>
        </li>
      </CardBody>
    </Card>
  );
};

export default OnlineUsers;
