import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardBody } from "react-bootstrap";
import "../styles/componentsStyles/OnlineUsers.css";
import { socket } from "../utils/socket";
import { useGlobalContext } from "../contexts/GlobalContext";


// http://localhost:5173/

const OnlineUser = ({ user }) => {
  const { mainUser } = useGlobalContext();
  const [room, setRoom] = useState();
  const [msgNotif, setMsgNotif] = useState(false);
  const [gameNotif, setGameNotif] = useState(false);
  const [busyUser, setBusyUser] = useState(user.isBusy);

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
    console.log("inviting User To Gae");
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

    socket.on("UserIsIngame", (busyUser) => {
      if (user.username === busyUser) {
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
        setBusyUser(false);
        setGameNotif(true);
      }
    });
  }, [gameNotif]);

  return (
    <Card className="userCard">
      <CardBody>
        <li>
          <span>{user.username}</span>
          <Button variant="warning" onClick={room ? openChat : startChatRoom}>
            {msgNotif ? "You Have New Message" : "openChat"}
          </Button>
       

          <Button variant="danger" disabled={busyUser} onClick={room ? joinGame : inviteToGame}>
            {busyUser ? "In A Game" : (gameNotif ? "Accept Invite To Game" : "Invite To A Game")}
          </Button>
        </li>
      </CardBody>
    </Card>
  );
};

export default OnlineUser;
//