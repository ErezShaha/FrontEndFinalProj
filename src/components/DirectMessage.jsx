import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardTitle,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../components/Message.jsx";
import { socket } from "../utils/socket.js";
import { useGlobalContext } from "../contexts/GlobalContext";


const DirectMessage = () => {
  const { mainUser } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [msgsInRoom, setMsgsInRoom] = useState([]);
  const [chatWithUser, setChatWithUser] = useState();
  const [currentRoom, setCurrentRoom] = useState();

  const SendMessageToRoom = () => {
    socket.emit("SendMessageToRoom", currentRoom, message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("RecieveDmMessage", (message) => {
      console.log("Got Messages" + message);
      setMsgsInRoom([...msgsInRoom, message]);
    });

    socket.on("LoadRoomChat", (messages, users, room) => {
      console.log("aaaaaaaaaaaaa")
      currentRoom ? socket.emit("LeaveRoom", currentRoom) : null;
      currentRoom !== room ? socket.emit("JoinRoom", room): null;
      console.log("Loading Room chat" + messages);
      setCurrentRoom(room);
      setMsgsInRoom(messages);
      for(let user of users) {
        if(user != mainUser.username){
          setChatWithUser(user);
        }
      };
    });

  }, [chatWithUser, msgsInRoom, message, currentRoom]);

  return (
    <Card className="privateChatBox">
      <CardBody>
        {currentRoom ? 
          <CardTitle>Private Chat With {chatWithUser}</CardTitle> :
          <CardTitle>Select a User to Chat</CardTitle>
        }
        
        <ListGroup className="chatMessagesBox">
          {msgsInRoom.map((msgObj) => (
            <Message 
            key={msgObj.id} 
            msgObj={msgObj}
            className="publicChatMessage"
            ></Message>
          ))}
        </ListGroup>

        <InputGroup className="chatInput">
          <FormControl 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button disabled={!currentRoom ? true : message != ""? false : true} onClick={SendMessageToRoom}>Enter</Button>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default DirectMessage;
