import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { socket } from "../utils/socket.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "react-bootstrap/Card";
import { Button, CardBody, CardTitle, FormControl, InputGroup,} from "react-bootstrap";
import OnlineUsers from "../components/OnlineUsers.jsx";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicChat from "../components/PublicChat.jsx";

// http://localhost:5173/

const HomePage = () => {
  const { mainUser } = useGlobalContext();
  const [online, setOnline] = useState([]);
  const navigate = useNavigate();
  // const [msgBox, setmsgBox] = useState([]);
  // const [msgToAll, setmsgToAll] = useState("");

  const logout = async () => {
    console.log("byebye");
    navigate("/");
  };

  const lookAtOnlineUsers = async () => {
    socket.emit("lookAtOnlineUsers");
    console.log("looked");
  };
  // const enterMsgForEveryone =() => {
  //   socket.emit("SendMessageToEveryone", msgToAll);
  // };

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

    // socket.on("RecieveMessage", (msgObj) => {
    //   console.log(msgObj)

    //   setmsgBox([...msgBox, msgObj]);
    //   console.log(msgBox)
    // });

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
      <PublicChat/>
      {/* <Card className="chatBox">
        <CardBody>
          <CardTitle>Trade Chat</CardTitle>
          <ul>
          {msgBox.map((msgObj) => (
            <li key={msgObj.id}>{msgObj.content}</li>
          ))}
          </ul>
          <InputGroup>
            <FormControl
             
              value={msgToAll}
              onChange={(e) => setmsgToAll(e.target.value)}
            />
            <Button onClick={enterMsgForEveryone}>Enter</Button>
          </InputGroup>
        </CardBody>
      </Card> */}

      <Card className="onlineCard">
        <CardBody>
          <CardTitle className="onlineTitle">Online</CardTitle>
          <FontAwesomeIcon icon={faBars} className="onlineTitle" id="burger" />
          {online.map((user) => (
            <OnlineUsers
              className="userBlock"
              key={user.username}
              user={user}
            />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default HomePage;
