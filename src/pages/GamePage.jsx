import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import GameArea from "../components/GameArea.jsx"
import DirectMessage from "../components/DirectMessage.jsx";

const GamePage = () => {
  const {room} = useParams();

  const navigate = useNavigate();
  const [bothHere, setBothHere] = useState(false)

  useEffect(() => {
    axios
      .post("/api/v1/users/verifyToken", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
        socket.emit("JoinAndLoadRoom", room);
        socket.emit("StartGameRoom", room, window.location.href);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });

    socket.on("AreYouHereToPlay", (otherUserLocation) => {
        if(otherUserLocation === window.location.href) {
            socket.emit("ImHereLetsGo", room);
        }
      });
    socket.on("BothHere", () => {
        if(!bothHere) {
            setBothHere(true);
        }
      });

  }, []);
  return (
    <div>
        {bothHere ? <GameArea/> : <h1>Waiting for the other player...</h1>}
        <DirectMessage/>
    </div>
  );
};

export default GamePage;
