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

const DirectMessage = () => {
  const [msgBox, setMsgBox] = useState([]);
  const [roomMessage, setroomMessage] = useState("");

  const SendMessageToRoom = () => {
    socket.emit("SendMessageToRoom", roomMessage);
  };

  useEffect(() => {
    socket.on("RecieveDmMessage", (msgObj) => {
      setMsgBox(msgObj);
    });
  }, [msgBox]);

  return (
    <Card className="privateChatBox">
      <CardBody>
        <CardTitle>Private Chat</CardTitle>
        
        <ListGroup className="chatMessagesBox">
          {msgBox.map((msgObj) => (
            <Message 
            key={msgObj.id} 
            msgObj={msgObj}
            className="publicChatMessage"
            ></Message>
          ))}
        </ListGroup>

        <InputGroup className="chatInput">
          <FormControl
            value={roomMessage}
            onChange={(e) => setroomMessage(e.target.value)}
          />
          <Button onClick={SendMessageToRoom}>Enter</Button>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default DirectMessage;
