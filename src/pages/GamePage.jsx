import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const GamePage = () => {
  const room = useState(useParams());
  const navigate = useNavigate();
  const [bothHere, setBothHere] = useState(false)

  useEffect(() => {
    axios
      .post("/api/v1/users/verifyToken", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
        socket.emit("StartGameRoom", room);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    
    socket.on("BothAreHereWooHoo", () => {
        setBothHere(true);
      });

  }, []);

  return (
    <div>
        {bothHere ? <GameArea/> : <h1>Waiting for the other player...</h1>}
        <GameArea/>
        <DirectMessage/>
    </div>
  );
};

export default GamePage;
