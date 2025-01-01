import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/HomePage.css";
import {
  Button,
  CardBody,
  CardTitle,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../components/Message.jsx";
import { socket } from "../utils/socket.js";

const PublicChat = () => {
  const [msgBox, setMsgBox] = useState([]);
  const [msgToAll, setMsgToAll] = useState("");

  const enterMsgForEveryone = () => {
    socket.emit("SendMessageToEveryone", msgToAll);
  };

  useEffect(() => {
    socket.on("RecieveMessage", (msgObj) => {
      setMsgBox([...msgBox, msgObj]);
    });
  }, [msgBox]);

  // useEffect(() => {
  //   socket.on("RecieveMessage", (msgObj) => {
  //     setMsgBox([msgObj, ...msgBox]);
  //   });
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
        </ListGroup>

        <InputGroup className="chatInput">
          <FormControl
            value={msgToAll}
            onChange={(e) => setMsgToAll(e.target.value)}
          />
          <Button onClick={enterMsgForEveryone}>Enter</Button>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default PublicChat;
