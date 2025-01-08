import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicChat from "../components/PublicChat.jsx";
import DirectMessage from "../components/DirectMessage.jsx";
import OnlineUserList from "../components/OnlineUserList.jsx";
import "../styles/HomePage.css";

// http://localhost:5173/

const HomePage = () => {
  const { mainUser } = useGlobalContext();
  const navigate = useNavigate();
  const [burgerButton, setburgerButton] = useState(true);

  const logout = async () => {
    console.log("byebye");
    navigate("/");
  };

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
  }, []);

  return (
    <div className="Theme">
      <div>
        <h1 className="titles">Home Page</h1>
        <h1 className="titles"> hello! {mainUser.username}</h1>
        <div className="burgerMenu">
          {burgerButton ? (
            <FontAwesomeIcon
              icon={faBars}
              id="burger"
              onClick={() => setburgerButton(!burgerButton)}
            />
          ) : (
            <ul>
              <li>
              <FontAwesomeIcon icon={faBars} id="burger" onClick={() => setburgerButton(!burgerButton)}/>
              </li>
              <li>
                <button className="burgerOptions">Settings</button>
              </li>
                <button className="burgerOptions">Contact</button>
              <li>
                </li>
                <li>
                <button className="burgerOptions" onClick={logout}>Logout</button>
                </li>
            </ul>
          )}
        </div>
        
      </div>
      <PublicChat />
      <OnlineUserList />
      <DirectMessage />
    </div>
  );
};

export default HomePage;
