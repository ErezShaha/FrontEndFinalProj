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
  const [msgNotif, setMsgNotif] = useState(false);
  const [gameNotif, setGameNotif] = useState(false);
  const [busyUser, setBusyUser] = useState(false);

  const startChatRoom = () => {
    console.log("StartChatRoom");
    socket.emit("StartChatRoom", user.username);
  };

  const openChat = () => {
    console.log("openChat");
    setMsgNotif(false);
    socket.emit("JoinAndLoadRoom", room);
  };


  const inviteToGame = () => {
    console.log("inviting User To Game");
    socket.emit("InviteUserToGame", user.username);
  }
  
  const joinGame = () => {
    console.log("joinGame");
    socket.emit("JoinGameRoom", room, user.username);
  }

  useEffect(() => {
    socket.on("RoomNumberForUser", (username, roomNumber) => {
      console.log("RoomNumberForUser");
      console.log(username, roomNumber);
      if (user.username === username) {
        console.log(roomNumber);
        setRoom(roomNumber);
      }
    });

    socket.on("UserIsIngame", (busyUser, secondBusyUser) => {
      if (user.username === busyUser && mainUser.username !== secondBusyUser) {
        setBusyUser(true);
      }
    });

    socket.on("MsgNotif", (newMsgFromUsername) => {
      if (newMsgFromUsername === user.username) {
        setMsgNotif(true);
      }
    });

    socket.on("GameNotif", (sendingUser) => {
      if (sendingUser === user.username) {
        setGameNotif(true);
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
          {msgNotif ? <div>aigool</div> : null}

          <Button variant="danger" onClick={busyUser ? disabled=true : (room ? joinGame : inviteToGame)}>
            {busyUser ? "In A Game" : (gameNotif ? "Join A Game" : "Invite To A Game")}
          </Button>
          {gameNotif ? <div>aigool</div> : null}
        </li>
      </CardBody>
    </Card>
  );
};

export default OnlineUsers;
//