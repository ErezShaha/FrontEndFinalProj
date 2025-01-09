import React from "react";
import { useEffect, useState } from "react";
import "../styles/componentsStyles/OnlineUserList.css";
import Card from "react-bootstrap/Card";
import { CardBody, CardTitle } from "react-bootstrap";
import OnlineUser from "./OnlineUser.jsx";

import { useGlobalContext } from "../contexts/GlobalContext";
import { socket } from "../utils/socket.js";
import { useNavigate } from "react-router";




const OnlineUserList = () => {
  const { mainUser } = useGlobalContext();
  const [online, setOnline] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("hereTakeYourUser", (users) => {
      setOnline(users);
    });

    socket.on("GoWaitInGameRoom", (room) => {
      console.log(
        `I go sit in the conrner (room: ${room}) and wait for my friend :)`
      );
      navigate(`/game/${room}`);
    });
  
  }, []);


  return (
    <div>
      <Card className="onlineCard">
        <CardBody>
          <CardTitle className="onlineTitle">Online</CardTitle>
          <div className="onlineList">
            {online.map((user) =>
              user.username != mainUser.username ? (
                <OnlineUser
                  className="userBlock"
                  key={user.username}
                  user={user}
                />
              ) : null
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OnlineUserList;
