import React from "react";
import { useEffect, useState } from "react";
import "../styles/OnlineUserList.css";
import Card from "react-bootstrap/Card";
import { CardBody, CardTitle } from "react-bootstrap";
import OnlineUser from "./OnlineUser.jsx";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../contexts/GlobalContext";
import { socket } from "../utils/socket.js";




const OnlineUserList = () => {
  const { mainUser } = useGlobalContext();
  const [online, setOnline] = useState([]);
 
  useEffect(() => {
    socket.on("hereTakeYourUser", (users) => {
      setOnline(users);
    });
  }, []);

  return (
    <div>
      <Card className="onlineCard">
        <CardBody>
          <CardTitle className="onlineTitle">Online</CardTitle>
          <FontAwesomeIcon icon={faBars} className="onlineTitle" id="burger" />
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
