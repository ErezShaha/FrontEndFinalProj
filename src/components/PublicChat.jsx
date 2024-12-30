import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, CardBody, CardTitle, FormControl, InputGroup,} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Message from '../components/Message.jsx';
import { socket } from "../utils/socket.js";


const PublicChat = () => {
  const [msgBox, setMsgBox] = useState([]);
  const [msgToAll, setMsgToAll] = useState("");

  const enterMsgForEveryone =() => {
      socket.emit("SendMessageToEveryone", msgToAll);
    };

  useEffect(() => {
    socket.on("RecieveMessage", (msgObj) => {
      setMsgBox([...msgBox, msgObj]);
    });
  }, [msgBox]);
  return (
      <Card className="chatBox">
        <CardBody>
          <CardTitle>Public Chat</CardTitle>
          <InputGroup>
            <FormControl
            
              value={msgToAll}
              onChange={(e) => setMsgToAll(e.target.value)}
            />
            <Button onClick={enterMsgForEveryone}>Enter</Button>
          </InputGroup>
          <ListGroup>
            {msgBox.map(msgObj => (
              <Message key={msgObj.id} msgObj={msgObj}></Message>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    )
  }





export default PublicChat