import { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import "../styles/HomePage.css";
import {Button,CardBody, CardTitle,FormControl,InputGroup,} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../components/Message.jsx";
import { socket } from "../utils/socket.js";

const PublicChat = () => {
  const [msgBox, setMsgBox] = useState([]);
  const [msgToAll, setMsgToAll] = useState("");
  const messagesEndRef = useRef(null); // Add ref for scrolling
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enterMsgForEveryone = () => {
    socket.emit("SendMessageToEveryone", msgToAll);
    setMsgToAll("");
  };
  
  
  useEffect(() => {
    socket.on("RecieveMessage", (msgObj) => {
      setMsgBox([...msgBox, msgObj]);
    });
    scrollToBottom();
  }, [msgBox]);

 

  return (
    <Card className="publicChatBox">
      <CardBody>
        <CardTitle>Public Chat</CardTitle>

        <ListGroup className="chatMessagesBox">
          {msgBox.map((msgObj) => (
            <Message
            key={msgObj.id}
            msgObj={msgObj}
            className="publicChatMessage"
            ></Message>
          ))}
            {/* Add this div as scroll anchor */}
          <div ref={messagesEndRef} />
        </ListGroup>

        <InputGroup className="chatInput">
          <FormControl
            value={msgToAll}
            onChange={(e) => setMsgToAll(e.target.value)}
          />
          <Button
            disabled={msgToAll != "" ? false : true}
            onClick={enterMsgForEveryone}
          >
            Enter
          </Button>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default PublicChat;
