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
import { useGlobalContext } from "../contexts/GlobalContext";


// http://localhost:5173/

const OnlineUsers = ({ user }) => {
  const { mainUser } = useGlobalContext();
  const [room, setRoom] = useState();

  const startChatRoom = () => {
    console.log("StartChatRoom");
    socket.emit("StartChatRoom", user.username);
  };

  const openChat = () => {
    console.log("openChat");
    socket.emit("JoinAndLoadRoom", room);
  };

  useEffect(() => {
    socket.on("RoomNumberForUser", (username, roomNumber) => {
      console.log("RoomNumberForUser");
      console.log(username, roomNumber);
      if (user.username === username) {
        console.log(roomNumber);
        setRoom(roomNumber);
      }
    });

  }, []);

  return (
    <Card className="userCard">
      <CardBody>
        <li>
          <span>{user.username}</span>
          <Button variant="warning" onClick={room ? openChat : startChatRoom}>
            {room ? "openChats" : "startChatRooms"}
          </Button>
          <Button variant="danger">game</Button>
        </li>
      </CardBody>
    </Card>
  );
};

export default OnlineUsers;
//